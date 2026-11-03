import CommercialRentalProperty, { COMMERCIAL_RENTAL_ENUMS } from "../../models/CommercialRentalProperty.js";
import cloudinary from "../../config/cloudinary.js";

const parse = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value !== "string") return value;
  try { return JSON.parse(value); } catch { return fallback; }
};

const parsePayload = (body = {}) => parse(body.data, body);
const fileUrl = (file) => file?.path || file?.secure_url || file?.url || "";
const validUrl = (value) => {
  const url = String(value || "").trim();
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return /^https?:$/.test(parsed.protocol) ? url : "";
  } catch {
    return "";
  }
};


const normalizeCommercialDraft = (payload = {}) => ({
  ...payload,
  sourceModel: "CommercialRentalProperty",
  status: "Draft",
  title: payload.title?.trim() || "Draft Commercial Property",
  propertyType: payload.propertyType || "Office Space",
  location: {
    city: payload.location?.city?.trim() || "Not specified",
    state: payload.location?.state || "",
    country: payload.location?.country || "India",
    locality: payload.location?.locality?.trim() || "Not specified",
    society: payload.location?.society || "",
    address: payload.location?.address || "",
    pinCode: payload.location?.pinCode || null,
    latitude: payload.location?.latitude ?? null,
    longitude: payload.location?.longitude ?? null,
    isLocationConfirmed: Boolean(payload.location?.latitude && payload.location?.longitude),
  },
  rent: {
    amount: Number(payload.rent?.amount) > 0 ? Number(payload.rent.amount) : 1,
    frequency: payload.rent?.frequency || "Per Month",
    negotiable: Boolean(payload.rent?.negotiable),
  },
  areaDetails: Array.isArray(payload.areaDetails) && payload.areaDetails.length
    ? payload.areaDetails
    : [{ value: 1, type: "Built-up Area", unit: "Sq. Ft.", display: false }],
  furnishing: {
    status: payload.furnishing?.status || "Unfurnished",
    items: Array.isArray(payload.furnishing?.items) ? payload.furnishing.items : [],
  },
  workspaceFacilities: payload.workspaceFacilities || {},
  specifications: payload.specifications || {},
  amenities: Array.isArray(payload.amenities) ? payload.amenities : [],
  propertyHighlights: Array.isArray(payload.propertyHighlights) ? payload.propertyHighlights : [],
  oneLineDescription: payload.oneLineDescription?.trim() || "Draft commercial property",
  description: payload.description?.trim() || "Draft commercial property",
});

const safeDestroy = async (publicId, resourceType = "image") => {
  if (!publicId) return;
  try { await cloudinary.uploader.destroy(publicId, { resource_type: resourceType }); } catch (e) { console.warn("Cloudinary cleanup failed:", e.message); }
};

export const getCommercialRentalFormOptions = (_req, res) => {
  res.json({ success: true, data: COMMERCIAL_RENTAL_ENUMS });
};

