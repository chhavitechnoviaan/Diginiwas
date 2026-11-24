import mongoose from 'mongoose';
import {createHash} from 'node:crypto';
import Seller from '../models/Seller.js';
import Property from '../models/NewProperty.js';
import Promotion from '../models/PromotionRequest.js';
import Visit from '../models/Visit.js';
import Lead from '../models/Lead.js';
import Boost from '../models/SellerBoostRequest.js';
import Partner from '../models/Partner.js';
import {notifyUser} from './notificationService.js';
import {sellerEvents} from './sellerEventRules.js';
const models=[Seller,Property,Promotion,Visit,Lead,Boost,Partner];
const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex');
async function owner(p){if(!p)return null;const a=p.addedBy||{};if(String(a.role).toLowerCase()==='seller'&&mongoose.isValidObjectId(a.userId))return a.userId;if(a.sellerId)return (await Seller.findOne({sellerId:a.sellerId}).select('_id').lean())?._id;return null;}
async function publish(id,e,model,d,key){if(!id)return;const n=await notifyUser({...e,userId:id,userRole:'seller',entityType:model,entityId:d._id,eventKey:key,data:{propertyId:String(d.propertyId||d.propertyMongoId||d.property?.propertyMongoId||(model==='NewProperty'?d._id:''))}});if(!n)throw Error('Seller notification persistence failed');}
async function propertyOwner(id){return mongoose.isValidObjectId(id)?owner(await Property.findById(id).lean()):null;}
export async function startSellerEventWorker(){
 const db=mongoose.connection.db, state=db.collection('seller_event_checkpoints'), map=new Map(models.map(m=>[m.collection.name,m.modelName]));
 while(true){let stream;try{
 let cp=await state.findOne({_id:'events-v1'});if(!cp){const h=await db.admin().command({hello:1});if(!h.operationTime)throw Error('Replica set required');await state.updateOne({_id:'events-v1'},{$setOnInsert:{startAt:h.operationTime}},{upsert:true});cp=await state.findOne({_id:'events-v1'});}
 if(!cp.token){for await(const p of Property.find({'addedBy.role':{$in:['Seller','seller']}}).select('addedBy').lean().cursor()){const id=await owner(p);if(id)await state.updateOne({_id:`property:${p._id}`},{$set:{sellerId:id}},{upsert:true});}}
 stream=db.watch([{$match:{'ns.coll':{$in:[...map.keys()]},operationType:{$in:['insert','update','delete']}}}],{fullDocument:'updateLookup',...(cp.token?{resumeAfter:cp.token}:{startAtOperationTime:cp.startAt})});
 for await(const c of stream){const model=map.get(c.ns.coll),d=c.fullDocument,key=hash(c._id);if(d){
 let id=model==='Seller'?d._id:model==='NewProperty'?await owner(d):model==='SellerBoostRequest'?d.sellerId:model==='Lead'?await propertyOwner(d.property?.propertyMongoId):await propertyOwner(d.propertyMongoId||d.propertyId);
 for(const e of sellerEvents(model,d,c))await publish(id,e,model,d,`seller-event:${key}:${e.type}`);
 if(model==='NewProperty'&&id)await state.updateOne({_id:`property:${d._id}`},{$set:{sellerId:id}},{upsert:true});
 if(model==='Partner'&&c.operationType==='update'&&(c.updateDescription?.updatedFields?.isBlocked===true||c.updateDescription?.updatedFields?.isDeleted===true||c.updateDescription?.updatedFields?.applicationStatus==='Suspended')){for await(const p of Property.find({'assignedPartner.partnerId':d._id}).lean().cursor())await publish(await owner(p),{type:'ASSIGNED_PARTNER_INACTIVE',title:'Assigned partner unavailable',message:'Your assigned partner is no longer active.'},'NewProperty',p,`seller-event:${key}:${p._id}`);}
 }else if(model==='NewProperty'&&c.operationType==='delete'){const p=await state.findOne({_id:`property:${c.documentKey._id}`});if(p)await publish(p.sellerId,{type:'PROPERTY_REMOVED',title:'Property removed',message:'Your property listing was removed.'},model,c.documentKey,`seller-event:${key}:removed`);}
 await state.updateOne({_id:'events-v1'},{$set:{token:c._id}});}
 }catch(e){console.error('Seller event worker:',e.message);await new Promise(r=>setTimeout(r,5000));}finally{if(stream)await stream.close().catch(()=>{});}}
}
let busy=false,lastSummary=0;
export function startSellerReminders(){const scan=async()=>{if(busy)return;busy=true;try{const now=new Date(), state=mongoose.connection.db.collection('seller_event_checkpoints');await state.updateOne({_id:'reminders-start'},{$setOnInsert:{since:now}},{upsert:true});const {since}=await state.findOne({_id:'reminders-start'});
 for await(const p of Promotion.find({targetType:'PROPERTY',status:{$in:['Approved','Expired']},expiresAt:{$gte:since,$lte:new Date(+now+3*86400000)}}).lean().cursor()){const ms=+new Date(p.expiresAt)-+now;const label=ms<=0?'EXPIRED':ms<=86400000?'1_DAY':'3_DAYS';if(p.status==='Expired'&&ms>0)continue;await publish(await propertyOwner(p.propertyMongoId),{type:'PROMOTION_'+label,title:ms<=0?'Promotion expired':'Promotion expiring soon',message:ms<=0?'Your property promotion has expired.':`Your property promotion expires on ${new Date(p.expiresAt).toISOString()}.`},'PromotionRequest',p,`seller-promotion-reminder:${p._id}:${+new Date(p.expiresAt)}:${label}`);}
 for await(const v of Visit.find({approvalStatus:'Approved',status:{$in:['Upcoming','Rescheduled']},approvedVisitAt:{$gt:now,$lte:new Date(+now+86400000)}}).lean().cursor()){const label=+new Date(v.approvedVisitAt)-+now<=3600000?'1_HOUR':'24_HOURS';await publish(await propertyOwner(v.propertyId),{type:'VISIT_REMINDER_'+label,title:'Upcoming property visit',message:`Your property visit is scheduled for ${new Date(v.approvedVisitAt).toISOString()}.`},'Visit',v,`seller-visit-reminder:${v._id}:${+new Date(v.approvedVisitAt)}:${label}`);}
 if(Date.now()-lastSummary<3600000)return;
 const day=86400000, week=Math.floor((+now+3*day)/ (7*day));
 for await(const p of Property.find({status:'Live','addedBy.role':{$in:['Seller','seller']}}).select('addedBy createdAt').lean().cursor()){
 const id=await owner(p);if(!id)continue;
 const [enquiries,visits,recent]=await Promise.all([Lead.countDocuments({'property.propertyMongoId':p._id,createdAt:{$gte:new Date(+now-7*day)}}),Visit.countDocuments({propertyId:p._id,createdAt:{$gte:new Date(+now-7*day)}}),Lead.exists({'property.propertyMongoId':p._id,createdAt:{$gte:new Date(+now-15*day)}})]);
 await publish(id,{type:'PROPERTY_WEEKLY_SUMMARY',title:'Weekly property summary',message:`Last 7 days: ${enquiries} enquiries and ${visits} visit requests.`},'NewProperty',p,`seller-weekly:${p._id}:${week}`);
 if(!recent&&+new Date(p.createdAt)<=+now-15*day)await publish(id,{type:'PROPERTY_NO_ENQUIRY',title:'No recent property enquiries',message:'Your property has received no enquiries in the last 15 days.'},'NewProperty',p,`seller-no-enquiry:${p._id}:${week}`);
 }
 lastSummary=Date.now();
 }catch(e){console.error('Seller reminders:',e.message);}finally{busy=false;}};scan();setInterval(scan,60000).unref();}
