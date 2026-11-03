import { sendMsg91FlowOtp } from "./msg91Service.js";

// Existing registration/application OTP flows continue to use MSG91.
export const sendSellerPhoneOtp = async ({ phone, otp, name = "Seller" }) =>
  sendMsg91FlowOtp({ phone, otp, name });

export const sendPhoneOtp = async ({ phone, otp, name = "User" }) =>
  sendMsg91FlowOtp({ phone, otp, name });