export const createCommercialRentalProperty = async (req, res) => {
  try {
    let payload = parsePayload(req.body);
    if (payload.status === "Draft") payload = normalizeCommercialDraft(payload);
    payload.sourceModel = "CommercialRentalProperty";
    const imageMeta = parse(req.body?.imageMeta, payload.imageMeta || []);
    const uploadedImages = (req.files?.images || []).map((file, index) => ({
      url: fileUrl(file),
      publicId: file.filename || null,
      category: imageMeta?.[index]?.category || (index === 0 ? "Exterior View" : "Other"),
      isCover: imageMeta?.[index]?.isCover ?? index === 0,
      caption: imageMeta?.[index]?.caption || "",
    }));
    const uploadedVideo = req.files?.video?.[0];
    const videoUrl = validUrl(
      req.body?.videoUrl ||
      payload.videoUrl ||
      payload.videoLink ||
      payload.media?.videos?.[0]?.url ||
      ""
    );
    const uploadedFloorPlan = req.files?.floorPlan?.[0];
    const uploadedReraCertificate = req.files?.reraCertificate?.[0];
    const uploadedDocuments = req.files?.documents || [];

    const media = {
      images: uploadedImages.length ? uploadedImages : parse(payload.media?.images, []),
      videos: uploadedVideo
        ? [{ url: fileUrl(uploadedVideo), publicId: uploadedVideo.filename || null, title: "Property tour" }]
        : videoUrl
          ? [{ url: videoUrl, publicId: null, title: "Property tour", source: "url" }]
          : parse(payload.media?.videos, []),
    };

    const floorPlan = uploadedFloorPlan
      ? {
          url: fileUrl(uploadedFloorPlan),
          publicId: uploadedFloorPlan.filename || null,
          name: uploadedFloorPlan.originalname || "",
        }
      : (payload.floorPlan || undefined);

    const reraCertificate = uploadedReraCertificate
      ? {
          url: fileUrl(uploadedReraCertificate),
          publicId: uploadedReraCertificate.filename || null,
          name: uploadedReraCertificate.originalname || "",
        }
      : (payload.reraCertificate || undefined);

    const documents = uploadedDocuments.length
      ? uploadedDocuments.map((file) => ({
          url: fileUrl(file),
          publicId: file.filename || null,
          name: file.originalname || "",
          mimeType: file.mimetype || "",
        }))
      : (Array.isArray(payload.documents) ? payload.documents : undefined);

    const user = req.user || {};
    const creator = payload.createdBy || { id: user._id || user.id || null, role: user.role || "admin" };

    delete payload.videoUrl;
    delete payload.existingImages;
    delete payload.imageMeta;

    const property = await CommercialRentalProperty.create({
      ...payload,
      listingType: "Rent",
      transactionType: "Rent",
      category: "Commercial",
      buildingType: "Commercial",
      media,
      ...(floorPlan ? { floorPlan } : {}),
      ...(reraCertificate ? { reraCertificate } : {}),
      ...(documents ? { documents } : {}),
      createdBy: creator,
    });

    return res.status(201).json({ success: true, message: "Commercial rental property created successfully", data: property });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getCommercialRentalProperties = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.propertyType) query.propertyType = req.query.propertyType;
    if (req.query.furnishing) query["furnishing.status"] = req.query.furnishing;
    if (req.query.city) query["location.city"] = new RegExp(String(req.query.city).trim(), "i");
    if (req.query.search) {
      const rx = new RegExp(String(req.query.search).trim(), "i");
      query.$or = [{ title: rx }, { propertyId: rx }, { "location.locality": rx }, { "location.city": rx }];
    }
    const data = await CommercialRentalProperty.find(query).sort({ createdAt: -1 });
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCommercialRentalPropertyById = async (req, res) => {
  try {
    const data = await CommercialRentalProperty.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Commercial rental property not found" });
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCommercialRentalProperty = async (req, res) => {
  try {
    const existing = await CommercialRentalProperty.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Commercial rental property not found" });

    let payload = parsePayload(req.body);
    if (payload.status === "Draft") payload = normalizeCommercialDraft(payload);
    payload.sourceModel = "CommercialRentalProperty";
    const existingImages = parse(req.body?.existingImages, payload.existingImages);
    const imageMeta = parse(req.body?.imageMeta, payload.imageMeta || []);
    const uploadedImages = (req.files?.images || []).map((file, index) => ({
      url: fileUrl(file),
      publicId: file.filename || null,
      category: imageMeta?.[index]?.category || "Other",
      isCover: Boolean(imageMeta?.[index]?.isCover),
      caption: imageMeta?.[index]?.caption || "",
    }));

    const keptImages = Array.isArray(existingImages) ? existingImages : existing.media?.images || [];
    const images = [...keptImages, ...uploadedImages];
    if (images.length && !images.some((x) => x.isCover)) images[0].isCover = true;
    if (images.length) {
      let foundCover = false;
      images.forEach((x) => { if (x.isCover && !foundCover) foundCover = true; else if (x.isCover) x.isCover = false; });
    }

    const uploadedVideo = req.files?.video?.[0];
    const requestedVideoUrl = validUrl(
      req.body?.videoUrl ||
      payload.videoUrl ||
      payload.videoLink ||
      payload.media?.videos?.[0]?.url ||
      ""
    );
    const uploadedFloorPlan = req.files?.floorPlan?.[0];
    const uploadedReraCertificate = req.files?.reraCertificate?.[0];
    const uploadedDocuments = req.files?.documents || [];

    const videos = uploadedVideo
      ? [{ url: fileUrl(uploadedVideo), publicId: uploadedVideo.filename || null, title: "Property tour" }]
      : requestedVideoUrl
        ? [{ url: requestedVideoUrl, publicId: null, title: "Property tour", source: "url" }]
        : parse(payload.media?.videos, existing.media?.videos || []);

    const floorPlan = uploadedFloorPlan
      ? {
          url: fileUrl(uploadedFloorPlan),
          publicId: uploadedFloorPlan.filename || null,
          name: uploadedFloorPlan.originalname || "",
        }
      : (payload.floorPlan || existing.floorPlan || undefined);

    const reraCertificate = uploadedReraCertificate
      ? {
          url: fileUrl(uploadedReraCertificate),
          publicId: uploadedReraCertificate.filename || null,
          name: uploadedReraCertificate.originalname || "",
        }
      : (payload.reraCertificate || existing.reraCertificate || undefined);

    const documents = uploadedDocuments.length
      ? uploadedDocuments.map((file) => ({
          url: fileUrl(file),
          publicId: file.filename || null,
          name: file.originalname || "",
          mimeType: file.mimetype || "",
        }))
      : (Array.isArray(payload.documents) ? payload.documents : (existing.documents || []));

    const oldPublicIds = (existing.media?.images || []).map((x) => x.publicId).filter(Boolean);
    const newPublicIds = images.map((x) => x.publicId).filter(Boolean);
    await Promise.all(oldPublicIds.filter((id) => !newPublicIds.includes(id)).map((id) => safeDestroy(id, "image")));

    delete payload.existingImages;
    delete payload.imageMeta;
    delete payload.videoUrl;
    delete payload.media;
    payload.listingType = "Rent";
    payload.transactionType = "Rent";
    payload.category = "Commercial";
    payload.buildingType = "Commercial";
    payload.media = { images, videos };
    if (floorPlan) payload.floorPlan = floorPlan;
    if (reraCertificate) payload.reraCertificate = reraCertificate;
    if (documents) payload.documents = documents;

    const data = await CommercialRentalProperty.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    return res.json({ success: true, message: "Commercial rental property updated successfully", data });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCommercialRentalProperty = async (req, res) => {
  try {
    const property = await CommercialRentalProperty.findById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: "Commercial rental property not found" });
    await Promise.all([
      ...(property.media?.images || []).map((x) => safeDestroy(x.publicId, "image")),
      ...(property.media?.videos || []).map((x) => safeDestroy(x.publicId, "video")),
    ]);
    await property.deleteOne();
    return res.json({ success: true, message: "Commercial rental property deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
