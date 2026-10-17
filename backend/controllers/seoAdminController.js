import SeoContent from "../models/SeoContent.js";
import SeoRedirect from "../models/SeoRedirect.js";
import SeoUrlRegistry from "../models/SeoUrlRegistry.js";
import NewProperty from "../models/NewProperty.js";

const slugKey = (value = "") => String(value).trim().toLowerCase();
const normalPath = (value = "") => {
  const raw = String(value || "/").trim();
  if (/^https?:\/\//i.test(raw)) {
    try { return new URL(raw).pathname.replace(/\/$/, "") || "/"; } catch { return "/"; }
  }
  const path = `/${raw.replace(/^\/+/, "")}`.replace(/\/{2,}/g, "/");
  return path.length > 1 ? path.replace(/\/$/, "") : "/";
};
const fail = (res, error, status = 400) => res.status(status).json({ success: false, message: error?.message || "SEO request failed." });

export const getSeoSettings = async (_req, res) => {
  try {
    const item = await SeoContent.findOne({ type: "settings", key: "global" }).lean();
    res.json({ success: true, data: item?.data || {} });
  } catch (e) { fail(res, e, 500); }
};
export const saveSeoSettings = async (req, res) => {
  try {
    const item = await SeoContent.findOneAndUpdate(
      { type: "settings", key: "global" },
      { $set: { type: "settings", key: "global", label: "Global SEO Settings", data: req.body || {} } },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    );
    res.json({ success: true, message: "SEO settings saved.", data: item.data });
  } catch (e) { fail(res, e); }
};

export const listSeoEntries = async (req, res) => {
  try {
    const type = String(req.query.type || "page");
    const allowed = ["page", "property", "location", "blog", "template"];
    if (!allowed.includes(type)) return fail(res, new Error("Invalid SEO entry type."));
    const query = { type };
    if (req.query.search) query.$or = [
      { label: { $regex: String(req.query.search), $options: "i" } },
      { path: { $regex: String(req.query.search), $options: "i" } },
      { key: { $regex: String(req.query.search), $options: "i" } },
    ];
    const data = await SeoContent.find(query).sort({ updatedAt: -1 }).limit(500).lean();
    res.json({ success: true, count: data.length, data });
  } catch (e) { fail(res, e, 500); }
};

export const saveSeoEntry = async (req, res) => {
  try {
    const body = req.body || {};
    const type = String(body.type || "page");
    if (!["page", "property", "location", "blog", "template"].includes(type)) return fail(res, new Error("Invalid SEO entry type."));
    const path = normalPath(body.path || body.key || "/");
    const key = slugKey(body.key || (type === "template" ? body.label : path));
    if (!key) return fail(res, new Error("A unique key or URL path is required."));
    const data = { ...(body.data || {}) };
    if (data.customSchema && typeof data.customSchema === "string") {
      try { data.customSchema = JSON.parse(data.customSchema); }
      catch { return fail(res, new Error("Custom schema must contain valid JSON.")); }
    }
    const filter = req.params.id ? { _id: req.params.id } : { type, key };
    const item = await SeoContent.findOneAndUpdate(
      filter,
      { $set: { type, key, label: String(body.label || key), path, entityId: String(body.entityId || ""), data } },
      { upsert: !req.params.id, new: true, runValidators: true, setDefaultsOnInsert: true },
    );
    if (type !== "template") {
      await SeoUrlRegistry.findOneAndUpdate(
        { path },
        { $set: { entityType: type, entityId: String(body.entityId || ""), path, canonicalPath: normalPath(data.canonical || path), status: "active", indexable: data.robotsIndex !== false && data.sitemapInclude !== false } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
    }
    res.json({ success: true, message: "SEO entry saved.", data: item });
  } catch (e) { fail(res, e); }
};

export const deleteSeoEntry = async (req, res) => {
  try {
    const item = await SeoContent.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: "SEO entry not found." });
    if (item.path) await SeoUrlRegistry.deleteOne({ path: item.path, entityType: item.type });
    res.json({ success: true, message: "SEO entry deleted." });
  } catch (e) { fail(res, e); }
};


export const lookupSeoRedirect = async (req, res) => {
  try {
    const source = normalPath(req.query.path || "/");
    const redirect = await SeoRedirect.findOne({ source, active: true }).lean();
    return res.json({ success: true, redirect: redirect ? { destination: redirect.destination, statusCode: redirect.statusCode } : null });
  } catch (e) { return fail(res, e, 500); }
};

export const listSeoRedirects = async (_req, res) => {
  try { res.json({ success: true, data: await SeoRedirect.find().sort({ updatedAt: -1 }).lean() }); }
  catch (e) { fail(res, e, 500); }
};
export const updateSeoRedirect = async (req, res) => {
  try {
    const source = normalPath(req.body.source);
    const destination = normalPath(req.body.destination);
    if (source === "/" || destination === "/") return fail(res, new Error("Source and destination must be valid non-root paths."));
    if (source === destination) return fail(res, new Error("Source and destination cannot be the same."));
    const existing = await SeoRedirect.findOne({ source, active: true }).lean();
    if (existing && String(existing._id) !== String(req.params.id || "new")) return fail(res, new Error("An active redirect already exists for this source."));
    const chained = await SeoRedirect.findOne({ source: destination, active: true }).lean();
    const finalDestination = chained?.destination || destination;
    const query = req.params.id && req.params.id !== "new" ? { _id: req.params.id } : { source };
    const item = await SeoRedirect.findOneAndUpdate(query, { $set: { source, destination: finalDestination, statusCode: Number(req.body.statusCode) === 308 ? 308 : 301, active: req.body.active !== false } }, { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true });
    res.json({ success: true, message: "Redirect saved.", data: item });
  } catch (e) { fail(res, e); }
};
export const deleteSeoRedirect = async (req, res) => {
  try { const result = await SeoRedirect.findByIdAndDelete(req.params.id); if (!result) return res.status(404).json({ success: false, message: "Redirect not found." }); res.json({ success: true, message: "Redirect deleted." }); }
  catch (e) { fail(res, e); }
};

export const getSeoDashboard = async (_req, res) => {
  try {
    const [entries, redirects, properties, settings] = await Promise.all([
      SeoContent.find({ type: { $in: ["page", "property", "location", "blog"] } }).select("type data path").lean(),
      SeoRedirect.countDocuments({ active: true }),
      NewProperty.find({ status: { $in: ["Live", "Verified"] }, isActive: { $ne: false }, deletedByAccount: { $ne: true } }).select("title description images").lean(),
      SeoContent.findOne({ type: "settings", key: "global" }).lean(),
    ]);
    const missingTitle = entries.filter((x) => !x.data?.title).length;
    const missingDescription = entries.filter((x) => !x.data?.description).length;
    const propertyMissingDescription = properties.filter((x) => !String(x.description || "").trim()).length;
    const propertyMissingImageAlt = properties.filter((x) => !x.images?.length).length;
    res.json({ success: true, data: { configuredEntries: entries.length, missingTitle, missingDescription, activeRedirects: redirects, liveProperties: properties.length, propertyMissingDescription, propertyMissingImageAlt, globalSettingsConfigured: Boolean(settings) } });
  } catch (e) { fail(res, e, 500); }
};
