import mongoose from "mongoose";

const propertyReviewSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "NewProperty", required: true, index: true },
  propertyId: { type: String, default: "", index: true },
  propertyTitle: { type: String, default: "" },
  reviewer: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  reviewerRole: { type: String, enum: ["buyer", "partner", "seller"], required: true },
  reviewerName: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  remark: { type: String, required: true, trim: true, maxlength: 2000 },
  isVisible: { type: Boolean, default: true },
  adminUpdatedAt: { type: Date, default: null },
}, { timestamps: true });

propertyReviewSchema.index({ property: 1, reviewer: 1 }, { unique: true });
export default mongoose.model("PropertyReview", propertyReviewSchema);
