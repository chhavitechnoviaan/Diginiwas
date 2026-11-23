import mongoose from "mongoose";

const seoUrlRegistrySchema = new mongoose.Schema({
  entityType: { type: String, required: true, index: true },
  entityId: { type: String, default: null, index: true },
  path: { type: String, required: true, unique: true, trim: true },
  canonicalPath: { type: String, required: true, trim: true },
  status: { type: String, enum: ["active", "redirect", "gone"], default: "active", index: true },
  indexable: { type: Boolean, default: true, index: true },
}, { timestamps: true });

export default mongoose.model("SeoUrlRegistry", seoUrlRegistrySchema);
