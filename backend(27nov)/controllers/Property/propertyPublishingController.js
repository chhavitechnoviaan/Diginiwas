import mongoose from "mongoose";
import Partner from "../../models/Partner.js";
import {
  getPropertyCollection,
  normalizeUnifiedProperty,
} from "../../services/unifiedPropertyService.js";

const idObject = (id) => {
  try {
    return new mongoose.Types.ObjectId(id);
  } catch {
    return null;
  }
};

const escapeRegex = (value = "") => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const partnerIdOf = (property) => property?.assignedPartner?.partnerId || null;

const hydrateProperty = async (doc) => {
  if (!doc) return null;
  const property = normalizeUnifiedProperty(doc);
  const assignedId = partnerIdOf(doc);
  let partner = null;

  if (assignedId && mongoose.Types.ObjectId.isValid(String(assignedId))) {
    partner = await Partner.findById(assignedId)
      .select("partnerId name email phone accountType partnerType isVerified isBlocked location")
      .lean();
  }

  const assignedPartner = doc.assignedPartner
    ? { ...doc.assignedPartner, partnerId: partner || assignedId || null }
    : null;

  return {
    ...property,
    assignedPartner,
    images: property.images || [],
    media: property.media || { images: property.images || [], videos: [] },
  };
};

const buildSearchClauses = (search = "") => {
  if (!search.trim()) return null;
  const value = escapeRegex(search.trim());
  const rx = new RegExp(value, "i");
  return [
    { title: rx },
    { propertyId: rx },
    { city: rx },
    { "location.city": rx },
    { locality: rx },
    { "location.locality": rx },
    { address: rx },
    { "location.address": rx },
    { propertyType: rx },
    { category: rx },
    { buildingType: rx },
    { transactionType: rx },
    { listingType: rx },
    { projectName: rx },
    { developerName: rx },
    { "assignedPartner.name": rx },
    { "assignedPartner.partnerCode": rx },
  ];
};

const applyCommonFilters = (query, { search = "", city = "", category = "", transactionType = "", buildingType = "", propertyType = "" } = {}) => {
  const clauses = [];

  if (city && city !== "All") {
    const rx = new RegExp(`^${escapeRegex(String(city).trim())}$`, "i");
    clauses.push({ $or: [{ city: rx }, { "location.city": rx }] });
  }

  if (buildingType && buildingType !== "All") {
    const rx = new RegExp(`^${escapeRegex(String(buildingType).trim())}$`, "i");
    clauses.push({ buildingType: rx });
  }

  if (propertyType && propertyType !== "All") {
    const rx = new RegExp(`^${escapeRegex(String(propertyType).trim())}$`, "i");
    clauses.push({ propertyType: rx });
  }

  if (category && category !== "All") {
    const value = String(category).trim().toLowerCase();
    if (["residential", "commercial"].includes(value)) {
      clauses.push({ buildingType: new RegExp(`^${String(category).trim()}$`, "i") });
    } else if (["sell", "sale", "buy"].includes(value)) {
      clauses.push({ transactionType: { $in: ["Sale", "Resale", "New Booking"] } });
    } else if (["rent", "rental", "lease"].includes(value)) {
      clauses.push({ $or: [{ transactionType: "Rent" }, { listingType: { $in: ["Rent", "Lease"] } }] });
    } else {
      clauses.push({ category });
    }
  }

  if (transactionType && transactionType !== "All") {
    const value = String(transactionType).trim().toLowerCase();
    if (["rent", "lease"].includes(value)) {
      clauses.push({ $or: [{ transactionType: "Rent" }, { listingType: { $in: ["Rent", "Lease"] } }] });
    } else {
      clauses.push({ transactionType: { $in: ["Sale", "Sell", "Resale", "New Booking", transactionType] } });
    }
  }

  const searchClauses = buildSearchClauses(search);
  if (searchClauses) clauses.push({ $or: searchClauses });

  if (clauses.length) query.$and = [...(query.$and || []), ...clauses];
  return query;
};

const readyQuery = () => ({
  status: { $nin: ["Draft", "draft", "Rejected", "rejected"] },
});

const liveQuery = () => ({
  status: "Live",
  propertyVerificationStatus: "Verified",
});

export const getPropertyPublishingSummary = async (req, res) => {
  try {
    const collection = getPropertyCollection();
    const [readyForFinalReview, live, verifiedWithoutPartner, totalVerified] = await Promise.all([
      collection.countDocuments(readyQuery()),
      collection.countDocuments(liveQuery()),
      collection.countDocuments({
        propertyVerificationStatus: "Verified",
        $or: [
          { "assignedPartner.partnerId": { $exists: false } },
          { "assignedPartner.partnerId": null },
        ],
      }),
      collection.countDocuments({ propertyVerificationStatus: "Verified" }),
    ]);

    return res.json({ success: true, data: { readyForFinalReview, live, verifiedWithoutPartner, totalVerified } });
  } catch (error) {
    console.error("PROPERTY PUBLISHING SUMMARY ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to fetch property publishing summary.", error: error.message });
  }
};

