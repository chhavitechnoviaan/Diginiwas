import mongoose from "mongoose";
import {
  buildUnifiedAdminQuery,
  findUnifiedProperties,
  findUnifiedPropertyById,
  getPropertyCollection,
  getUnifiedLiveProperties,
  normalizeUnifiedProperty,
} from "../../services/unifiedPropertyService.js";

const objectId = (id) => {
  try { return new mongoose.Types.ObjectId(id); } catch { return null; }
};

const parseBody = (body = {}) => {
  if (typeof body.data === "string") {
    try { return { ...body, ...JSON.parse(body.data) }; } catch { return body; }
  }
  if (body.data && typeof body.data === "object") return { ...body, ...body.data };
  return body;
};

const fileUrl = (file) => file?.path || file?.secure_url || file?.url || "";

const normalizeUploadedImages = (files = []) => files.map((file, index) => ({
  url: fileUrl(file),
  publicId: file?.filename || file?.public_id || null,
  public_id: file?.filename || file?.public_id || null,
  category: "Other",
  caption: "",
  isCover: index === 0,
})).filter((image) => image.url);

const setCommonFields = (set, body, existing) => {
  const flatLocation = {
    city: body.city,
    state: body.state,
    country: body.country,
    locality: body.locality,
    address: body.address,
    pinCode: body.pinCode,
    latitude: body.latitude,
    longitude: body.longitude,
  };

  const hasFlatLocation = Object.values(flatLocation).some((value) => value !== undefined);
  if (hasFlatLocation) {
    if (existing.sourceModel === "NewProperty") {
      if (body.city !== undefined) set.city = body.city;
      if (body.state !== undefined) set.state = body.state;
      if (body.country !== undefined) set.country = body.country;
      if (body.locality !== undefined) set.locality = body.locality;
      if (body.address !== undefined) set.address = body.address;
      if (body.pinCode !== undefined) set.pinCode = body.pinCode;
      if (body.latitude !== undefined) set.latitude = Number(body.latitude);
      if (body.longitude !== undefined) set.longitude = Number(body.longitude);
    } else {
      const location = { ...(existing.location || {}), ...(body.location || {}) };
      for (const [key, value] of Object.entries(flatLocation)) {
        if (value !== undefined) location[key] = value;
      }
      if (location.latitude !== undefined && location.latitude !== null && location.latitude !== "") location.latitude = Number(location.latitude);
      if (location.longitude !== undefined && location.longitude !== null && location.longitude !== "") location.longitude = Number(location.longitude);
      set.location = location;
    }
  } else if (body.location) {
    set.location = body.location;
  }

  if (body.title !== undefined) set.title = body.title;
  if (body.propertyType !== undefined) set.propertyType = body.propertyType;
  if (body.buildingType !== undefined) set.buildingType = body.buildingType;
  if (body.category !== undefined) set.category = body.category;
  if (body.status !== undefined) set.status = body.status;
  if (body.propertyVerificationStatus !== undefined) set.propertyVerificationStatus = body.propertyVerificationStatus;
  if (body.description !== undefined) set.description = body.description;
  if (body.oneLineDescription !== undefined) set.oneLineDescription = body.oneLineDescription;
  if (body.amenities !== undefined) set.amenities = typeof body.amenities === "string" ? JSON.parse(body.amenities) : body.amenities;
  if (body.tags !== undefined) set.tags = typeof body.tags === "string" ? JSON.parse(body.tags) : body.tags;
  if (body.furnishing !== undefined && typeof body.furnishing !== "object") set.furnishing = body.furnishing;
  if (body.bedrooms !== undefined) set.bedrooms = body.bedrooms;
  if (body.bathrooms !== undefined) set.bathrooms = body.bathrooms;
  if (body.balconies !== undefined) set.balconies = body.balconies;
  if (body.parking !== undefined) set.parking = body.parking;
  if (body.price !== undefined && typeof body.price !== "object" && existing.sourceModel === "NewProperty") set.price = Number(body.price);
  if (body.transactionType !== undefined && existing.sourceModel === "NewProperty") set.transactionType = body.transactionType === "Lease" ? "Rent" : body.transactionType;
};

