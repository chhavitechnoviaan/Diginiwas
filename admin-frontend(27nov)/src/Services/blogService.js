// import axios from "axios";

// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000";

// const blogApi = axios.create({
//   baseURL: `${API_URL}/blog`,
//   timeout: 30000,
//   withCredentials: true,
// });


// const dataOf = (response) => response?.data;

// /* =========================================================
//    PUBLIC BLOG
// ========================================================= */

// export async function getPublicBlogPage() {
//   try {
//     const response = await blogApi.get("/public");

//     return {
//       success: true,
//       data: response.data?.data || null,
//     };
//   } catch (error) {
//     console.error(
//       "GET PUBLIC BLOG ERROR:",
//       error?.response?.data || error.message
//     );

//     return {
//       success: false,
//       data: null,
//       error:
//         error?.response?.data?.message ||
//         "Unable to fetch blog page.",
//     };
//   }
// }

// /* =========================================================
//    PUBLIC SINGLE ARTICLE
// ========================================================= */

// export async function getBlogArticleBySlug(slug) {
//   try {
//     const response = await blogApi.get(
//       `/articles/slug/${slug}`
//     );

//     return {
//       success: true,
//       data: response.data?.data || null,
//     };
//   } catch (error) {
//     console.error(
//       "GET ARTICLE ERROR:",
//       error?.response?.data || error.message
//     );

//     return {
//       success: false,
//       data: null,
//       error:
//         error?.response?.data?.message ||
//         "Unable to fetch article.",
//     };
//   }
// }

// /* =========================================================
//    ADMIN COMPLETE BLOG DATA
// ========================================================= */

// export const getAdminBlogPage = async () => {
//   const response = await blogApi.get("/admin");

//   return dataOf(response);
// };

// /* =========================================================
//    BLOG HERO
// ========================================================= */

// export const updateBlogHero = async (formData) => {
//   const response = await blogApi.patch(
//     "/admin/hero",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return dataOf(response);
// };

// export const deleteBlogHeroImage = async () => {
//   const response = await blogApi.delete(
//     "/admin/hero/image"
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    BLOG CATEGORIES
// ========================================================= */

// export const updateBlogCategories = async (
//   categories
// ) => {
//   const response = await blogApi.patch(
//     "/admin/categories",
//     {
//       categories,
//     }
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    FEATURED ARTICLE
// ========================================================= */

// export const updateFeaturedBlogArticle = async (
//   formData
// ) => {
//   const response = await blogApi.patch(
//     "/admin/featured",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return dataOf(response);
// };

// export const deleteFeaturedBlogImage = async () => {
//   const response = await blogApi.delete(
//     "/admin/featured/image"
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    ADMIN BLOG ARTICLES
// ========================================================= */

// export const getAdminBlogArticles = async (
//   params = {}
// ) => {
//   const response = await blogApi.get(
//     "/admin/articles",
//     {
//       params,
//     }
//   );

//   return dataOf(response);
// };

// export const getAdminBlogArticleById = async (
//   articleId
// ) => {
//   const response = await blogApi.get(
//     `/admin/articles/${articleId}`
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    CREATE BLOG ARTICLE
// ========================================================= */

// export const createBlogArticle = async (
//   formData
// ) => {
//   const response = await blogApi.post(
//     "/admin/articles",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    UPDATE BLOG ARTICLE
// ========================================================= */

// export const updateBlogArticle = async (
//   articleId,
//   formData
// ) => {
//   const response = await blogApi.patch(
//     `/admin/articles/${articleId}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    DELETE COMPLETE BLOG ARTICLE
// ========================================================= */

// export const deleteBlogArticle = async (
//   articleId
// ) => {
//   const response = await blogApi.delete(
//     `/admin/articles/${articleId}`
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    DELETE ONLY ARTICLE IMAGE
// ========================================================= */

// export const deleteBlogArticleImage = async (
//   articleId
// ) => {
//   const response = await blogApi.delete(
//     `/admin/articles/${articleId}/image`
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    NIWAS AI SECTION
// ========================================================= */

// export const updateBlogNiwasAI = async (
//   payload
// ) => {
//   const response = await blogApi.patch(
//     "/admin/niwas-ai",
//     payload
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    CREATE TRENDING ARTICLE
// ========================================================= */

// export const createTrendingArticle = async (
//   formData
// ) => {
//   const response = await blogApi.post(
//     "/admin/trending",
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    UPDATE TRENDING ARTICLE
// ========================================================= */

// export const updateTrendingArticle = async (
//   trendingId,
//   formData
// ) => {
//   const response = await blogApi.patch(
//     `/admin/trending/${trendingId}`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    DELETE TRENDING ARTICLE
// ========================================================= */

// export const deleteTrendingArticle = async (
//   trendingId
// ) => {
//   const response = await blogApi.delete(
//     `/admin/trending/${trendingId}`
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    BLOG NEWSLETTER
// ========================================================= */

// export const updateBlogNewsletter = async (
//   payload
// ) => {
//   const response = await blogApi.patch(
//     "/admin/newsletter",
//     payload
//   );

//   return dataOf(response);
// };

// /* =========================================================
//    DEFAULT EXPORT
// ========================================================= */

// export default blogApi;


