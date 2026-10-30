import express from "express";
import {
  getAllPartners,
  getPartnerById,
  getApprovedNotVerifiedPartners,
  blockPartner,
  deletePartner,
  getUnassignedProperties,
  getAvailablePartners,
  assignPartnerToProperty,
  getAssignmentProperties,
  getAssignmentSummary,
  unassignPartnerFromProperty,
} from "../../controllers/Agent/partnerController.js";
import { protect, requireAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Partner assignment administration requires an authenticated admin.
router.get("/properties/unassigned", protect, requireAdmin, getUnassignedProperties);
router.get("/available", protect, requireAdmin, getAvailablePartners);
router.get("/partners/available", protect, requireAdmin, getAvailablePartners); // backward-compatible alias
router.get("/approved-not-verified", protect, requireAdmin, getApprovedNotVerifiedPartners);
router.get("/summary", protect, requireAdmin, getAssignmentSummary);
router.get("/properties", protect, requireAdmin, getAssignmentProperties);
router.patch("/properties/:propertyId/assign", protect, requireAdmin, assignPartnerToProperty);
router.patch("/properties/:propertyId/assign-partner", protect, requireAdmin, assignPartnerToProperty);
router.patch("/properties/:propertyId/unassign", protect, requireAdmin, unassignPartnerFromProperty);

// Existing partner administration routes.
router.get("/", protect, requireAdmin, getAllPartners);
router.patch("/:id/block", protect, requireAdmin, blockPartner);
router.delete("/delete/:id", protect, requireAdmin, deletePartner);
router.get("/:id", protect, requireAdmin, getPartnerById);

export default router;
