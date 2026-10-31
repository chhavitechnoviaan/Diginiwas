

// import mongoose from "mongoose";
// import Partner from "../../models/Partner.js";
// import Property from "../../models/NewProperty.js";
// import CreditTransaction from "../../models/CreditTransaction.js";
// import PromotionRequest from "../../models/PromotionRequest.js";
// export const getAllPartners = async (req, res) => {
//   try {
//     const partners = await Partner.find()
//       .select("-password -otp -otpExpiresAt")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       message: "Partners fetched successfully",
//       count: partners.length,
//       data: partners,
//     });
//   } catch (error) {
//     console.error("Get All Partners Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch partners",
//       error: error.message,
//     });
//   }
// };

// // export const getPartnerById = async (req, res) => {
// //   try {
// //     const { id } = req.params;

// //     if (!mongoose.Types.ObjectId.isValid(id)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid partner ID",
// //       });
// //     }

// //     // Partner profile + populated admin-assigned properties
// //     const partner = await Partner.findById(id)
// //       .select("-password -otp -otpExpiresAt")
// //       .populate({
// //         path: "assignedProperties.propertyId",
// //         model: "NewProperty",
// //         select:
// //           "propertyId title status category transactionType city locality address price propertySize sizeUnit images addedBy statusHistory createdAt updatedAt",
// //       })
// //       .lean();

// //     if (!partner) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Partner not found",
// //       });
// //     }

// //     // Properties CREATED BY this partner.
// //     // addedBy.partnerId stores the public partner code (PRT-...).
// //     // addedBy.userId stores the creator Mongo ObjectId.
// //     const addedProperties = await Property.find({
// //       "addedBy.role": "Partner",
// //       $or: [
// //         { "addedBy.userId": partner._id },
// //         { "addedBy.partnerId": partner.partnerId },
// //       ],
// //     })
// //       .sort({ createdAt: -1 })
// //       .lean();

// //     const assignedProperties = (partner.assignedProperties || [])
// //       .map((item) => {
// //         const property = item?.propertyId;
// //         if (!property) return null;

// //         // When populate succeeds propertyId is the full property object.
// //         if (typeof property === "object" && property._id) {
// //           return {
// //             ...property,
// //             assignmentInfo: {
// //               propertyCode: item.propertyCode || property.propertyId || "",
// //               assignedAt: item.assignedAt || null,
// //               assignmentStatus: item.status || "Assigned",
// //             },
// //           };
// //         }

// //         return {
// //           propertyId: property,
// //           assignmentInfo: {
// //             propertyCode: item.propertyCode || "",
// //             assignedAt: item.assignedAt || null,
// //             assignmentStatus: item.status || "Assigned",
// //           },
// //         };
// //       })
// //       .filter(Boolean);

// //     return res.status(200).json({
// //       success: true,
// //       message: "Partner details fetched successfully",
// //       data: {
// //         ...partner,
// //         assignedProperties,
// //         addedProperties,
// //         summary: {
// //           assignedProperties: assignedProperties.length,
// //           addedProperties: addedProperties.length,
// //         },
// //       },
// //     });
// //   } catch (error) {
// //     console.error("Get Partner By ID Error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch partner",
// //       error: error.message,
// //     });
// //   }
// // };

// export const getPartnerById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid partner ID",
//       });
//     }

//     const partner = await Partner.findById(id)
//       .select("-password -otp -otpExpiresAt")
//       .populate({
//         path: "assignedProperties.propertyId",
//         model: "NewProperty",
//         select:
//           "propertyId title status propertyVerificationStatus category transactionType city locality address price propertySize sizeUnit images addedBy assignedPartner promotions promotionHistory statusHistory createdAt updatedAt",
//       })
//       .lean();

//     if (!partner) {
//       return res.status(404).json({
//         success: false,
//         message: "Partner not found",
//       });
//     }

//     const [
//       addedProperties,
//       creditHistory,
//       promotionRequests,
//     ] = await Promise.all([
//       Property.find({
//         "addedBy.role": "Partner",
//         $or: [
//           { "addedBy.userId": partner._id },
//           { "addedBy.partnerId": partner.partnerId },
//         ],
//       })
//         .sort({ createdAt: -1 })
//         .lean(),

//       CreditTransaction.find({
//         partnerMongoId: partner._id,
//       })
//         .sort({ createdAt: -1 })
//         .limit(100)
//         .lean(),

//       PromotionRequest.find({
//         partnerMongoId: partner._id,
//       })
//         .sort({ createdAt: -1 })
//         .limit(100)
//         .lean(),
//     ]);

//     const assignedProperties = (partner.assignedProperties || [])
//       .map((item) => {
//         const property = item?.propertyId;
//         if (!property) return null;

//         if (typeof property === "object" && property._id) {
//           return {
//             ...property,
//             assignmentInfo: {
//               propertyCode:
//                 item.propertyCode || property.propertyId || "",
//               assignedAt: item.assignedAt || null,
//               assignmentStatus: item.status || "Assigned",
//             },
//           };
//         }