const prepareUpdate = (body, existing, files) => {
  const set = {};
  setCommonFields(set, body, existing);

  const source = existing.sourceModel || "NewProperty";

  if (source === "NewProperty") {
    if (body.propertySize !== undefined) set.propertySize = Number(body.propertySize);
    if (body.sizeUnit !== undefined) set.sizeUnit = body.sizeUnit;
    if (body.pricePerSqft !== undefined) set.pricePerSqft = Number(body.pricePerSqft);
    if (body.maintenance !== undefined) set.maintenance = Number(body.maintenance);
    if (body.bookingAmount !== undefined) set.bookingAmount = Number(body.bookingAmount);
    if (body.negotiable !== undefined) set.negotiable = body.negotiable === true || body.negotiable === "true";
    if (body.projectName !== undefined) set.projectName = body.projectName;
    if (body.developerName !== undefined) set.developerName = body.developerName;
    if (body.superBuiltupArea !== undefined) set.superBuiltupArea = Number(body.superBuiltupArea);
    if (body.carpetArea !== undefined) set.carpetArea = Number(body.carpetArea);
    if (body.floorNo !== undefined) set.floorNo = Number(body.floorNo);
    if (body.totalFloors !== undefined) set.totalFloors = Number(body.totalFloors);
  } else if (["RentalProperty", "CommercialRentalProperty"].includes(source)) {
    if (body.rent !== undefined) set.rent = typeof body.rent === "object" ? body.rent : { ...(existing.rent || {}), amount: Number(body.rent) };
    if (body.price !== undefined && typeof body.price !== "object") set.rent = { ...(existing.rent || {}), amount: Number(body.price) };
    if (body.bhk !== undefined) set.bhk = body.bhk;
    else if (body.bedrooms !== undefined) set.bhk = body.bedrooms;
    if (body.transactionType !== undefined) set.transactionType = body.transactionType === "Lease" ? "Rent" : body.transactionType;
    if (body.listingType !== undefined) set.listingType = body.listingType;
    if (body.furnishing && typeof body.furnishing === "object") set.furnishing = body.furnishing;
    if (body.specifications) set.specifications = body.specifications;
    if (body.areaDetails) set.areaDetails = body.areaDetails;
    if (body.propertyHighlights) set.propertyHighlights = body.propertyHighlights;
    if (body.media) set.media = body.media;
  } else if (["ResidentialSaleProperty", "CommercialSaleProperty"].includes(source)) {
    if (body.price !== undefined) set.price = typeof body.price === "object" ? body.price : { ...(existing.price || {}), amount: Number(body.price) };
    if (body.bhk !== undefined) set.bhk = body.bhk;
    else if (body.bedrooms !== undefined) set.bhk = body.bedrooms;
    if (body.transactionType !== undefined) set.transactionType = body.transactionType;
    if (body.listingType !== undefined) set.listingType = body.listingType;
    if (body.furnishing && typeof body.furnishing === "object") set.furnishing = body.furnishing;
    if (body.specifications) set.specifications = body.specifications;
    if (body.areaDetails) set.areaDetails = body.areaDetails;
    if (body.propertyHighlights) set.propertyHighlights = body.propertyHighlights;
    if (body.media) set.media = body.media;
  }

  if (files?.images?.length) {
    const uploaded = normalizeUploadedImages(files.images);
    const existingImages = existing?.media?.images || existing?.images || [];
    if (["NewProperty"].includes(source)) set.images = [...existingImages, ...uploaded];
    else set.media = { ...(existing.media || {}), images: [...existingImages, ...uploaded] };
  }

  const requestedVideoUrl = typeof body.videoUrl === "string"
    ? body.videoUrl.trim()
    : (typeof body.videoLink === "string" ? body.videoLink.trim() : "");

  if (requestedVideoUrl) {
    if (source === "NewProperty") {
      set.video = requestedVideoUrl;
      set.videoLink = requestedVideoUrl;
    } else {
      set.media = {
        ...(set.media || existing.media || {}),
        videos: [{ url: requestedVideoUrl, title: "Property tour", source: "url" }],
      };
      set.video = requestedVideoUrl;
      set.videoLink = requestedVideoUrl;
    }
  } else if (files?.video?.[0]) {
    const video = { url: fileUrl(files.video[0]), publicId: files.video[0].filename || files.video[0].public_id || null, title: "Property tour", source: "upload" };
    if (source === "NewProperty") set.video = video.url;
    else set.media = { ...(set.media || existing.media || {}), videos: [video] };
  }

  if (files?.floorPlan?.[0]) set.floorPlan = { url: fileUrl(files.floorPlan[0]), publicId: files.floorPlan[0].filename || files.floorPlan[0].public_id || null, name: files.floorPlan[0].originalname || "" };
  if (files?.reraCertificate?.[0]) set.reraCertificate = { url: fileUrl(files.reraCertificate[0]), publicId: files.reraCertificate[0].filename || files.reraCertificate[0].public_id || null, name: files.reraCertificate[0].originalname || "" };

  delete set.data;
  delete set.updatedByUserId;
  delete set.updatedByName;
  delete set.updatedByRole;
  delete set.statusRemarks;
  delete set.existingImages;
  delete set.imageMeta;

  return set;
};

