import express from "express";
import { adminDeleteAccount } from "../../controllers/accountController.js";
import { protect, requireAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Admin can delete buyer, seller or partner accounts.
router.delete("/:type/:id", protect, requireAdmin, adminDeleteAccount);

export default router;
