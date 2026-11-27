import api from "./axios";

export const getAdminProfileApi = async () => (await api.get("/admin/profile")).data;
export const updateAdminProfileApi = async (payload) => (await api.patch("/admin/profile", payload)).data;
export const changeAdminPasswordApi = async (payload) => (await api.patch("/admin/profile/change-password", payload)).data;
