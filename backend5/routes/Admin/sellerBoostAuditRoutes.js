import express from "express";
import { protect, requireAdmin } from "../../middleware/authMiddleware.js";
import { getAdminSellerBoostHistory } from "../../controllers/Admin/sellerBoostAuditController.js";
const router = express.Router();
router.use(protect, requireAdmin);
router.get("/:sellerId/boost-requests", getAdminSellerBoostHistory);
export default router;
