// Only committed database changes are consumed by the admin event worker.
export function adminEvents(model, d, change) {
 const fresh=change.operationType==='insert';
 const fields=change.updateDescription?.updatedFields||{};
 const changed=p=>fresh||Object.keys(fields).some(k=>k===p||k.startsWith(p+'.'));
 const value=p=>Object.hasOwn(fields,p)?fields[p]:p.split('.').reduce((o,k)=>o?.[k],d);
 const out=[]; const ref=d.buyerId||d.sellerId||d.partnerId||d.propertyId||d.requestId||d.visitId||d.transactionId||d.orderId||d._id;
 const add=(type,title,route,detail='')=>out.push({type,title,actionUrl:route,message:`${title}. Reference: ${ref}.${detail?' '+detail:''}`});
 const status=(p,allowed,fn)=>{const v=value(p);if(changed(p)&&allowed.includes(v))fn(v);};
 switch(model){
 case 'Buyer': if(fresh)add('BUYER_REGISTERED','New buyer registration','/buyer-dashboard');break;
 case 'Seller': if(fresh)add('SELLER_REGISTERED','New seller registration','/seller-dashboard');break;
 case 'Partner':
 if(fresh&&d.isSubPartner)add('TEAM_PARTNER_REGISTERED','New sub-partner registration','/partners');
 if(changed('identityDocuments')&&d.identityDocuments?.length)add('PARTNER_KYC','Partner KYC documents submitted or updated','/partner-applications');
 if(!fresh){status('applicationStatus',['Approved_Not_Verified','Rejected'],v=>add('PARTNER_APPLICATION_'+(v==='Rejected'?'REJECTED':'APPROVED'),`Partner application ${v==='Rejected'?'rejected':'approved'}`,'/partner-applications'));}
 break;
 case 'ResidentialSaleProperty': case 'CommercialSaleProperty': case 'RentalProperty': case 'CommercialRentalProperty': case 'NewProperty':
 status('status',['Submitted','Assigned_To_Partner','Reviewing','Verified','Rejected','Live','Sold','Rented'],v=>{const labels={Submitted:'New property submitted',Assigned_To_Partner:'Property verification request',Reviewing:'Property verification request',Verified:'Property approved / verified',Rejected:'Property rejected',Live:'Property live',Sold:'Property sold',Rented:'Property rented'};add('PROPERTY_'+v.toUpperCase(),labels[v],'/property-management');});
 if(!fresh&&changed('isActive')&&value('isActive')===false)add('PROPERTY_INACTIVE','Property inactive','/property-management');break;
 case 'PromotionRequest': if(!fresh)status('status',['Approved','Rejected','Expired'],v=>{const boost=d.targetType==='PARTNER';add((boost?'PROFILE_BOOST_':'PROPERTY_PROMOTION_')+v.toUpperCase(),`${boost?'Partner profile boost':'Property promotion'} ${v.toLowerCase()}`,'/credits',d.planSnapshot?.name?`Plan: ${d.planSnapshot.name}.`:'');});break;
 case 'CreditPurchaseOrder': status('status',['FAILED'],()=>add('PAYMENT_FAILED','Credit payment failed','/wallet-credits'));break;
 case 'CreditTransaction':
 if((fresh||changed('status'))&&value('status')==='SUCCESS'){
 if(d.type==='PURCHASE')add('CREDIT_PURCHASE','New credit purchase','/wallet-credits',`Credits: ${d.credits}.`);
 else if(d.type==='REFUND'||d.direction==='DEBIT')add(d.type==='REFUND'?'CREDIT_REFUND':'CREDIT_DEDUCTION',d.type==='REFUND'?'Credit refund':'Credit deduction','/wallet-credits',`Credits: ${d.credits}. Balance: ${d.balanceAfter}.`);
 }break;
 case 'LeadRefundRequest': if(!fresh)status('status',['Approved','Rejected'],v=>add('LEAD_REFUND_'+v.toUpperCase(),`Lead refund ${v.toLowerCase()}`,'/lead-management'));break;
 case 'Visit': if(!fresh){status('approvalStatus',['Approved','Rejected'],v=>add('VISIT_'+v.toUpperCase(),`Visit ${v.toLowerCase()}`,'/visit-management'));status('status',['Cancelled','Completed'],v=>add('VISIT_'+v.toUpperCase(),`Visit ${v.toLowerCase()}`,'/visit-management'));}break;
 case 'SupportQuery': if(fresh)add('SUPPORT_QUERY','New support query','/notifications',`Subject: ${d.subject}. Message: ${d.message}`);break;
 }
 return out;
}
