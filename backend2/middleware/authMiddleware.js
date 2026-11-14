import jwt from "jsonwebtoken";
import { assertAccountActive } from "../services/accountDeletionService.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    const authHeader =
      req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Not authorized. Token missing.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = {
      id:
        decoded.id ||
        decoded._id ||
        decoded.userId,

      role: decoded.role,
    };

    if (!req.user.id) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authentication token.",
      });
    }

    // A deleted buyer/seller/partner must be rejected even if an old JWT
    // is still present in the browser. Admin authentication is unaffected.
    try {
      await assertAccountActive(req.user.id, req.user.role);
    } catch (accountError) {
      if (accountError?.code === "ACCOUNT_DELETED") {
        return res.status(403).json({
          success: false,
          code: "ACCOUNT_DELETED",
          message: "This account has been deleted and can no longer access DigiNiwas.",
        });
      }
      if (accountError?.code === "ACCOUNT_NOT_FOUND") {
        return res.status(401).json({
          success: false,
          message: "Account no longer exists.",
        });
      }
      throw accountError;
    }

    next();
  } catch (error) {
    console.error(
      "Auth Middleware Error:",
      error
    );

    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token.",
    });
  }
};

// Use after `protect` on routes which must only be called from the admin panel.
export const requireAdmin = (req, res, next) => {
  if (String(req.user?.role || "").toLowerCase() !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access is required.",
    });
  }

  next();
};
