import mongoose from "mongoose";

const seoRedirectSchema = new mongoose.Schema({
  source: { type: String, required: true, unique: true, trim: true },
  destination: { type: String, required: true, trim: true },
  statusCode: { type: Number, enum: [301, 308], default: 301 },
  active: { type: Boolean, default: true, index: true },
}, { timestamps: true });

export default mongoose.model("SeoRedirect", seoRedirectSchema);
