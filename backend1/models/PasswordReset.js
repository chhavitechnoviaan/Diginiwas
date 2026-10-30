import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    role: { type: String, required: true, enum: ["buyer", "seller", "partner"] },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    otpHash: { type: String, required: true, select: false },
    expiresAt: { type: Date, required: true, index: true },
    verifiedAt: { type: Date, default: null },
    usedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("PasswordReset", passwordResetSchema);