//         return {
//           propertyId: property,
//           assignmentInfo: {
//             propertyCode: item.propertyCode || "",
//             assignedAt: item.assignedAt || null,
//             assignmentStatus: item.status || "Assigned",
//           },
//         };
//       })
//       .filter(Boolean);

//     const now = new Date();

//     const activePromotions = promotionRequests.filter(
//       (item) =>
//         item.status === "Approved" &&
//         (!item.expiresAt || new Date(item.expiresAt) > now)
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Partner details fetched successfully",
//       data: {
//         ...partner,

//         wallet: partner.creditWallet || {
//           balance: 0,
//           totalPurchased: 0,
//           totalCredited: 0,
//           totalDebited: 0,
//           totalSpent: 0,
//           totalRefunded: 0,
//         },

//         assignedProperties,
//         addedProperties,
//         creditHistory,
//         promotionRequests,

//         summary: {
//           assignedProperties: assignedProperties.length,
//           addedProperties: addedProperties.length,

//           totalCredits:
//             Number(partner.creditWallet?.balance || 0),
//           totalPurchasedCredits:
//             Number(partner.creditWallet?.totalPurchased || 0),
//           totalSpentCredits:
//             Number(partner.creditWallet?.totalSpent || 0),
//           totalRefundedCredits:
//             Number(partner.creditWallet?.totalRefunded || 0),

//           promotionRequests: promotionRequests.length,
//           pendingPromotionRequests: promotionRequests.filter(
//             (x) => x.status === "Pending"
//           ).length,
//           approvedPromotionRequests: promotionRequests.filter(
//             (x) => x.status === "Approved"
//           ).length,
//           rejectedPromotionRequests: promotionRequests.filter(
//             (x) => x.status === "Rejected"
//           ).length,
//           activePromotions: activePromotions.length,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Get Partner By ID Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch partner",
//       error: error.message,
//     });
//   }
// };
// export const verifyPartner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { isVerified } = req.body || {}; // Safe fallback prevents undefined crash

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid partner ID",
//       });
//     }

//     if (typeof isVerified !== "boolean") {
//       return res.status(400).json({
//         success: false,
//         message: "isVerified must be true or false",
//       });
//     }

//     const partner = await Partner.findByIdAndUpdate(
//       id,
//       { isVerified },
//       { new: true, runValidators: true }
//     ).select("-password -otp -otpExpiresAt");

//     if (!partner) {
//       return res.status(404).json({
//         success: false,
//         message: "Partner not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: isVerified
//         ? "Partner verified successfully"
//         : "Partner unverified successfully",
//       data: partner,
//     });
//   } catch (error) {
//     console.error("Verify Partner Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to update partner verification",
//       error: error.message,
//     });
//   }
// };

// export const blockPartner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { isBlocked } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid partner ID",
//       });
//     }

//     if (typeof isBlocked !== "boolean") {
//       return res.status(400).json({
//         success: false,
//         message: "isBlocked must be true or false",
//       });
//     }

//     const partner = await Partner.findByIdAndUpdate(
//       id,
//       {
//         isBlocked,
//       },
//       {
//         new: true,
//         runValidators: true,
//       }
//     ).select("-password -otp -otpExpiresAt");

//     if (!partner) {
//       return res.status(404).json({
//         success: false,
//         message: "Partner not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: isBlocked
//         ? "Partner blocked successfully"
//         : "Partner unblocked successfully",
//       data: partner,
//     });
//   } catch (error) {
//     console.error("Block Partner Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to update partner block status",
//       error: error.message,
//     });
//   }
// };

// export const deletePartner = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid partner ID",
//       });
//     }

//     const partner = await Partner.findByIdAndDelete(id);

//     if (!partner) {
//       return res.status(404).json({
//         success: false,
//         message: "Partner not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Partner deleted successfully",
//       data: {
//         _id: partner._id,
//       },
//     });
//   } catch (error) {
//     console.error("Delete Partner Error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete partner",
//       error: error.message,
//     });
//   }
// };

// export const getUnassignedProperties = async (
//   req,
//   res
// ) => {
//   try {
//     const properties =
//       await Property.find({
//         $or: [
//           {
//             "assignedPartner.partnerId": {
//               $exists: false,
//             },
//           },
//           {
//             "assignedPartner.partnerId":
//               null,
//           },
//         ],

//         status: {
//           $nin: [
//             "Sold",
//             "Rented",
//             "Rejected",
//           ],
//         },
//       })
//         .sort({
//           createdAt: -1,
//         })
//         .lean();

//     return res.status(200).json({
//       success: true,

//       message:
//         "Unassigned properties fetched successfully",

//       count:
//         properties.length,

//       data: properties,
//     });
//   } catch (error) {
//     console.error(
//       "Get Unassigned Properties Error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,

//       message:
//         "Failed to fetch unassigned properties.",

//       error:
//         error.message,
//     });
//   }
// };

// export const unassignPartnerFromProperty =
//   async (req, res) => {
//     try {
//       const {
//         propertyId,
//       } = req.params;

//       const {
//         unassignedBy,
//         remarks,
//       } = req.body;

