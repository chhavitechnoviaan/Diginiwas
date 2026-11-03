import { normalizeAccountType, softDeleteAccount } from "../services/accountDeletionService.js";

export const deleteOwnAccount = async (req, res) => {
  try {
    const id = req.user?.id || req.user?._id || req.user?.userId;
    const role = req.user?.role || "";

    if (!id) {
      return res.status(401).json({ success: false, message: "Authentication required." });
    }

    const normalizedType = normalizeAccountType(role);
    if (!normalizedType) {
      return res.status(400).json({
        success: false,
        message: "Only buyer, seller and partner accounts can be deleted through this endpoint.",
      });
    }

    const result = await softDeleteAccount({
      id,
      type: normalizedType,
      deletedBy: { userId: id, role: role || normalizedType },
      reason: req.body?.reason || "Account deleted by user",
    });

    return res.json({
      success: true,
      message: result.alreadyDeleted ? "Account is already deleted." : "Account deleted successfully.",
      data: {
        accountType: result.type,
        isDeleted: true,
        hiddenPropertyCount: result.hiddenPropertyCount,
      },
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Unable to delete account.",
    });
  }
};

export const adminDeleteAccount = async (req, res) => {
  try {
    const type = normalizeAccountType(req.params.type);
    if (!type || !["buyer", "seller", "partner"].includes(type)) {
      return res.status(400).json({ success: false, message: "Type must be buyer, seller or partner." });
    }

    const result = await softDeleteAccount({
      id: req.params.id,
      type,
      deletedBy: { userId: req.user?.id || null, role: "admin" },
      reason: req.body?.reason || "Account deleted by admin",
    });

    return res.json({
      success: true,
      message: result.alreadyDeleted ? "Account is already deleted." : "Account deleted successfully.",
      data: {
        accountType: result.type,
        isDeleted: true,
        hiddenPropertyCount: result.hiddenPropertyCount,
      },
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Unable to delete account.",
    });
  }
};
