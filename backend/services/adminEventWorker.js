import '../models/Buyer.js';
import '../models/Seller.js';
import '../models/NewProperty.js';
import '../models/ResidentialSaleProperty.js';
import '../models/CommercialSaleProperty.js';
import '../models/RentalProperty.js';
import '../models/CommercialRentalProperty.js';
import '../models/PromotionRequest.js';
import '../models/CreditPurchaseOrder.js';
import '../models/CreditTransaction.js';
import '../models/LeadRefundRequest.js';
import '../models/Visit.js';
import mongoose from 'mongoose';
import {createHash} from 'node:crypto';
import {adminEvents} from './adminEventRules.js';
import User from '../models/User.js';
import {notifyMany} from './notificationService.js';
import {queueExternalNotification} from './externalNotificationService.js';
import Partner from '../models/Partner.js';
import TeamWallet from '../models/TeamWallet.js';
import '../models/SupportQuery.js';
const names=['Buyer','Seller','Partner','NewProperty','ResidentialSaleProperty','CommercialSaleProperty','RentalProperty','CommercialRentalProperty','PromotionRequest','CreditPurchaseOrder','CreditTransaction','LeadRefundRequest','Visit','SupportQuery'];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function publish(event,key,id,model){
 const admins=await User.find({role:'admin',isActive:{$ne:false}}).select('_id').lean();
 if(!admins.length)return;
 const rows=await notifyMany(admins.map(a=>({userId:a._id,userRole:'admin'})),{...event,eventKey:key,entityId:id,entityType:model});
 if(rows.some(r=>!r))throw new Error('Admin notification persistence failed');
 // Retry queue creation even when the in-app record already existed.
 await queueExternalNotification(rows[0]);
}
export async function startAdminEventWorker(){
 const db=mongoose.connection.db;const checkpoints=db.collection('admin_event_checkpoints');
 const map=new Map(names.map(n=>[mongoose.model(n).collection.name,n]));
 while(true){let stream;try{
 let checkpoint=await checkpoints.findOne({_id:'admin-events-v1'});
 if(!checkpoint){const hello=await db.admin().command({hello:1});if(!hello.operationTime)throw new Error('MongoDB replica set or sharded cluster required');await checkpoints.updateOne({_id:'admin-events-v1'},{$setOnInsert:{startAt:hello.operationTime}},{upsert:true});checkpoint=await checkpoints.findOne({_id:'admin-events-v1'});}
 stream=db.watch([{$match:{'ns.coll':{$in:[...map.keys()]},operationType:{$in:['insert','update']}}}],{fullDocument:'updateLookup',...(checkpoint?.token?{resumeAfter:checkpoint.token}:{startAtOperationTime:checkpoint.startAt}),maxAwaitTimeMS:1000});
 for await(const c of stream){const d=c.fullDocument;if(d){const model=map.get(c.ns.coll);const events=adminEvents(model,d,c);
 if(model==='CreditTransaction'&&events.some(e=>e.type==='CREDIT_DEDUCTION')){
 const team=d.walletType==='TEAM_SHARED';const wallet=team?await TeamWallet.findOne({ownerPartnerId:d.walletOwnerPartnerId}).lean():await Partner.findById(d.walletOwnerPartnerId).select('creditWallet').lean();
 const threshold=team?(wallet?.lowBalanceThreshold??500):(wallet?.creditWallet?.lowBalanceThreshold??100);
 if(d.balanceBefore>=threshold&&d.balanceAfter<threshold)events.push({type:'CREDIT_LOW_BALANCE',title:'Low credit balance',message:`Wallet ${d.walletOwnerPartnerId}: ${d.balanceAfter} credits remaining (threshold ${threshold}).`,actionUrl:'/wallet-credits'});
 }
 const hash=createHash('sha256').update(JSON.stringify(c._id)).digest('hex');
 for(const e of events)await publish(e,e.type.endsWith('_EXPIRED')?`promotion-expiry:${d._id}`:`admin-event:${hash}:${e.type}`,d._id,model);
 }await checkpoints.updateOne({_id:'admin-events-v1'},{$set:{token:c._id}},{upsert:true});}
 }catch(e){console.error('Admin event worker:',e.message);await sleep(5000);}finally{if(stream)await stream.close().catch(()=>{});}}
}

// Time-based expiry alerts, without changing the existing promotion lifecycle.
let expiryBusy=false;
export function startPromotionExpiryAlerts(){
 const scan=async()=>{if(expiryBusy)return;expiryBusy=true;try{
 const db=mongoose.connection.db;const state=db.collection('admin_event_checkpoints');
 await state.updateOne({_id:'expiry-start'},{$setOnInsert:{since:new Date()}},{upsert:true});
 const {since}=await state.findOne({_id:'expiry-start'});
 const cursor=mongoose.model('PromotionRequest').find({status:'Approved',expiresAt:{$gte:since,$lte:new Date()}}).lean().cursor();
 for await(const d of cursor){const boost=d.targetType==='PARTNER';await publish({type:boost?'PROFILE_BOOST_EXPIRED':'PROPERTY_PROMOTION_EXPIRED',title:boost?'Partner profile boost expired':'Property promotion expired',message:`Promotion ${d.requestId||d._id} reached its expiry date.`,actionUrl:'/credits'},`promotion-expiry:${d._id}`,d._id,'PromotionRequest');}
 }catch(e){console.error('Promotion expiry alert:',e.message);}finally{expiryBusy=false;}};scan();const timer=setInterval(scan,60000);timer.unref();
}
