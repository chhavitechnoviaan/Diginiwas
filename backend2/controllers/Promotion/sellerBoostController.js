import mongoose from "mongoose";
import Property from "../../models/NewProperty.js";
import Partner from "../../models/Partner.js";
import SellerBoostRequest from "../../models/SellerBoostRequest.js";
import PromotionRequest from "../../models/PromotionRequest.js";
import { getCreditProduct } from "../../services/creditPricingService.js";
import { createPromotionRequest } from "./promotionV2Controller.js";
import { notifyUser } from "../../services/notificationService.js";
import { notifyAdmins } from "../../services/adminNotificationService.js";

const allowed = new Set(["PROPERTY_BOOST", "FEATURED_7_DAYS", "LOCALITY_TOP_30_DAYS"]);
const error = (res, code, message) => res.status(code).json({ success: false, message });
const role = req => String(req.user?.role || "").toLowerCase();
const assignedPartner = async property => {
  const id = property.assignedPartner?.partnerId;
  if (id && mongoose.isValidObjectId(id)) return Partner.findById(id);
  const code = property.assignedPartner?.partnerCode;
  return code ? Partner.findOne({ partnerId: code }) : null;
};
const ownsProperty = (req, property) =>
  ["seller", "owner"].includes(role(req)) && String(property.addedBy?.userId) === String(req.user.id) &&
  ["seller", "owner"].includes(String(property.addedBy?.role || "").toLowerCase());

export async function createSellerBoostRequest(req, res) {
  try {
    const { propertyId, promotionType, message = "" } = req.body;
    if (!mongoose.isValidObjectId(propertyId) || !(allowed.has(promotionType) || (String(promotionType).startsWith("CUSTOM_") && (await getCreditProduct(promotionType))?.targetType === "PROPERTY"))) return error(res, 400, "Valid propertyId and promotionType required");
    const property = await Property.findById(propertyId);
    if (!property) return error(res, 404, "Property not found");
    if (!ownsProperty(req, property)) return error(res, 403, "Only the property seller can request a boost");
    if (property.status !== "Live" || property.propertyVerificationStatus !== "Verified") return error(res, 400, "Only Live and Verified properties can be boosted");
    const partner = await assignedPartner(property);
    if (!partner) return error(res, 400, "The property has no assigned partner");
    if (req.body.partnerId && String(req.body.partnerId) !== String(partner._id)) return error(res, 403, "You can only request the assigned partner");
    const plan = await getCreditProduct(promotionType);
    if (!plan) return error(res, 400, "Credit plan is unavailable");
    const prior = await SellerBoostRequest.findOne({ propertyId: property._id, promotionType, status: { $in: ["PendingPartner", "Processing", "PendingAdmin", "Approved"] } });
    if (prior) return error(res, 409, "An active or pending request for this boost already exists");
    const request = await SellerBoostRequest.create({ sellerId: req.user.id, propertyId, partnerId: partner._id, promotionType, message: String(message).slice(0,1000), creditPriceAtRequest: plan.credits, planSnapshot:{name:plan.name||plan.label,durationDays:plan.durationDays,placement:plan.placement||"BOOST"} });
    await notifyUser({ userId: partner._id, userRole: "partner", title: "Seller requested property boost", message: `A seller has requested ${promotionType} for ${property.title}.`, type: "SELLER_BOOST_REQUEST", entityType: "SellerBoostRequest", entityId: request._id, actionUrl: `/seller-boost-requests/${request._id}`, eventKey: `seller-boost:${request._id}:created` });
    await notifyAdmins({ title: "Seller requested property boost", message: `A seller requested ${promotionType} for ${property.title}; partner approval is pending.`, type: "SELLER_BOOST_REQUEST", entityType: "SellerBoostRequest", entityId: request._id, actionUrl: "/notifications" });
    return res.status(201).json({ success: true, message: "Boost request sent to assigned partner", data: request });
  } catch (e) { return error(res, 500, e.message); }
}