//       // ==========================================
//       // VALIDATE PROPERTY ID
//       // ==========================================

//       if (
//         !mongoose.Types.ObjectId.isValid(
//           propertyId
//         )
//       ) {
//         return res
//           .status(400)
//           .json({
//             success: false,
//             message:
//               "Invalid property ID.",
//           });
//       }

//       // ==========================================
//       // FIND PROPERTY
//       // ==========================================

//       const property =
//         await Property.findById(
//           propertyId
//         );

//       if (!property) {
//         return res
//           .status(404)
//           .json({
//             success: false,
//             message:
//               "Property not found.",
//           });
//       }

//       // ==========================================
//       // CHECK ASSIGNMENT
//       // ==========================================

//       const assignedPartnerMongoId =
//         property
//           ?.assignedPartner
//           ?.partnerId;

//       if (
//         !assignedPartnerMongoId
//       ) {
//         return res
//           .status(400)
//           .json({
//             success: false,
//             message:
//               "Property is not assigned to any partner.",
//           });
//       }

//       // Store old partner info before clearing
//       const oldPartner = {
//         partnerId:
//           assignedPartnerMongoId,

//         partnerCode:
//           property
//             ?.assignedPartner
//             ?.partnerCode ||
//           null,

//         name:
//           property
//             ?.assignedPartner
//             ?.name ||
//           "",
//       };

//       // ==========================================
//       // REMOVE PROPERTY FROM PARTNER
//       // ==========================================

//       const partner =
//         await Partner.findById(
//           assignedPartnerMongoId
//         );

//       if (partner) {
//         partner.assignedProperties =
//           (
//             partner.assignedProperties ||
//             []
//           ).filter(
//             (item) =>
//               String(
//                 item.propertyId
//               ) !==
//               String(
//                 property._id
//               )
//           );

//         await partner.save();
//       }

//       // ==========================================
//       // CLEAR PROPERTY ASSIGNED PARTNER
//       // ==========================================

//       property.assignedPartner = {
//         partnerId: null,
//         partnerCode: null,
//         name: "",
//         email: "",
//         phone: "",
//         partnerType: null,
//         assignedAt: null,
//         verificationStatus:
//           "Pending",
//         visitDate: null,
//         partnerRemarks: "",
//       };

//       // ==========================================
//       // CHANGE PROPERTY STATUS
//       // ==========================================

//       property.status = "Draft";

//       // ==========================================
//       // STATUS HISTORY
//       // ==========================================

//       property.statusHistory.push({
//         status: "Draft",

//         updatedBy: {
//           userId:
//             unassignedBy
//               ?.userId ||
//             property
//               ?.addedBy
//               ?.userId,

//           name:
//             unassignedBy
//               ?.name ||
//             "Admin",

//           role:
//             unassignedBy
//               ?.role ||
//             "Admin",
//         },

//         remarks:
//           remarks ||
//           `Property unassigned from ${
//             oldPartner.name ||
//             "partner"
//           }`,
//       });

//       await property.save();

//       return res
//         .status(200)
//         .json({
//           success: true,

//           message:
//             "Partner unassigned from property successfully.",

//           data: {
//             property,

//             previousPartner:
//               oldPartner,
//           },
//         });
//     } catch (error) {
//       console.error(
//         "Unassign Partner Error:",
//         error
//       );

//       return res
//         .status(500)
//         .json({
//           success: false,

//           message:
//             "Failed to unassign partner from property.",

//           error:
//             error.message,
//         });
//     }
//   };
  

// export const getAvailablePartners = async (
//   req,
//   res
// ) => {
//   try {
//     const {
//       city,
//       partnerType,
//     } = req.query;

//     const query = {
//       isBlocked: {
//         $ne: true,
//       },

//       isRejected: {
//         $ne: true,
//       },

//       $or: [
//         {
//           isVerified: true,
//         },
//         {
//           isPhoneVerified:
//             true,
//         },
//       ],
//     };

//     // LOCATION FILTER
//     if (city) {
//       query["location.city"] =
//         new RegExp(
//           `^${city}$`,
//           "i"
//         );
//     }

//     // TYPE FILTER
//     if (partnerType) {
//       query.partnerType =
//         partnerType.toLowerCase();
//     }

//     const partners =
//       await Partner.find(query)
//         .select(
//           "partnerId name email phone partnerType location isVerified isPhoneVerified assignedProperties"
//         )
//         .sort({
//           createdAt: -1,
//         })
//         .lean();

//     const formatted =
//       partners.map(
//         (partner) => ({
//           ...partner,

//           assignedPropertyCount:
//             Array.isArray(
//               partner.assignedProperties
//             )
//               ? partner
//                   .assignedProperties
//                   .length
//               : 0,
//         })
//       );

//     return res.status(200).json({
//       success: true,

//       message:
//         "Available partners fetched successfully",

//       count:
//         formatted.length,

//       data: formatted,
//     });
//   } catch (error) {
//     console.error(
//       "Get Available Partners Error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,

//       message:
//         "Failed to fetch available partners.",

//       error:
//         error.message,
//     });
//   }
// };

