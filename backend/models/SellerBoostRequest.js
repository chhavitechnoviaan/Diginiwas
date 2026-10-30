import mongoose from "mongoose";

const schema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "NewProperty", required: true, index: true },
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner", required: true, index: true },
  promotionType: { type: String, enum: ["PROPERTY_BOOST", "FEATURED_7_DAYS", "LOCALITY_TOP_30_DAYS"], required: true },
  message: { type: String, maxlength: 1000, default: "" },
  status: { type: String, enum: ["PendingPartner", "Processing", "PendingAdmin", "RejectedByPartner", "Approved", "RejectedByAdmin"], default: "PendingPartner", index: true },
  promotionRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "PromotionRequest", default: null },
  rejectionReason: { type: String, default: "" },
  creditPriceAtRequest: { type: Number, required: true },
  decidedAt: { type: Date, default: null },
}, { timestamps: true });
schema.index({ sellerId: 1, propertyId: 1, promotionType: 1, status: 1 });
export default mongoose.model("SellerBoostRequest", schema);
