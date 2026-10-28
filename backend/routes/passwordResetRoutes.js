import express from "express";
import {
  forgotPassword,
  resetPassword,
  changeBuyerPassword,
} from "../controllers/passwordResetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Shared password reset and change-password flow for buyer, seller, and partner accounts.
// Request body must include role: "buyer", "seller", or "partner" when the
// same email may exist in more than one account collection.
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.patch("/change-password", protect, changeBuyerPassword);

export default router;
