// import express from "express";
// import { getTeamPartners, addTeamMember, allocateTeamCredits, getTeamMemberCreditHistory } from "../../controllers/Agent/teamPartnerController.js";
// import { protect } from "../../middleware/authMiddleware.js";
// const router = express.Router();
// router.get("/", protect, getTeamPartners);
// router.post("/:ownerId/members", protect, addTeamMember);
// router.patch("/:ownerId/members/:memberId/allocate-credits", protect, allocateTeamCredits);
// router.get("/:ownerId/members/:memberId/credit-history", protect, getTeamMemberCreditHistory);
// export default router;


import express from "express";
import {
  getTeamPartners,
  addTeamMember,
  allocateTeamCredits,
  getTeamMemberCreditHistory,
  getVerifiedTeamMembers,
  getTeamAssignedProperties,
  delegatePropertyToSubAgent,
  removeSubAgentPropertyDelegation,
} from "../../controllers/Agent/teamPartnerController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect, (req,res,next)=> { if (["admin","agency_owner"].includes(req.user.role)) return next(); return res.status(403).json({success:false,message:"Team Owner or Admin required"}); });
router.param("ownerId",(req,res,next,id)=> {if(req.user.role==="admin" || String(req.user.id)===id) return next(); return res.status(403).json({success:false,message:"Access to another agency denied"});});

router.get("/", protect, getTeamPartners);
router.post("/:ownerId/members", protect, addTeamMember);
router.patch(
  "/:ownerId/members/:memberId/allocate-credits",
  protect,
  allocateTeamCredits
);
router.get(
  "/:ownerId/members/:memberId/credit-history",
  protect,
  getTeamMemberCreditHistory
);

router.get("/:ownerId/verified-members", protect, getVerifiedTeamMembers);
router.get("/:ownerId/properties", protect, getTeamAssignedProperties);
router.patch("/:ownerId/properties/:propertyId/delegate", protect, delegatePropertyToSubAgent);
router.patch("/:ownerId/properties/:propertyId/remove-delegation", protect, removeSubAgentPropertyDelegation);

export default router;
