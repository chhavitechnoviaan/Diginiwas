
// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ||
//   "http://localhost:5000/api";


// // ======================================================
// // AUTH HEADERS
// // ======================================================

// const getAuthHeaders = () => {
//   const token =
//     localStorage.getItem("token");

//   return {
//     Authorization: token
//       ? `Bearer ${token}`
//       : "",
//   };
// };


// // ======================================================
// // CREATE PROPERTY
// // POST /api/newproperties
// // ======================================================

// export const createPropertyApi = async (
//   payload
// ) => {
//   try {
//     const response =
//       await axios.post(
//         `${API_BASE_URL}/newproperties`,
//         payload,
//         {
//           headers: {
//             ...getAuthHeaders(),
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Create Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


// export const getDraftPropertiesApi = async ({ search = "" } = {}) => {
//   return getAllPropertiesApi({ status: "Draft", search });
// };
// // ======================================================
// // GET ALL PROPERTIES
// // GET /api/newproperties/all
// // ======================================================

// export const getAllPropertiesApi = async ({
//   role = "",
//   status = "",
//   city = "",
//   search = "",
//   draftOnly = false,
// } = {}) => {
//   try {
//     const response =
//       await axios.get(
//         `${API_BASE_URL}/newproperties/all`,
//         {
//           params: {
//             role:
//               role || undefined,

//             status:
//               status || undefined,

//             city:
//               city || undefined,

//             search:
//               search || undefined,
//             draftOnly: draftOnly ? "true" : undefined,
//           },

//           headers: {
//             ...getAuthHeaders(),
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Get All Properties API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // GET PROPERTY BY ID
// // GET /api/newproperties/:id
// // ======================================================

// export const getPropertyByIdApi = async (
//   id
// ) => {
//   try {
//     const response =
//       await axios.get(
//         `${API_BASE_URL}/newproperties/${id}`,
//         {
//           headers: {
//             ...getAuthHeaders(),
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Get Property By ID API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // UPDATE PROPERTY
// // PATCH /api/newproperties/:id
// //
// // Supports:
// // - normal fields
// // - images[]
// // - floorPlan
// // - reraCertificate
// // - video
// // - existingImages
// // ======================================================
// export const publishDraftPropertyApi = async (id, actor = {}) => {
//   try {
//     const response = await axios.patch(
//       `${API_BASE_URL}/newproperties/${id}`,
//       {
//         status: "Submitted",
//         updatedByUserId: actor?.id || undefined,
//         updatedByName: actor?.name || undefined,
//         updatedByRole: actor?.role || undefined,
//         statusRemarks: "Draft property submitted for review.",
//       },
//       {
//         headers: {
//           ...getAuthHeaders(),
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Publish Draft Property API Error:", error);
//     throw error;
//   }
// };

// export const updatePropertyApi = async (
//   id,
//   payload
// ) => {
//   try {
//     const response =
//       await axios.patch(
//         `${API_BASE_URL}/newproperties/${id}`,
//         payload,
//         {
//           headers: {
//             ...getAuthHeaders(),

//             // IMPORTANT:
//             // FormData ke case me Content-Type manually
//             // set mat karna. Browser boundary khud set karega.
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Update Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // UPDATE PROPERTY STATUS
// // PATCH /api/newproperties/:id/status
// //
// // Allowed:
// // Reviewing
// // Verified
// // Live
// // Rejected
// // Sold
// // Rented
// // ======================================================

// export const updatePropertyStatusApi =
//   async (
//     id,
//     payload
//   ) => {
//     try {
//       const response =
//         await axios.patch(
//           `${API_BASE_URL}/newproperties/${id}/status`,
//           payload,
//           {
//             headers: {
//               ...getAuthHeaders(),

//               "Content-Type":
//                 "application/json",
//             },
//           }
//         );

//       return response.data;
//     } catch (error) {
//       console.error(
//         "Update Property Status API Error:",
//         error
//       );

//       throw error;
//     }
//   };


// // ======================================================
// // VERIFY PROPERTY
// // Shortcut for status = Verified
// // PATCH /api/newproperties/:id/status
// // ======================================================

// export const verifyPropertyApi = async (
//   id,
//   notes =
//     "Property verified by admin."
// ) => {
//   try {
//     const response =
//       await axios.patch(
//         `${API_BASE_URL}/newproperties/${id}/status`,
//         {
//           status: "Verified",
//           notes,
//           rejectionReason: "",
//         },
//         {
//           headers: {
//             ...getAuthHeaders(),

//             "Content-Type":
//               "application/json",
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Verify Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // DELETE PROPERTY
// // DELETE /api/newproperties/:id/delete
// // ======================================================

