import express from "express";
import {
  register,
  loginWithPassword,
  sendOTP,
  resendOTP,
  loginWithOTP,
  loginWithFirebasePhone,
  checkFirebasePhoneAccount,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login-password", loginWithPassword);

// Phone OTP login for Buyer / Seller / Partner
router.post("/send-otp", sendOTP);
router.post("/resend-otp", resendOTP);
router.post("/login-otp", loginWithOTP);
router.post("/firebase-phone-login/check-account", checkFirebasePhoneAccount);
router.post("/firebase-phone-login", loginWithFirebasePhone);

// Explicit aliases for new frontend integration
router.post("/login-otp/send", sendOTP);
router.post("/login-otp/resend", resendOTP);
router.post("/login-otp/verify", loginWithOTP);

export default router;
