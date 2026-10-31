import crypto from "crypto";
import axios from "axios";
import mongoose from "mongoose";
import Partner from "../../models/Partner.js";
import CreditPurchaseOrder from "../../models/CreditPurchaseOrder.js";
import { calculateCreditsFromAmount } from "../../services/creditPricingService.js";
import { creditPartnerWallet } from "../../services/creditWalletService.js";

const razorpayConfig = () => {
  const keyId = String(process.env.RAZORPAY_KEY_ID || "").trim();
  const keySecret = String(process.env.RAZORPAY_KEY_SECRET || "").trim();
  if (!keyId || !keySecret) {
    const error = new Error("Razorpay credentials are not configured on the server.");
    error.code = "RAZORPAY_NOT_CONFIGURED";
    throw error;
  }
  return { keyId, keySecret };
};

const razorpayClient = () => {
  const { keyId, keySecret } = razorpayConfig();
  return axios.create({
    baseURL: "https://api.razorpay.com/v1",
    auth: { username: keyId, password: keySecret },
    timeout: 15000,
  });
};

const getPartnerFromAuth = async (req) => {
  const partnerMongoId = req.user?.id || req.user?._id;
  if (!partnerMongoId || !mongoose.Types.ObjectId.isValid(partnerMongoId)) return null;
  return Partner.findById(partnerMongoId).select(
    "_id partnerId name email accountType isSubPartner isApproved isVerified isBlocked applicationStatus permissions"
  );
};

const validateBuyer = (partner) => {
  if (!partner) {
    const error = new Error("Partner not found.");
    error.statusCode = 404;
    throw error;
  }
  if (partner.accountType === "subagent" || partner.isSubPartner) {
    const error = new Error("Sub-Agents cannot buy credits. Credits must be allocated by the Team / Agency Owner.");
    error.statusCode = 403;
    throw error;
  }
  if (
    !partner.isApproved ||
    !partner.isVerified ||
    partner.isBlocked ||
    partner.applicationStatus !== "Verified" ||
    !partner.permissions?.canSpendCredits
  ) {
    const error = new Error("Only approved and finally verified partners can buy credits.");
    error.statusCode = 403;
    throw error;
  }
};

const idempotencyKeyFromRequest = (req) =>
  String(req.body?.idempotencyKey || req.get("Idempotency-Key") || "").trim();

const verifyCheckoutSignature = ({ orderId, paymentId, signature, secret }) => {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  const received = String(signature || "");
  if (!/^[a-f0-9]{64}$/i.test(received)) return false;
  return crypto.timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(received, "utf8"));
};

// POST /api/v1/credits/purchase/order
// Creates a Razorpay order. Credits are NOT added here.
export const createCreditPurchaseOrder = async (req, res) => {
  try {
    const partner = await getPartnerFromAuth(req);
    validateBuyer(partner);

    const amount = Number(req.body?.amountInRupees);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: "amountInRupees must be greater than 0." });
    }

    const amountInPaise = Math.round(amount * 100);
    if (amountInPaise < 100) {
      return res.status(400).json({ success: false, message: "Minimum payment amount is ₹1." });
    }

    // const suppliedIdempotencyKey = idempotencyKeyFromRequest(req);
    // if (suppliedIdempotencyKey) {
    //   const existing = await CreditPurchaseOrder.findOne({
    //     partnerId: partner._id,
    //     idempotencyKey: suppliedIdempotencyKey,
    //   });
    //   if (existing) {
    //     const { keyId } = razorpayConfig();
    //     return res.status(200).json({
    //       success: true,
    //       data: {
    //         keyId,
    //         orderId: existing.orderId,
    //         amount: existing.amountInPaise,
    //         currency: existing.currency,
    //         credits: existing.credits,
    //         status: existing.status,
    //       },
    //     });
    //   }
    // }
const suppliedIdempotencyKey = idempotencyKeyFromRequest(req);

if (suppliedIdempotencyKey) {
  const existing = await CreditPurchaseOrder.findOne({
    partnerId: partner._id,
    idempotencyKey: suppliedIdempotencyKey,
  });

  if (existing) {
    // Same idempotency key + different amount means
    // client accidentally reused an old purchase key.
    if (Number(existing.amountInRupees) !== amount) {
      return res.status(409).json({
        success: false,
        message:
          "This idempotencyKey was already used for a different purchase amount.",
        data: {
          idempotencyKey: suppliedIdempotencyKey,
          existingAmountInRupees: existing.amountInRupees,
          requestedAmountInRupees: amount,
          existingOrderId: existing.orderId,
        },
      });
    }

    // Same key + same amount = safe retry.
    const { keyId } = razorpayConfig();

    return res.status(200).json({
      success: true,
      message: "Existing credit purchase order returned.",
      data: {
        keyId,
        orderId: existing.orderId,
        amount: existing.amountInPaise,
        amountInRupees: existing.amountInRupees,
        currency: existing.currency,
        credits: existing.credits,
        status: existing.status,
      },
    });
  }
}
    const pricing = await calculateCreditsFromAmount(amount);
    const razorpay = razorpayClient();
    const receipt = `credit_${partner.partnerId || partner._id}_${Date.now()}`.slice(0, 40);

    const { data: razorpayOrder } = await razorpay.post("/orders", {
      amount: amountInPaise,
      currency: "INR",
      receipt,
      notes: {
        partnerId: String(partner._id),
        partnerCode: String(partner.partnerId || ""),
        credits: String(pricing.credits),
      },
    });

    const purchaseOrder = await CreditPurchaseOrder.create({
      orderId: razorpayOrder.id,
      partnerId: partner._id,
      partnerCode: partner.partnerId || "",
      amountInRupees: amount,
      amountInPaise,
      currency: "INR",
      credits: pricing.credits,
      creditsPerRupee: pricing.creditsPerRupee,
      pricingVersion: pricing.settingVersion,
      idempotencyKey: suppliedIdempotencyKey,
      metadata: { receipt },
    });

    const { keyId } = razorpayConfig();
    return res.status(201).json({
      success: true,
      message: "Razorpay order created. Credits will be added only after payment verification.",
      data: {
        keyId,
        orderId: purchaseOrder.orderId,
        amount: purchaseOrder.amountInPaise,
        amountInRupees: purchaseOrder.amountInRupees,
        currency: purchaseOrder.currency,
        credits: purchaseOrder.credits,
        status: purchaseOrder.status,
      },
    });
  } catch (error) {
    const status = error.statusCode || (error.code === "RAZORPAY_NOT_CONFIGURED" ? 500 : 500);
    return res.status(status).json({ success: false, message: error.message || "Unable to create Razorpay order." });
  }
};

