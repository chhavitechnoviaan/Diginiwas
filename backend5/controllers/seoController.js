import NewProperty from "../models/NewProperty.js";
import SeoUrlRegistry from "../models/SeoUrlRegistry.js";
import SeoRedirect from "../models/SeoRedirect.js";
import SeoContent from "../models/SeoContent.js";

const SITE_URL = (process.env.SITE_URL || "https://www.diginiwas.com").replace(/\/$/, "");
const slugify = (value = "") => String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const clean = (value = "") => String(value || "").trim();
const unique = (items) => [...new Set(items.filter(Boolean))];

const liveFilter = { status: { $in: ["Live", "Verified"] }, isActive: { $ne: false }, deletedByAccount: { $ne: true } };

const propertyPath = (p) => `/property/${encodeURIComponent(String(p.propertyId || p._id))}/${slugify(p.title || `${p.bedrooms || "property"}-${p.propertyType || "property"}-${p.locality || p.city || "india"}`)}`;

const pageMeta = ({ title, description, canonical, image, robots = "index,follow", type = "website", schema, ogTitle, ogDescription }) => ({
  title, description, canonical, image: image || `${SITE_URL}/logo.png`, robots, type, schema,
  ogTitle: ogTitle || title, ogDescription: ogDescription || description,
});

