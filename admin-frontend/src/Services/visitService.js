// import axios from "./axios";


// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ||
//   "http://localhost:5000";

// const VISIT_API =
//   `${API_BASE_URL}/visits`;

// export const getVisitSummaryApi = async () => {
//   const response = await axios.get(`${VISIT_API}/summary`);
//   return response.data;
// };

// export const getAdminVisitsApi = async (params = {}) => {
//   const response = await axios.get(`${VISIT_API}/admin`, { params });
//   return response.data;
// };

// export const getVisitByIdApi = async (id) => {
//   const response = await axios.get(`${VISIT_API}/${id}`);
//   return response.data;
// };

// export const createVisitRequestApi = async (payload) => {
//   const response = await axios.post(`${VISIT_API}/request`, payload);
//   return response.data;
// };

// export const reviewVisitRequestApi = async (id, payload) => {
//   const response = await axios.patch(`${VISIT_API}/${id}/review`, payload);
//   return response.data;
// };

// export const updateVisitStatusApi = async (id, payload) => {
//   const response = await axios.patch(`${VISIT_API}/${id}/status`, payload);
//   return response.data;
// };

// export const getPartnerVisitsApi = async (partnerId) => {
//   const response = await axios.get(`${VISIT_API}/partner/${partnerId}`);
//   return response.data;
// };

import axios from "./axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const VISIT_API = `${API_BASE_URL}/visits`;

export const getVisitSummaryApi = async () => {
  const response = await axios.get(`${VISIT_API}/summary`);
  return response.data;
};

export const getAdminVisitsApi = async (params = {}) => {
  const response = await axios.get(`${VISIT_API}/admin`, { params });
  return response.data;
};

export const getVisitByIdApi = async (id) => {
  const response = await axios.get(`${VISIT_API}/${id}`);
  return response.data;
};

export const createVisitRequestApi = async (payload) => {
  const response = await axios.post(`${VISIT_API}/request`, payload);
  return response.data;
};

export const reviewVisitRequestApi = async (id, payload) => {
  const response = await axios.patch(`${VISIT_API}/${id}/review`, payload);
  return response.data;
};

export const updateVisitStatusApi = async (id, payload) => {
  const response = await axios.patch(`${VISIT_API}/${id}/status`, payload);
  return response.data;
};

export const getPartnerVisitsApi = async (partnerMongoId) => {
  const response = await axios.get(`${VISIT_API}/partner/${partnerMongoId}`);
  return response.data;
};


export const getTeamPendingVisitRequestsApi = async (ownerId) => {
  const response = await axios.get(`${VISIT_API}/team/${ownerId}/pending`);
  return response.data;
};

export const reviewSubAgentVisitByTeamOwnerApi = async (visitId, payload) => {
  const response = await axios.patch(`${VISIT_API}/${visitId}/team-review`, payload);
  return response.data;
};
