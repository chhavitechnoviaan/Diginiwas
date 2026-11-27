import express from "express";
import { partnerLogin, changePartnerPassword, getPartnerIdentity } from "../../controllers/Auth/partnerAuthController.js";
import { protect } from "../../middleware/authMiddleware.js";
const router = express.Router();
router.post("/login", partnerLogin);
router.get("/me", protect, getPartnerIdentity);
router.patch("/change-password", protect, changePartnerPassword);
export default router;
