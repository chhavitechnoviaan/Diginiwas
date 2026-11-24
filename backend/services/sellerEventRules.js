// Rules consume committed changes only; never expose buyer contact details or credentials.
export function sellerEvents(model,d,c){
 const fresh=c.operationType==='insert', f=c.updateDescription?.updatedFields||{}, removed=c.updateDescription?.removedFields||[];
 const changed=p=>Object.keys(f).some(k=>k===p||k.startsWith(p+'.')||p.startsWith(k+'.'))||removed.some(k=>k===p||p.startsWith(k+'.'));
 const val=p=>Object.hasOwn(f,p)?f[p]:p.split('.').reduce((a,k)=>a?.[k],d);
 const out=[];const add=(type,title,message=title)=>out.push({type,title,message});
 const status=(p,map,initial=false)=>{if((fresh?initial:changed(p))&&map[val(p)]){const [t,m]=map[val(p)];add(t,m, m+(val(p)==='Rejected'||val(p)==='REJECTED'?`: ${d.adminRemarks||d.review?.rejectionReason||'Contact support for details.'}`:''));}};
 if(model==='Seller'){
 if(fresh)add('SELLER_REGISTERED','Registration successful','Your DigiNiwas seller account has been created.');
 for(const [p,t] of [['emailVerification.isVerified','EMAIL'],['phoneVerification.isVerified','PHONE']])if(!fresh&&changed(p)&&val(p)===true)add(t+'_VERIFIED',t==='EMAIL'?'Email verified':'Mobile verified');
 status('applicationStatus',Object.fromEntries(['SUBMITTED','UNDER_REVIEW','ACTION_REQUIRED','APPROVED','REJECTED','WITHDRAWN'].map(s=>[s,['SELLER_APPLICATION_'+s,'Seller application '+s.toLowerCase().replaceAll('_',' ')]])));
 status('accountStatus',{ACTIVE:['SELLER_ACCOUNT_ACTIVE','Seller account activated'],SUSPENDED:['SELLER_ACCOUNT_SUSPENDED','Seller account suspended'],BLOCKED:['SELLER_ACCOUNT_BLOCKED','Seller account blocked']});
 if(!fresh&&(changed('lastPasswordChangedAt')||changed('password')))add('SELLER_PASSWORD_UPDATED','Password updated','Your account password was updated. Contact support if this was not you.');
 if(!fresh&&['name','email','phone','location'].some(changed))add('SELLER_PROFILE_UPDATED','Profile updated');
 }
 if(model==='NewProperty'){
 status('status',Object.fromEntries(['Submitted','Assigned_To_Partner','Reviewing','Verified','Rejected','Live','Sold','Rented'].map(s=>[s,['PROPERTY_'+s.toUpperCase(),'Property '+s.replaceAll('_',' ').toLowerCase()]])),true);
 status('propertyVerificationStatus',{In_Progress:['PROPERTY_VERIFICATION_STARTED','Property verification started'],Verified:['PROPERTY_VERIFICATION_COMPLETED','Property verification completed'],Rejected:['PROPERTY_VERIFICATION_FAILED','Property verification failed']});
 if(!fresh&&changed('assignedPartner.partnerId'))add('PROPERTY_PARTNER_CHANGED',val('assignedPartner.partnerId')?'Property partner assigned or changed':'Property partner removed');
 if(!fresh&&changed('isActive'))add(val('isActive')?'PROPERTY_REACTIVATED':'PROPERTY_INACTIVE',val('isActive')?'Property reactivated':'Property inactive');
 if(!fresh&&changed('price'))add('PROPERTY_PRICE_CHANGED','Property price updated');
 if(!fresh&&['title','description','location','images','media'].some(changed))add('PROPERTY_DETAILS_UPDATED','Property details updated');
 if(!fresh&&changed('review.rejectionReason')&&d.review?.rejectionReason)add('PROPERTY_CORRECTION_REQUIRED','Property correction required',d.review.rejectionReason);
 }
 if(model==='SellerBoostRequest'&&fresh)add('SELLER_BOOST_SUBMITTED','Promotion request submitted','Your assigned partner will review your promotion request.');
 if(model==='PromotionRequest'&&d.targetType==='PROPERTY')status('status',{Cancelled:['PROMOTION_CANCELLED','Property promotion cancelled']});
 if(model==='Lead'){
 if(fresh)add('PROPERTY_ENQUIRY_RECEIVED','New property enquiry','A new enquiry was received for your property.');
 else status('status',Object.fromEntries(['Lead_Verified','Lead_Reviewing','Lead_Viewed','Lead_Assigned','Lead_Rejected','Lead_Closed','Successfully_Converted'].map(s=>[s,['SELLER_'+s.toUpperCase(),s.replaceAll('_',' ')]])));
 }
 if(model==='Visit'){
 if(fresh)add('PROPERTY_VISIT_REQUESTED','New property visit requested');
 status('approvalStatus',{Approved:['PROPERTY_VISIT_APPROVED','Property visit approved'],Rejected:['PROPERTY_VISIT_REJECTED','Property visit rejected']});
 status('status',Object.fromEntries(['Upcoming','Rescheduled','Cancelled','Completed','No Show'].map(s=>[s,['PROPERTY_VISIT_'+s.toUpperCase().replaceAll(' ','_'),'Property visit '+(s==='Upcoming'?'scheduled':s.toLowerCase())]])));
 }
 return out;
}
