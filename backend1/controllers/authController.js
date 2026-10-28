// // import authService from "../services/authService.js";
// // import Buyer from "../models/Buyer.js";
// // import Seller from "../models/Seller.js";
// // import Partner from "../models/Partner.js";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import { firebaseAdminAuth } from "../config_firebaseAdmin.js";

// // const isBuyerRole = (role) =>
// //   ["buyer", "tenant"].includes(String(role || "").trim().toLowerCase());

// // const isSupportedLoginRole = (role) =>
// //   ["buyer", "tenant", "seller", "owner", "partner"].includes(
// //     String(role || "").trim().toLowerCase()
// //   );

// // export const register = async (req, res) => {
// //   try {
// //     const { name, email, phone, password, role, location, partnerType } = req.body;

// //     if (!name || !email || !phone || !password || !role) {
// //       return res.status(400).json({ success: false, message: "All fields are required" });
// //     }

// //     if (!isBuyerRole(role)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "This endpoint supports buyer/tenant registration only. Use the dedicated seller or partner application API.",
// //       });
// //     }

// //     const user = await authService.registerUser({
// //       name, email, phone, password, role, location, partnerType,
// //     });

// //     return res.status(201).json({
// //       success: true,
// //       message: "Registration successful",
// //       data: {
// //         id: user._id,
// //         sellerId: user.sellerId || null,
// //         partnerId: user.partnerId || null,
// //         name: user.name,
// //         email: user.email,
// //         phone: user.phone,
// //         role: user.role,
// //         partnerType: user.partnerType || null,
// //         location: user.location || null,
// //       },
// //     });
// //   } catch (error) {
// //     return res.status(400).json({ success: false, message: error.message });
// //   }
// // };

// // export const loginWithPassword = async (req, res) => {
// //   try {
// //     const { phone, password, role } = req.body;

// //     if (!phone || !password || !role) {
// //       return res.status(400).json({ success: false, message: "Phone, password and role are required" });
// //     }

// //     if (!isBuyerRole(role)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "This endpoint supports buyer/tenant login only. Use the dedicated seller or partner login API.",
// //       });
// //     }

// //     const { user, token } = await authService.loginWithPassword({ phone, password, role });

// //     return res.status(200).json({
// //       success: true,
// //       message: "Login successful",
// //       token,
// //       data: {
// //         id: user._id,
// //         sellerId: user.sellerId || null,
// //         partnerId: user.partnerId || null,
// //         name: user.name,
// //         phone: user.phone,
// //         role: user.role,
// //         partnerType: user.partnerType || null,
// //         location: user.location || null,
// //       },
// //     });
// //   } catch (error) {
// //     return res.status(401).json({ success: false, message: error.message });
// //   }
// // };

// // // Send OTP to the registered phone number. Works for Buyer, Seller and Partner.
// // export const sendOTP = async (req, res) => {
// //   try {
// //     const { phone, role } = req.body || {};

// //     if (!phone || !role) {
// //       return res.status(400).json({ success: false, message: "Phone number and role are required" });
// //     }

// //     if (!isSupportedLoginRole(role)) {
// //       return res.status(400).json({ success: false, message: "Role must be buyer, seller, or partner" });
// //     }

// //     const result = await authService.sendOTP({ phone, role });

// //     return res.status(200).json({
// //       success: true,
// //       message: "OTP sent successfully to your registered mobile number",
// //       data: result,
// //     });
// //   } catch (error) {
// //     const status = error.code === "ACCOUNT_DELETED" ? 403 : 400;
// //     return res.status(status).json({
// //       success: false,
// //       code: error.code || "OTP_SEND_FAILED",
// //       message: error.message,
// //     });
// //   }
// // };

// // // Resend OTP through the same Twilio Verify service.
// // export const resendOTP = async (req, res) => {
// //   return sendOTP(req, res);
// // };


// // // Firebase Phone Authentication -> DigiNiwas Buyer session.
// // // Firebase verifies the SMS OTP on the client. The ID token is then verified
// // // server-side before a normal DigiNiwas JWT is issued.
// // export const loginWithFirebasePhone = async (req, res) => {
// //   try {
// //     const { idToken, role = "buyer" } = req.body || {};

// //     if (!idToken) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Firebase ID token is required.",
// //       });
// //     }

// //     if (!isBuyerRole(role)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "This Firebase OTP login is available for buyers only.",
// //       });
// //     }

// //     const decoded = await firebaseAdminAuth().verifyIdToken(idToken, true);
// //     const firebaseUid = decoded.uid;
// //     const firebasePhone = String(decoded.phone_number || "").trim();

