import nodemailer from "nodemailer";
import { sendMsg91FlowOtp } from "./msg91Service.js";

const transporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false") === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export const sendEmailOtp = async ({ to, name, otp }) => {
  if (!process.env.SMTP_HOST) {
    console.log(`[DEV EMAIL OTP] ${to}: ${otp}`);
    return;
  }
  await transporter().sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject: "Verify your DigiNiwas Partner email",
    html: `<div style="font-family:Arial;color:#173247"><h2>DigiNiwas Partner Verification</h2><p>Hello ${name},</p><p>Your OTP is:</p><h1 style="letter-spacing:8px;color:#005F56">${otp}</h1><p>Valid for 10 minutes.</p></div>`,
  });
};

export const sendPartnerCredentials = async ({ to, name, partnerId, temporaryPassword }) => {
  if (!process.env.SMTP_HOST) {
    console.log(`[DEV PARTNER LOGIN] ${to}: ${temporaryPassword}`);
    return;
  }
  await transporter().sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to,
    subject: "Your DigiNiwas Partner account is approved",
    html: `<div style="font-family:Arial;color:#173247;line-height:1.6"><h2 style="color:#005F56">Welcome to DigiNiwas</h2><p>Hello ${name},</p><p>Your partner application has been approved.</p><p><b>Partner ID:</b> ${partnerId}</p><p><b>Login ID:</b> ${to}</p><p><b>Temporary Password:</b> ${temporaryPassword}</p><p>You must change this password after first login.</p></div>`,
  });
};


export const sendMobileOtp = async ({ phone, otp, name = "Partner" }) => {
  return sendMsg91FlowOtp({ phone, otp, name });
};
