// Rules for committed business changes. Never include buyer contacts or credential values.
export function partnerEvents(model,d,c,previous={}){
 const fresh=c.operationType==='insert', f=c.updateDescription?.updatedFields||{}, removed=c.updateDescription?.removedFields||[];
 const changed=p=>fresh||[...Object.keys(f),...removed].some(k=>k===p||k.startsWith(p+'.')||p.startsWith(k+'.'));
 const out=[]; const add=(ids,type,title,message=title)=>{for(const id of new Set(ids.filter(Boolean).map(String)))out.push({userId:id,type,title,message});};
 const status=(p,map,ids,initial=false)=>{if((fresh?initial:changed(p))&&map[d[p]])add(ids,model.toUpperCase()+'_'+String(d[p]).toUpperCase().replaceAll(' ','_'),map[d[p]]);};
 const self=[d._id], parent=[d.parentPartnerId], prop=[d.assignedPartner?.partnerId,d.delegatedSubPartner?.subPartnerId,...(['Partner','Owner','Agent'].includes(d.addedBy?.role)?[d.addedBy.userId]:[])], lead=[d.assignedPartner?.partnerMongoId,d.assignedSubPartner?.subPartnerMongoId], visit=[d.partnerId,d.teamOwnerId];
 const assignment=(path,old,current,label)=>{if(changed(path)&&String(old||'')!==String(current||'')){if(old)add([old],label+'_REMOVED',label.replaceAll('_',' ').toLowerCase()+' removed');if(current)add([current],label+'_ASSIGNED',label.replaceAll('_',' ').toLowerCase()+' assigned');}};
 if(model==='Partner'){
 if(fresh){add(self,'PARTNER_REGISTERED','Registration successful');if(d.isSubPartner)add(parent,'TEAM_MEMBER_ADDED','New team member added');}
 status('applicationStatus',{Submitted:'Application submitted',Under_Review:'Application under review',Approved_Not_Verified:'Application approved',Suspended:'Account suspended',Withdrawn:'Application withdrawn'},self,true);
 if(!fresh&&changed('applicationStatus')&&['Verified','Rejected'].includes(d.applicationStatus))add(parent,'TEAM_MEMBER_'+d.applicationStatus.toUpperCase(),'Team member application '+d.applicationStatus.toLowerCase());
 if(!fresh&&changed('identityDocuments')&&d.applicationStatus==='Submitted')add(self,'KYC_RESUBMITTED','KYC documents submitted');
 if(!fresh&&changed('isBlocked'))add([...self,...parent],d.isBlocked?'PARTNER_BLOCKED':'PARTNER_UNBLOCKED',d.isBlocked?'Partner account blocked':'Partner account unblocked');
 if(!fresh&&changed('isDeleted')&&d.isDeleted)add(parent,'TEAM_MEMBER_REMOVED','Team member removed');
 if(!fresh&&changed('parentPartnerId'))assignment('parentPartnerId',previous.parent,d.parentPartnerId,'TEAM_MEMBER');
 if(!fresh&&['name','email','phone','business','location'].some(changed))add(self,'PARTNER_PROFILE_UPDATED','Partner profile updated');
 if(!fresh&&['password','credentials.passwordChangedAt'].some(changed))add(self,'PARTNER_PASSWORD_UPDATED','Password updated','Your password was updated. Contact support if this was not you.');
 if(!fresh&&changed('teamCreditAllocation.allocatedLimit'))add([...self,...parent],'TEAM_CREDIT_ALLOCATION','Team credit allocation updated');
 }
 if(model==='NewProperty'){
 assignment('assignedPartner',previous.assigned,d.assignedPartner?.partnerId,'PROPERTY');assignment('delegatedSubPartner',previous.delegated,d.delegatedSubPartner?.subPartnerId,'PROPERTY_DELEGATION');
 status('status',{Submitted:'Property submitted',Reviewing:'Property under review',Verified:'Property verified',Rejected:'Property rejected',Live:'Property published',Sold:'Property sold',Rented:'Property rented'},prop,true);
 if(!fresh&&changed('isActive'))add(prop,'PROPERTY_AVAILABILITY','Property availability updated');
 if(!fresh&&changed('price'))add(prop,'PROPERTY_PRICE_CHANGED','Property price changed');
 if(!fresh&&['title','description','location','images'].some(changed))add(prop,'PROPERTY_UPDATED','Property details updated');
 if(!fresh&&changed('review.rejectionReason')&&d.review?.rejectionReason)add(prop,'PROPERTY_CORRECTION','Property correction required');
 }
 if(model==='CreditTransaction'&&(fresh||changed('status'))&&d.status==='SUCCESS'){
 const titles={PURCHASE:'Credits purchased and added',PROMOTION_DEBIT:'Promotion credits deducted',LEAD_UNLOCK_DEBIT:'Lead unlocked — credits deducted',REFUND:'Credits refunded',ADMIN_ADJUSTMENT_CREDIT:'Admin added credits',ADMIN_ADJUSTMENT_DEBIT:'Admin withdrew credits',TEAM_ALLOCATION:'Team credits allocated',TEAM_ALLOCATION_RELEASE:'Team allocation released',PAYMENT_REVERSAL:'Payment reversed'};
 if(titles[d.type]&&!(d.type==='REFUND'&&d.referenceType==='PromotionRequest'))add([d.walletOwnerPartnerId,d.attributedPartnerId],'WALLET_'+d.type,titles[d.type],`${d.credits} credits. Transaction ${d.transactionId||d._id}.`);
 }
 if(model==='CreditPurchaseOrder')status('status',{FAILED:'Credit payment failed'},[d.partnerId],true);
 if(model==='Lead'){
 assignment('assignedPartner',previous.assigned,d.assignedPartner?.partnerMongoId,'LEAD');assignment('assignedSubPartner',previous.delegated,d.assignedSubPartner?.subPartnerMongoId,'LEAD_ALLOCATION');
 if(fresh)add(lead,'NEW_LEAD','New buyer enquiry','A new enquiry is available for your assigned property.');
 status('status',{Lead_Verified:'Lead verified',Lead_Reviewing:'Lead under review',Lead_Rejected:'Lead rejected',Lead_Closed:'Lead closed',Successfully_Converted:'Lead converted'},lead);
 if(!fresh&&changed('leadVerificationStatus')&&d.leadVerificationStatus==='Verified'&&d.status!=='Lead_Verified')add(lead,'LEAD_VERIFIED','Lead verified');
 }
 if(model==='LeadRefundRequest')status('status',{Pending:'Lead refund request submitted',Approved:'Lead refund approved',Rejected:'Lead refund rejected'},[d.partnerMongoId],true);
 if(model==='PromotionRequest'){if(fresh&&d.status==='Pending')add([d.partnerMongoId],'PROMOTION_SUBMITTED','Promotion submitted','Your promotion request is pending Admin approval.');status('status',{Cancelled:'Promotion cancelled'},[d.partnerMongoId]);}
 if(model==='SellerBoostRequest')status('status',{RejectedByPartner:'Seller promotion request declined'},[d.partnerId]);
 if(model==='Visit'){
 if(fresh)add([d.partnerId],'VISIT_REQUESTED','New property visit request');
 status('teamApprovalStatus',{Forwarded:'Team visit forwarded to Admin',Rejected:'Team visit declined'},visit);
 // Existing controller already notifies the direct partner for outcomes.
 if(String(d.teamOwnerId)!==String(d.partnerId)){status('approvalStatus',{Approved:'Team visit approved',Rejected:'Team visit rejected'},[d.teamOwnerId]);status('status',{Completed:'Team visit completed',Cancelled:'Team visit cancelled',Rescheduled:'Team visit rescheduled'},[d.teamOwnerId]);}
 }
 return out;
}
