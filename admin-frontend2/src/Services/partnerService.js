// // import axios from "axios";

// // const API_BASE_URL =
// //   import.meta.env.VITE_API_BASE_URL ||
// //   "http://localhost:5000";

// // const PARTNER_API =
// //   `${API_BASE_URL}/partners`;

// // export const getAllPartnersApi =
// //   async () => {
// //     try {
// //       const response =
// //         await axios.get(
// //           `${PARTNER_API}/`
// //         );

// //       return response.data;
// //     } catch (error) {
// //       console.error(
// //         "Get All Partners API Error:",
// //         error
// //       );
// //       throw error;
// //     }
// //   };
// // export const getPartnerByIdApi =
// //   async (partnerId) => {
// //     try {
// //       const response =
// //         await axios.get(
// //           `${PARTNER_API}/${partnerId}`
// //         );

// //       return response.data;
// //     } catch (error) {
// //       console.error(
// //         "Get Partner By ID API Error:",
// //         error
// //       );

// //       throw error;
// //     }
// //   };
// // // export const getPartnerByIdApi =
// // //   async (partnerId) => {
// // //     try {
// // //       const response =
// // //         await axios.get(
// // //           `${PARTNER_API}/${partnerId}`
// // //         );

// // //       return response.data;
// // //     } catch (error) {
// // //       console.error(
// // //         "Get Partner By ID API Error:",
// // //         error
// // //       );

// // //       throw error;
// // //     }
// // //   };
// // export const verifyPartnerApi = async (id, isVerified = true) => {
// //   const response = await axios.patch(
// //     `${PARTNER_API}/${id}/verify`,
// //     { isVerified }, // Pass object directly as 2nd argument
// //     {
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     }
// //   );

// //   return response.data;
// // };

// // export const blacklistPartnerApi = async (id, isBlocked) => {
// //   const response = await axios.patch(
// //     `${PARTNER_API}/${id}/block`,
// //     { isBlocked },
// //     {
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     }
// //   );

// //   return response.data;
// // };

// // export const deletePartnerApi = async (
// //   id
// // ) => {
// //   const response = await axios.delete(
// //     `${PARTNER_API}/delete/${id}`
// //   );

// //   return response.data;
// // };

// //   export const getUnassignedPropertiesApi =
// //   async () => {
// //     const response =
// //       await axios.get(
// //        `${PARTNER_API}/properties/unassigned`
// //       );

// //     return response.data;
// //   };

// // export const getAvailablePartnersApi =
// //   async (params = {}) => {
// //     const response =
// //       await axios.get(
// //         `${PARTNER_API}/partners/available`,
// //         {
// //           params,
// //         }
// //       );

// //     return response.data;
// //   };

// // export const assignPartnerApi =
// //   async (
// //     propertyMongoId,
// //     data
// //   ) => {
// //     const response =
// //       await axios.patch(
// //         `${PARTNER_API}/properties/${propertyMongoId}/assign-partner`,
// //         data
// //       );

// //     return response.data;
// //   };

// // export const getAssignmentSummaryApi =
// //   async () => {
// //     const response =
// //       await axios.get(
// //         `${PARTNER_API}/summary`
// //       );

// //     return response.data;
// //   };

// // export const getAssignmentPropertiesApi =
// //   async (
// //     params = {}
// //   ) => {
// //     const response =
// //       await axios.get(
// //         `${PARTNER_API}/properties`,
// //         {
// //           params,
// //         }
// //       );

// //     return response.data;
// //   };

// // export const unassignPartnerFromPropertyApi =
// //   async (
// //     propertyId,
// //     payload
// //   ) => {
// //     const response =
// //       await axios.patch(
// //         `${PARTNER_API}/properties/${propertyId}/unassign`,
// //         payload
// //       );

// //     return response.data;
// //   };
// // // export const getAvailablePartnersApi =
// // //   async (
// // //     params = {}
// // //   ) => {
// // //     const response =
// // //       await axios.get(
// // //         "/partner-assignment/partners",
// // //         {
// // //           params,
// // //         }
// // //       );

// // //     return response.data;
// // //   };

// // // ======================================================
// // // ASSIGN
// // // ======================================================

// // export const assignPartnerToPropertyApi =
// //   async (
// //     propertyId,
// //     payload
// //   ) => {
// //     const response =
// //       await axios.patch(
// //         `${PARTNER_API}/properties/${propertyId}/assign`,
// //         payload
// //       );

// //     return response.data;
// //   };

// //   export const assignPropertyToPartnerApi =
// //   async (
// //     propertyId,
// //     payload
// //   ) => {
// //     const response =
// //       await axios.patch(
// //         `${PARTNER_API}/properties/${propertyId}/assign`,
// //         payload
// //       );

// //     return response.data;
// //   };

// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// const PARTNER_API = `${API_BASE_URL}/partners`;

