import mongoose from "mongoose";

const seoContentSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["settings", "page", "property", "location", "blog", "template"], index: true },
  key: { type: String, required: true, trim: true },
  label: { type: String, default: "" },
  path: { type: String, default: "", trim: true, index: true },
  entityId: { type: String, default: "", index: true },
  data: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    canonical: { type: String, default: "" },
    focusKeyword: { type: String, default: "" },
    robotsIndex: { type: Boolean, default: true },
    robotsFollow: { type: Boolean, default: true },
    sitemapInclude: { type: Boolean, default: true },
    ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    schemaType: { type: String, default: "WebPage" },
    customSchema: { type: mongoose.Schema.Types.Mixed, default: null },
    siteName: { type: String, default: "DigiNiwas" },
    defaultTitle: { type: String, default: "DigiNiwas | Buy, Rent & Discover Properties" },
    defaultDescription: { type: String, default: "Discover verified properties for sale and rent with DigiNiwas." },
    defaultOgImage: { type: String, default: "" },
    canonicalDomain: { type: String, default: "https://www.diginiwas.com" },
    organizationName: { type: String, default: "DigiNiwas" },
    logo: { type: String, default: "" },
    googleSiteVerification: { type: String, default: "" },
    googleAnalyticsId: { type: String, default: "" },
    googleTagManagerId: { type: String, default: "" },
    propertyTitleTemplate: { type: String, default: "{property_name} in {locality}, {city} | DigiNiwas" },
    locationTitleTemplate: { type: String, default: "Properties in {locality}, {city} | DigiNiwas" },
    blogTitleTemplate: { type: String, default: "{post_title} | DigiNiwas" },
    footerVisible: { type: Boolean, default: false },
    footerGroup: { type: String, default: "Popular Searches" },
    footerLabel: { type: String, default: "" },
    footerOrder: { type: Number, default: 0 },
  },
}, { timestamps: true, minimize: false });

seoContentSchema.index({ type: 1, key: 1 }, { unique: true });
seoContentSchema.index({ path: 1, type: 1 });

export default mongoose.models.SeoContent || mongoose.model("SeoContent", seoContentSchema);