export const getUnifiedAdminProperties = async (req, res) => {
  try {
    const query = buildUnifiedAdminQuery(req.query);
    const [properties, all] = await Promise.all([
      findUnifiedProperties(query, { sort: { createdAt: -1 } }),
      findUnifiedProperties({}, { sort: { createdAt: -1 } }),
    ]);
    const nonDraft = all.filter((item) => String(item.status).toLowerCase() !== "draft");
    const roleCount = (roles) => nonDraft.filter((item) => roles.includes(String(item?.addedBy?.role || "").toLowerCase())).length;
    const draftAdmin = all.filter((item) => String(item.status).toLowerCase() === "draft" && String(item?.addedBy?.role || "").toLowerCase() === "admin").length;

    return res.json({
      success: true,
      count: properties.length,
      total: all.length,
      counts: {
        all: nonDraft.length,
        admin: roleCount(["admin"]),
        partner: roleCount(["partner"]),
        seller: roleCount(["seller", "owner"]),
        draftAdmin,
      },
      data: properties,
      properties,
    });
  } catch (error) {
    console.error("UNIFIED ADMIN PROPERTIES ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch properties", error: error.message });
  }
};

export const getUnifiedAdminPropertyById = async (req, res) => {
  try {
    const property = await findUnifiedPropertyById(req.params.id);
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    return res.json({ success: true, data: property });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to get property", error: error.message });
  }
};

export const updateUnifiedProperty = async (req, res) => {
  try {
    const id = objectId(req.params.id);
    if (!id) return res.status(400).json({ success: false, message: "Invalid property ID" });
    const collection = getPropertyCollection();
    const existing = await collection.findOne({ _id: id });
    if (!existing) return res.status(404).json({ success: false, message: "Property not found" });
    const body = parseBody(req.body || {});
    const set = prepareUpdate(body, existing, req.files || {});

    if (body.status && body.status !== existing.status) {
      set.statusHistory = [
        ...(existing.statusHistory || []),
        {
          status: body.status,
          updatedAt: new Date(),
          updatedBy: { userId: objectId(body.updatedByUserId) || req.user?._id || null, name: body.updatedByName || req.user?.name || "Admin", role: body.updatedByRole || req.user?.role || "Admin" },
          remarks: body.statusRemarks || "Property status updated",
        },
      ];
    }

    set.updatedAt = new Date();
    await collection.updateOne({ _id: id }, { $set: set });
    const updated = await findUnifiedPropertyById(req.params.id);
    return res.json({ success: true, message: "Property updated successfully", data: updated });
  } catch (error) {
    console.error("UNIFIED PROPERTY UPDATE ERROR:", error);
    return res.status(400).json({ success: false, message: error.message || "Failed to update property" });
  }
};

export const updateUnifiedPropertyStatus = async (req, res) => {
  try {
    const id = objectId(req.params.id);
    const { status, notes = "", rejectionReason = "" } = req.body || {};
    const allowedStatuses = ["Reviewing", "Verified", "Live", "Rejected", "Sold", "Rented"];
    if (!id) return res.status(400).json({ success: false, message: "Invalid property ID" });
    if (!allowedStatuses.includes(status)) return res.status(400).json({ success: false, message: "Invalid property status" });

    const collection = getPropertyCollection();
    const property = await collection.findOne({ _id: id });
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });

    const verification = status === "Reviewing" ? "In_Progress" : status === "Verified" ? "Verified" : status === "Rejected" ? "Rejected" : property.propertyVerificationStatus || "Pending";
    if (status === "Live" && verification !== "Verified") return res.status(400).json({ success: false, message: "Property must be verified before making it Live." });

    const history = {
      status,
      updatedAt: new Date(),
      updatedBy: { userId: req.user?._id || null, name: req.user?.name || "Admin", role: req.user?.role || "Admin" },
      remarks: status === "Rejected" ? rejectionReason : notes || `Property status changed from ${property.status} to ${status}`,
    };

    const set = {
      status,
      propertyVerificationStatus: verification,
      "review.notes": notes,
      "review.reviewedAt": new Date(),
      "review.rejectionReason": status === "Rejected" ? rejectionReason : "",
      updatedAt: new Date(),
    };
    if (["Sold", "Rented", "Rejected"].includes(status)) {
      set["boost.isBoosted"] = false;
      set["boost.boostType"] = null;
      set["boost.startDate"] = null;
      set["boost.endDate"] = null;
    }

    await collection.updateOne({ _id: id }, { $set: set, $push: { statusHistory: history } });
    const updated = await findUnifiedPropertyById(req.params.id);
    return res.json({ success: true, message: `Property status changed from ${property.status} to ${status}`, data: updated });
  } catch (error) {
    console.error("UNIFIED STATUS UPDATE ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to update status", error: error.message });
  }
};

