import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const unwrap = (response) => response?.data;

export const getPartnersForCreditApi = async (params = {}) => {
  const response = await api.get("/credits/partners", { params });
  return unwrap(response);
};

export const getAdminAdjustmentsApi = async (params = {}) => {
  const response = await api.get("/credits/admin/adjustments", { params });
  return unwrap(response);
};

export const adminAddCreditApi = async (payload) => {
  const response = await api.post("/credits/admin/add", payload);
  return unwrap(response);
};

export const adminBulkAddCreditApi = async (payload) => {
  const response = await api.post("/credits/admin/bulk-add", payload);
  return unwrap(response);
};

export const adminWithdrawCreditApi = async (payload) => {
  const response = await api.post("/credits/admin/withdraw", payload);
  return unwrap(response);
};

export const adminBulkWithdrawCreditApi = async (payload) => {
  const response = await api.post("/credits/admin/bulk-withdraw", payload);
  return unwrap(response);
};

export const createIdempotencyKey = (type = "credit") => {
  if (window.crypto?.randomUUID) {
    return `${type}-${window.crypto.randomUUID()}`;
  }

  return `${type}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};
