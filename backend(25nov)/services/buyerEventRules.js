// Only buyer-facing information; never include lead contact data or wallet details.
export function buyerEvents(model,d,c){
 const fresh=c.operationType==='insert', f=c.updateDescription?.updatedFields||{}, removed=c.updateDescription?.removedFields||[];
 const changed=p=>Object.keys(f).some(k=>k===p||k.startsWith(p+'.')||p.startsWith(k+'.'))||removed.includes(p);
 const out=[]; const add=(type,title,message=title)=>out.push({type,title,message});
 if(model==='Buyer'){
 if(fresh)add('BUYER_WELCOME','Welcome to DigiNiwas','Your buyer account has been created.');
 else {if(changed('isPhoneVerified')&&d.isPhoneVerified)add('BUYER_PHONE_VERIFIED','Mobile verified');
 if(changed('password'))add('BUYER_PASSWORD_UPDATED','Password updated','Your password was updated. Contact support if this was not you.');
 if(changed('phone'))add('BUYER_PHONE_CHANGED','Mobile number updated');
 if(changed('email'))add('BUYER_EMAIL_CHANGED','Email address updated');
 if(['name','avatar','location'].some(changed))add('BUYER_PROFILE_UPDATED','Profile updated');
 if(changed('status'))add('BUYER_ACCOUNT_STATUS','Account status updated',`Your account status is ${d.status}.`);}
 }
 if(model==='Lead'){
 if(fresh)add('BUYER_ENQUIRY_SUBMITTED','Enquiry submitted','Your property enquiry has been received.');
 else {const statuses={Lead_Verified:'Enquiry verified',Lead_Reviewing:'Enquiry under review',Lead_Rejected:'Enquiry rejected',Lead_Closed:'Enquiry closed',Successfully_Converted:'Enquiry converted'};
 if(changed('status')&&statuses[d.status])add('BUYER_ENQUIRY_'+d.status.toUpperCase(),statuses[d.status]);
 if(changed('assignedPartner.partnerMongoId')&&d.assignedPartner?.partnerMongoId)add('BUYER_ENQUIRY_PARTNER','Enquiry partner updated','A partner has been assigned to your enquiry.');
 if(changed('assignedSubPartner.subPartnerMongoId')&&d.assignedSubPartner?.subPartnerMongoId)add('BUYER_ENQUIRY_SUBPARTNER','Enquiry representative updated');}
 }
 if(model==='Visit'){
 if(fresh)add('BUYER_VISIT_REQUESTED','Visit request submitted','Your visit request has been received and is pending review.');
 else {if(changed('teamApprovalStatus')&&d.teamApprovalStatus==='Forwarded')add('BUYER_VISIT_FORWARDED','Visit forwarded for approval');
 if(changed('status')&&d.status==='No Show')add('BUYER_VISIT_NO_SHOW','Visit marked no show');
 if((changed('followUpAt')||changed('status'))&&d.status==='Follow-up'&&d.followUpAt)add('BUYER_VISIT_FOLLOWUP','Visit follow-up scheduled',`Follow-up: ${new Date(d.followUpAt).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}.`);}
 }
 if(model==='SupportQuery'&&fresh)add('BUYER_SUPPORT_SUBMITTED','Support request received','Your support request has been submitted.');
 if(model==='NewProperty'&&!fresh){
 if(changed('price')&&d.status==='Live'&&d.isActive!==false)add('SAVED_PROPERTY_PRICE_CHANGED','Saved property price updated',`Current listed price: ₹${Number(d.price).toLocaleString('en-IN')}.`);
 if(changed('status')||changed('isActive')){const label=d.status==='Sold'?'sold':d.status==='Rented'?'rented':d.status==='Live'&&d.isActive!==false?'available':'unavailable';add('SAVED_PROPERTY_AVAILABILITY','Saved property '+label);}
 if(d.status==='Live'&&d.isActive!==false&&['images','description','title'].some(changed))add('SAVED_PROPERTY_UPDATED','Saved property details updated');
 }
 return out;
}
