import mongoose from 'mongoose';
import {createHash} from 'node:crypto';
import Partner from '../models/Partner.js';
import Property from '../models/NewProperty.js';
import Lead from '../models/Lead.js';
import Visit from '../models/Visit.js';
import Promotion from '../models/PromotionRequest.js';
import CreditTransaction from '../models/CreditTransaction.js';
import CreditPurchaseOrder from '../models/CreditPurchaseOrder.js';
import LeadRefundRequest from '../models/LeadRefundRequest.js';
import SellerBoostRequest from '../models/SellerBoostRequest.js';
import TeamWallet from '../models/TeamWallet.js';
import {notifyUser} from './notificationService.js';
import {partnerEvents} from './partnerEventRules.js';
const models=[Partner,Property,Lead,Visit,Promotion,CreditTransaction,CreditPurchaseOrder,LeadRefundRequest,SellerBoostRequest];
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const snapshot=(m,d)=>({assigned:m==='Lead'?(d.assignedPartner?.partnerMongoId??null):(d.assignedPartner?.partnerId??null),delegated:m==='Lead'?(d.assignedSubPartner?.subPartnerMongoId??null):(d.delegatedSubPartner?.subPartnerId??null),parent:d.parentPartnerId??null,creator:['Partner','Owner','Agent'].includes(d.addedBy?.role)?d.addedBy.userId:null});
async function publish(e,m,d,key){if(!mongoose.isValidObjectId(e.userId))return;const n=await notifyUser({...e,userRole:'partner',entityType:m,entityId:d._id,eventKey:key,data:{entityId:String(d._id),propertyId:String(d.propertyMongoId||d.propertyId||d.property?.propertyMongoId||(m==='NewProperty'?d._id:''))}});if(!n)throw Error('Partner notification persistence failed');}
export async function startPartnerEventWorker(){const db=mongoose.connection.db,state=db.collection('partner_event_checkpoints'),map=new Map(models.map(m=>[m.collection.name,m.modelName]));while(true){let stream;try{
 let cp=await state.findOne({_id:'events-v1'});if(!cp){const h=await db.admin().command({hello:1});if(!h.operationTime)throw Error('Replica set required');await state.updateOne({_id:'events-v1'},{$setOnInsert:{startAt:h.operationTime}},{upsert:true});cp=await state.findOne({_id:'events-v1'});}
 if(!cp.token){for(const M of [Partner,Property,Lead])for await(const d of M.find().select('assignedPartner.partnerId assignedPartner.partnerMongoId delegatedSubPartner.subPartnerId assignedSubPartner.subPartnerMongoId parentPartnerId addedBy.role addedBy.userId').lean().cursor())await state.updateOne({_id:`${M.modelName}:${d._id}`},{$set:snapshot(M.modelName,d)},{upsert:true});}
 stream=db.watch([{$match:{'ns.coll':{$in:[...map.keys()]},operationType:{$in:['insert','update','replace','delete']}}}],{fullDocument:'updateLookup',...(cp.token?{resumeAfter:cp.token}:{startAtOperationTime:cp.startAt})});
 for await(const c of stream){const m=map.get(c.ns.coll),d=c.fullDocument,id=c.documentKey._id,k=hash(c._id),cache=`${m}:${id}`,prev=await state.findOne({_id:cache})||{};
 if(d){for(const e of partnerEvents(m,d,c,prev))await publish(e,m,d,`partner-event:${k}:${e.type}`);
 if(m==='CreditTransaction'&&d.status==='SUCCESS'&&d.direction==='DEBIT'&&(c.operationType==='insert'||c.updateDescription?.updatedFields?.status==='SUCCESS')){const owner=await Partner.findById(d.walletOwnerPartnerId).select('creditWallet.lowBalanceThreshold').lean();const team=d.walletType==='TEAM_SHARED'?await TeamWallet.findOne({ownerPartnerId:d.walletOwnerPartnerId}).select('lowBalanceThreshold').lean():null;const threshold=team?.lowBalanceThreshold??owner?.creditWallet?.lowBalanceThreshold??(d.walletType==='TEAM_SHARED'?500:100);if(d.balanceBefore>threshold&&d.balanceAfter<=threshold)await publish({userId:d.walletOwnerPartnerId,type:'LOW_CREDIT_BALANCE',title:'Low credit balance',message:"Your credit balance is low. Kindly add credits to continue using services without interruption."},m,d,`partner-event:${k}:low`);}
 if(['Partner','NewProperty','Lead'].includes(m))await state.updateOne({_id:cache},{$set:snapshot(m,d)},{upsert:true});
 }else if(c.operationType==='delete'&&m==='NewProperty'){for(const userId of new Set([prev.assigned,prev.delegated,prev.creator].filter(Boolean).map(String)))await publish({userId,type:'PROPERTY_REMOVED',title:'Property removed',message:'A property listing was removed.'},m,{_id:id},`partner-event:${k}:removed`);}
 await state.updateOne({_id:'events-v1'},{$set:{token:c._id}});}
 }catch(e){console.error('Partner event worker:',e.message);await new Promise(r=>setTimeout(r,5000));}finally{if(stream)await stream.close().catch(()=>{});}}}
let busy=false;
export function startPartnerReminders(){const scan=async()=>{if(busy)return;busy=true;try{const now=new Date(),day=86400000,state=mongoose.connection.db.collection('partner_event_checkpoints');await state.updateOne({_id:'reminders-start'},{$setOnInsert:{since:now}},{upsert:true});const {since}=await state.findOne({_id:'reminders-start'});
 for await(const p of Promotion.find({status:{$in:['Approved','Expired']},expiresAt:{$gte:since,$lte:new Date(+now+3*day)}}).lean().cursor()){const ms=+new Date(p.expiresAt)-+now;if(p.status==='Expired'&&ms>0)continue;const label=ms<=0?'EXPIRED':ms<=day?'1_DAY':'3_DAYS';await publish({userId:p.partnerMongoId,type:'PARTNER_PROMOTION_'+label,title:ms<=0?'Promotion expired':'Promotion expiring soon',message:`${p.targetType==='PARTNER'?'Profile boost':'Property promotion'} ${ms<=0?'expired':'expires'} on ${new Date(p.expiresAt).toISOString()}.`},'PromotionRequest',p,`partner-promotion:${p._id}:${+new Date(p.expiresAt)}:${label}`);}
 for await(const v of Visit.find({approvalStatus:'Approved',status:{$in:['Upcoming','Rescheduled']},approvedVisitAt:{$gt:now,$lte:new Date(+now+day)}}).lean().cursor()){const label=+new Date(v.approvedVisitAt)-+now<=3600000?'1_HOUR':'24_HOURS';for(const userId of new Set([v.partnerId,v.teamOwnerId].filter(Boolean).map(String)))await publish({userId,type:'VISIT_REMINDER_'+label,title:'Upcoming property visit',message:`Visit scheduled for ${new Date(v.approvedVisitAt).toISOString()}.`},'Visit',v,`partner-visit:${v._id}:${+new Date(v.approvedVisitAt)}:${label}`);}
 }catch(e){console.error('Partner reminders:',e.message);}finally{busy=false;}};scan();setInterval(scan,60000).unref();}
