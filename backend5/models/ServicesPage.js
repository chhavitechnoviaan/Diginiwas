import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    slug: { type: String, required: true, trim: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    features: { type: [String], default: [] },
    heroImage: { type: String, default: "" },
    imageTags: { type: [String], default: [] },
    detailSections: { type: [{ icon: { type: String, default: "check-circle" }, number: { type: String, default: "" }, title: { type: String, default: "" }, content: { type: String, default: "" }, subcontent: { type: String, default: "" }, image: { type: String, default: "" } }], default: [] },
    faqs: { type: [{ question: { type: String, default: "" }, answer: { type: String, default: "" } }], default: [] },
    process: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    icon: { type: String, default: "home" },
    ctaText: { type: String, default: "Get Started" },
    ctaLink: { type: String, default: "/niwas-ai" },
    active: { type: Boolean, default: true },
  },
  { _id: false },
);

const servicesPageSchema = new mongoose.Schema(
  {
    eyebrow: { type: String, default: "EVERYTHING YOU NEED" },
    heading: { type: String, default: "Everything You Need." },
    subheading: { type: String, default: "All Under One Roof." },
    description: { type: String, default: "Trusted support for every step of your property journey." },
    services: { type: [serviceSchema], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("ServicesPage", servicesPageSchema);
