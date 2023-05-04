import api from "./api";

export const getTypes = async () => {
  const response = await api.get("/types");
  return response.data;
};