export const getReadyForFinalReviewProperties = async (req, res) => {
  try {
    const collection = getPropertyCollection();
    let query = readyQuery();
    query = applyCommonFilters(query, req.query);
    const docs = await collection.find(query).sort({ updatedAt: -1, createdAt: -1 }).limit(300).toArray();
    const data = await Promise.all(docs.map(hydrateProperty));
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error("READY FINAL REVIEW PROPERTY ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to fetch final review properties.", error: error.message });
  }
};

export const getLivePublishingProperties = async (req, res) => {
  try {
    const collection = getPropertyCollection();
    let query = liveQuery();
    query = applyCommonFilters(query, req.query);
    const docs = await collection.find(query).sort({ updatedAt: -1, createdAt: -1 }).limit(300).toArray();
    const data = await Promise.all(docs.map(hydrateProperty));
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error("LIVE PROPERTY LIST ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to fetch live properties.", error: error.message });
  }
};

export const getFinalReviewPropertyById = async (req, res) => {
  try {
    const objectId = idObject(req.params.id);
    if (!objectId) return res.status(400).json({ success: false, message: "Invalid property ID." });

    const collection = getPropertyCollection();
    const doc = await collection.findOne({ _id: objectId });
    if (!doc) return res.status(404).json({ success: false, message: "Property not found." });

    const property = await hydrateProperty(doc);
    const partner = property?.assignedPartner?.partnerId && typeof property.assignedPartner.partnerId === "object"
      ? property.assignedPartner.partnerId
      : null;

    const hasImages = Array.isArray(property.images) && property.images.length > 0;
    const hasVideo = Boolean(property.video || property.videoLink || property.media?.videos?.length);
    const partnerAssigned = Boolean(doc.assignedPartner?.partnerId || doc.assignedPartner?.partnerCode);
    const partnerVerified = partnerAssigned ? Boolean(partner?.isVerified) : false;
    const partnerNotBlocked = partnerAssigned ? !Boolean(partner?.isBlocked) : false;

    const checks = {
      propertyVerified: doc.propertyVerificationStatus === "Verified",
      statusEligible: ["Submitted", "Assigned_To_Partner", "Reviewing", "Verified", "Live"].includes(doc.status),
      partnerAssigned,
      partnerVerified,
      partnerNotBlocked,
      hasImages,
      hasFloorPlan: Boolean(property.floorPlan),
      hasReraCertificate: Boolean(property.reraCertificate),
      hasVideo,
    };

    const canMakeLive =
      checks.propertyVerified &&
      doc.status !== "Live" &&
      checks.partnerAssigned &&
      checks.partnerVerified &&
      checks.partnerNotBlocked;

    return res.json({ success: true, data: { property, checks, canMakeLive } });
  } catch (error) {
    console.error("FINAL REVIEW DETAIL ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to fetch final review detail.", error: error.message });
  }
};

export const makePropertyLiveAfterFinalReview = async (req, res) => {
  try {
    const objectId = idObject(req.params.id);
    if (!objectId) return res.status(400).json({ success: false, message: "Invalid property ID." });

    const collection = getPropertyCollection();
    const property = await collection.findOne({ _id: objectId });
    if (!property) return res.status(404).json({ success: false, message: "Property not found." });

    if (property.status === "Live") {
      return res.json({ success: true, alreadyLive: true, message: "Property is already Live.", data: await hydrateProperty(property) });
    }

    if (property.propertyVerificationStatus !== "Verified") {
      return res.status(400).json({ success: false, message: "Only a Verified property can proceed to final publishing." });
    }

    const partnerId = property.assignedPartner?.partnerId;
    if (!partnerId) return res.status(400).json({ success: false, message: "A verified assigned partner is required before making the property Live." });

    const partner = await Partner.findById(partnerId).lean();
    if (!partner) return res.status(400).json({ success: false, message: "Assigned partner not found." });
    if (!partner.isVerified) return res.status(400).json({ success: false, message: "Assigned partner must be verified before the property can be made Live." });
    if (partner.isBlocked) return res.status(400).json({ success: false, message: "Assigned partner is blocked. Property cannot be made Live." });

    const now = new Date();
    const actor = {
      userId: req.user?._id || null,
      name: req.user?.name || "Admin",
      role: req.user?.role || "Admin",
    };

    const statusHistoryItem = {
      status: "Live",
      updatedBy: actor,
      updatedAt: now,
      remarks: req.body?.notes || "Final review completed by admin.",
    };

    await collection.updateOne(
      { _id: objectId },
      {
        $set: {
          status: "Live",
          propertyVerificationStatus: "Verified",
          "review.notes": req.body?.notes || "Final review completed by admin.",
          "review.reviewedAt": now,
          "review.reviewedBy": actor,
          updatedAt: now,
        },
        $push: { statusHistory: statusHistoryItem },
      }
    );

    const updated = await collection.findOne({ _id: objectId });
    return res.json({ success: true, message: "Final review completed. Property is now Live.", data: await hydrateProperty(updated) });
  } catch (error) {
    console.error("MAKE PROPERTY LIVE ERROR:", error);
    return res.status(500).json({ success: false, message: "Unable to make property Live.", error: error.message });
  }
};