// export const assignPartnerToProperty =
//   async (req, res) => {
//     try {
//       const {
//         propertyId,
//       } = req.params;

//       const {
//         partnerId,
//         assignedBy,
//       } = req.body;

//       if (!partnerId) {
//         return res.status(400).json({
//           success: false,

//           message:
//             "Partner ID is required.",
//         });
//       }

//       const property =
//         await Property.findById(
//           propertyId
//         );

//       if (!property) {
//         return res.status(404).json({
//           success: false,

//           message:
//             "Property not found.",
//         });
//       }

//       // ALREADY ASSIGNED
//       if (
//         property
//           ?.assignedPartner
//           ?.partnerId
//       ) {
//         return res.status(400).json({
//           success: false,

//           message:
//             "Property is already assigned to a partner.",
//         });
//       }

//       const partner =
//         await Partner.findById(
//           partnerId
//         );

//       if (!partner) {
//         return res.status(404).json({
//           success: false,

//           message:
//             "Partner not found.",
//         });
//       }

//       if (
//         partner.isBlocked
//       ) {
//         return res.status(400).json({
//           success: false,

//           message:
//             "Blocked partner cannot be assigned.",
//         });
//       }

//       if (
//         partner.isRejected
//       ) {
//         return res.status(400).json({
//           success: false,

//           message:
//             "Rejected partner cannot be assigned.",
//         });
//       }

//       if (
//         !partner.isVerified &&
//         !partner.isPhoneVerified
//       ) {
//         return res.status(400).json({
//           success: false,

//           message:
//             "Only verified partners can be assigned.",
//         });
//       }

//       // ==========================================
//       // UPDATE PROPERTY
//       // ==========================================

//       property.assignedPartner = {
//         partnerId:
//           partner._id,

//         partnerCode:
//           partner.partnerId ||
//           null,

//         name:
//           partner.name,

//         email:
//           partner.email,

//         phone:
//           partner.phone,

//         partnerType:
//           partner.partnerType ||
//           null,

//         assignedAt:
//           new Date(),

//         verificationStatus:
//           "Pending",

//         visitDate:
//           null,

//         partnerRemarks:
//           "",
//       };

//       property.status =
//         "Assigned_To_Partner";

//       property.statusHistory.push({
//         status:
//           "Assigned_To_Partner",

//         updatedBy: {
//           userId:
//             assignedBy?.userId ||
//             property.addedBy
//               ?.userId,

//           name:
//             assignedBy?.name ||
//             "Admin",

//           role:
//             assignedBy?.role ||
//             "Admin",
//         },

//         remarks:
//           `Property assigned to ${partner.name}`,
//       });

//       await property.save();

//       // ==========================================
//       // ADD PROPERTY TO PARTNER
//       // ==========================================

//       const alreadyExists =
//         partner.assignedProperties?.some(
//           (item) =>
//             String(
//               item.propertyId
//             ) ===
//             String(
//               property._id
//             )
//         );

//       if (!alreadyExists) {
//         partner.assignedProperties.push({
//           propertyId:
//             property._id,

//           propertyCode:
//             property.propertyId,

//           assignedAt:
//             new Date(),

//           status:
//             "Assigned",
//         });

//         await partner.save();
//       }

//       return res.status(200).json({
//         success: true,

//         message:
//           "Partner assigned to property successfully.",

//         data: {
//           property,
//           partner: {
//             _id:
//               partner._id,

//             partnerId:
//               partner.partnerId,

//             name:
//               partner.name,

//             partnerType:
//               partner.partnerType,
//           },
//         },
//       });
//     } catch (error) {
//       console.error(
//         "Assign Partner Error:",
//         error
//       );

//       return res.status(500).json({
//         success: false,

//         message:
//           "Failed to assign partner.",

//         error:
//           error.message,
//       });
//     }
//   };

// export const getAssignmentProperties =
//   async (req, res) => {
//     try {
//       const {
//         assignment = "all",
//         search = "",
//         city = "",
//         locality = "",
//         category = "",
//       } = req.query;

//       const query = {};

//       // ------------------------------------------
//       // ASSIGNMENT FILTER
//       // ------------------------------------------

//       if (
//         assignment ===
//         "unassigned"
//       ) {
//         query.$or = [
//           {
//             "assignedPartner.partnerId":
//               null,
//           },

//           {
//             "assignedPartner.partnerId":
//               {
//                 $exists: false,
//               },
//           },
//         ];
//       }

//       if (
//         assignment ===
//         "assigned"
//       ) {
//         query[
//           "assignedPartner.partnerId"
//         ] = {
//           $ne: null,
//           $exists: true,
//         };
//       }

//       // ------------------------------------------
//       // SEARCH
//       // ------------------------------------------

//       if (search.trim()) {
//         const regex =
//           new RegExp(
//             search.trim(),
//             "i"
//           );

//         query.$and = [
//           ...(query.$and || []),

//           {
//             $or: [
//               {
//                 propertyId:
//                   regex,
//               },

//               {
//                 title:
//                   regex,
//               },

