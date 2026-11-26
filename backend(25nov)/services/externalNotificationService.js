import nodemailer from 'nodemailer';
import { fileURLToPath } from 'node:url';
import Delivery from '../models/NotificationDelivery.js';
import Partner from '../models/Partner.js';
const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const logo = fileURLToPath(new URL('../assets/notification-logo.png',import.meta.url));
const whatsappSupportUrl = 'https://api.whatsapp.com/send/?phone=917988537478&text&type=phone_number&app_absent=0';
const adminEmail = () => process.env.ADMIN_NOTIFICATION_EMAIL || 'diginiwas@gmail.com';
async function enqueue(key,channel,payload){ await Delivery.updateOne({key},{$setOnInsert:{key,channel,payload}},{upsert:true}); }
export async function queueExternalNotification(n){
 const key=String(n._id);
 if(n.userRole==='admin') { await enqueue(`${n.eventKey || key}:admin-email`,'email',{to:adminEmail(),title:n.title,lines:[n.message],admin:true}); return; }
 if(n.userRole!=='partner'||!['PARTNER_REJECTED','PROMOTION_REJECTED'].includes(n.type)) return;
 const p=await Partner.findById(n.userId).select('name email partnerId').lean(); if(!p) return;
 const d=n.data||{}; const kind=n.type==='PARTNER_REJECTED'?'account':d.targetType==='PARTNER'?'boost':'property';
 const label={account:'Partner account application',boost:'Partner profile boost',property:'Property promotion'}[kind];
 const reason=String(d.reason||n.message); const ref=String(d.requestId||p.partnerId||n.entityId); const plan=String(d.planName||'Not applicable');
 const refund=kind==='account'?'Not applicable':`${Number(d.refundedCredits||0)} credits`;
 const lines=[`Dear ${p.name},`,`Your ${label} request has been reviewed and could not be approved at this time.`,`Request ID: ${ref}`,`Status: Rejected`,...(kind==='property'?[`Property: ${d.propertyCode||''} ${d.propertyTitle||''}`]:[]),...(kind==='account'?[]:[`Plan: ${plan}`,`Credits refunded: ${refund}`]),`Reason: ${reason}`,'Please review the feedback and contact support if you need assistance.','Warm regards, Team DigiNiwas'];
 if(p.email) await enqueue(`${key}:email`,'email',{to:p.email,title:`${label} — Rejected`,lines});
}
async function send(job){
 const p=job.payload;
 if(job.channel==='email'){
  if(!process.env.SMTP_HOST||!process.env.SMTP_USER||!process.env.SMTP_PASS) throw new Error('SMTP configuration missing');
  const transport=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:process.env.SMTP_SECURE==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},connectionTimeout:10000,socketTimeout:15000});
  await transport.sendMail({from:process.env.MAIL_FROM||process.env.SMTP_USER,to:p.to,subject:`DigiNiwas | ${p.title}`,text:p.lines.join('\n')+'\n\nContact us on WhatsApp: '+whatsappSupportUrl,html:`<div style="background:#f2f7f5;padding:24px;font-family:Arial;color:#173b35"><div style="max-width:620px;margin:auto;background:white;border:1px solid #dce8e4"><div style="background:#0d302c;padding:24px;text-align:center;color:white"><img src="cid:diginiwas-logo" width="150" alt="DigiNiwas"><h2>DigiNiwas ${p.admin?'Admin':''}</h2></div><div style="padding:28px"><h2>${esc(p.title)}</h2>${p.lines.map(l=>`<p style="line-height:1.6">${esc(l)}</p>`).join('')}<p>Support: <a href="mailto:diginiwas@gmail.com">diginiwas@gmail.com</a></p><p style="margin:24px 0"><a href="${esc(whatsappSupportUrl)}" style="display:inline-block;background:#128c4a;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:6px">Contact Us on WhatsApp</a></p><p style="font-size:13px;color:#52645e">Chat with our support team on +91 7988537478.</p></div><div style="padding:16px;text-align:center;background:#e6f0ec">Automated notification · Team DigiNiwas</div></div></div>`,attachments:[{filename:'logo.png',path:logo,cid:'diginiwas-logo'}]});
 }else{
  throw new Error('Unsupported notification channel');
 }
}
let busy=false;
export async function processNotificationDeliveries(){ if(busy)return; busy=true; try{for(let i=0;i<20;i++){
 const job=await Delivery.findOneAndUpdate({status:{$in:['Pending','Retry']},nextAt:{$lte:new Date()},channel:'email'},{$set:{status:'Sending'},$inc:{attempts:1}},{new:true,sort:{nextAt:1}}); if(!job)break;
 try{await send(job);await Delivery.updateOne({_id:job._id},{$set:{status:'Sent',lastError:''}});}catch(e){await Delivery.updateOne({_id:job._id},{$set:{status:job.attempts>=5?'Failed':'Retry',nextAt:new Date(Date.now()+60000*2**job.attempts),lastError:String(e.response?.status||e.code||e.message).slice(0,200)}});}
 }}catch(e){console.error('Notification worker error',e.code||e.name);}finally{busy=false;}}
export function startNotificationWorker(){const timer=setInterval(processNotificationDeliveries,15000);timer.unref();}