// export const getAllPartnersApi = async () => {
//   const response = await axios.get(`${PARTNER_API}/`);
//   return response.data;
// };

// export const getPartnerByIdApi = async (partnerMongoId) => {
//   const response = await axios.get(`${PARTNER_API}/${partnerMongoId}`);
//   return response.data;
// };

// export const verifyPartnerApi = async (id, isVerified = true) => {
//   const response = await axios.patch(
//     `${PARTNER_API}/${id}/verify`,
//     { isVerified },
//     { headers: { "Content-Type": "application/json" } }
//   );
//   return response.data;
// };

// export const blacklistPartnerApi = async (id, isBlocked) => {
//   const response = await axios.patch(
//     `${PARTNER_API}/${id}/block`,
//     { isBlocked },
//     { headers: { "Content-Type": "application/json" } }
//   );
//   return response.data;
// };

// export const deletePartnerApi = async (id) => {
//   const response = await axios.delete(`${PARTNER_API}/delete/${id}`);
//   return response.data;
// };

// export const getUnassignedPropertiesApi = async () => {
//   const response = await axios.get(`${PARTNER_API}/properties/unassigned`);
//   return response.data;
// };

// export const getAvailablePartnersApi = async (params = {}) => {
//   const response = await axios.get(`${PARTNER_API}/partners/available`, { params });
//   return response.data;
// };

// export const assignPartnerApi = async (propertyMongoId, data) => {
//   const response = await axios.patch(
//     `${PARTNER_API}/properties/${propertyMongoId}/assign-partner`,
//     data
//   );
//   return response.data;
// };

// export const getAssignmentSummaryApi = async () => {
//   const response = await axios.get(`${PARTNER_API}/summary`);
//   return response.data;
// };

// export const getAssignmentPropertiesApi = async (params = {}) => {
//   const response = await axios.get(`${PARTNER_API}/properties`, { params });
//   return response.data;
// };

// export const unassignPartnerFromPropertyApi = async (propertyId, payload) => {
//   const response = await axios.patch(
//     `${PARTNER_API}/properties/${propertyId}/unassign`,
//     payload
//   );
//   return response.data;
// };

// export const assignPartnerToPropertyApi = async (propertyId, payload) => {
//   const response = await axios.patch(
//     `${PARTNER_API}/properties/${propertyId}/assign`,
//     payload
//   );
//   return response.data;
// };

// export const assignPropertyToPartnerApi = assignPartnerToPropertyApi;

