import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";
import Partner from "../models/Partner.js";
import PasswordReset from "../models/PasswordReset.js";
import { hashPassword } from "../services/partnerCredentialService.js";

const OTP_EXPIRY_MINUTES = 10;

const normalizeEmail = (email) =>
  String(email || "").trim().toLowerCase();

const normalizeRole = (role) => {
  const value = String(role || "").trim().toLowerCase();
  if (value === "owner") return "seller";
  if (value === "tenant") return "buyer";
  return value;
};

const getModel = (role) => {
  switch (normalizeRole(role)) {
    case "buyer":
      return Buyer;
    case "seller":
      return Seller;
    case "partner":
      return Partner;
    default:
      return null;
  }
};

const generateOtp = () =>
  String(Math.floor(100000 + Math.random() * 900000));

const mailTransport = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false") === "true";

  if (!host || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendResetOtpEmail = async ({ email, name, otp }) => {
  const transporter = mailTransport();

  if (!transporter) {
    throw new Error("SMTP email configuration is missing");
  }

  const from =
    process.env.MAIL_FROM ||
    process.env.SMTP_USER ||
    "DigiNiwas";

  await transporter.sendMail({
    from,
    to: email,
    subject: "DigiNiwas - Password Reset OTP",
    text: `Hello ${name || "User"},\n\nYour DigiNiwas password reset OTP is ${otp}.\n\nThis OTP is valid for ${OTP_EXPIRY_MINUTES} minutes. If you did not request a password reset, please ignore this email.\n\nDigiNiwas`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
        <h2>DigiNiwas Password Reset</h2>
        <p>Hello ${name || "User"},</p>
        <p>Use the following OTP to reset your DigiNiwas password:</p>
        <div style="font-size:30px;font-weight:700;letter-spacing:8px;padding:18px 0">
          ${otp}
        </div>
        <p>This OTP is valid for <b>${OTP_EXPIRY_MINUTES} minutes</b>.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
      </div>
    `,
  });
};

const findAccount = async ({ email, role }) => {
  const normalizedRole = normalizeRole(role);

  if (normalizedRole) {
    const Model = getModel(normalizedRole);
    if (!Model) {
      const error = new Error("Role must be buyer, seller, or partner");
      error.statusCode = 400;
      throw error;
    }

    const user = await Model.findOne({ email: normalizeEmail(email) });
    return user ? { user, role: normalizedRole } : null;
  }

  // If role is omitted, look across all three collections.
  const matches = [];
  for (const candidate of ["buyer", "seller", "partner"]) {
    const Model = getModel(candidate);
    const user = await Model.findOne({ email: normalizeEmail(email) });
    if (user) matches.push({ user, role: candidate });
  }

  if (matches.length > 1) {
    const error = new Error(
      "This email is associated with multiple account types. Please provide role."
    );
    error.statusCode = 409;
    throw error;
  }

  return matches[0] || null;
};

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const role = normalizeRole(req.body?.role);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const account = await findAccount({ email, role });

    // Do not reveal whether an email exists.
    if (!account) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset OTP has been sent.",
      });
    }

    const { user } = account;

    if (user.isDeleted) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset OTP has been sent.",
      });
    }

    if (
      account.role === "partner" &&
      (user.isBlocked || user.isRejected)
    ) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset OTP has been sent.",
      });
    }

    if (
      account.role === "seller" &&
      (user.accountStatus === "BLOCKED" ||
        user.accountStatus === "SUSPENDED")
    ) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset OTP has been sent.",
      });
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(
      Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );

    await PasswordReset.deleteMany({
      email,
      role: account.role,
      usedAt: null,
    });

    await PasswordReset.create({
      email,
      role: account.role,
      userId: user._id,
      otpHash,
      expiresAt,
    });

    try {
      await sendResetOtpEmail({
        email,
        name: user.name,
        otp,
      });
    } catch (mailError) {
      await PasswordReset.deleteMany({
        email,
        role: account.role,
        userId: user._id,
        usedAt: null,
      });
      throw mailError;
    }

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent to your registered email.",
      data: {
        email: email.replace(
          /^(.{2}).*(@.*)$/,
          "$1****$2"
        ),
        role: account.role,
        expiresIn: `${OTP_EXPIRY_MINUTES} minutes`,
      },
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Unable to process password reset request",
    });
  }
};

// POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const role = normalizeRole(req.body?.role);
    const otp = String(req.body?.otp || "").trim();
    const newPassword = String(req.body?.newPassword || "");

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and newPassword are required",
      });
    }

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "OTP must be a 6-digit number",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters",
      });
    }

    const account = await findAccount({ email, role });

    if (!account) {
      return res.status(400).json({
        success: false,
        message: "Invalid password reset request",
      });
    }

    const reset = await PasswordReset.findOne({
      email,
      role: account.role,
      userId: account.user._id,
      usedAt: null,
    })
      .sort({ createdAt: -1 })
      .select("+otpHash");

    if (!reset) {
      return res.status(400).json({
        success: false,
        message: "No active password reset request. Please request a new OTP.",
      });
    }

    if (reset.expiresAt < new Date()) {
      await PasswordReset.deleteOne({ _id: reset._id });
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    const validOtp = await bcrypt.compare(otp, reset.otpHash);

    if (!validOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const user = account.user;

    if (account.role === "partner") {
      user.password = await hashPassword(newPassword);
      user.credentials = user.credentials || {};
      user.credentials.mustChangePassword = false;
      user.credentials.passwordChangedAt = new Date();
      user.credentials.temporaryPasswordExpiresAt = null;
    } else {
      user.password = await bcrypt.hash(newPassword, 12);

      if (account.role === "seller") {
        user.mustChangePassword = false;
        user.lastPasswordChangedAt = new Date();

        if (Array.isArray(user.verificationHistory)) {
          user.verificationHistory.push({
            action: "PASSWORD_CHANGED",
            remarks: "Password reset through forgot-password flow",
            updatedBy: {
              userId: user._id,
              name: user.name,
              role: "System",
            },
          });
        }
      }
    }

    await user.save();

    reset.verifiedAt = new Date();
    reset.usedAt = new Date();
    await reset.save();

    // Invalidate any other active reset requests for the same account.
    await PasswordReset.updateMany(
      {
        email,
        role: account.role,
        userId: user._id,
        _id: { $ne: reset._id },
        usedAt: null,
      },
      { $set: { usedAt: new Date() } }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now login with your new password.",
      data: {
        role: account.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to reset password",
    });
  }
};
