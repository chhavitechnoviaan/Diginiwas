import express from "express";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";
import { createPropertyReview, listPropertyReviews, listAllReviewsForAdmin, updateReviewForAdmin, deleteReviewForAdmin } from "../controllers/propertyReviewController.js";

const router = express.Router();
router.get("/property/:propertyId", listPropertyReviews);
router.post("/", protect, createPropertyReview);
router.get("/admin", protect, requireAdmin, listAllReviewsForAdmin);
router.patch("/admin/:reviewId", protect, requireAdmin, updateReviewForAdmin);
router.delete("/admin/:reviewId", protect, requireAdmin, deleteReviewForAdmin);
export default router;
