import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

const CREDIT_API =
  `${API_BASE_URL}/credits`;

const PROMOTION_API =
  `${API_BASE_URL}/promotions`;

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token");

  return {
    Authorization: token
      ? `Bearer ${token}`
      : "",
  };
};

// ======================================================
// DASHBOARD
// GET /api/credits/dashboard
// ======================================================

export const getCreditDashboardApi =
  async () => {
    try {
      const response =
        await axios.get(
          `${CREDIT_API}/dashboard`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Get Credit Dashboard API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// PARTNER OVERVIEW
// GET /api/credits/partners
// ======================================================

export const getPartnerCreditOverviewApi =
  async (
    params = {}
  ) => {
    try {
      const response =
        await axios.get(
          `${CREDIT_API}/partners`,
          {
            params,

            headers:
              getAuthHeaders(),
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Partner Credit Overview API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// SINGLE PARTNER DETAILS
// GET /api/credits/partners/:partnerId
// ======================================================

export const getPartnerCreditDetailsApi =
  async (
    partnerId
  ) => {
    try {
      const response =
        await axios.get(
          `${CREDIT_API}/partners/${partnerId}`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Partner Credit Details API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// SINGLE PARTNER WALLET
// GET /api/credits/partner/:partnerId
// ======================================================

export const getPartnerWalletApi =
  async (
    partnerId
  ) => {
    try {
      const response =
        await axios.get(
          `${CREDIT_API}/partner/${partnerId}`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Partner Wallet API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// PROPERTY OVERVIEW
// GET /api/credits/properties
// ======================================================

export const getPropertyCreditOverviewApi =
  async (
    params = {}
  ) => {
    try {
      const response =
        await axios.get(
          `${CREDIT_API}/properties`,
          {
            params,

            headers:
              getAuthHeaders(),
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Property Credit Overview API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// SINGLE PROPERTY DETAILS
// GET /api/credits/properties/:propertyId
// ======================================================

export const getPropertyCreditDetailsApi =
  async (
    propertyId
  ) => {
    try {
      const response =
        await axios.get(
          `${CREDIT_API}/properties/${propertyId}`,
          {
            headers:
              getAuthHeaders(),
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Property Credit Details API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// CREDIT HISTORY
// GET /api/credits/history
// ======================================================

export const getCreditHistoryApi =
  async (
    params = {}
  ) => {
    try {
      const response =
        await axios.get(
          `${CREDIT_API}/history`,
          {
            params,

            headers:
              getAuthHeaders(),
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Credit History API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// CREDIT PURCHASE
// POST /api/credits/purchase/complete
// ======================================================

export const completeCreditPurchaseApi =
  async (
    payload
  ) => {
    try {
      const response =
        await axios.post(
          `${CREDIT_API}/purchase/complete`,
          payload,
          {
            headers: {
              ...getAuthHeaders(),

              "Content-Type":
                "application/json",
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Credit Purchase API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// REFUND
// POST /api/credits/refund
// ======================================================

export const refundCreditsApi =
  async (
    payload
  ) => {
    try {
      const response =
        await axios.post(
          `${CREDIT_API}/refund`,
          payload,
          {
            headers: {
              ...getAuthHeaders(),

              "Content-Type":
                "application/json",
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Refund Credits API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// ADMIN CREDIT ADJUSTMENT
// PATCH /api/credits/adjust
// ======================================================

export const adjustPartnerCreditsApi =
  async (
    payload
  ) => {
    try {
      const response =
        await axios.patch(
          `${CREDIT_API}/adjust`,
          payload,
          {
            headers: {
              ...getAuthHeaders(),

              "Content-Type":
                "application/json",
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Adjust Credits API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// PROMOTION REQUESTS
// ======================================================

export const getPromotionRequestsApi =
  async (
    params = {}
  ) => {
    try {
      const response =
        await axios.get(
          `${PROMOTION_API}`,
          {
            params,

            headers:
              getAuthHeaders(),
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Promotion Requests API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// APPROVE PROMOTION
// ======================================================

export const approvePromotionApi =
  async (
    requestId,
    payload = {}
  ) => {
    try {
      const response =
        await axios.patch(
          `${PROMOTION_API}/${requestId}/approve`,
          payload,
          {
            headers: {
              ...getAuthHeaders(),

              "Content-Type":
                "application/json",
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Approve Promotion API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// REJECT PROMOTION
// ======================================================

export const rejectPromotionApi =
  async (
    requestId,
    payload = {}
  ) => {
    try {
      const response =
        await axios.patch(
          `${PROMOTION_API}/${requestId}/reject`,
          payload,
          {
            headers: {
              ...getAuthHeaders(),

              "Content-Type":
                "application/json",
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Reject Promotion API Error:",
        error
      );

      throw error;
    }
  };