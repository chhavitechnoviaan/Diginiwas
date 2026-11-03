import mongoose from "mongoose";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";
import Partner from "../models/Partner.js";
import NewProperty from "../models/NewProperty.js";

const MODEL_BY_TYPE = {
  buyer: Buyer,
  seller: Seller,
  partner: Partner,
};

const normalizeType = (value = "") => {
  const type = String(value).trim().toLowerCase();
  if (["buyer", "tenant"].includes(type)) return "buyer";
  if (["seller", "owner"].includes(type)) return "seller";
  if (["partner", "agent", "agency_owner", "team_manager", "subagent", "sub partner", "sub-partner"].includes(type)) return "partner";
  return "";
};

export const normalizeAccountType = normalizeType;

export const findAccountById = async (id, type = "") => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { type: "", Model: null, account: null };
  }
  const normalizedType = normalizeType(type);
  if (normalizedType) {
    const Model = MODEL_BY_TYPE[normalizedType];
    return { type: normalizedType, Model, account: await Model.findById(id) };
  }

  const [buyer, seller, partner] = await Promise.all([
    Buyer.findById(id),
    Seller.findById(id),
    Partner.findById(id),
  ]);

  if (buyer) return { type: "buyer", Model: Buyer, account: buyer };
  if (seller) return { type: "seller", Model: Seller, account: seller };
  if (partner) return { type: "partner", Model: Partner, account: partner };
  return { type: "", Model: null, account: null };
};

export const softDeleteAccount = async ({ id, type, deletedBy = null, reason = "" }) => {
  const found = await findAccountById(id, type);
  if (!found.account) {
    const error = new Error("Account not found");
    error.status = 404;
    throw error;
  }

  const { account, Model } = found;
  const now = new Date();

  if (account.isDeleted) {
    return { type: found.type, account, alreadyDeleted: true, hiddenPropertyCount: 0 };
  }

  const update = {
    isDeleted: true,
    deletedAt: now,
    deletionReason: String(reason || "Account deleted").trim(),
  };

  if (found.type === "buyer") {
    update.status = "Blocked";
    account.status = "Blocked";
  } else if (found.type === "seller") {
    update.accountStatus = "BLOCKED";
    update.applicationStatus = "WITHDRAWN";
    account.accountStatus = "BLOCKED";
    account.applicationStatus = "WITHDRAWN";
  } else if (found.type === "partner") {
    update.isBlocked = true;
    update.isApproved = false;
    update.permissions = {
      ...(account.permissions?.toObject?.() || account.permissions || {}),
      canReceiveAssignments: false,
      canCreateVisitRequest: false,
      canUnlockLead: false,
      canSpendCredits: false,
      canManageTeam: false,
      canAllocateCredits: false,
      canVerifyProperty: false,
      canSubmitPropertyForAdminApproval: false,
    };
    account.isBlocked = true;
    account.isApproved = false;
    account.permissions = update.permissions;
  }

  await Model.updateOne({ _id: account._id }, { $set: update });

  // A deleted account's properties should disappear from all listings,
  // assignment queues, dashboards and public search results.
  const accountId = account._id;
  const accountIdString = String(account._id);

  const propertyResult = await NewProperty.updateMany(
    {
      $or: [
        { "addedBy.userId": { $in: [accountId, accountIdString] } },
        { "createdBy.id": { $in: [accountId, accountIdString] } },
        { "createdBy.userId": { $in: [accountId, accountIdString] } },
      ],
    },
    {
      $set: {
        isActive: false,
        deletedByAccount: true,
        ownerAccountDeletedAt: now,
        updatedAt: now,
      },
    }
  );

  // Never leave a deleted partner referenced by assignment queues or property
  // records. Their assigned properties remain available for reassignment.
  let unassignedCount = 0;
  if (found.type === "partner") {
    const assignedCleanup = await NewProperty.updateMany(
      {
        "assignedPartner.partnerId": { $in: [accountId, accountIdString] },
      },
      {
        $unset: { assignedPartner: "" },
        $set: { status: "Submitted", updatedAt: now },
      }
    );
    unassignedCount = assignedCleanup.modifiedCount || 0;

    await Partner.updateOne(
      { _id: accountId },
      { $set: { assignedProperties: [] } }
    );
  }

  return {
    type: found.type,
    account,
    alreadyDeleted: false,
    hiddenPropertyCount: (propertyResult.modifiedCount || 0) + unassignedCount,
    deletedBy,
  };
};

export const assertAccountActive = async (id, role) => {
  const normalizedRole = normalizeType(role);
  if (!normalizedRole) return null;

  const Model = MODEL_BY_TYPE[normalizedRole];
  const account = await Model.findById(id).select("isDeleted isBlocked isApproved status accountStatus").lean();

  if (!account) {
    const error = new Error("Account not found");
    error.code = "ACCOUNT_NOT_FOUND";
    error.status = 401;
    throw error;
  }

  if (account.isDeleted) {
    const error = new Error("ACCOUNT_DELETED");
    error.code = "ACCOUNT_DELETED";
    error.status = 403;
    throw error;
  }

  return account;
};
