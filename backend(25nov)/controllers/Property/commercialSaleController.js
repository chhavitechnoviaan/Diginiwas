import CommercialSaleProperty, { COMMERCIAL_SALE_ENUMS } from "../../models/CommercialSaleProperty.js";

const parsePayload = (body = {}) => {
  if (!body?.data) return body;
  if (typeof body.data === "string") {
    try { return JSON.parse(body.data); } catch { return body; }
  }
  return body.data;
};

const parse = (value, fallback) => {
  if (value === undefined || value === null || value === "") return fallback;
  if (typeof value !== "string") return value;
  try { return JSON.parse(value); } catch { return fallback; }
};

const fileUrl = (file) => file?.path || file?.secure_url || file?.url || "";

const meta = (file) => ({
  url: fileUrl(file),
  publicId: file?.filename || file?.public_id || null,
  public_id: file?.filename || file?.public_id || null,
  name: file?.originalname || file?.filename || "",
  mimeType: file?.mimetype || "",
});

const validUrl = (value) => {
  if (!value) return "";
  try {
    const url = new URL(String(value));
    if (!["http:", "https:"].includes(url.protocol)) return "";
    return url.toString();
  } catch {
    return "";
  }
};

const getVideoUrl = (payload, existing) => {
  const uploaded = existing?.media?.videos?.[0] || null;
  const fromBody = validUrl(
    payload?.videoUrl ||
    payload?.videoLink ||
    payload?.media?.videos?.[0]?.url ||
    ""
  );

  return {
    uploaded,
    remote: fromBody,
  };
};

const validateSubmittedMedia = (payload) => {
  if (payload?.status !== "Submitted") return;

  const images = Array.isArray(payload?.media?.images)
    ? payload.media.images
    : [];

  if (!images.length) {
    throw new Error("At least one property image is required before publishing");
  }

  const covers = images.filter((image) => image?.isCover);
  if (covers.length !== 1) {
    throw new Error("Exactly one cover image is required before publishing");
  }
};

const sanitizeArrays = (payload = {}) => ({
  ...payload,
  amenities: Array.isArray(payload.amenities)
    ? payload.amenities.filter((value) => COMMERCIAL_SALE_ENUMS.amenities.includes(value))
    : [],
  propertyHighlights: Array.isArray(payload.propertyHighlights)
    ? payload.propertyHighlights.filter((value) => COMMERCIAL_SALE_ENUMS.highlights.includes(value))
    : [],
  priceAdvantages: Array.isArray(payload.priceAdvantages)
    ? payload.priceAdvantages.filter((value) => COMMERCIAL_SALE_ENUMS.priceAdvantages.includes(value))
    : [],
  furnishing: {
    ...(payload.furnishing || {}),
    items: Array.isArray(payload.furnishing?.items)
      ? payload.furnishing.items.filter((item) => COMMERCIAL_SALE_ENUMS.furnishingItems.includes(item?.name))
      : [],
  },
  specifications: {
    ...(payload.specifications || {}),
    waterSources: Array.isArray(payload.specifications?.waterSources)
      ? payload.specifications.waterSources.filter((value) => COMMERCIAL_SALE_ENUMS.waterSources.includes(value))
      : [],
    locationAdvantages: Array.isArray(payload.specifications?.locationAdvantages)
      ? payload.specifications.locationAdvantages.filter((value) => COMMERCIAL_SALE_ENUMS.locationAdvantages.includes(value))
      : [],
  },
});

const normalizeDraft = (payload = {}) => ({
  ...payload,
  sourceModel: "CommercialSaleProperty",
  status: "Draft",
  title: payload.title?.trim() || "Draft sale property",
  category: "Sell",
  listingType: "Sell",
  transactionType: payload.transactionType || "Resale",
  buildingType: payload.buildingType || ("CommercialSaleProperty" === "CommercialSaleProperty" ? "Commercial" : "Residential"),
  propertyType: payload.propertyType || ("CommercialSaleProperty" === "CommercialSaleProperty" ? "Office Space" : "Apartment"),
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
  price: {
    amount: Number(payload.price?.amount) > 0 ? Number(payload.price.amount) : 1,
    unit: payload.price?.unit || "Total Price",
    pricePerSqFt: payload.price?.pricePerSqFt ?? null,
    negotiable: Boolean(payload.price?.negotiable),
  },
  areaDetails: Array.isArray(payload.areaDetails) && payload.areaDetails.length
    ? payload.areaDetails
    : [{ value: 1, type: "Built-up Area", unit: "Sq. Ft.", display: true }],
  availability: {
    availableFrom: payload.availability?.availableFrom || "Immediately",
    availableDate: payload.availability?.availableDate || null,
  },
  possessionStatus: payload.possessionStatus || "Ready To Move",
  furnishing: {
    status: payload.furnishing?.status || "Unfurnished",
    count: Number(payload.furnishing?.count || 0),
    items: Array.isArray(payload.furnishing?.items) ? payload.furnishing.items : [],
  },
  ownershipType: payload.ownershipType || "Free Hold",
  specifications: payload.specifications || {},
  amenities: Array.isArray(payload.amenities) ? payload.amenities : [],
  propertyHighlights: Array.isArray(payload.propertyHighlights) ? payload.propertyHighlights : [],
  additionalSpaces: Array.isArray(payload.additionalSpaces) ? payload.additionalSpaces : [],
  oneLineDescription: payload.oneLineDescription?.trim() || "Draft sale property - details pending",
  description: payload.description?.trim() || "Draft property - details pending. Please complete the description before publishing.",
  media: payload.media || { images: [], videos: [] },
});

