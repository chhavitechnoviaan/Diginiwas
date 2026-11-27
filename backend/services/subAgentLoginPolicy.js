import Partner from "../models/Partner.js";
export async function subAgentLoginState(p) {
 if(p.isDeleted || p.isBlocked || p.isRejected || ["Rejected","Suspended"].includes(p.applicationStatus)) return "ACCOUNT_INACTIVE";
 if(!p.isApproved) return "ADMIN_APPROVAL_PENDING";
 if(!p.emailVerification?.isVerified || !p.phoneVerification?.isVerified) return "CONTACT_VERIFICATION_PENDING";
 if(!p.credentials?.subAgentWelcomeSentAt) return "WELCOME_EMAIL_PENDING";
 const owner=await Partner.findById(p.parentPartnerId);
 if(!owner || owner.accountType!=="team" || owner.isDeleted || owner.isBlocked || owner.isRejected || !owner.isApproved || !owner.isVerified || owner.applicationStatus!=="Verified") return "AGENCY_INACTIVE";
 return p.isVerified && p.applicationStatus==="Verified" ? "ACTIVE" : "FINAL_VERIFICATION_PENDING";
}
