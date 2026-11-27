import api from "./axios";

export const fetchAdminDashboardSummary = async () => {
  const response = await api.get("/admin/dashboard/summary");
  return response.data;
};

export const fetchLeadAnalytics = async (period = "day") => {
  const response = await api.get("/admin/dashboard/lead-analytics", { params: { period } });
  return response.data;
};