export const createProperty = async (req, res) => {
  try {
    let payload = sanitizeArrays(parsePayload(req.body));
    if (payload.status === "Draft") payload = normalizeDraft(payload);
    payload.sourceModel = "CommercialSaleProperty";

    const imageMeta = parse(req.body?.imageMeta, payload.imageMeta || []);
    const uploadedImages = (req.files?.images || []).map((file, index) => ({
      ...meta(file),
      category: imageMeta?.[index]?.category || "Other",
      isCover: imageMeta?.[index]?.isCover ?? index === 0,
      caption: imageMeta?.[index]?.caption || "",
    })).filter((image) => image.url);

    const payloadImages = Array.isArray(payload.media?.images) ? payload.media.images : [];
    const videoUrlFromPayload = validUrl(
      req.body?.videoUrl ||
      payload.videoUrl ||
      payload.videoLink ||
      payload.media?.videos?.[0]?.url ||
      ""
    );

    const videoMedia = req.files?.video?.[0]
      ? [{ ...meta(req.files.video[0]), title: "Property tour" }]
      : videoUrlFromPayload
        ? [{ url: videoUrlFromPayload, title: "Property tour", source: "url" }]
        : [];

    const media = {
      images: uploadedImages.length ? uploadedImages : payloadImages,
      videos: videoMedia,
    };

    const data = {
      ...payload,
      media,
      video: videoMedia[0]?.url || payload.video || "",
      videoLink: videoMedia[0]?.url || payload.videoLink || "",
      floorPlan: req.files?.floorPlan?.[0] ? meta(req.files.floorPlan[0]) : payload.floorPlan,
      reraCertificate: req.files?.reraCertificate?.[0] ? meta(req.files.reraCertificate[0]) : payload.reraCertificate,
      documents: (req.files?.documents || []).map(meta).concat(parse(payload.documents, [])),
    };

    delete data.videoUrl;
    delete data.imageMeta;

    validateSubmittedMedia(data);

    const saved = await CommercialSaleProperty.create(data);
    return res.status(201).json({ success: true, message: "Commercial sale property created", data: saved });
  } catch (error) {
    console.error("CREATE CommercialSaleProperty ERROR:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const data = await CommercialSaleProperty.find().sort({ createdAt: -1 });
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const data = await CommercialSaleProperty.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Property not found" });
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const existing = await CommercialSaleProperty.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Property not found" });

    let payload = sanitizeArrays(parsePayload(req.body));
    if (payload.status === "Draft") payload = normalizeDraft(payload);
    payload.sourceModel = "CommercialSaleProperty";

    const imageMeta = parse(req.body?.imageMeta, payload.imageMeta || []);
    const existingImages = parse(
      req.body?.existingImages,
      payload.media?.images || existing.media?.images || []
    );

    const uploadedImages = (req.files?.images || []).map((file, index) => ({
      ...meta(file),
      category: imageMeta?.[index]?.category || "Other",
      isCover: imageMeta?.[index]?.isCover ?? false,
      caption: imageMeta?.[index]?.caption || "",
    })).filter((image) => image.url);

    const requestedVideoUrl = validUrl(
      req.body?.videoUrl ||
      payload.videoUrl ||
      payload.videoLink ||
      payload.media?.videos?.[0]?.url ||
      ""
    );

    const videoMedia = req.files?.video?.[0]
      ? [{ ...meta(req.files.video[0]), title: "Property tour" }]
      : requestedVideoUrl
        ? [{ url: requestedVideoUrl, title: "Property tour", source: "url" }]
        : (payload.media?.videos || existing.media?.videos || []);

    const data = {
      ...payload,
      sourceModel: "CommercialSaleProperty",
      media: {
        ...(existing.media || {}),
        ...(payload.media || {}),
        images: [...(Array.isArray(existingImages) ? existingImages : []), ...uploadedImages],
        videos: videoMedia,
      },
      video: videoMedia[0]?.url || existing.video || "",
      videoLink: videoMedia[0]?.url || existing.videoLink || "",
      floorPlan: req.files?.floorPlan?.[0]
        ? meta(req.files.floorPlan[0])
        : (payload.floorPlan || existing.floorPlan),
      reraCertificate: req.files?.reraCertificate?.[0]
        ? meta(req.files.reraCertificate[0])
        : (payload.reraCertificate || existing.reraCertificate),
      documents: (req.files?.documents || []).map(meta).concat(
        parse(payload.documents, existing.documents || [])
      ),
    };

    delete data.videoUrl;
    delete data.imageMeta;

    validateSubmittedMedia(data);

    const updated = await CommercialSaleProperty.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );

    return res.json({ success: true, message: "Updated successfully", data: updated });
  } catch (error) {
    console.error("UPDATE CommercialSaleProperty ERROR:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    await CommercialSaleProperty.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