//               {
//                 projectName:
//                   regex,
//               },

//               {
//                 developerName:
//                   regex,
//               },

//               {
//                 city:
//                   regex,
//               },

//               {
//                 locality:
//                   regex,
//               },
//             ],
//           },
//         ];
//       }

//       // ------------------------------------------
//       // CITY
//       // ------------------------------------------

//       if (city) {
//         query.city =
//           new RegExp(
//             `^${city}$`,
//             "i"
//           );
//       }

//       // ------------------------------------------
//       // LOCALITY
//       // ------------------------------------------

//       if (locality) {
//         query.locality =
//           new RegExp(
//             `^${locality}$`,
//             "i"
//           );
//       }

//       // ------------------------------------------
//       // CATEGORY
//       // ------------------------------------------

//       if (category) {
//         query.category =
//           category;
//       }

//       const properties =
//         await Property.find(
//           query
//         )
//           .sort({
//             createdAt: -1,
//           })
//           .lean();

//       return res
//         .status(200)
//         .json({
//           success: true,

//           message:
//             "Assignment properties fetched successfully",

//           count:
//             properties.length,

//           data:
//             properties,
//         });
//     } catch (error) {
//       console.error(
//         "Get Assignment Properties Error:",
//         error
//       );

//       return res
//         .status(500)
//         .json({
//           success: false,

//           message:
//             "Failed to fetch properties.",

//           error:
//             error.message,
//         });
//     }
//   };

// export const getAssignmentSummary = async (req, res) => {
//   try {
//     // Draft properties ko assignment queue se exclude karna hai
//     const propertyFilter = {
//       status: {
//         $ne: "Draft",
//       },
//     };

//     const [
//       total,
//       unassigned,
//       assigned,
//       availablePartners,
//     ] = await Promise.all([
//       // TOTAL PROPERTIES - Draft excluded
//       Property.countDocuments({
//         ...propertyFilter,
//       }),

//       // UNASSIGNED PROPERTIES - Draft excluded
//       Property.countDocuments({
//         ...propertyFilter,

//         $or: [
//           {
//             "assignedPartner.partnerId":
//               null,
//           },
//           {
//             "assignedPartner.partnerId":
//               {
//                 $exists: false,
//               },
//           },
//         ],
//       }),

//       // ASSIGNED PROPERTIES - Draft excluded
//       Property.countDocuments({
//         ...propertyFilter,

//         "assignedPartner.partnerId": {
//           $ne: null,
//           $exists: true,
//         },
//       }),

//       // AVAILABLE PARTNERS
//       Partner.countDocuments({
//         isBlocked: {
//           $ne: true,
//         },

//         isRejected: {
//           $ne: true,
//         },

//         $or: [
//           {
//             isVerified: true,
//           },
//           {
//             isPhoneVerified: true,
//           },
//         ],
//       }),
//     ]);

//     // ==============================
//     // TODAY START
//     // ==============================

//     const today = new Date();

//     today.setHours(
//       0,
//       0,
//       0,
//       0
//     );

//     // ASSIGNED TODAY - Draft excluded
//     const assignedToday =
//       await Property.countDocuments({
//         ...propertyFilter,

//         "assignedPartner.assignedAt": {
//           $gte: today,
//         },

//         "assignedPartner.partnerId": {
//           $ne: null,
//           $exists: true,
//         },
//       });

//     return res.status(200).json({
//       success: true,

//       data: {
//         total,
//         unassigned,
//         assigned,
//         assignedToday,
//         availablePartners,
//       },
//     });
//   } catch (error) {
//     console.error(
//       "Get Assignment Summary Error:",
//       error
//     );

//     return res.status(500).json({
//       success: false,

//       message:
//         "Failed to fetch assignment summary.",

//       error: error.message,
//     });
//   }
// };

import mongoose from "mongoose";
import Partner from "../../models/Partner.js";
import { softDeleteAccount } from "../../services/accountDeletionService.js";
import { getPropertyCollection, normalizeUnifiedProperty } from "../../services/unifiedPropertyService.js";

const SAFE = "-password -emailVerification.otpHash -phoneVerification.otpHash";
const PROPERTY_PROJECTION = {
  _id: 1,
  sourceModel: 1,
  propertyId: 1,
  title: 1,
  transactionType: 1,
  category: 1,
  listingType: 1,
  buildingType: 1,
  propertyType: 1,
  location: 1,
  city: 1,
  state: 1,
  country: 1,
  locality: 1,
  address: 1,
  pinCode: 1,
  latitude: 1,
  longitude: 1,
  rent: 1,
  price: 1,
  maintenance: 1,
  securityDeposit: 1,
  bookingAmount: 1,
  negotiable: 1,
  bhk: 1,
  bedrooms: 1,
  areaDetails: 1,
  propertySize: 1,
  sizeUnit: 1,
  pricePerSqft: 1,
  superBuiltupArea: 1,
  carpetArea: 1,
  additionalSpaces: 1,
  availability: 1,
  suitedFor: 1,
  furnishing: 1,
  specifications: 1,
  amenities: 1,
  propertyHighlights: 1,
  tags: 1,
  images: 1,
  media: 1,
  floorPlan: 1,
  reraCertificate: 1,
  video: 1,
  videoLink: 1,
  documents: 1,
  oneLineDescription: 1,
  description: 1,
  projectName: 1,
  developerName: 1,
  assignedPartner: 1,
  delegatedSubPartner: 1,
  status: 1,
  propertyVerificationStatus: 1,
  verified: 1,
  isActive: 1,
  createdBy: 1,
  addedBy: 1,
  createdAt: 1,
  updatedAt: 1,
};

