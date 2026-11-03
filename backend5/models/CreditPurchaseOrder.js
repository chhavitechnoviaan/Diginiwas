import mongoose from "mongoose";

const creditPurchaseOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner", required: true, index: true },
    partnerCode: { type: String, default: "", index: true },
    amountInRupees: { type: Number, required: true, min: 0 },
    amountInPaise: { type: Number, required: true, min: 1 },
    currency: { type: String, default: "INR" },
    credits: { type: Number, required: true, min: 1 },
    creditsPerRupee: { type: Number, required: true, min: 0.01 },
    pricingVersion: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["CREATED", "PAID", "FAILED", "EXPIRED"],
      default: "CREATED",
      index: true,
    },
    razorpayPaymentId: { type: String, default: "", index: true },
    razorpaySignature: { type: String, default: "" },
    creditTransactionId: { type: mongoose.Schema.Types.ObjectId, ref: "CreditTransaction", default: null },
    idempotencyKey: { type: String, default: "", index: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

creditPurchaseOrderSchema.index(
  { idempotencyKey: 1 },
  { unique: true, partialFilterExpression: { idempotencyKey: { $type: "string", $gt: "" } } }
);

export default mongoose.models.CreditPurchaseOrder ||
  mongoose.model("CreditPurchaseOrder", creditPurchaseOrderSchema);
