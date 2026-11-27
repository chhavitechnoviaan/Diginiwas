// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ||
//   "http://localhost:5000/api";

// const BOOST_API =
//   `${API_BASE_URL}/boost-operations`;

// export const getBoostOperationsDashboardApi =
//   async (params = {}) => {
//     const response = await axios.get(
//       `${BOOST_API}/dashboard`,
//       { params }
//     );

//     return response.data;
//   };

// export const getBoostRequestByIdApi =
//   async (id) => {
//     const response = await axios.get(
//       `${BOOST_API}/${id}`
//     );

//     return response.data;
//   };


import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

const BOOST_API =
  `${API_BASE_URL}/boost-operations`;

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
// BOOST DASHBOARD
// GET /api/boost-operations/dashboard
// ======================================================

export const getBoostOperationsDashboardApi =
  async (params = {}) => {
    try {
      const response =
        await axios.get(
          `${BOOST_API}/dashboard`,
          {
            params,
            headers: {
              ...getAuthHeaders(),
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Get Boost Dashboard API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// SINGLE BOOST REQUEST
// GET /api/boost-operations/:id
// ======================================================

export const getBoostRequestByIdApi =
  async (id) => {
    try {
      const response =
        await axios.get(
          `${BOOST_API}/${id}`,
          {
            headers: {
              ...getAuthHeaders(),
            },
          }
        );

      return response.data;
    } catch (error) {
      console.error(
        "Get Boost Request API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// APPROVE BOOST / FEATURED / LOCALITY REQUEST
// PATCH /api/promotions/:id/approve
// ======================================================

export const approveBoostRequestApi =
  async (
    id,
    payload = {}
  ) => {
    try {
      const response =
        await axios.patch(
          `${PROMOTION_API}/${id}/approve`,
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
        "Approve Boost Request API Error:",
        error
      );

      throw error;
    }
  };

// ======================================================
// REJECT BOOST / FEATURED / LOCALITY REQUEST
// PATCH /api/promotions/:id/reject
// ======================================================

export const rejectBoostRequestApi =
  async (
    id,
    payload = {}
  ) => {
    try {
      const response =
        await axios.patch(
          `${PROMOTION_API}/${id}/reject`,
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
        "Reject Boost Request API Error:",
        error
      );

      throw error;
    }
  };