export const resolveSeoPage = async (req, res) => {
  try {
    const rawPath = `/${String(req.query.path || "").replace(/^\/+/, "")}`.replace(/\/+$/, "") || "/";
    const parts = rawPath.split("/").filter(Boolean).map((x) => decodeURIComponent(x).toLowerCase());
    const [globalSettings, customEntry] = await Promise.all([
      SeoContent.findOne({ type: "settings", key: "global" }).lean(),
      SeoContent.findOne({ type: { $in: ["page", "property", "location", "blog"] }, path: rawPath }).lean(),
    ]);
    const defaults = globalSettings?.data || {};
    const custom = customEntry?.data || {};
    const robotsValue = `${custom.robotsIndex === false ? "noindex" : "index"},${custom.robotsFollow === false ? "nofollow" : "follow"}`;
    const customSchema = custom.customSchema || null;
    if (customEntry) {
      const canonical = custom.canonical || `${SITE_URL}${rawPath}`;
      const title = custom.title || defaults.defaultTitle || "DigiNiwas | Buy, Rent & Discover Properties";
      const description = custom.description || defaults.defaultDescription || "Discover verified properties for sale and rent with DigiNiwas.";
      return res.json({ success: true, page: pageMeta({ title, description, canonical: /^https?:\/\//i.test(canonical) ? canonical : `${SITE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`, image: custom.ogImage || defaults.defaultOgImage, robots: robotsValue, type: "website", schema: customSchema || undefined, ogTitle: custom.ogTitle, ogDescription: custom.ogDescription }) });
    }

    if (!parts.length) return res.json({ success: true, page: pageMeta({ title: defaults.defaultTitle || "DigiNiwas | Buy, Rent & Discover Properties", description: defaults.defaultDescription || "Discover verified properties for sale and rent with DigiNiwas.", canonical: `${SITE_URL}/`, image: defaults.defaultOgImage }) });

    if (parts[0] === "property") {
      const slug = parts.slice(1).join("/");
      const property = await NewProperty.findOne({ ...liveFilter, $or: [{ propertyId: parts[1] }, { _id: parts[1] && parts[1].match(/^[a-f\d]{24}$/i) ? parts[1] : null }] }).lean();
      if (!property) return res.status(404).json({ success: false, message: "SEO page not found" });
      const canonical = propertyPath(property);
      const propertyTitle = property.title || `Property for ${property.transactionType || "Sale"} in ${property.city || "India"}`;
      const template = defaults.propertyTitleTemplate || "{property_name} in {locality}, {city} | DigiNiwas";
      const generatedTitle = template.replaceAll("{property_name}", propertyTitle).replaceAll("{locality}", property.locality || "").replaceAll("{city}", property.city || "India");
      const description = clean(property.description).slice(0, 155) || `${propertyTitle}. View price, area, amenities and location details on DigiNiwas.`;
      return res.json({ success: true, page: pageMeta({ title: generatedTitle, description, canonical: `${SITE_URL}${canonical}`, image: property.images?.[0]?.url || defaults.defaultOgImage, type: "website", schema: { "@context": "https://schema.org", "@type": "Residence", name: propertyTitle, description, url: `${SITE_URL}${canonical}`, image: property.images?.map((x) => x?.url).filter(Boolean) || [] } }) });
    }

    const city = parts[0];
    const knownCategories = /^(commercial-property-for-(sale|rent)|flats-for-(sale|rent)|houses-for-(sale|rent)|plots-for-(sale|rent)|villas-for-(sale|rent)|properties-for-(sale|rent|sell)|all-properties-for-(sale|rent)|[0-9]+-bhk-flats-for-(sale|rent))$/i;
    const hasLocality = parts.length > 2 || (parts.length === 2 && !knownCategories.test(parts[1]) && !["buy", "rent"].includes(parts[1]));
    const locality = hasLocality ? parts[1] : "";
    const cityName = city.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
    const localityName = locality.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
    const path = rawPath;
    const categoryPart = (hasLocality ? parts.slice(2) : parts.slice(1)).join("-");
    let title = `${cityName} Properties for Sale & Rent | DigiNiwas`;
    let description = `Explore verified properties, flats, houses and plots in ${cityName} on DigiNiwas.`;
    let schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, url: `${SITE_URL}${path}` };

    if (locality) {
      title = `${localityName} Properties, ${cityName} | Buy & Rent | DigiNiwas`;
      description = `Explore properties for sale and rent in ${localityName}, ${cityName}. Find flats, houses and other verified listings on DigiNiwas.`;
      schema.name = title;
    }
    if (/flats-for-sale/.test(categoryPart)) title = `Flats for Sale in ${localityName || cityName} | DigiNiwas`;
    else if (/flats-for-rent/.test(categoryPart)) title = `Flats for Rent in ${localityName || cityName} | DigiNiwas`;
    else if (/houses-for-sale/.test(categoryPart)) title = `Houses for Sale in ${localityName || cityName} | DigiNiwas`;
    else if (/plots-for-sale/.test(categoryPart)) title = `Plots for Sale in ${localityName || cityName} | DigiNiwas`;
    else if (/commercial-property-for-sale/.test(categoryPart)) title = `Commercial Property for Sale in ${localityName || cityName} | DigiNiwas`;
    else if (/commercial-property-for-rent/.test(categoryPart)) title = `Commercial Property for Rent in ${localityName || cityName} | DigiNiwas`;
    else if (parts[1] === "buy") title = `Properties for Sale in ${cityName} | DigiNiwas`;
    else if (parts[1] === "rent") title = `Properties for Rent in ${cityName} | DigiNiwas`;

    return res.json({ success: true, page: pageMeta({ title, description, canonical: `${SITE_URL}${path}`, schema }) });
  } catch (error) {
    console.error("SEO RESOLVE ERROR", error);
    return res.status(500).json({ success: false, message: "Unable to resolve SEO page" });
  }
};

const collectPropertyUrls = async () => {
  const properties = await NewProperty.find(liveFilter).select("_id propertyId title city locality transactionType bedrooms category updatedAt").lean();
  return properties.map((p) => ({ loc: `${SITE_URL}${propertyPath(p)}`, lastmod: p.updatedAt || new Date() }));
};

export const footerLinks = async (_req, res) => {
  try {
    const entries = await SeoContent.find({ type: "location", "data.footerVisible": true, "data.robotsIndex": { $ne: false } }).sort({ "data.footerOrder": 1, label: 1 }).select("label path data").lean();
    const groups = {};
    for (const entry of entries) {
      const group = clean(entry.data?.footerGroup) || "Popular Searches";
      if (!groups[group]) groups[group] = [];
      groups[group].push({ label: entry.data?.footerLabel || entry.label, path: entry.path });
    }
    return res.json({ success: true, data: Object.entries(groups).map(([title, links]) => ({ title, links })) });
  } catch (error) {
    console.error("SEO FOOTER LINKS ERROR", error);
    return res.status(500).json({ success: false, data: [] });
  }
};

export const sitemap = async (req, res) => {
  try {
    const staticPaths = ["/", "/about", "/services", "/blogs", "/agent-corner", "/area-calculator", "/property-valuation", "/rent-value-calculator", "/indore", "/indore/buy", "/indore/rent", "/ambala", "/ambala/buy", "/ambala/rent"];
    const properties = await collectPropertyUrls();
    const customEntries = await SeoContent.find({ type: { $in: ["page", "property", "location", "blog"] }, path: { $ne: "" }, "data.robotsIndex": { $ne: false }, "data.sitemapInclude": { $ne: false } }).select("path updatedAt data.canonical").lean();
    const customUrls = customEntries.map((item) => ({ loc: /^https?:\/\//i.test(item.data?.canonical || "") ? item.data.canonical : `${SITE_URL}${item.data?.canonical || item.path}`, lastmod: item.updatedAt || new Date() }));
    const propertyCities = await NewProperty.find(liveFilter).select("city locality transactionType category updatedAt").lean();
    const cityPaths = unique(propertyCities.map((p) => p.city)).map((c) => `/${slugify(c)}`);
    const localityPaths = unique(propertyCities.filter((p) => p.city && p.locality).map((p) => `/${slugify(p.city)}/${slugify(p.locality)}`));
    const urls = unique([...staticPaths, ...cityPaths, ...localityPaths]).map((loc) => ({ loc: `${SITE_URL}${loc}`, lastmod: new Date() })).concat(properties, customUrls);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${escapeXml(u.loc)}</loc><lastmod>${new Date(u.lastmod).toISOString()}</lastmod></url>`).join("")}</urlset>`;
    res.type("application/xml").send(xml);
  } catch (error) {
    console.error("SITEMAP ERROR", error);
    res.status(500).type("application/xml").send("<?xml version=\"1.0\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"></urlset>");
  }
};

const escapeXml = (value) => String(value).replace(/[<>&'\"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));

export const robots = (req, res) => {
  res.type("text/plain").send(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /dashboard/\nDisallow: /login/\nDisallow: /register/\nDisallow: /api/\nSitemap: ${SITE_URL}/sitemap.xml\n`);
};

export const registerUrl = async (req, res) => {
  try {
    const payload = req.body || {};
    const item = await SeoUrlRegistry.findOneAndUpdate({ path: payload.path }, { $set: { ...payload } }, { upsert: true, new: true, setDefaultsOnInsert: true });
    return res.json({ success: true, data: item });
  } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
};

export const createRedirect = async (req, res) => {
  try {
    const item = await SeoRedirect.findOneAndUpdate({ source: req.body.source }, { $set: req.body }, { upsert: true, new: true, setDefaultsOnInsert: true });
    return res.json({ success: true, data: item });
  } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
};

export const resolveRedirect = async (req, res, next) => {
  try {
    const path = `/${String(req.path || "").replace(/^\/+/, "")}`;
    const redirect = await SeoRedirect.findOne({ source: path, active: true }).lean();
    if (redirect) return res.redirect(redirect.statusCode, redirect.destination);
    return next();
  } catch { return next(); }
};
