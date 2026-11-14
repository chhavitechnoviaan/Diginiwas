import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const blogApi = axios.create({
  baseURL: `${API_URL}/api/blog`,
  timeout: 20000,
});

/* =========================================================
   PUBLIC BLOG
========================================================= */

export const getPublicBlogPage = async () => {
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
};

/* =========================================================
   SINGLE PUBLIC ARTICLE
========================================================= */

export const getBlogArticleBySlug = async (slug) => {
  try {
    const response = await blogApi.get(
      `/articles/slug/${slug}`
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
};

/* =========================================================
   ADMIN - COMPLETE BLOG DATA
========================================================= */

export const getAdminBlogPage = async () => {
  const response = await blogApi.get("/admin");
  return response.data;
};

/* =========================================================
   HERO
========================================================= */

export const updateBlogHero = async (formData) => {
  const response = await blogApi.patch(
    "/admin/hero",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteBlogHeroImage = async () => {
  const response = await blogApi.delete(
    "/admin/hero/image"
  );

  return response.data;
};

/* =========================================================
   CATEGORIES
========================================================= */

export const updateBlogCategories = async (
  categories
) => {
  const response = await blogApi.patch(
    "/admin/categories",
    {
      categories,
    }
  );

  return response.data;
};

/* =========================================================
   FEATURED ARTICLE
========================================================= */

export const updateFeaturedBlogArticle = async (
  formData
) => {
  const response = await blogApi.patch(
    "/admin/featured",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteFeaturedBlogImage = async () => {
  const response = await blogApi.delete(
    "/admin/featured/image"
  );

  return response.data;
};

/* =========================================================
   ARTICLES
========================================================= */

export const getAdminBlogArticles = async (
  params = {}
) => {
  const response = await blogApi.get(
    "/admin/articles",
    {
      params,
    }
  );

  return response.data;
};

export const getAdminBlogArticleById = async (
  articleId
) => {
  const response = await blogApi.get(
    `/admin/articles/${articleId}`
  );

  return response.data;
};

export const createBlogArticle = async (
  formData
) => {
  const response = await blogApi.post(
    "/admin/articles",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateBlogArticle = async (
  articleId,
  formData
) => {
  const response = await blogApi.patch(
    `/admin/articles/${articleId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteBlogArticle = async (
  articleId
) => {
  const response = await blogApi.delete(
    `/admin/articles/${articleId}`
  );

  return response.data;
};

export const deleteBlogArticleImage = async (
  articleId
) => {
  const response = await blogApi.delete(
    `/admin/articles/${articleId}/image`
  );

  return response.data;
};

/* =========================================================
   NIWAS AI
========================================================= */

export const updateBlogNiwasAI = async (data) => {
  const response = await blogApi.patch(
    "/admin/niwas-ai",
    data
  );

  return response.data;
};

/* =========================================================
   TRENDING ARTICLES
========================================================= */

export const createTrendingArticle = async (
  formData
) => {
  const response = await blogApi.post(
    "/admin/trending",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateTrendingArticle = async (
  trendingId,
  formData
) => {
  const response = await blogApi.patch(
    `/admin/trending/${trendingId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteTrendingArticle = async (
  trendingId
) => {
  const response = await blogApi.delete(
    `/admin/trending/${trendingId}`
  );

  return response.data;
};

/* =========================================================
   NEWSLETTER CMS
========================================================= */

export const updateBlogNewsletter = async (
  data
) => {
  const response = await blogApi.patch(
    "/admin/newsletter",
    data
  );

  return response.data;
};

export default {
  getPublicBlogPage,
  getBlogArticleBySlug,

  getAdminBlogPage,

  updateBlogHero,
  deleteBlogHeroImage,

  updateBlogCategories,

  updateFeaturedBlogArticle,
  deleteFeaturedBlogImage,

  getAdminBlogArticles,
  getAdminBlogArticleById,
  createBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
  deleteBlogArticleImage,

  updateBlogNiwasAI,

  createTrendingArticle,
  updateTrendingArticle,
  deleteTrendingArticle,

  updateBlogNewsletter,
};