// export const deletePropertyApi = async (
//   id
// ) => {
//   try {
//     const response =
//       await axios.delete(
//         `${API_BASE_URL}/newproperties/${id}/delete`,
//         {
//           headers: {
//             ...getAuthHeaders(),
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Delete Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // BOOST PROPERTY
// // PATCH /api/newproperties/:id/boost
// // ======================================================

// export const boostPropertyApi = async (
//   id,
//   payload = {
//     boostType: "Featured",
//     days: 7,
//   }
// ) => {
//   try {
//     const response =
//       await axios.patch(
//         `${API_BASE_URL}/newproperties/${id}/boost`,
//         payload,
//         {
//           headers: {
//             ...getAuthHeaders(),

//             "Content-Type":
//               "application/json",
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Boost Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // REMOVE BOOST
// // PATCH /api/newproperties/:id/unboost
// // ======================================================

// export const unboostPropertyApi = async (
//   id
// ) => {
//   try {
//     const response =
//       await axios.patch(
//         `${API_BASE_URL}/newproperties/${id}/unboost`,
//         {},
//         {
//           headers: {
//             ...getAuthHeaders(),

//             "Content-Type":
//               "application/json",
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Unboost Property API Error:",
//       error
//     );

//     throw error;
//   }
// };

// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL ||
//   "http://localhost:5000/api";


// // ======================================================
// // AUTH HEADERS
// // ======================================================

// const getAuthHeaders = () => {
//   const token =
//     localStorage.getItem("token");

//   return {
//     Authorization: token
//       ? `Bearer ${token}`
//       : "",
//   };
// };


// // ======================================================
// // CREATE PROPERTY
// // POST /api/newproperties
// // ======================================================

// export const createPropertyApi = async (
//   payload
// ) => {
//   try {
//     const response =
//       await axios.post(
//         `${API_BASE_URL}/newproperties`,
//         payload,
//         {
//           headers: {
//             ...getAuthHeaders(),
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Create Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // GET ALL PROPERTIES
// // GET /api/newproperties/all
// // ======================================================

// export const getAllPropertiesApi = async ({
//   role = "",
//   status = "",
//   city = "",
//   search = "",
// } = {}) => {
//   try {
//     const response =
//       await axios.get(
//         `${API_BASE_URL}/newproperties/all`,
//         {
//           params: {
//             role:
//               role || undefined,

//             status:
//               status || undefined,

//             city:
//               city || undefined,

//             search:
//               search || undefined,
//           },

//           headers: {
//             ...getAuthHeaders(),
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Get All Properties API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // GET PROPERTY BY ID
// // GET /api/newproperties/:id
// // ======================================================

// export const getPropertyByIdApi = async (
//   id
// ) => {
//   try {
//     const response =
//       await axios.get(
//         `${API_BASE_URL}/newproperties/${id}`,
//         {
//           headers: {
//             ...getAuthHeaders(),
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Get Property By ID API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // UPDATE PROPERTY
// // PATCH /api/newproperties/:id
// //
// // Supports:
// // - normal fields
// // - images[]
// // - floorPlan
// // - reraCertificate
// // - video
// // - existingImages
// // ======================================================

// export const updatePropertyApi = async (
//   id,
//   payload
// ) => {
//   try {
//     const response =
//       await axios.patch(
//         `${API_BASE_URL}/newproperties/${id}`,
//         payload,
//         {
//           headers: {
//             ...getAuthHeaders(),

//             // IMPORTANT:
//             // FormData ke case me Content-Type manually
//             // set mat karna. Browser boundary khud set karega.
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Update Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // UPDATE PROPERTY STATUS
// // PATCH /api/newproperties/:id/status
// //
// // Allowed:
// // Reviewing
// // Verified
// // Live
// // Rejected
// // Sold
// // Rented
// // ======================================================

// export const updatePropertyStatusApi =
//   async (
//     id,
//     payload
//   ) => {
//     try {
//       const response =
//         await axios.patch(
//           `${API_BASE_URL}/newproperties/${id}/status`,
//           payload,
//           {
//             headers: {
//               ...getAuthHeaders(),

//               "Content-Type":
//                 "application/json",
//             },
//           }
//         );

//       return response.data;
//     } catch (error) {
//       console.error(
//         "Update Property Status API Error:",
//         error
//       );

//       throw error;
//     }
//   };


// // ======================================================
// // VERIFY PROPERTY
// // Shortcut for status = Verified
// // PATCH /api/newproperties/:id/status
// // ======================================================