const escapeRegex = (value = "") =>
  String(value).replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");

const getAssignedPartnerId = (property) => {
  const value = property?.assignedPartner?.partnerId;
  return value ? String(value) : "";
};

const isAssignedProperty = (property) => Boolean(getAssignedPartnerId(property));

const buildPropertyQuery = ({ assignment, search, city, locality, category } = {}) => {
  const clauses = [{ status: { $nin: ["Draft", "draft"] } }];

  if (assignment === "assigned") {
    clauses.push({
      "assignedPartner.partnerId": { $exists: true, $ne: null },
    });
  }

  if (assignment === "unassigned") {
    clauses.push({
      $or: [
        { "assignedPartner.partnerId": { $exists: false } },
        { "assignedPartner.partnerId": null },
      ],
    });
  }

  if (city && city !== "All") {
    const rx = new RegExp(`^${escapeRegex(city.trim())}$`, "i");
    clauses.push({ $or: [{ city: rx }, { "location.city": rx }] });
  }

  if (locality && locality !== "All") {
    const rx = new RegExp(`^${escapeRegex(locality.trim())}$`, "i");
    clauses.push({ $or: [{ locality: rx }, { "location.locality": rx }] });
  }

  if (category && category !== "All") {
    const value = String(category).trim().toLowerCase();
    const aliases =
      value === "residential"
        ? ["Residential"]
        : value === "commercial"
          ? ["Commercial"]
          : value === "rental" || value === "rent" || value === "lease"
            ? ["Rental", "Rent", "Lease"]
            : value === "sell" || value === "sale"
              ? ["Sell", "Sale", "Resale", "New Booking", "New Project"]
              : value === "plot/land" || value === "plot" || value === "land"
                ? ["Plot/Land", "Plot", "Land", "Industrial Plot"]
                : [String(category).trim()];

    clauses.push({
      $or: [
        { category: { $in: aliases } },
        { propertyType: { $in: aliases } },
        { transactionType: { $in: aliases } },
        { listingType: { $in: aliases } },
        { buildingType: { $in: aliases } },
      ],
    });
  }

  if (search?.trim()) {
    const rx = new RegExp(escapeRegex(search.trim()), "i");
    clauses.push({
      $or: [
        { title: rx },
        { propertyId: rx },
        { city: rx },
        { "location.city": rx },
        { state: rx },
        { "location.state": rx },
        { locality: rx },
        { "location.locality": rx },
        { address: rx },
        { "location.address": rx },
        { propertyType: rx },
        { category: rx },
        { transactionType: rx },
        { listingType: rx },
        { buildingType: rx },
        { "rent.frequency": rx },
        { "specifications.view": rx },
        { "specifications.facing": rx },
        { "addedBy.name": rx },
        { "createdBy.role": rx },
      ],
    });
  }

  return clauses.length ? { $and: clauses } : {};
};

const serializeAssignmentProperty = (doc) => {
  const property = normalizeUnifiedProperty(doc);
  const assigned = isAssignedProperty(property);

  return {
    ...property,
    assignment: assigned ? "assigned" : "unassigned",
    assigned: assigned,
    assignedPartner: property.assignedPartner || null,
  };
};

export const getAllPartners = async (req, res) => {
  try {
    const query = { isApproved: true, isVerified: true, isBlocked: { $ne: true }, applicationStatus: "Verified" };
    if (req.query.accountType && req.query.accountType !== "All") {
      if (["single", "team", "subagent"].includes(req.query.accountType)) query.accountType = req.query.accountType;
    }
    if (req.query.search?.trim()) {
      const rx = new RegExp(escapeRegex(req.query.search.trim()), "i");
      query.$or = [{ name: rx }, { email: rx }, { phone: rx }, { partnerId: rx }, { "business.businessName": rx }];
    }
    const data = await Partner.find(query).select(SAFE).sort({ createdAt: -1 }).lean();
    return res.json({ success: true, count: data.length, data });
  } catch (error) { return res.status(500).json({ success: false, message: "Unable to fetch partners", error: error.message }); }
};

export const getApprovedNotVerifiedPartners = async (req, res) => {
  try {
    const data = await Partner.find({ isDeleted: { $ne: true }, isApproved: true, isVerified: false, isBlocked: { $ne: true }, applicationStatus: "Approved_Not_Verified", isSubPartner: false }).select(SAFE).sort({ approvedAt: -1 }).lean();
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to fetch approved partners", error: error.message });
  }
};

