import express from "express";
import { deleteOwnAccount } from "../controllers/accountController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Current logged-in buyer/seller/partner deletes their own account.
router.delete("/", protect, deleteOwnAccount);

export default router;