// //     if (!firebasePhone) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "A verified Firebase phone number is required.",
// //       });
// //     }

// //     const digits = firebasePhone.replace(/\D/g, "");
// //     const localPhone = digits.replace(/^91/, "");
// //     const phoneCandidates = [
// //       firebasePhone,
// //       localPhone,
// //       `+91${localPhone}`,
// //     ].filter(Boolean);

// //     let buyer =
// //       (await Buyer.findOne({ firebaseUid })) ||
// //       (await Buyer.findOne({ phone: { $in: [...new Set(phoneCandidates)] } }));

// //     if (buyer?.isDeleted) {
// //       const error = new Error("This account has been deleted.");
// //       error.code = "ACCOUNT_DELETED";
// //       throw error;
// //     }

// //     if (buyer && buyer.status && buyer.status !== "Active") {
// //       return res.status(403).json({
// //         success: false,
// //         message: `Buyer account is ${buyer.status}.`,
// //       });
// //     }

// //     if (!buyer) {
// //       const randomPassword = `${firebaseUid}-${Date.now()}-${Math.random()}`;
// //       const password = await bcrypt.hash(randomPassword, 10);

// //       buyer = await Buyer.create({
// //         firebaseUid,
// //         name: decoded.name || "DigiNiwas Buyer",
// //         email: decoded.email || `${localPhone}@buyer.diginiwas.local`,
// //         phone: firebasePhone,
// //         password,
// //         role: "buyer",
// //         status: "Active",
// //         isPhoneVerified: true,
// //         avatar: decoded.picture || "",
// //       });
// //     } else {
// //       buyer.firebaseUid = firebaseUid;
// //       buyer.phone = firebasePhone;
// //       buyer.isPhoneVerified = true;
// //       buyer.lastLoginAt = new Date();
// //       await buyer.save();
// //     }

// //     const token = jwt.sign(
// //       {
// //         userId: buyer._id,
// //         id: buyer._id,
// //         role: "buyer",
// //       },
// //       process.env.JWT_SECRET || "secretKey",
// //       { expiresIn: "7d" }
// //     );

// //     return res.status(200).json({
// //       success: true,
// //       message: "Firebase OTP verified. Buyer login successful.",
// //       token,
// //       data: {
// //         id: buyer._id,
// //         buyerId: buyer.buyerId || null,
// //         name: buyer.name,
// //         email: buyer.email || null,
// //         phone: buyer.phone,
// //         role: "buyer",
// //         location: buyer.location || null,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Firebase Buyer OTP Login Error:", error);

// //     const status = error.code === "ACCOUNT_DELETED" ? 403 : 401;
// //     return res.status(status).json({
// //       success: false,
// //       code: error.code || "FIREBASE_OTP_LOGIN_FAILED",
// //       message:
// //         error.code === "auth/id-token-expired"
// //           ? "Firebase session expired. Please request OTP again."
// //           : error.message || "Unable to verify Firebase OTP.",
// //     });
// //   }
// // };

// // // Verify Twilio OTP and issue JWT.
// // export const loginWithOTP = async (req, res) => {
// //   try {
// //     const { phone, otp, role } = req.body || {};

// //     if (!phone || !otp || !role) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Phone number, OTP, and role are required",
// //       });
// //     }

// //     if (!isSupportedLoginRole(role)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Role must be buyer, seller, or partner",
// //       });
// //     }

// //     const { user, token } = await authService.loginWithOTP({ phone, otp, role });

// //     return res.status(200).json({
// //       success: true,
// //       message: "OTP verified. Login successful",
// //       token,
// //       data: {
// //         id: user._id,
// //         sellerId: user.sellerId || null,
// //         partnerId: user.partnerId || null,
// //         name: user.name,
// //         email: user.email || null,
// //         phone: user.phone,
// //         role: user.role,
// //         partnerType: user.partnerType || null,
// //         location: user.location || null,
// //       },
// //     });
// //   } catch (error) {
// //     const status = error.code === "ACCOUNT_DELETED" ? 403 : 401;
// //     return res.status(status).json({
// //       success: false,
// //       code: error.code || "OTP_LOGIN_FAILED",
// //       message: error.message,
// //     });
// //   }
// // };

// import authService from "../services/authService.js";
// import Buyer from "../models/Buyer.js";
// import Seller from "../models/Seller.js";
// import Partner from "../models/Partner.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { firebaseAdminAuth } from "../config_firebaseAdmin.js";

// const isBuyerRole = (role) =>
//   ["buyer", "tenant"].includes(
//     String(role || "").trim().toLowerCase()
//   );