import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const blogApi = axios.create({
  baseURL: `${API_URL}/blog`,
  timeout: 30000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

/* =========================================================
   AUTHENTICATION TOKEN
========================================================= */

const getAuthToken = () => {
  // Keep the key that your admin login actually uses.
  const tokenKeys = [
    "adminToken",
    "token",
    "accessToken",
    "authToken",
  ];

  for (const key of tokenKeys) {
    const token = localStorage.getItem(key);

    if (token) {
      // Avoid adding Bearer twice if the value already contains it.
      return token.replace(/^Bearer\s+/i, "").trim();
    }
  }

  return null;
};

/* =========================================================
   AXIOS REQUEST INTERCEPTOR
   Automatically attaches token to admin API requests.
========================================================= */

blogApi.interceptors.request.use(
  (config) => {
    const isAdminRequest = config.url?.includes("/admin");

    if (isAdminRequest) {
      const token = getAuthToken();

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================================================
   RESPONSE DATA HELPER
========================================================= */

const dataOf = (response) => response?.data;

/* =========================================================
   PUBLIC BLOG
========================================================= */

export async function getPublicBlogPage() {
  try {
    const response = await blogApi.get("/public");

    return {
      success: true,
      data: response.data?.data || null,
    };
  } catch (error) {
    console.error(
      "GET PUBLIC BLOG ERROR:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      data: null,
      error:
        error?.response?.data?.message ||
        "Unable to fetch blog page.",
    };
  }
}

/* =========================================================
   PUBLIC SINGLE ARTICLE
========================================================= */

export async function getBlogArticleBySlug(slug) {
  try {
    const response = await blogApi.get(
      `/articles/slug/${encodeURIComponent(slug)}`
    );

    return {
      success: true,
      data: response.data?.data || null,
    };
  } catch (error) {
    console.error(
      "GET ARTICLE ERROR:",
      error?.response?.data || error.message
    );

    return {
      success: false,
      data: null,
      error:
        error?.response?.data?.message ||
        "Unable to fetch article.",
    };
  }
}

/* =========================================================
   ADMIN COMPLETE BLOG DATA
========================================================= */

export const getAdminBlogPage = async () => {
  const response = await blogApi.get("/admin");
  return dataOf(response);
};

/* =========================================================
   BLOG HERO
========================================================= */

export const updateBlogHero = async (formData) => {
  const response = await blogApi.patch(
    "/admin/hero",
    formData
  );

  return dataOf(response);
};

export const deleteBlogHeroImage = async () => {
  const response = await blogApi.delete("/admin/hero/image");
  return dataOf(response);
};

/* =========================================================
   BLOG CATEGORIES
========================================================= */

export const updateBlogCategories = async (categories) => {
  const response = await blogApi.patch("/admin/categories", {
    categories,
  });

  return dataOf(response);
};

/* =========================================================
   FEATURED ARTICLE
========================================================= */

export const updateFeaturedBlogArticle = async (formData) => {
  const response = await blogApi.patch(
    "/admin/featured",
    formData
  );

  return dataOf(response);
};

export const deleteFeaturedBlogImage = async () => {
  const response = await blogApi.delete(
    "/admin/featured/image"
  );

  return dataOf(response);
};

/* =========================================================
   ADMIN BLOG ARTICLES
========================================================= */

export const getAdminBlogArticles = async (params = {}) => {
  const response = await blogApi.get("/admin/articles", {
    params,
  });

  return dataOf(response);
};

export const getAdminBlogArticleById = async (articleId) => {
  const response = await blogApi.get(
    `/admin/articles/${encodeURIComponent(articleId)}`
  );

  return dataOf(response);
};

/* =========================================================
   CREATE BLOG ARTICLE
========================================================= */

export const createBlogArticle = async (formData) => {
  const response = await blogApi.post(
    "/admin/articles",
    formData
  );

  return dataOf(response);
};

/* =========================================================
   UPDATE BLOG ARTICLE
========================================================= */

export const updateBlogArticle = async (
  articleId,
  formData
) => {
  const response = await blogApi.patch(
    `/admin/articles/${encodeURIComponent(articleId)}`,
    formData
  );

  return dataOf(response);
};

/* =========================================================
   DELETE COMPLETE BLOG ARTICLE
========================================================= */

export const deleteBlogArticle = async (articleId) => {
  const response = await blogApi.delete(
    `/admin/articles/${encodeURIComponent(articleId)}`
  );

  return dataOf(response);
};

/* =========================================================
   DELETE ONLY ARTICLE IMAGE
========================================================= */

export const deleteBlogArticleImage = async (articleId) => {
  const response = await blogApi.delete(
    `/admin/articles/${encodeURIComponent(articleId)}/image`
  );

  return dataOf(response);
};

/* =========================================================
   NIWAS AI SECTION
========================================================= */

export const updateBlogNiwasAI = async (payload) => {
  const response = await blogApi.patch(
    "/admin/niwas-ai",
    payload
  );

  return dataOf(response);
};

/* =========================================================
   CREATE TRENDING ARTICLE
========================================================= */

export const createTrendingArticle = async (formData) => {
  const response = await blogApi.post(
    "/admin/trending",
    formData
  );

  return dataOf(response);
};

/* =========================================================
   UPDATE TRENDING ARTICLE
========================================================= */

export const updateTrendingArticle = async (
  trendingId,
  formData
) => {
  const response = await blogApi.patch(
    `/admin/trending/${encodeURIComponent(trendingId)}`,
    formData
  );

  return dataOf(response);
};

/* =========================================================
   DELETE TRENDING ARTICLE
========================================================= */

export const deleteTrendingArticle = async (trendingId) => {
  const response = await blogApi.delete(
    `/admin/trending/${encodeURIComponent(trendingId)}`
  );

  return dataOf(response);
};

/* =========================================================
   BLOG NEWSLETTER
========================================================= */

export const updateBlogNewsletter = async (payload) => {
  const response = await blogApi.patch(
    "/admin/newsletter",
    payload
  );

  return dataOf(response);
};

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default blogApi;
