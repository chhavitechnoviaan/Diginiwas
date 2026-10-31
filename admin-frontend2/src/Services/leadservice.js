// import axios from "./axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ||
//   "http://localhost:5000/api";

// const LEAD_API =
//   `${API_BASE_URL}/leads`;


// export const createLeadFromPropertyApi =
//   async (payload) => {
//     const response =
//       await axios.post(
//         `${LEAD_API}/from-property`,
//         payload
//       );

//     return response.data;
//   };

// // ======================================================
// // ADMIN CREATE LEAD
// // ======================================================

// export const createLeadApi =
//   async (payload) => {
//     const response =
//       await axios.post(
//         LEAD_API,
//         payload
//       );

//     return response.data;
//   };

// // ======================================================
// // LIST / DETAIL
// // ======================================================

// export const getLeadsApi =
//   async (params = {}) => {
//     const response =
//       await axios.get(
//         LEAD_API,
//         {
//           params,
//         }
//       );

//     return response.data;
//   };

// export const getLeadByIdApi =
//   async (id) => {
//     const response =
//       await axios.get(
//         `${LEAD_API}/${id}`
//       );

//     return response.data;
//   };

// // ======================================================
// // DASHBOARD
// // ======================================================

// export const getLeadDashboardApi =
//   async () => {
//     const response =
//       await axios.get(
//         `${LEAD_API}/dashboard`
//       );

//     return response.data;
//   };

// // ======================================================
// // STATUS / WORKFLOW
// // ======================================================

// export const updateLeadStatusApi =
//   async (
//     id,
//     payload
//   ) => {
//     const response =
//       await axios.patch(
//         `${LEAD_API}/${id}/status`,
//         payload
//       );

//     return response.data;
//   };

// export const assignLeadPartnerApi =
//   async (
//     id,
//     payload
//   ) => {
//     const response =
//       await axios.patch(
//         `${LEAD_API}/${id}/assign-partner`,
//         payload
//       );

//     return response.data;
//   };

// export const unlockLeadByPartnerApi =
//   async (
//     id,
//     payload
//   ) => {
//     const response =
//       await axios.patch(
//         `${LEAD_API}/${id}/unlock`,
//         payload
//       );

//     return response.data;
//   };

// export const reviewLeadApi =
//   async (
//     id,
//     payload
//   ) => {
//     const response =
//       await axios.patch(
//         `${LEAD_API}/${id}/review`,
//         payload
//       );

//     return response.data;
//   };

// export const rejectLeadApi =
//   async (
//     id,
//     payload
//   ) => {
//     const response =
//       await axios.patch(
//         `${LEAD_API}/${id}/reject`,
//         payload
//       );

//     return response.data;
//   };

// export const closeLeadApi =
//   async (
//     id,
//     payload
//   ) => {
//     const response =
//       await axios.patch(
//         `${LEAD_API}/${id}/close`,
//         payload
//       );

//     return response.data;
//   };

// export const convertLeadApi =
//   async (
//     id,
//     payload
//   ) => {
//     const response =
//       await axios.patch(
//         `${LEAD_API}/${id}/convert`,
//         payload
//       );

//     return response.data;
//   };

// // ======================================================
// // CONTACT HISTORY
// // ======================================================

// export const addLeadContactHistoryApi =
//   async (
//     id,
//     payload
//   ) => {
//     const response =
//       await axios.post(
//         `${LEAD_API}/${id}/contact-history`,
//         payload
//       );

//     return response.data;
//   };

import axios from "./axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

const LEAD_API =
  `${API_BASE_URL}/leads`;


export const createLeadFromPropertyApi =
  async (payload) => {
    const response =
      await axios.post(
        `${LEAD_API}/from-property`,
        payload
      );

    return response.data;
  };

// ======================================================
// ADMIN CREATE LEAD
// ======================================================

export const createLeadApi =
  async (payload) => {
    const response =
      await axios.post(
        LEAD_API,
        payload
      );

    return response.data;
  };

// ======================================================
// LIST / DETAIL
// ======================================================

export const getLeadsApi =
  async (params = {}) => {
    const response =
      await axios.get(
        LEAD_API,
        {
          params,
        }
      );

    return response.data;
  };

export const getLeadByIdApi =
  async (id) => {
    const response =
      await axios.get(
        `${LEAD_API}/${id}`
      );

    return response.data;
  };

// ======================================================
// DASHBOARD
// ======================================================

export const getLeadDashboardApi =
  async () => {
    const response =
      await axios.get(
        `${LEAD_API}/dashboard`
      );

    return response.data;
  };

// ======================================================
// STATUS / WORKFLOW
// ======================================================

export const updateLeadStatusApi =
  async (
    id,
    payload
  ) => {
    const response =
      await axios.patch(
        `${LEAD_API}/${id}/status`,
        payload
      );

    return response.data;
  };

export const assignLeadPartnerApi =
  async (
    id,
    payload
  ) => {
    const response =
      await axios.patch(
        `${LEAD_API}/${id}/assign-partner`,
        payload
      );

    return response.data;
  };

export const verifyLeadByAdminApi = async (id, payload = {}) => {
  const response = await axios.patch(
    `${LEAD_API}/${id}/verify`,
    payload
  );
  return response.data;
};

export const unlockLeadByPartnerApi =
  async (
    id,
    payload
  ) => {
    const response =
      await axios.patch(
        `${LEAD_API}/${id}/unlock`,
        payload
      );

    return response.data;
  };

export const reviewLeadApi =
  async (
    id,
    payload
  ) => {
    const response =
      await axios.patch(
        `${LEAD_API}/${id}/review`,
        payload
      );

    return response.data;
  };

export const rejectLeadApi =
  async (
    id,
    payload
  ) => {
    const response =
      await axios.patch(
        `${LEAD_API}/${id}/reject`,
        payload
      );

    return response.data;
  };

export const closeLeadApi =
  async (
    id,
    payload
  ) => {
    const response =
      await axios.patch(
        `${LEAD_API}/${id}/close`,
        payload
      );

    return response.data;
  };

export const convertLeadApi =
  async (
    id,
    payload
  ) => {
    const response =
      await axios.patch(
        `${LEAD_API}/${id}/convert`,
        payload
      );

    return response.data;
  };

// ======================================================
// CONTACT HISTORY
// ======================================================

export const addLeadContactHistoryApi =
  async (
    id,
    payload
  ) => {
    const response =
      await axios.post(
        `${LEAD_API}/${id}/contact-history`,
        payload
      );

    return response.data;
  };


// ======================================================
// PARTNER / TEAM / SUB-AGENT LEAD FLOW
// ======================================================

export const getPartnerVisibleLeadsApi = async (partnerId, params = {}) => {
  const response = await axios.get(`${LEAD_API}/partner/${partnerId}`, { params });
  return response.data;
};

export const getPartnerVisibleLeadByIdApi = async (partnerId, leadId) => {
  const response = await axios.get(`${LEAD_API}/partner/${partnerId}/${leadId}`);
  return response.data;
};

export const allocateLeadToSubPartnerApi = async (leadId, payload) => {
  const response = await axios.patch(
    `${LEAD_API}/${leadId}/allocate-subpartner`,
    payload
  );
  return response.data;
};

export const removeLeadSubPartnerAllocationApi = async (leadId, payload) => {
  const response = await axios.patch(
    `${LEAD_API}/${leadId}/remove-subpartner-allocation`,
    payload
  );
  return response.data;
};