export const boostUnifiedProperty = async (req, res) => {
  try {
    const id = objectId(req.params.id);
    if (!id) return res.status(400).json({ success: false, message: "Invalid property ID" });
    const collection = getPropertyCollection();
    const property = await collection.findOne({ _id: id });
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    if (property.status !== "Live") return res.status(400).json({ success: false, message: "Only Live property can be boosted" });
    const days = Number(req.body?.days || 7);
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + days * 86400000);
    await collection.updateOne({ _id: id }, { $set: {
      "boost.isBoosted": true,
      "boost.boostType": req.body?.boostType || "Featured",
      "boost.startDate": startDate,
      "boost.endDate": endDate,
      "boost.boostedBy": { userId: req.user?._id || null, name: req.user?.name || "Admin", role: req.user?.role || "Admin" },
      updatedAt: new Date(),
    } });
    return res.json({ success: true, message: "Property boosted successfully", data: await findUnifiedPropertyById(req.params.id) });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Property boost failed", error: error.message });
  }
};

export const unboostUnifiedProperty = async (req, res) => {
  try {
    const id = objectId(req.params.id);
    if (!id) return res.status(400).json({ success: false, message: "Invalid property ID" });
    const collection = getPropertyCollection();
    const result = await collection.updateOne({ _id: id }, { $set: {
      "boost.isBoosted": false,
      "boost.boostType": null,
      "boost.startDate": null,
      "boost.endDate": null,
      "boost.boostedBy": { userId: null, name: "", role: "" },
      updatedAt: new Date(),
    } });
    if (!result.matchedCount) return res.status(404).json({ success: false, message: "Property not found" });
    return res.json({ success: true, message: "Property boost removed", data: await findUnifiedPropertyById(req.params.id) });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to remove boost", error: error.message });
  }
};

export const deleteUnifiedProperty = async (req, res) => {
  try {
    const id = objectId(req.params.id);
    if (!id) return res.status(400).json({ success: false, message: "Invalid property ID" });
    const collection = getPropertyCollection();
    const result = await collection.deleteOne({ _id: id });
    if (!result.deletedCount) return res.status(404).json({ success: false, message: "Property not found" });
    return res.json({ success: true, message: "Property deleted successfully", data: { _id: req.params.id } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete property", error: error.message });
  }
};


export const getUnifiedPropertiesByPartner = async (req, res) => {
  try {
    const partnerId = String(req.params.partnerId || "").trim();
    if (!partnerId) return res.status(400).json({ success: false, message: "Partner ID is required" });
    const collection = getPropertyCollection();
    const docs = await collection.find({
      $or: [
        { "addedBy.partnerId": partnerId },
        { "createdBy.id": objectId(partnerId) || partnerId },
        { "assignedPartner.partnerId": objectId(partnerId) || partnerId },
      ],
    }).sort({ createdAt: -1 }).toArray();
    const properties = docs.map(normalizeUnifiedProperty);
    return res.json({ success: true, count: properties.length, data: properties, properties });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to get partner properties", error: error.message });
  }
};

export const getUnifiedLivePropertiesController = async (req, res) => {
  try {
    const result = await getUnifiedLiveProperties(req.query);
    return res.json({ success: true, message: "Live verified properties fetched successfully", ...result });
  } catch (error) {
    console.error("UNIFIED LIVE PROPERTY ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch properties", error: error.message });
  }
};