export async function listSellerBoostRequests(req, res) {
  try {
    const seller = ["seller", "owner"].includes(role(req));
    const partner = role(req) === "partner";
    if (!seller && !partner) return error(res, 403, "Seller or partner access required");
    const filter = seller ? { sellerId: req.user.id } : { partnerId: req.user.id };
    const rows = await SellerBoostRequest.find(filter).populate("propertyId", "propertyId title status").sort({ createdAt: -1 }).limit(100).lean();
    return res.json({ success: true, data: rows });
  } catch (e) { return error(res, 500, e.message); }
}

export async function rejectSellerBoostRequest(req, res) {
  if (role(req) !== "partner") return error(res, 403, "Partner access required");
  const request = await SellerBoostRequest.findOneAndUpdate({ _id: req.params.id, partnerId: req.user.id, status: "PendingPartner" }, { $set: { status: "RejectedByPartner", rejectionReason: String(req.body.reason || "").slice(0,1000), decidedAt: new Date() } }, { new: true });
  if (!request) return error(res, 409, "Request unavailable or already decided");
  await notifyUser({ userId: request.sellerId, userRole: "seller", title: "Boost request declined", message: "Your assigned partner declined your property boost request.", type: "SELLER_BOOST_REJECTED", entityType: "SellerBoostRequest", entityId: request._id, eventKey: `seller-boost:${request._id}:rejected` });
  return res.json({ success: true, data: request });
}

export async function approveSellerBoostRequest(req, res) {
  if (role(req) !== "partner") return error(res, 403, "Partner access required");
  let request = await SellerBoostRequest.findOneAndUpdate({ _id: req.params.id, partnerId: req.user.id, status: "PendingPartner" }, { $set: { status: "Processing" } }, { new: true });
  if (!request) return error(res, 409, "Request unavailable, processing, or already decided");
  const property = await Property.findById(request.propertyId);
  const assigned = property && await assignedPartner(property);
  if (!property || String(assigned?._id) !== String(req.user.id) || property.status !== "Live" || property.propertyVerificationStatus !== "Verified") {
    await SellerBoostRequest.updateOne({ _id: request._id, status: "Processing" }, { $set: { status: "PendingPartner" } });
    return error(res, 409, "Property or partner assignment has changed");
  }
  // Reuse the existing atomic wallet debit + PromotionRequest creation and Admin approval flow.
  let resultStatus = 200;
  let resultBody;
  const wrappedRes = { status(code) { resultStatus = code; return this; }, json(body) { resultBody = body; return this; } };
  await createPromotionRequest({ ...req, body: { targetType: "PROPERTY", propertyId: String(request.propertyId), partnerId: String(request.partnerId), promotionType: request.promotionType, remarks: `Seller boost request ${request._id}`, idempotencyKey: `seller-boost-${request._id}` } }, wrappedRes);
  if (resultStatus >= 400 || !resultBody?.success) {
    await SellerBoostRequest.updateOne({ _id: request._id, status: "Processing" }, { $set: { status: "PendingPartner" } });
    return res.status(resultStatus >= 400 ? resultStatus : 500).json(resultBody || { success: false, message: "Unable to process boost" });
  }
  const promotion = resultBody.data.request;
  request = await SellerBoostRequest.findByIdAndUpdate(request._id, { $set: { status: "PendingAdmin", promotionRequestId: promotion._id, decidedAt: new Date() } }, { new: true });
  await notifyUser({ userId: request.sellerId, userRole: "seller", title: "Partner accepted your boost", message: "Partner credits have been reserved. Admin approval is pending.", type: "SELLER_BOOST_ACCEPTED", entityType: "SellerBoostRequest", entityId: request._id, eventKey: `seller-boost:${request._id}:accepted` });
  return res.json({ success: true, message: "Partner approved; credits reserved; Admin review pending", data: { request, promotionRequest: promotion, wallet: resultBody.data.wallet } });
}

export async function getSellerBoostRequest(req,res) {
  const request = await SellerBoostRequest.findById(req.params.id).lean();
  if (!request) return error(res,404,"Request not found");
  if (String(request.sellerId)!==String(req.user.id) && String(request.partnerId)!==String(req.user.id) && role(req)!=="admin") return error(res,403,"Access denied");
  const promotion = request.promotionRequestId ? await PromotionRequest.findById(request.promotionRequestId).select("status creditsCharged expiresAt approvedAt adminRemarks").lean() : null;
  return res.json({success:true,data:{...request,adminPromotion:promotion}});
}