export const getPartnerById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ success: false, message: "Invalid partner ID" });
    const partner = await Partner.findOne({ _id: req.params.id, isDeleted: { $ne: true } }).select(SAFE).populate("assignedProperties.propertyId", "propertyId title status category transactionType city locality price images").lean();
    if (!partner) return res.status(404).json({ success: false, message: "Partner not found" });
    const teamMembers = partner.accountType === "team" && !partner.isSubPartner ? await Partner.find({ parentPartnerId: partner._id, isDeleted: { $ne: true } }).select(SAFE).lean() : [];
    return res.json({ success: true, data: { ...partner, teamMembers } });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to fetch partner", error: error.message });
  }
};

export const getAvailablePartners = async (req, res) => {
  try {
    const query = {
      isDeleted: { $ne: true },
      isApproved: true,
      isVerified: true,
      isBlocked: { $ne: true },
      isRejected: { $ne: true },
      applicationStatus: "Verified",
      "permissions.canReceiveAssignments": true,
      accountType: { $in: ["single", "team"] },
      isSubPartner: false,
    };

    const requestedPartnerType = req.query.accountType || req.query.partnerType;
    if (requestedPartnerType && requestedPartnerType !== "All") {
      if (!["single", "team"].includes(requestedPartnerType)) {
        return res.status(400).json({ success: false, message: "Admin can assign properties only to single or team partners" });
      }
      query.accountType = requestedPartnerType;
    }

    if (req.query.city && req.query.city !== "All") {
      query["location.city"] = { $regex: `^${escapeRegex(req.query.city.trim())}$`, $options: "i" };
    }

    const data = await Partner.find(query)
      .select("partnerId name email phone accountType role teamRole parentPartnerId location assignedProperties creditWallet teamCreditAllocation")
      .sort({ name: 1 })
      .lean();

    const assignmentCounts = new Map();
    const propertyCollection = getPropertyCollection();

    for (const partner of data) {
      assignmentCounts.set(String(partner._id), 0);
    }

    const assignmentDocs = await propertyCollection.find(
      {
        "assignedPartner.partnerId": {
          $in: data.map((partner) => partner._id),
        },
      },
      { projection: { "assignedPartner.partnerId": 1 } }
    ).toArray();

    for (const doc of assignmentDocs) {
      const partnerId = doc?.assignedPartner?.partnerId;
      if (partnerId) {
        const key = String(partnerId);
        assignmentCounts.set(key, (assignmentCounts.get(key) || 0) + 1);
      }
    }

    const normalizedData = data.map((partner) => ({
      ...partner,
      assignedPropertyCount: assignmentCounts.get(String(partner._id)) || 0,
    }));

    return res.json({ success: true, count: normalizedData.length, data: normalizedData });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to fetch available partners", error: error.message });
  }
};

export const assignPartnerToProperty = async (req, res) => {
  try {
    const propertyId = String(req.params.propertyId || "").trim();
    const partnerId = String(req.body?.partnerId || "").trim();

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ success: false, message: "Invalid property ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(partnerId)) {
      return res.status(400).json({ success: false, message: "Invalid partner ID" });
    }

    const propertyCollection = getPropertyCollection();
    const [property, partner] = await Promise.all([
      propertyCollection.findOne({ _id: new mongoose.Types.ObjectId(propertyId) }),
      Partner.findOne({ _id: partnerId, isDeleted: { $ne: true } }).lean(),
    ]);

    if (!property) return res.status(404).json({ success: false, message: "Property not found" });
    if (!partner) return res.status(404).json({ success: false, message: "Partner not found" });

    if (!partner.isApproved || !partner.isVerified || partner.isBlocked || partner.applicationStatus !== "Verified" || !partner.permissions?.canReceiveAssignments) {
      return res.status(403).json({ success: false, message: "Property can be assigned only to an approved and verified partner" });
    }

    if (partner.accountType === "subagent" || partner.isSubPartner || !["single", "team"].includes(partner.accountType)) {
      return res.status(403).json({
        success: false,
        message: "Admin cannot assign a property directly to a Sub-Agent. Assign it to the Team Owner first.",
      });
    }

    const previousPartnerId = property?.assignedPartner?.partnerId ? String(property.assignedPartner.partnerId) : "";
    const assignedAt = new Date();

    const assignedPartner = {
      partnerId: partner._id,
      partnerCode: partner.partnerId,
      name: partner.name,
      phone: partner.phone,
      email: partner.email,
      partnerType: partner.accountType,
      assignedAt,
    };

    await propertyCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(propertyId) },
      {
        $set: {
          assignedPartner,
          status: "Assigned_To_Partner",
          updatedAt: assignedAt,
        },
      }
    );

    if (previousPartnerId && previousPartnerId !== String(partner._id)) {
      await Partner.updateOne(
        { _id: previousPartnerId },
        { $pull: { assignedProperties: { propertyId: property._id } } }
      );
    }

    await Partner.updateOne(
      { _id: partner._id },
      {
        $pull: { assignedProperties: { propertyId: property._id } },
      }
    );

    await Partner.updateOne(
      { _id: partner._id },
      {
        $push: {
          assignedProperties: {
            propertyId: property._id,
            propertyCode: property.propertyId,
            status: "Assigned",
            assignedAt,
          },
        },
      }
    );

    const updatedProperty = await propertyCollection.findOne({ _id: property._id });

    return res.json({
      success: true,
      message: "Verified partner assigned successfully",
      data: {
        property: normalizeUnifiedProperty(updatedProperty),
        partner,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to assign partner", error: error.message });
  }
};

export const unassignPartnerFromProperty = async (req, res) => {
  try {
    const propertyId = String(req.params.propertyId || "").trim();
    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({ success: false, message: "Invalid property ID" });
    }

    const propertyCollection = getPropertyCollection();
    const property = await propertyCollection.findOne({ _id: new mongoose.Types.ObjectId(propertyId) });
    if (!property) return res.status(404).json({ success: false, message: "Property not found" });

    const previous = property?.assignedPartner?.partnerId;
    const updatedAt = new Date();

    await propertyCollection.updateOne(
      { _id: new mongoose.Types.ObjectId(propertyId) },
      {
        $unset: { assignedPartner: "" },
        $set: { status: "Submitted", updatedAt },
      }
    );

    if (previous) {
      await Partner.updateOne(
        { _id: previous },
        { $pull: { assignedProperties: { propertyId: property._id } } }
      );
    }

    const updatedProperty = await propertyCollection.findOne({ _id: property._id });
    return res.json({ success: true, message: "Partner unassigned", data: normalizeUnifiedProperty(updatedProperty) });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to unassign partner", error: error.message });
  }
};