// POST /api/v1/credits/purchase/verify
// Verifies Razorpay signature + fetches payment from Razorpay before adding credits.
export const verifyCreditPurchase = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const partner = await getPartnerFromAuth(req);
    validateBuyer(partner);

    const razorpayOrderId = String(req.body?.razorpay_order_id || "").trim();
    const razorpayPaymentId = String(req.body?.razorpay_payment_id || "").trim();
    const razorpaySignature = String(req.body?.razorpay_signature || "").trim();

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "razorpay_order_id, razorpay_payment_id and razorpay_signature are required.",
      });
    }

    const purchaseOrder = await CreditPurchaseOrder.findOne({
      orderId: razorpayOrderId,
      partnerId: partner._id,
    });

    if (!purchaseOrder) {
      return res.status(404).json({ success: false, message: "Credit purchase order not found." });
    }

    if (purchaseOrder.status === "PAID") {
      const currentPartner = await Partner.findById(partner._id).select("creditWallet").lean();
      return res.status(200).json({
        success: true,
        message: "Payment was already processed.",
        data: { creditsAdded: purchaseOrder.credits, wallet: currentPartner?.creditWallet, orderId: purchaseOrder.orderId },
      });
    }

    const { keySecret } = razorpayConfig();
    if (!verifyCheckoutSignature({ orderId: purchaseOrder.orderId, paymentId: razorpayPaymentId, signature: razorpaySignature, secret: keySecret })) {
      purchaseOrder.status = "FAILED";
      await purchaseOrder.save();
      return res.status(400).json({ success: false, message: "Invalid Razorpay payment signature." });
    }

    const razorpay = razorpayClient();
    const { data: payment } = await razorpay.get(`/payments/${encodeURIComponent(razorpayPaymentId)}`);

    if (payment.order_id !== purchaseOrder.orderId) {
      return res.status(400).json({ success: false, message: "Payment does not belong to this order." });
    }
    if (Number(payment.amount) !== purchaseOrder.amountInPaise || String(payment.currency) !== purchaseOrder.currency) {
      return res.status(400).json({ success: false, message: "Paid amount does not match the credit purchase order." });
    }
    if (payment.status !== "captured") {
      return res.status(400).json({ success: false, message: `Payment is not captured yet. Current status: ${payment.status}.` });
    }

    let result;
    await session.withTransaction(async () => {
      const lockedOrder = await CreditPurchaseOrder.findOne({
        _id: purchaseOrder._id,
        status: { $ne: "PAID" },
      }).session(session);

      if (!lockedOrder) return;

      result = await creditPartnerWallet({
        partnerId: partner._id,
        credits: lockedOrder.credits,
        type: "PURCHASE",
        amountInRupees: lockedOrder.amountInRupees,
        bucket: "PAID",
        productCode: "CREDIT_PURCHASE",
        referenceType: "Payment",
        payment: {
          provider: "razorpay",
          paymentId: razorpayPaymentId,
          orderId: lockedOrder.orderId,
          signatureVerified: true,
          reconciliationStatus: "MATCHED",
        },
        description: `Purchased ${lockedOrder.credits} credits for ₹${lockedOrder.amountInRupees}`,
        metadata: {
          razorpayPaymentStatus: payment.status,
          creditsPerRupee: lockedOrder.creditsPerRupee,
          pricingVersion: lockedOrder.pricingVersion,
        },
        actor: {
          userId: partner._id,
          name: partner.name,
          role: partner.role || "partner",
        },
        idempotencyKey: `RAZORPAY:${lockedOrder.orderId}`,
        session,
      });

      lockedOrder.status = "PAID";
      lockedOrder.razorpayPaymentId = razorpayPaymentId;
      lockedOrder.razorpaySignature = razorpaySignature;
      lockedOrder.creditTransactionId = result.transaction._id;
      await lockedOrder.save({ session });
    });

    if (!result) {
      const existing = await CreditPurchaseOrder.findById(purchaseOrder._id).lean();
      const currentPartner = await Partner.findById(partner._id).select("creditWallet").lean();
      return res.status(200).json({
        success: true,
        message: "Payment was already processed.",
        data: { creditsAdded: existing?.credits || purchaseOrder.credits, wallet: currentPartner?.creditWallet, orderId: purchaseOrder.orderId },
      });
    }

    return res.status(200).json({
      success: true,
      message: `${purchaseOrder.credits} credits added successfully.`,
      data: {
        creditsAdded: purchaseOrder.credits,
        wallet: result.partner.creditWallet,
        transaction: result.transaction,
        orderId: purchaseOrder.orderId,
        paymentId: razorpayPaymentId,
      },
    });
  } catch (error) {
    console.error("Razorpay credit verification error:", error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Unable to verify Razorpay payment.",
    });
  } finally {
    await session.endSession();
  }
};