// export const verifyPropertyApi = async (
//   id,
//   notes =
//     "Property verified by admin."
// ) => {
//   try {
//     const response =
//       await axios.patch(
//         `${API_BASE_URL}/newproperties/${id}/status`,
//         {
//           status: "Verified",
//           notes,
//           rejectionReason: "",
//         },
//         {
//           headers: {
//             ...getAuthHeaders(),

//             "Content-Type":
//               "application/json",
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Verify Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // DELETE PROPERTY
// // DELETE /api/newproperties/:id/delete
// // ======================================================

// export const deletePropertyApi = async (
//   id
// ) => {
//   try {
//     const response =
//       await axios.delete(
//         `${API_BASE_URL}/newproperties/${id}/delete`,
//         {
//           headers: {
//             ...getAuthHeaders(),
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Delete Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // BOOST PROPERTY
// // PATCH /api/newproperties/:id/boost
// // ======================================================

// export const boostPropertyApi = async (
//   id,
//   payload = {
//     boostType: "Featured",
//     days: 7,
//   }
// ) => {
//   try {
//     const response =
//       await axios.patch(
//         `${API_BASE_URL}/newproperties/${id}/boost`,
//         payload,
//         {
//           headers: {
//             ...getAuthHeaders(),

//             "Content-Type":
//               "application/json",
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Boost Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


// // ======================================================
// // REMOVE BOOST
// // PATCH /api/newproperties/:id/unboost
// // ======================================================

// export const unboostPropertyApi = async (
//   id
// ) => {
//   try {
//     const response =
//       await axios.patch(
//         `${API_BASE_URL}/newproperties/${id}/unboost`,
//         {},
//         {
//           headers: {
//             ...getAuthHeaders(),

//             "Content-Type":
//               "application/json",
//           },
//         }
//       );

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Unboost Property API Error:",
//       error
//     );

//     throw error;
//   }
// };


import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// Unified property adapter: keeps Admin screens compatible with NewProperty,
// ResidentialSaleProperty, CommercialSaleProperty, RentalProperty and
// CommercialRentalProperty documents.
export const normalizePropertyForAdmin = (property = {}) => {
  const location = property.location || {};
  const creator = property.addedBy || property.createdBy || {};
  // API can return a top-level `images: []` while the real media
  // is stored under `media.images`. Prefer the populated source.
  const rawImages =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : Array.isArray(property.media?.images)
        ? property.media.images
        : [];

  // Always keep the cover image first, then the remaining images.
  const images = rawImages
    .filter((item) => item && (item.url || typeof item === "string"))
    .sort((a, b) => Number(Boolean(b?.isCover)) - Number(Boolean(a?.isCover)));
  const area = Array.isArray(property.areaDetails)
    ? (property.areaDetails.find((item) => item?.display) || property.areaDetails[0])
    : null;
  const price = typeof property.price === "object"
    ? Number(property.price?.amount || 0)
    : Number(property.price || property.rent?.amount || 0);

  return {
    ...property,
    city: property.city || location.city || "",
    state: property.state || location.state || "",
    country: property.country || location.country || "India",
    locality: property.locality || location.locality || "",
    address: property.address || location.address || "",
    pinCode: property.pinCode || location.pinCode || "",
    latitude: property.latitude ?? location.latitude ?? null,
    longitude: property.longitude ?? location.longitude ?? null,
    propertyType: property.propertyType || (String(property.category || "").toLowerCase() === "plot/land" ? "Plot" : property.category || ""),
    transactionType: property.transactionType === "Resale" || property.transactionType === "New Booking" || property.listingType === "Sell" ? "Sale" : property.transactionType === "Lease" ? "Rent" : property.transactionType || property.listingType || "",
    price,
    propertySize: property.propertySize ?? area?.value ?? "",
    sizeUnit: property.sizeUnit || area?.unit || "sqft",
    bedrooms: property.bedrooms || property.bhk || "",
    bathrooms: property.bathrooms ?? property.specifications?.bathrooms ?? "",
    balconies: property.balconies ?? property.specifications?.balconies ?? "",
    parking: property.parking ?? ((Number(property.specifications?.coveredParking || 0) + Number(property.specifications?.openParking || 0)) || ""),
    furnishing: property.furnishing?.status || property.furnishing || "",
    images,
    addedBy: {
      ...creator,
      role: creator.role ? String(creator.role).replace(/^./, (c) => c.toUpperCase()) : "",
      userId: creator.userId || creator.id || null,
    },
  };
};


export const createPropertyApi = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/newproperties`,
      payload,
      { headers: { ...getAuthHeaders() } }
    );
    return response.data;
  } catch (error) {
    console.error("Create Property API Error:", error);
    throw error;
  }
};

export const createCommercialRentalPropertyApi = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/commercial-rental-properties`, payload, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const getCommercialRentalPropertiesApi = async (params = {}) => {
  const response = await axios.get(`${API_BASE_URL}/commercial-rental-properties`, { params, headers: { ...getAuthHeaders() } });
  return response.data;
};