export const getUnassignedProperties = async (req, res) => {
  try {
    const propertyCollection = getPropertyCollection();
    const docs = await propertyCollection.find({
      isActive: { $ne: false },
      deletedByAccount: { $ne: true },
      status: { $nin: ["Draft", "draft"] },
      $or: [
        { "assignedPartner.partnerId": { $exists: false } },
        { "assignedPartner.partnerId": null },
      ],
    }, { projection: PROPERTY_PROJECTION }).sort({ createdAt: -1 }).toArray();

    const data = docs.map(serializeAssignmentProperty);
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to fetch unassigned properties", error: error.message });
  }
};

export const getAssignmentProperties = async (req, res) => {
  try {
    const query = buildPropertyQuery(req.query);
    const propertyCollection = getPropertyCollection();
    const docs = await propertyCollection.find(query, { projection: PROPERTY_PROJECTION }).sort({ createdAt: -1 }).toArray();

    const data = docs.map(serializeAssignmentProperty);
    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to fetch assignment properties", error: error.message });
  }
};

export const getAssignmentSummary = async (req, res) => {
  try {
    const propertyCollection = getPropertyCollection();

    const [total, assigned, availablePartners, assignedTodayDocs] = await Promise.all([
      propertyCollection.countDocuments({ isActive: { $ne: false }, deletedByAccount: { $ne: true }, status: { $nin: ["Draft", "draft"] } }),
      propertyCollection.countDocuments({ isActive: { $ne: false }, deletedByAccount: { $ne: true }, status: { $nin: ["Draft", "draft"] }, "assignedPartner.partnerId": { $exists: true, $ne: null } }),
      Partner.countDocuments({
        isDeleted: { $ne: true },
        isApproved: true,
        isVerified: true,
        isBlocked: { $ne: true },
        applicationStatus: "Verified",
        "permissions.canReceiveAssignments": true,
        accountType: { $in: ["single", "team"] },
        isSubPartner: false,
      }),
      propertyCollection.find(
        {
          isActive: { $ne: false },
          deletedByAccount: { $ne: true },
          status: { $nin: ["Draft", "draft"] },
          "assignedPartner.assignedAt": {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
        { projection: { _id: 1 } }
      ).toArray(),
    ]);

    return res.json({
      success: true,
      data: {
        total,
        assigned,
        unassigned: Math.max(0, total - assigned),
        assignedToday: assignedTodayDocs.length,
        availablePartners,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Unable to fetch assignment summary", error: error.message });
  }
};

export const blockPartner = async (req, res) => {
  const partner = await Partner.findByIdAndUpdate(req.params.id, { isBlocked: Boolean(req.body.isBlocked), applicationStatus: req.body.isBlocked ? "Suspended" : "Verified" }, { new: true }).select(SAFE);
  if (!partner) return res.status(404).json({ success: false, message: "Partner not found" });
  return res.json({ success: true, data: partner });
};

export const deletePartner = async (req, res) => {
  try {
    const result = await softDeleteAccount({
      id: req.params.id,
      type: "partner",
      deletedBy: { userId: req.user?.id || null, role: "admin" },
      reason: req.body?.reason || "Partner deleted by admin",
    });

    return res.json({
      success: true,
      message: result.alreadyDeleted ? "Partner is already deleted" : "Partner deleted successfully",
      data: { isDeleted: true, hiddenPropertyCount: result.hiddenPropertyCount },
    });
  } catch (error) {
    return res.status(error.status || 500).json({ success: false, message: error.message || "Unable to delete partner" });
  }
};
