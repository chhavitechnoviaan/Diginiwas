import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  url: { type: String, default: "" },
  name: { type: String, default: "" },
}, { _id: false });

const advertisementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  subtitle: { type: String, required: true, trim: true },
  paragraph: { type: String, required: true, trim: true, maxlength: 200 },
  icon: { type: mediaSchema, default: null },
  photo: { type: mediaSchema, default: null },
  video: { type: mediaSchema, default: null },
  service: { type: String, enum: ["property", "homeloan", "insurance", "commercial", "service", null], default: null },
  textHtml: { type: String, default: "" },
  btnText: { type: String, default: "View Details" },
  status: { type: String, enum: ["Active", "Paused"], default: "Active" },
}, { timestamps: true, minimize: false });

export default mongoose.models.Advertisement || mongoose.model("Advertisement", advertisementSchema);