export const getCommercialRentalPropertyByIdApi = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/commercial-rental-properties/${id}`, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const updateCommercialRentalPropertyApi = async (id, payload) => {
  const response = await axios.patch(`${API_BASE_URL}/commercial-rental-properties/${id}`, payload, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const deleteCommercialRentalPropertyApi = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/commercial-rental-properties/${id}`, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const createRentalPropertyApi = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/rental-properties`, payload, {
    headers: { ...getAuthHeaders() },
  });
  return response.data;
};

export const getRentalPropertyByIdApi = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/rental-properties/${id}`, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const updateRentalPropertyApi = async (id, payload) => {
  const response = await axios.patch(`${API_BASE_URL}/rental-properties/${id}`, payload, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const getRentalFormOptionsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/rental-properties/options`);
  return response.data;
};

export const getAllPropertiesApi = async ({
  role = "",
  status = "",
  city = "",
  search = "",
} = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/newproperties/all`, {
      params: {
        role: role || undefined,
        status: status || undefined,
        city: city || undefined,
        search: search || undefined,
      },
      headers: { ...getAuthHeaders() },
    });
    const data = Array.isArray(response.data?.data)
      ? response.data.data.map(normalizePropertyForAdmin)
      : [];
    return { ...response.data, data, properties: data };
  } catch (error) {
    console.error("Get All Properties API Error:", error);
    throw error;
  }
};

export const getDraftPropertiesApi = async ({ search = "" } = {}) => {
  return getAllPropertiesApi({ status: "Draft", search });
};

export const getPropertyByIdApi = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/newproperties/${id}`, {
      headers: { ...getAuthHeaders() },
    });
    return {
      ...response.data,
      data: response.data?.data ? normalizePropertyForAdmin(response.data.data) : response.data?.data,
    };
  } catch (error) {
    console.error("Get Property By ID API Error:", error);
    throw error;
  }
};

export const updatePropertyApi = async (id, payload) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/newproperties/${id}`,
      payload,
      { headers: { ...getAuthHeaders() } }
    );
    return response.data;
  } catch (error) {
    console.error("Update Property API Error:", error);
    throw error;
  }
};

export const publishDraftPropertyApi = async (id, actor = {}) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/newproperties/${id}`,
      {
        status: "Submitted",
        updatedByUserId: actor?.id || undefined,
        updatedByName: actor?.name || undefined,
        updatedByRole: actor?.role || undefined,
        statusRemarks: "Draft property submitted for review.",
      },
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Publish Draft Property API Error:", error);
    throw error;
  }
};

export const updatePropertyStatusApi = async (id, payload) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/newproperties/${id}/status`,
      payload,
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update Property Status API Error:", error);
    throw error;
  }
};

export const verifyPropertyApi = async (
  id,
  notes = "Property verified by admin."
) => {
  return updatePropertyStatusApi(id, {
    status: "Verified",
    notes,
    rejectionReason: "",
  });
};

export const deletePropertyApi = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/newproperties/${id}/delete`,
      { headers: { ...getAuthHeaders() } }
    );
    return response.data;
  } catch (error) {
    console.error("Delete Property API Error:", error);
    throw error;
  }
};

export const boostPropertyApi = async (
  id,
  payload = { boostType: "Featured", days: 7 }
) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/newproperties/${id}/boost`,
      payload,
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Boost Property API Error:", error);
    throw error;
  }
};

export const unboostPropertyApi = async (id) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/newproperties/${id}/unboost`,
      {},
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Unboost Property API Error:", error);
    throw error;
  }
};

// ======================================================
// SALE PROPERTY APIs
// ResidentialSaleProperty / CommercialSaleProperty
// Both models persist to the shared `newproperties` collection.
// ======================================================
export const createResidentialSalePropertyApi = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/residential-sale`, payload, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const getResidentialSalePropertyByIdApi = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/residential-sale/${id}`, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const updateResidentialSalePropertyApi = async (id, payload) => {
  const response = await axios.patch(`${API_BASE_URL}/residential-sale/${id}`, payload, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const createCommercialSalePropertyApi = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/commercial-sale`, payload, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const getCommercialSalePropertyByIdApi = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/commercial-sale/${id}`, { headers: { ...getAuthHeaders() } });
  return response.data;
};

export const updateCommercialSalePropertyApi = async (id, payload) => {
  const response = await axios.patch(`${API_BASE_URL}/commercial-sale/${id}`, payload, { headers: { ...getAuthHeaders() } });
  return response.data;
};
