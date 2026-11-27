import Partner from '../../models/Partner.js';
import TeamWallet from '../../models/TeamWallet.js';
import LowCreditSession from '../../models/LowCreditSession.js';
import {notifyUser} from '../../services/notificationService.js';
const message='Your credit balance is low. Kindly add credits to continue using services without interruption.';
export async function lowCreditStatus(req,res){try{
 const partner=await Partner.findById(req.user.id).lean();
 if(!['partner','agency_owner','team_manager','agent'].includes(String(req.user.role).toLowerCase())||!partner||!partner.isApproved||!partner.isVerified||partner.isBlocked||partner.isDeleted)return res.status(403).json({success:false,message:'Partner access required'});
 const owner=partner.accountType==='subagent'?await Partner.findById(partner.parentPartnerId).lean():partner;
 if(!owner||owner.isDeleted||owner.isBlocked)return res.status(403).json({success:false,message:'Wallet unavailable'});
 const team=owner.accountType==='team'?await TeamWallet.findOne({ownerPartnerId:owner._id}).lean():null;
 const balance=Number((team||owner.creditWallet)?.balance||0),threshold=Number(team?.lowBalanceThreshold??owner.creditWallet?.lowBalanceThreshold??(owner.accountType==='team'?500:100));
 const sessionId=String(req.body?.sessionId||req.query.sessionId||'');
 if(!/^[a-zA-Z0-9_-]{16,100}$/.test(sessionId))return res.status(400).json({success:false,message:'Valid sessionId required'});
 const now=new Date(),isLowBalance=balance<=threshold,filter={partnerId:partner._id,sessionId};
 if(!isLowBalance)await LowCreditSession.deleteOne(filter);
 let state=isLowBalance?await LowCreditSession.findOne(filter).lean():null;
 const eligible=()=>isLowBalance&&(!state||state.count<3&&(!state.lastShown||now-new Date(state.lastShown)>=1800000));
 let showPopup=eligible();
 if(req.method==='POST'&&showPopup){
  await LowCreditSession.updateOne(filter,{$setOnInsert:{count:0,expiresAt:new Date(+now+86400000)}},{upsert:true});
  state=await LowCreditSession.findOneAndUpdate({...filter,count:{$lt:3},$or:[{lastShown:null},{lastShown:{$lte:new Date(+now-1800000)}}]},{$inc:{count:1},$set:{lastShown:now}},{new:true});
  showPopup=Boolean(state);
  if(state)await notifyUser({userId:partner._id,userRole:'partner',title:'Low credit balance',message,type:'LOW_CREDIT_BALANCE',data:{balance,threshold,action:'ADD_CREDITS'},eventKey:`low-credit:${state._id}:${state.count}`});
 }
 res.set('Cache-Control','no-store');return res.json({success:true,data:{balance,threshold,isLowBalance,showPopup,message,action:'ADD_CREDITS',reminderIntervalMinutes:30,maxPopupsPerSession:3}});
}catch(e){return res.status(500).json({success:false,message:'Unable to check wallet balance'});}}
