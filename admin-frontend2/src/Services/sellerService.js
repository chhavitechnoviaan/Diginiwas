// // import axios from "axios";

// // const API_BASE_URL =
// //   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// // export const getAllSellersApi = async () => {
// //   try {
// //     const response = await axios.get(
// //       `${API_BASE_URL}/sellers/`
// //     );

// //     return response.data;
// //   } catch (error) {
// //     console.error("Get All Sellers API Error:", error);
// //     throw error;
// //   }
// // };

// // export const getSellerByIdApi = async (sellerId) => {
// //   try {
// //     const response = await axios.get(
// //       `${API_BASE_URL}/sellers/${sellerId}`
// //     );

// //     return response.data;
// //   } catch (error) {
// //     console.error("Get Seller By ID API Error:", error);
// //     throw error;
// //   }
// // };


// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ||
//   "http://localhost:5000/api";

// const authHeaders = () => ({
//   Authorization: `Bearer ${localStorage.getItem(
//     "token"
//   )}`,
// });

// // ======================================================
// // GET ALL SELLERS
// // ======================================================

// export const getAllSellersApi =
//   async (params = {}) => {
//     const response =
//       await axios.get(
//         `${API_BASE_URL}/sellers`,
//         {
//           params,
//           headers: authHeaders(),
//         }
//       );

//     return response.data;
//   };

// // ======================================================
// // GET SELLER DETAIL
// // Includes properties + propertyStats + assignedPartners
// // ======================================================

// export const getSellerByIdApi =
//   async (sellerId) => {
//     const response =
//       await axios.get(
//         `${API_BASE_URL}/sellers/${sellerId}`,
//         {
//           headers: authHeaders(),
//         }
//       );

//     return response.data;
//   };

// // ======================================================
// // VERIFY SELLER
// // ======================================================

// export const verifySellerApi =
//   async (
//     sellerId,
//     payload
//   ) => {
//     const response =
//       await axios.patch(
//         `${API_BASE_URL}/sellers/${sellerId}/verify`,
//         payload,
//         {
//           headers: {
//             ...authHeaders(),
//             "Content-Type":
//               "application/json",
//           },
//         }
//       );

//     return response.data;
//   };

// // ======================================================
// // GET SELLER PROPERTIES
// // ======================================================

// export const getSellerPropertiesApi =
//   async (sellerId) => {
//     const response =
//       await axios.get(
//         `${API_BASE_URL}/sellers/${sellerId}/properties`,
//         {
//           headers: authHeaders(),
//         }
//       );

//     return response.data;
//   };

// // ======================================================
// // GET SINGLE SELLER PROPERTY
// // ======================================================

// export const getSellerPropertyByIdApi =
//   async (
//     sellerId,
//     propertyId
//   ) => {
//     const response =
//       await axios.get(
//         `${API_BASE_URL}/sellers/${sellerId}/properties/${propertyId}`,
//         {
//           headers: authHeaders(),
//         }
//       );

//     return response.data;
//   };

// // ======================================================
// // GET SELLER SUMMARY
// // ======================================================

// export const getSellerSummaryApi =
//   async (sellerId) => {
//     const response =
//       await axios.get(
//         `${API_BASE_URL}/sellers/${sellerId}/summary`,
//         {
//           headers: authHeaders(),
//         }
//       );

//     return response.data;
//   };


import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

// ======================================================
// AUTH HEADER
// ======================================================

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ======================================================
// SELLER APPLICATION (PUBLIC)
// ======================================================

// Seller Registration (KYC Upload)
export const createSellerApplicationApi = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/sellers/applications/register`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Verify Email OTP
export const verifySellerEmailOtpApi = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/sellers/applications/verify-email`,
    payload
  );

  return response.data;
};

// Verify Phone OTP
export const verifySellerPhoneOtpApi = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/sellers/applications/verify-phone`,
    payload
  );

  return response.data;
};

// Resend Email OTP
export const resendSellerEmailOtpApi = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/sellers/applications/resend-email-otp`,
    payload
  );

  return response.data;
};

// Resend Phone OTP
export const resendSellerPhoneOtpApi = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/sellers/applications/resend-phone-otp`,
    payload
  );

  return response.data;
};

// ======================================================
// SELLER AUTH
// ======================================================

// Seller Login
export const sellerLoginApi = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/sellers/auth/login`,
    payload
  );

  return response.data;
};

// Change Password
export const changeSellerPasswordApi = async (payload) => {
  const response = await axios.patch(
    `${API_BASE_URL}/sellers/auth/change-password`,
    payload,
    {
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// ======================================================
// ADMIN SELLER APPLICATIONS
// ======================================================

// Pending / Approved / Rejected Applications
export const getSellerApplicationsApi = async (params = {}) => {
  const response = await axios.get(
    `${API_BASE_URL}/sellers/applications`,
    {
      params,
      headers: authHeaders(),
    }
  );

  return response.data;
};

// Single Seller Application
export const getSellerApplicationByIdApi = async (applicationId) => {
  const response = await axios.get(
    `${API_BASE_URL}/sellers/applications/${applicationId}`,
    {
      headers: authHeaders(),
    }
  );

  return response.data;
};

// Approve / Reject / Action Required
export const reviewSellerApplicationApi = async (
  applicationId,
  payload
) => {
  const response = await axios.patch(
    `${API_BASE_URL}/sellers/applications/${applicationId}/review`,
    payload,
    {
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// ======================================================
// APPROVED SELLERS MANAGEMENT
// ======================================================

// Seller Management List
export const getAllSellersApi = async (params = {}) => {
  const response = await axios.get(
    `${API_BASE_URL}/sellers`,
    {
      params,
      headers: authHeaders(),
    }
  );

  return response.data;
};

// Seller Detail
export const getSellerByIdApi = async (sellerId) => {
  const response = await axios.get(
    `${API_BASE_URL}/sellers/${sellerId}`,
    {
      headers: authHeaders(),
    }
  );

  return response.data;
};

// Activate / Suspend Seller
export const verifySellerApi = async (
  sellerId,
  payload
) => {
  const response = await axios.patch(
    `${API_BASE_URL}/sellers/${sellerId}/verify`,
    payload,
    {
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

// ======================================================
// SELLER PROPERTY APIs
// ======================================================

// Seller Summary
export const getSellerSummaryApi = async (sellerId) => {
  const response = await axios.get(
    `${API_BASE_URL}/sellers/${sellerId}/summary`,
    {
      headers: authHeaders(),
    }
  );

  return response.data;
};

// All Properties of Seller
export const getSellerPropertiesApi = async (sellerId) => {
  const response = await axios.get(
    `${API_BASE_URL}/sellers/${sellerId}/properties`,
    {
      headers: authHeaders(),
    }
  );

  return response.data;
};

// Single Property
export const getSellerPropertyByIdApi = async (
  sellerId,
  propertyId
) => {
  const response = await axios.get(
    `${API_BASE_URL}/sellers/${sellerId}/properties/${propertyId}`,
    {
      headers: authHeaders(),
    }
  );

  return response.data;
};
// Admin-only: Seller collection ID -> all related seller-to-partner boost requests.
export const getAdminSellerBoostRequestsApi = async (sellerId, params = {}) => {
  const { default: adminApi } = await import("./axios");
  return (await adminApi.get(`/admin/sellers/${sellerId}/boost-requests`, { params })).data;
};