import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const auth = () => {
  const token = localStorage.getItem("token");
  return { headers: token ? { Authorization: `Bearer ${token}` } : {} };
};
const config = () => {
  const token = localStorage.getItem("token");

  return {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
};
// export const getPartnerApplicationsApi = async (params={}) => (await axios.get(`${API_BASE_URL}/partner-applications`, { ...auth(), params })).data;
export const getPartnerApplicationByIdApi = async (id) =>
  (await axios.get(`${API_BASE_URL}/partner-applications/${id}`, auth())).data;
// export const approvePartnerApplicationApi = async (id,payload={}) => (await axios.patch(`${API_BASE_URL}/partner-applications/${id}/approve`, payload, auth())).data;
export const verifyApprovedPartnerApi = async (id, payload = {}) =>
  (
    await axios.patch(
      `${API_BASE_URL}/partner-applications/${id}/verify`,
      payload,
      auth(),
    )
  ).data;
// export const actionRequiredPartnerApi = async (id,payload={}) => (await axios.patch(`${API_BASE_URL}/partner-applications/${id}/action-required`, payload, auth())).data;
// export const rejectPartnerApplicationApi = async (id,payload={}) => (await axios.patch(`${API_BASE_URL}/partner-applications/${id}/reject`, payload, auth())).data;

export const getAllPartnersApi = async (params = {}) =>
  (await axios.get(`${API_BASE_URL}/partners`, { ...auth(), params })).data;
export const getApprovedNotVerifiedPartnersApi = async () =>
  (await axios.get(`${API_BASE_URL}/partners/approved-not-verified`, auth()))
    .data;
export const getPartnerByIdApi = async (id) =>
  (await axios.get(`${API_BASE_URL}/partners/${id}`, auth())).data;
export const blacklistPartnerApi = async (id, isBlocked) =>
  (
    await axios.patch(
      `${API_BASE_URL}/partners/${id}/block`,
      { isBlocked },
      auth(),
    )
  ).data;
export const deletePartnerApi = async (id) =>
  (await axios.delete(`${API_BASE_URL}/partners/delete/${id}`, auth())).data;

export const getAvailablePartnersApi = async (params = {}) =>
  (
    await axios.get(`${API_BASE_URL}/partners/available`, {
      ...auth(),
      params,
    })
  ).data;
export const getAssignmentSummaryApi = async () =>
  (await axios.get(`${API_BASE_URL}/partners/summary`, auth())).data;
export const getAssignmentPropertiesApi = async (params = {}) =>
  (
    await axios.get(`${API_BASE_URL}/partners/properties`, {
      ...auth(),
      params,
    })
  ).data;
// export const assignPartnerToPropertyApi = async (propertyId,partnerId) => (await axios.patch(`${API_BASE_URL}/partners/properties/${propertyId}/assign`, { partnerId }, auth())).data;
export const unassignPartnerFromPropertyApi = async (propertyId) =>
  (
    await axios.patch(
      `${API_BASE_URL}/partners/properties/${propertyId}/unassign`,
      {},
      auth(),
    )
  ).data;
export const assignPartnerToPropertyApi = async (propertyId, payload) => {
  const response = await axios.patch(
    `${API_BASE_URL}/partners/properties/${propertyId}/assign`,
    payload,
    auth(),
  );

  return response.data;
};
// export const getTeamPartnersApi = async () => (await axios.get(`${API_BASE_URL}/team-partners`, auth())).data;
export const addTeamMemberApi = async (ownerId, payload) =>
  (
    await axios.post(
      `${API_BASE_URL}/team-partners/${ownerId}/members`,
      payload,
      auth(),
    )
  ).data;
// export const allocateTeamCreditsApi = async (ownerId,memberId,payload) => (await axios.patch(`${API_BASE_URL}/team-partners/${ownerId}/members/${memberId}/allocate-credits`, payload, auth())).data;
// export const getTeamMemberCreditHistoryApi = async (ownerId,memberId) => (await axios.get(`${API_BASE_URL}/team-partners/${ownerId}/members/${memberId}/credit-history`, auth())).data;
export const addSubAgentApplicationApi = async (ownerId, payload) => {
  const res = await axios.post(
    `${API_BASE_URL}/team-partners/${ownerId}/members`,
    payload,
    config(),
  );
  return res.data;
};
export const getTeamPartnersApi = async () => {
  const res = await axios.get(`${API_BASE_URL}/team-partners`, config());
  return res.data;
};
export const allocateTeamCreditsApi = async (ownerId, memberId, payload) => {
  const res = await axios.patch(
    `${API_BASE_URL}/team-partners/${ownerId}/members/${memberId}/allocate-credits`,
    payload,
    config(),
  );
  return res.data;
};
export const getTeamMemberCreditHistoryApi = async (ownerId, memberId) => {
  const res = await axios.get(
    `${API_BASE_URL}/team-partners/${ownerId}/members/${memberId}/credit-history`,
    config(),
  );
  return res.data;
};
export const getPartnerApplicationsApi = async (params = {}) => {
  const res = await axios.get(`${API_BASE_URL}/partner-applications`, {
    ...config(),
    params,
  });
  return res.data;
};

export const approvePartnerApplicationApi = async (id, payload = {}) => {
  const res = await axios.patch(
    `${API_BASE_URL}/partner-applications/${id}/approve`,
    payload,
    config(),
  );
  return res.data;
};

export const verifyPartnerApplicationApi = async (id, payload = {}) => {
  const res = await axios.patch(
    `${API_BASE_URL}/partner-applications/${id}/verify`,
    payload,
    config(),
  );
  return res.data;
};

export const actionRequiredPartnerApi = async (id, payload = {}) => {
  const res = await axios.patch(
    `${API_BASE_URL}/partner-applications/${id}/action-required`,
    payload,
    config(),
  );
  return res.data;
};

export const rejectPartnerApplicationApi = async (id, payload = {}) => {
  const res = await axios.patch(
    `${API_BASE_URL}/partner-applications/${id}/reject`,
    payload,
    config(),
  );
  return res.data;
};

// ======================================================
// TEAM OWNER / SUB-AGENT PROPERTY FLOW
// ======================================================
export const getVerifiedTeamMembersApi = async (ownerId) => {
  const res = await axios.get(
    `${API_BASE_URL}/team-partners/${ownerId}/verified-members`,
    config(),
  );
  return res.data;
};

export const getTeamAssignedPropertiesApi = async (ownerId) => {
  const res = await axios.get(
    `${API_BASE_URL}/team-partners/${ownerId}/properties`,
    config(),
  );
  return res.data;
};

export const delegatePropertyToSubAgentApi = async (
  ownerId,
  propertyId,
  subPartnerId,
) => {
  const res = await axios.patch(
    `${API_BASE_URL}/team-partners/${ownerId}/properties/${propertyId}/delegate`,
    { subPartnerId },
    config(),
  );
  return res.data;
};

export const removeSubAgentPropertyDelegationApi = async (
  ownerId,
  propertyId,
) => {
  const res = await axios.patch(
    `${API_BASE_URL}/team-partners/${ownerId}/properties/${propertyId}/remove-delegation`,
    {},
    config(),
  );
  return res.data;
};
