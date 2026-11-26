import axios from "../api/axios";

export const deleteOwnAccountApi = async (reason = "Account deleted by user") =>
  (await axios.delete("/account", { data: { reason } })).data;
