import api from "./api";

export const getAllReimbursements = async () => {
  const response = await api.get("/reimbursements");
  return response.data;
};

export const getReimbursementByUserId = async (userId) => {
  const response = await api.get(`/reimbursements/${userId}`);
  return response.data;
};
