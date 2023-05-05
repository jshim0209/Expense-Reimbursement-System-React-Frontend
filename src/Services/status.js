import api from "./api";

export const getStatuses = async () => {
  const response = await api.get("/statuses");
  return response.data;
};
