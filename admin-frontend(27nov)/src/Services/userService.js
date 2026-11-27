import api from "./axios";

export const getUnifiedUsersApi = async (params = {}) =>
  (await api.get("/admin/users", { params })).data;


export const deleteUserAccountApi = async (type, id, reason = "Account deleted by admin") =>
  (await api.delete(`/admin/accounts/${String(type).toLowerCase()}/${id}`, { data: { reason } })).data;
