import mongoose from 'mongoose';
import {createHash} from 'node:crypto';
import Buyer from '../models/Buyer.js';
import Lead from '../models/Lead.js';
import Visit from '../models/Visit.js';
import Property from '../models/NewProperty.js';
import SavedProperty from '../models/SavedProperty.js';
import SupportQuery from '../models/SupportQuery.js';
import {notifyUser} from './notificationService.js';
import {buyerEvents} from './buyerEventRules.js';
const models=[Buyer,Lead,Visit,Property,SupportQuery];
async function publish(id,e,model,d,key){if(!mongoose.isValidObjectId(id))return;const n=await notifyUser({...e,userId:id,userRole:'buyer',entityType:model,entityId:d._id,eventKey:key});if(!n)throw Error('Buyer notification persistence failed');}
export async function startBuyerEventWorker(){
 const db=mongoose.connection.db,state=db.collection('buyer_event_checkpoints'),map=new Map(models.map(m=>[m.collection.name,m.modelName]));
 while(true){let stream;try{
 let cp=await state.findOne({_id:'events-v1'});if(!cp){const h=await db.admin().command({hello:1});if(!h.operationTime)throw Error('Replica set required');await state.updateOne({_id:'events-v1'},{$setOnInsert:{startAt:h.operationTime}},{upsert:true});cp=await state.findOne({_id:'events-v1'});}
 stream=db.watch([{$match:{'ns.coll':{$in:[...map.keys()]},operationType:{$in:['insert','update','delete']}}}],{fullDocument:'updateLookup',...(cp.token?{resumeAfter:cp.token}:{startAtOperationTime:cp.startAt})});
 for await(const c of stream){const model=map.get(c.ns.coll),d=c.fullDocument,key=createHash('sha256').update(JSON.stringify(c._id)).digest('hex');
 if(model==='NewProperty'){
 const p=d||c.documentKey;const events=d?buyerEvents(model,d,c):c.operationType==='delete'?[{type:'SAVED_PROPERTY_REMOVED',title:'Saved property unavailable',message:'A saved property has been removed.'}]:[];
 if(events.length)for await(const s of SavedProperty.find({propertyId:p._id}).select('buyerId').lean().cursor())for(const e of events)await publish(s.buyerId,e,model,p,`buyer-event:${key}:${e.type}`);
 }else if(d){const id=model==='Buyer'?d._id:model==='Lead'?d.buyer?.buyerMongoId:model==='SupportQuery'?(String(d.userRole).toLowerCase()==='buyer'?d.userId:null):d.buyerId;
 for(const e of buyerEvents(model,d,c))await publish(id,e,model,d,`buyer-event:${key}:${e.type}`);}
 await state.updateOne({_id:'events-v1'},{$set:{token:c._id}});}
 }catch(e){console.error('Buyer event worker:',e.message);await new Promise(r=>setTimeout(r,5000));}finally{if(stream)await stream.close().catch(()=>{});}}
}
let busy=false;
export function startBuyerReminders(){const scan=async()=>{if(busy)return;busy=true;try{const now=new Date();for(const [field,filter,prefix] of [['approvedVisitAt',{approvalStatus:'Approved',status:{$in:['Upcoming','Rescheduled']}},'VISIT'],['followUpAt',{status:'Follow-up'},'FOLLOWUP']]){
 for await(const v of Visit.find({...filter,[field]:{$gt:now,$lte:new Date(+now+86400000)}}).lean().cursor()){
 const when=new Date(v[field]),label=+when-+now<=3600000?'1_HOUR':'24_HOURS';await publish(v.buyerId,{type:`BUYER_${prefix}_REMINDER_${label}`,title:prefix==='VISIT'?'Upcoming property visit':'Upcoming follow-up',message:`Scheduled for ${when.toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}.`},'Visit',v,`buyer-reminder:${prefix}:${v._id}:${+when}:${label}`);}
 }}catch(e){console.error('Buyer reminders:',e.message);}finally{busy=false;}};scan();setInterval(scan,60000).unref();}
