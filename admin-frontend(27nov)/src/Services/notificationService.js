import api from "./axios";

export const getAdminNotificationsApi = async (params = {}) =>
  (await api.get("/admin/notifications", { params })).data;
export const markNotificationReadApi = async (id) =>
  (await api.patch(`/admin/notifications/${id}/read`)).data;
export const markAllNotificationsReadApi = async () =>
  (await api.patch("/admin/notifications/read-all")).data;