// const isSupportedLoginRole = (role) =>
//   ["buyer", "tenant", "seller", "owner", "partner"].includes(
//     String(role || "").trim().toLowerCase()
//   );

// const isFirebaseLoginRole = (role) =>
//   ["buyer", "seller", "partner"].includes(
//     String(role || "").trim().toLowerCase()
//   );

// export const register = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       password,
//       role,
//       location,
//       partnerType,
//     } = req.body;

//     if (!name || !email || !phone || !password || !role) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     if (!isBuyerRole(role)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "This endpoint supports buyer/tenant registration only. Use the dedicated seller or partner application API.",
//       });
//     }

//     const user = await authService.registerUser({
//       name,
//       email,
//       phone,
//       password,
//       role,
//       location,
//       partnerType,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Registration successful",
//       data: {
//         id: user._id,
//         sellerId: user.sellerId || null,
//         partnerId: user.partnerId || null,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//         partnerType: user.partnerType || null,
//         location: user.location || null,
//       },
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const loginWithPassword = async (req, res) => {
//   try {
//     const { phone, password, role } = req.body;

//     if (!phone || !password || !role) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone, password and role are required",
//       });
//     }

//     if (!isBuyerRole(role)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "This endpoint supports buyer/tenant login only. Use the dedicated seller or partner login API.",
//       });
//     }

//     const { user, token } =
//       await authService.loginWithPassword({
//         phone,
//         password,
//         role,
//       });

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       data: {
//         id: user._id,
//         sellerId: user.sellerId || null,
//         partnerId: user.partnerId || null,
//         name: user.name,
//         phone: user.phone,
//         role: user.role,
//         partnerType: user.partnerType || null,
//         location: user.location || null,
//       },
//     });
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ============================================================
// // SEND OTP
// // Works for Buyer, Seller and Partner
// // ============================================================

// export const sendOTP = async (req, res) => {
//   try {
//     const { phone, role } = req.body || {};

//     if (!phone || !role) {
//       return res.status(400).json({
//         success: false,
//         message: "Phone number and role are required",
//       });
//     }

//     if (!isSupportedLoginRole(role)) {
//       return res.status(400).json({
//         success: false,
//         message: "Role must be buyer, seller, or partner",
//       });
//     }

//     const result = await authService.sendOTP({
//       phone,
//       role,
//     });

//     return res.status(200).json({
//       success: true,
//       message:
//         "OTP sent successfully to your registered mobile number",
//       data: result,
//     });
//   } catch (error) {
//     const status =
//       error.code === "ACCOUNT_DELETED" ? 403 : 400;

//     return res.status(status).json({
//       success: false,
//       code: error.code || "OTP_SEND_FAILED",
//       message: error.message,
//     });
//   }
// };

// // ============================================================
// // RESEND OTP
// // ============================================================

// export const resendOTP = async (req, res) => {
//   return sendOTP(req, res);
// };

// // ============================================================
// // FIREBASE PHONE AUTHENTICATION
// // Buyer + Seller + Partner
// // ============================================================

// export const loginWithFirebasePhone = async (req, res) => {
//   try {
//     const {
//       idToken,
//       role = "buyer",
//     } = req.body || {};

//     // --------------------------------------------------------
//     // 1. Validate Firebase ID Token
//     // --------------------------------------------------------

//     if (!idToken) {
//       return res.status(400).json({
//         success: false,
//         message: "Firebase ID token is required.",
//       });
//     }

//     // --------------------------------------------------------
//     // 2. Validate Role
//     // --------------------------------------------------------

//     const requestedRole = String(role)
//       .trim()
//       .toLowerCase();

//     if (!isFirebaseLoginRole(requestedRole)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Firebase OTP login supports buyer, seller, and partner only.",
//       });
//     }

//     // --------------------------------------------------------
//     // 3. Verify Firebase ID Token
//     // --------------------------------------------------------

//     const decoded =
//       await firebaseAdminAuth().verifyIdToken(
//         idToken,
//         true
//       );

//     const firebaseUid = decoded.uid;

//     const firebasePhone = String(
//       decoded.phone_number || ""
//     ).trim();

//     if (!firebasePhone) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "A verified Firebase phone number is required.",
//       });
//     }

//     // --------------------------------------------------------
//     // 4. Normalize Phone Number
//     // --------------------------------------------------------

//     const digits = firebasePhone.replace(/\D/g, "");

//     const localPhone = digits.replace(/^91/, "");

//     const phoneCandidates = [
//       firebasePhone,
//       digits,
//       localPhone,
//       `+91${localPhone}`,
//     ].filter(Boolean);

//     const uniquePhoneCandidates = [
//       ...new Set(phoneCandidates),
//     ];

//     // --------------------------------------------------------
//     // 5. BUYER LOGIN
//     // --------------------------------------------------------

//     if (requestedRole === "buyer") {
//       let buyer =
//         (await Buyer.findOne({ firebaseUid })) ||
//         (await Buyer.findOne({
//           phone: {
//             $in: uniquePhoneCandidates,
//           },
//         }));

//       // Deleted buyer
//       if (buyer?.isDeleted) {
//         const error = new Error(
//           "This buyer account has been deleted."
//         );

//         error.code = "ACCOUNT_DELETED";

//         throw error;
//       }

//       // Inactive buyer
//       if (
//         buyer &&
//         buyer.status &&
//         buyer.status !== "Active"
//       ) {
//         return res.status(403).json({
//           success: false,
//           message:
//             `Buyer account is ${buyer.status}.`,
//         });
//       }

//       // ------------------------------------------------------
//       // Create buyer if account doesn't exist
//       // ------------------------------------------------------

//       if (!buyer) {
//         const randomPassword =
//           `${firebaseUid}-${Date.now()}-${Math.random()}`;

//         const password =
//           await bcrypt.hash(
//             randomPassword,
//             10
//           );

//         buyer = await Buyer.create({
//           firebaseUid,

//           name:
//             decoded.name ||
//             "DigiNiwas Buyer",

//           email:
//             decoded.email ||
//             `${localPhone}@buyer.diginiwas.local`,

//           phone: firebasePhone,

//           password,

//           role: "buyer",

//           status: "Active",

//           isPhoneVerified: true,

//           avatar:
//             decoded.picture || "",

//           lastLoginAt: new Date(),
//         });
//       } else {
//         buyer.firebaseUid = firebaseUid;

//         buyer.phone = firebasePhone;

//         buyer.isPhoneVerified = true;

//         buyer.lastLoginAt = new Date();

//         await buyer.save();
//       }

//       // ------------------------------------------------------
//       // Buyer JWT
//       // ------------------------------------------------------

//       const token = jwt.sign(
//         {
//           userId: buyer._id,
//           id: buyer._id,
//           role: "buyer",
//           accountType: "buyer",
//         },
//         process.env.JWT_SECRET || "secretKey",
//         {
//           expiresIn: "7d",
//         }
//       );

//       return res.status(200).json({
//         success: true,

//         message:
//           "Firebase OTP verified. Buyer login successful.",

//         token,

//         data: {
//           id: buyer._id,

//           buyerId:
//             buyer.buyerId || null,

//           name:
//             buyer.name,

//           email:
//             buyer.email || null,

//           phone:
//             buyer.phone,

//           role:
//             "buyer",

//           accountType:
//             "buyer",

//           location:
//             buyer.location || null,
//         },
//       });
//     }

//     // --------------------------------------------------------
//     // 6. SELLER LOGIN
//     // --------------------------------------------------------

//     if (requestedRole === "seller") {
//       let seller =
//         (await Seller.findOne({ firebaseUid })) ||
//         (await Seller.findOne({
//           phone: {
//             $in: uniquePhoneCandidates,
//           },
//         }));

//       // Seller does not exist
//       if (!seller) {
//         return res.status(404).json({
//           success: false,
//           code: "SELLER_NOT_FOUND",
//           message:
//             "No seller account found with this phone number. Please register as a seller first.",
//         });
//       }

//       // Deleted seller
//       if (seller.isDeleted) {
//         return res.status(403).json({
//           success: false,
//           code: "ACCOUNT_DELETED",
//           message:
//             "This seller account has been deleted.",
//         });
//       }

//       // Seller account status
//       if (
//         seller.accountStatus &&
//         String(seller.accountStatus).toUpperCase() !==
//           "ACTIVE"
//       ) {
//         return res.status(403).json({
//           success: false,
//           code: "SELLER_ACCOUNT_NOT_ACTIVE",
//           message:
//             `Seller account is ${seller.accountStatus}.`,
//         });
//       }

//       // ------------------------------------------------------
//       // Update Firebase information
//       // ------------------------------------------------------

//       seller.firebaseUid =
//         firebaseUid;

//       seller.phone =
//         firebasePhone;

//       seller.isPhoneVerified =
//         true;

//       seller.lastLoginAt =
//         new Date();

//       await seller.save();

//       // ------------------------------------------------------
//       // Seller JWT
//       // ------------------------------------------------------

//       const token = jwt.sign(
//         {
//           userId: seller._id,
//           id: seller._id,
//           role: "seller",
//           accountType: "seller",
//         },
//         process.env.JWT_SECRET || "secretKey",
//         {
//           expiresIn: "7d",
//         }
//       );

//       return res.status(200).json({
//         success: true,

//         message:
//           "Firebase OTP verified. Seller login successful.",

//         token,

//         data: {
//           id:
//             seller._id,

//           sellerId:
//             seller.sellerId || null,

//           name:
//             seller.name,

//           email:
//             seller.email || null,

//           phone:
//             seller.phone,

//           role:
//             "seller",

//           accountType:
//             "seller",

//           location:
//             seller.location || null,
//         },
//       });
//     }

//     // --------------------------------------------------------
//     // 7. PARTNER LOGIN
//     // --------------------------------------------------------

//     if (requestedRole === "partner") {
//       let partner =
//         (await Partner.findOne({ firebaseUid })) ||
//         (await Partner.findOne({
//           phone: {
//             $in: uniquePhoneCandidates,
//           },
//         }));

//       // Partner does not exist
//       if (!partner) {
//         return res.status(404).json({
//           success: false,
//           code: "PARTNER_NOT_FOUND",
//           message:
//             "No partner account found with this phone number. Please register as a partner first.",
//         });
//       }

//       // Deleted partner
//       if (partner.isDeleted) {
//         return res.status(403).json({
//           success: false,
//           code: "ACCOUNT_DELETED",
//           message:
//             "This partner account has been deleted.",
//         });
//       }

//       // Blocked partner
//       if (partner.isBlocked) {
//         return res.status(403).json({
//           success: false,
//           code: "PARTNER_BLOCKED",
//           message:
//             "Your partner account has been blocked.",
//         });
//       }

//       // Rejected partner
//       if (partner.isRejected) {
//         return res.status(403).json({
//           success: false,
//           code: "PARTNER_REJECTED",
//           message:
//             "Your partner account has been rejected.",
//         });
//       }

//       // Partner account status
//       if (
//         partner.accountStatus &&
//         String(partner.accountStatus).toUpperCase() !==
//           "ACTIVE"
//       ) {
//         return res.status(403).json({
//           success: false,
//           code: "PARTNER_ACCOUNT_NOT_ACTIVE",
//           message:
//             `Partner account is ${partner.accountStatus}.`,
//         });
//       }

//       // ------------------------------------------------------
//       // Update Firebase information
//       // ------------------------------------------------------

//       partner.firebaseUid =
//         firebaseUid;

//       partner.phone =
//         firebasePhone;

//       partner.isPhoneVerified =
//         true;

//       if (partner.phoneVerification) {
//         partner.phoneVerification.isVerified =
//           true;

//         partner.phoneVerification.verifiedAt =
//           new Date();
//       }

//       if (partner.credentials) {
//         partner.credentials.lastLoginAt =
//           new Date();
//       }

//       await partner.save();

//       // ------------------------------------------------------
//       // Partner actual role
//       // ------------------------------------------------------

//       const partnerRole =
//         partner.role || "partner";

//       // ------------------------------------------------------
//       // Partner JWT
//       // ------------------------------------------------------

//       const token = jwt.sign(
//         {
//           userId: partner._id,

//           id: partner._id,

//           role: partnerRole,

//           accountType: "partner",
//         },
//         process.env.JWT_SECRET || "secretKey",
//         {
//           expiresIn: "7d",
//         }
//       );

//       return res.status(200).json({
//         success: true,

//         message:
//           "Firebase OTP verified. Partner login successful.",

//         token,

//         data: {
//           id:
//             partner._id,

//           partnerId:
//             partner.partnerId || null,

//           name:
//             partner.name,

//           email:
//             partner.email || null,

//           phone:
//             partner.phone,

//           role:
//             partnerRole,

//           accountType:
//             "partner",

//           partnerAccountType:
//             partner.accountType || null,

//           location:
//             partner.location || null,
//         },
//       });
//     }

//     // --------------------------------------------------------
//     // Fallback
//     // --------------------------------------------------------

//     return res.status(400).json({
//       success: false,
//       message: "Unsupported Firebase login role.",
//     });

//   } catch (error) {
//     console.error(
//       "Firebase Phone Login Error:",
//       error
//     );

//     const status =
//       error.code === "ACCOUNT_DELETED"
//         ? 403
//         : error.code === "auth/id-token-expired"
//         ? 401
//         : 401;

//     return res.status(status).json({
//       success: false,

//       code:
//         error.code ||
//         "FIREBASE_OTP_LOGIN_FAILED",

//       message:
//         error.code ===
//         "auth/id-token-expired"
//           ? "Firebase session expired. Please request OTP again."
//           : error.message ||
//             "Unable to verify Firebase OTP.",
//     });
//   }
// };

// // ============================================================
// // VERIFY TWILIO OTP
// // ============================================================

// export const loginWithOTP = async (req, res) => {
//   try {
//     const {
//       phone,
//       otp,
//       role,
//     } = req.body || {};

//     if (!phone || !otp || !role) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Phone number, OTP, and role are required",
//       });
//     }

//     if (!isSupportedLoginRole(role)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Role must be buyer, seller, or partner",
//       });
//     }

//     const { user, token } =
//       await authService.loginWithOTP({
//         phone,
//         otp,
//         role,
//       });

//     return res.status(200).json({
//       success: true,
//       message:
//         "OTP verified. Login successful",
//       token,
//       data: {
//         id:
//           user._id,

//         sellerId:
//           user.sellerId || null,

//         partnerId:
//           user.partnerId || null,

//         name:
//           user.name,

//         email:
//           user.email || null,

//         phone:
//           user.phone,

//         role:
//           user.role,

//         partnerType:
//           user.partnerType || null,

//         location:
//           user.location || null,
//       },
//     });
//   } catch (error) {
//     const status =
//       error.code === "ACCOUNT_DELETED"
//         ? 403
//         : 401;

//     return res.status(status).json({
//       success: false,
//       code:
//         error.code ||
//         "OTP_LOGIN_FAILED",
//       message:
//         error.message,
//     });
//   }
// };


import authService from "../services/authService.js";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";
import Partner from "../models/Partner.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { firebaseAdminAuth } from "../config_firebaseAdmin.js";

const isBuyerRole = (role) =>
  ["buyer", "tenant"].includes(
    String(role || "").trim().toLowerCase()
  );

const isSupportedLoginRole = (role) =>
  ["buyer", "tenant", "seller", "owner", "partner"].includes(
    String(role || "").trim().toLowerCase()
  );

const isFirebaseLoginRole = (role) =>
  ["buyer", "seller", "partner"].includes(
    String(role || "").trim().toLowerCase()
  );

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
      location,
      partnerType,
    } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!isBuyerRole(role)) {
      return res.status(400).json({
        success: false,
        message:
          "This endpoint supports buyer/tenant registration only. Use the dedicated seller or partner application API.",
      });
    }

    const user = await authService.registerUser({
      name,
      email,
      phone,
      password,
      role,
      location,
      partnerType,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        id: user._id,
        sellerId: user.sellerId || null,
        partnerId: user.partnerId || null,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        partnerType: user.partnerType || null,
        location: user.location || null,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginWithPassword = async (req, res) => {
  try {
    const { phone, password, role } = req.body;

    if (!phone || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Phone, password and role are required",
      });
    }

    if (!isBuyerRole(role)) {
      return res.status(400).json({
        success: false,
        message:
          "This endpoint supports buyer/tenant login only. Use the dedicated seller or partner login API.",
      });
    }

    const { user, token } =
      await authService.loginWithPassword({
        phone,
        password,
        role,
      });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        sellerId: user.sellerId || null,
        partnerId: user.partnerId || null,
        name: user.name,
        phone: user.phone,
        role: user.role,
        partnerType: user.partnerType || null,
        location: user.location || null,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// SEND OTP
// Works for Buyer, Seller and Partner
// ============================================================

export const sendOTP = async (req, res) => {
  try {
    const { phone, role } = req.body || {};

    if (!phone || !role) {
      return res.status(400).json({
        success: false,
        message: "Phone number and role are required",
      });
    }

    if (!isSupportedLoginRole(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be buyer, seller, or partner",
      });
    }

    const result = await authService.sendOTP({
      phone,
      role,
    });

    return res.status(200).json({
      success: true,
      message:
        "OTP sent successfully to your registered mobile number",
      data: result,
    });
  } catch (error) {
    const status =
      error.code === "ACCOUNT_DELETED" ? 403 : 400;

    return res.status(status).json({
      success: false,
      code: error.code || "OTP_SEND_FAILED",
      message: error.message,
    });
  }
};

// ============================================================
// RESEND OTP
// ============================================================

export const resendOTP = async (req, res) => {
  return sendOTP(req, res);
};

// ============================================================
// FIREBASE PHONE AUTHENTICATION
// Buyer + Seller + Partner
// ============================================================

const normalizeFirebasePhone = (phone) => {
  const value = String(phone || '').trim();
  const digits = value.replace(/\D/g, '');
  if (value.startsWith('+')) return /^\+91[6-9]\d{9}$/.test(value) ? `+${digits}` : null;
  if (/^[6-9]\d{9}$/.test(digits)) return `+91${digits}`;
  if (/^91[6-9]\d{9}$/.test(digits)) return `+${digits}`;
  return null;
};

const firebasePhoneCandidates = (e164) => {
  const digits = e164.replace(/\D/g, '');
  const local = digits.startsWith('91') ? digits.slice(2) : digits;
  return [...new Set([e164, digits, local, `+91${local}`])];
};

const findRoleAccountByPhone = async (phone, role) => {
  const normalized = normalizeFirebasePhone(phone);
  if (!normalized) return { normalized: null, account: null };
  const candidates = firebasePhoneCandidates(normalized);
  let account = null;

  if (role === 'buyer') {
    account = await Buyer.findOne({ phone: { $in: candidates } });
    if (account && !['buyer', 'tenant'].includes(String(account.role || 'buyer').toLowerCase())) account = null;
    if (account && (account.isDeleted || (account.status && account.status !== 'Active'))) {
      return { normalized, account, blocked: true, reason: account.isDeleted ? 'ACCOUNT_DELETED' : 'ACCOUNT_NOT_ACTIVE' };
    }
  } else if (role === 'seller') {
    account = await Seller.findOne({ phone: { $in: candidates } });
    if (account && String(account.role || 'seller').toLowerCase() !== 'seller') account = null;
    if (account && (account.isDeleted || (account.accountStatus && String(account.accountStatus).toUpperCase() !== 'ACTIVE'))) {
      return { normalized, account, blocked: true, reason: account.isDeleted ? 'ACCOUNT_DELETED' : 'SELLER_ACCOUNT_NOT_ACTIVE' };
    }
  } else if (role === 'partner') {
    account = await Partner.findOne({ phone: { $in: candidates } });
    if (account && account.isDeleted) return { normalized, account, blocked: true, reason: 'ACCOUNT_DELETED' };
    if (account && account.isBlocked) return { normalized, account, blocked: true, reason: 'PARTNER_BLOCKED' };
    if (account && account.isRejected) return { normalized, account, blocked: true, reason: 'PARTNER_REJECTED' };
    if (account && account.accountStatus && String(account.accountStatus).toUpperCase() !== 'ACTIVE') {
      return { normalized, account, blocked: true, reason: 'PARTNER_ACCOUNT_NOT_ACTIVE' };
    }
  }
  return { normalized, account, blocked: false };
};

// Public preflight endpoint. Add request/IP rate limiting at the API gateway.
export const checkFirebasePhoneAccount = async (req, res) => {
  try {
    const role = String(req.body?.role || '').trim().toLowerCase();
    const phone = normalizeFirebasePhone(req.body?.phone);
    if (!phone) return res.status(400).json({ success: false, code: 'INVALID_PHONE', message: 'Enter a valid Indian mobile number.' });
    if (!['buyer', 'seller', 'partner'].includes(role)) return res.status(400).json({ success: false, code: 'INVALID_ROLE', message: 'Role must be buyer, seller, or partner.' });

    const result = await findRoleAccountByPhone(phone, role);
    if (result.blocked) return res.status(403).json({ success: false, code: result.reason, message: 'This account is not eligible to log in. Please contact support if needed.' });
    if (!result.account) return res.status(404).json({ success: false, code: 'ACCOUNT_NOT_FOUND', message: `No eligible ${role} account found for this mobile number. Please register first.` });
    return res.status(200).json({ success: true, eligible: true, role, message: 'Account found. You can request an OTP.' });
  } catch (error) {
    console.error('Firebase phone account check failed:', error);
    return res.status(500).json({ success: false, code: 'ACCOUNT_CHECK_FAILED', message: 'Unable to check account right now. Please try again later.' });
  }
};

export const loginWithFirebasePhone = async (req, res) => {
  try {
    const idToken = String(req.body?.idToken || '').trim();
    const requestedRole = String(req.body?.role || 'buyer').trim().toLowerCase();
    if (!idToken) return res.status(400).json({ success: false, code: 'FIREBASE_ID_TOKEN_REQUIRED', message: 'Firebase ID token is required.' });
    if (!['buyer', 'seller', 'partner'].includes(requestedRole)) return res.status(400).json({ success: false, code: 'INVALID_ROLE', message: 'Firebase OTP login supports buyer, seller, and partner only.' });
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured; refusing to issue login tokens.');
      return res.status(503).json({ success: false, code: 'AUTH_NOT_CONFIGURED', message: 'Authentication is temporarily unavailable.' });
    }

    const decoded = await firebaseAdminAuth().verifyIdToken(idToken, true);
    const firebaseUid = decoded.uid;
    const firebasePhone = normalizeFirebasePhone(decoded.phone_number);
    if (!firebasePhone) return res.status(401).json({ success: false, code: 'VERIFIED_PHONE_REQUIRED', message: 'A valid Firebase-verified Indian mobile number is required.' });

    // Never auto-create a Buyer/Seller/Partner from an OTP login request.
    const result = await findRoleAccountByPhone(firebasePhone, requestedRole);
    if (result.blocked) return res.status(403).json({ success: false, code: result.reason, message: 'This account is not eligible to log in. Please contact support if needed.' });
    if (!result.account) return res.status(404).json({ success: false, code: 'ACCOUNT_NOT_FOUND', message: `No eligible ${requestedRole} account found for this verified mobile number. Please register first.` });

    const account = result.account;
    if (account.firebaseUid && account.firebaseUid !== firebaseUid) {
      return res.status(409).json({ success: false, code: 'PHONE_AUTH_ALREADY_LINKED', message: 'This account is linked to another phone-auth identity. Please contact support.' });
    }

    account.firebaseUid = firebaseUid;
    account.isPhoneVerified = true;
    account.lastLoginAt = new Date();
    if (requestedRole === 'partner' && account.phoneVerification) {
      account.phoneVerification.isVerified = true;
      account.phoneVerification.verifiedAt = new Date();
    }
    if (requestedRole === 'partner' && account.credentials) account.credentials.lastLoginAt = new Date();
    await account.save();

    const actualRole = requestedRole === 'partner' ? (account.role || 'partner') : requestedRole;
    const token = jwt.sign(
      { userId: account._id, id: account._id, role: actualRole, accountType: requestedRole },
      process.env.JWT_SECRET,
      { expiresIn: '7d', issuer: 'diginiwas-api', audience: 'diginiwas-client' }
    );
    const user = {
      id: account._id, name: account.name, email: account.email || null,
      phone: account.phone, role: actualRole, accountType: requestedRole,
      location: account.location || null,
      ...(requestedRole === 'buyer' ? { buyerId: account.buyerId || null } : {}),
      ...(requestedRole === 'seller' ? { sellerId: account.sellerId || null } : {}),
      ...(requestedRole === 'partner' ? { partnerId: account.partnerId || null, partnerAccountType: account.accountType || null } : {}),
    };
    return res.status(200).json({ success: true, message: `Firebase OTP verified. ${requestedRole} login successful.`, token, data: { ...user, user } });
  } catch (error) {
    const firebaseErrors = new Set(['auth/id-token-expired', 'auth/argument-error', 'auth/invalid-id-token', 'auth/user-disabled', 'auth/user-not-found', 'auth/invalid-credential']);
    if (firebaseErrors.has(error.code)) return res.status(401).json({ success: false, code: error.code, message: 'Firebase verification failed. Please request a new OTP and try again.' });
    console.error('Firebase phone login failed:', error);
    return res.status(500).json({ success: false, code: 'FIREBASE_OTP_LOGIN_FAILED', message: 'Unable to complete phone login right now. Please try again later.' });
  }
};

// ============================================================
// VERIFY TWILIO OTP
// ============================================================

export const loginWithOTP = async (req, res) => {
  try {
    const {
      phone,
      otp,
      role,
    } = req.body || {};

    if (!phone || !otp || !role) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number, OTP, and role are required",
      });
    }

    if (!isSupportedLoginRole(role)) {
      return res.status(400).json({
        success: false,
        message:
          "Role must be buyer, seller, or partner",
      });
    }

    const { user, token } =
      await authService.loginWithOTP({
        phone,
        otp,
        role,
      });

    return res.status(200).json({
      success: true,
      message:
        "OTP verified. Login successful",
      token,
      data: {
        id:
          user._id,

        sellerId:
          user.sellerId || null,

        partnerId:
          user.partnerId || null,

        name:
          user.name,

        email:
          user.email || null,

        phone:
          user.phone,

        role:
          user.role,

        partnerType:
          user.partnerType || null,

        location:
          user.location || null,
      },
    });
  } catch (error) {
    const status =
      error.code === "ACCOUNT_DELETED"
        ? 403
        : 401;

    return res.status(status).json({
      success: false,
      code:
        error.code ||
        "OTP_LOGIN_FAILED",
      message:
        error.message,
    });
  }
};