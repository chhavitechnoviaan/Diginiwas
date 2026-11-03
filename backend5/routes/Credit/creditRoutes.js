// import express from "express";
// import {
//   completeCreditPurchase,
//   getPartnerWallet,
//   getCreditHistory,
//   refundCredits,
//   adjustPartnerCredits,
//   getCreditDashboard,
//   getPartnerCreditOverview,
//   getPartnerCreditDetails,
//   getPropertyCreditOverview,
//   getPropertyCreditDetails,
// } from "../../controllers/Credit/creditController.js";
// import {
//   addCreditsByAdmin,
//   bulkAddCreditsByAdmin,
//   withdrawCreditsByAdmin,
//   syncTeamWalletsByAdmin,
//   getAdminAdjustments,
// } from "../../controllers/Credit/adminCreditController.js";
// import { protect, requireAdmin } from "../../middleware/authMiddleware.js";

// const router = express.Router();
// router.get("/dashboard", getCreditDashboard);
// router.get("/partners", getPartnerCreditOverview);
// router.get("/partners/:partnerId", getPartnerCreditDetails);
// router.get("/partner/:partnerId", getPartnerWallet);
// router.get("/properties", getPropertyCreditOverview);
// router.get("/properties/:propertyId", getPropertyCreditDetails);
// router.get("/history", getCreditHistory);
// router.post("/purchase/complete", completeCreditPurchase);
// router.post("/refund", protect, requireAdmin, refundCredits);
// router.patch("/adjust", protect, requireAdmin, adjustPartnerCredits);
// router.post("/admin/withdraw", protect, requireAdmin, withdrawCreditsByAdmin);
// router.post("/admin/add", protect, requireAdmin, addCreditsByAdmin);
// router.post("/admin/bulk-add", protect, requireAdmin, bulkAddCreditsByAdmin);
// router.post("/admin/sync-wallets", protect, requireAdmin, syncTeamWalletsByAdmin);
// router.get("/admin/adjustments", protect, requireAdmin, getAdminAdjustments);
// export default router;


import express from "express";

import {
  completeCreditPurchase,
  getPartnerWallet,
  getCreditHistory,
  refundCredits,
  adjustPartnerCredits,
  getCreditDashboard,
  getPartnerCreditOverview,
  getPartnerCreditDetails,
  getPropertyCreditOverview,
  getPropertyCreditDetails,
} from "../../controllers/Credit/creditController.js";

import {
  addCreditsByAdmin,
  bulkAddCreditsByAdmin,
  withdrawCreditsByAdmin,
  bulkWithdrawCreditsByAdmin,
  syncTeamWalletsByAdmin,
  getAdminAdjustments,
} from "../../controllers/Credit/adminCreditController.js";

import {
  protect,
  requireAdmin,
} from "../../middleware/authMiddleware.js";

import {
  createCreditPurchaseOrder,
  verifyCreditPurchase,
} from "../../controllers/Credit/razorpayCreditController.js";

const router = express.Router();

// =====================================================
// CREDIT DASHBOARD
// =====================================================

router.get(
  "/dashboard",
  getCreditDashboard
);

// =====================================================
// PARTNER CREDIT
// =====================================================

router.get(
  "/partners",
  getPartnerCreditOverview
);

router.get(
  "/partners/:partnerId",
  getPartnerCreditDetails
);

router.get(
  "/partner/:partnerId",
  getPartnerWallet
);

// =====================================================
// PROPERTY CREDIT
// =====================================================

router.get(
  "/properties",
  getPropertyCreditOverview
);

router.get(
  "/properties/:propertyId",
  getPropertyCreditDetails
);

// =====================================================
// CREDIT HISTORY
// =====================================================

router.get(
  "/history",
  getCreditHistory
);

// =====================================================
// PARTNER CREDIT PURCHASE - RAZORPAY
// =====================================================

// The partner must be authenticated. partnerId is taken from the JWT,
// never trusted from the frontend request body.
router.post(
  "/purchase/order",
  protect,
  createCreditPurchaseOrder
);

router.post(
  "/purchase/verify",
  protect,
  verifyCreditPurchase
);

// Legacy endpoint kept for compatibility. New frontend code must use
// /purchase/order followed by /purchase/verify.
router.post(
  "/purchase/complete",
  protect,
  completeCreditPurchase
);

// =====================================================
// REFUND
// =====================================================

router.post(
  "/refund",
  protect,
  requireAdmin,
  refundCredits
);

// =====================================================
// MANUAL CREDIT ADJUSTMENT
// =====================================================

router.patch(
  "/adjust",
  protect,
  requireAdmin,
  adjustPartnerCredits
);

// =====================================================
// ADMIN - SINGLE WITHDRAW
// =====================================================

router.post(
  "/admin/withdraw",
  protect,
  requireAdmin,
  withdrawCreditsByAdmin
);

// =====================================================
// ADMIN - SINGLE ADD
// =====================================================

router.post(
  "/admin/add",
  protect,
  requireAdmin,
  addCreditsByAdmin
);

// =====================================================
// ADMIN - BULK ADD
// =====================================================

router.post(
  "/admin/bulk-add",
  protect,
  requireAdmin,
  bulkAddCreditsByAdmin
);

// =====================================================
// ADMIN - BULK WITHDRAW
// Supports:
// 1. Selected partners
// 2. All partners
// =====================================================

router.post(
  "/admin/bulk-withdraw",
  protect,
  requireAdmin,
  bulkWithdrawCreditsByAdmin
);

// =====================================================
// ADMIN - SYNC TEAM WALLETS
// =====================================================

router.post(
  "/admin/sync-wallets",
  protect,
  requireAdmin,
  syncTeamWalletsByAdmin
);

// =====================================================
// ADMIN - ADJUSTMENT HISTORY
// =====================================================

router.get(
  "/admin/adjustments",
  protect,
  requireAdmin,
  getAdminAdjustments
);

export default router;