import api from "./api";

export const getAllReimbursements = async (statusId, typeId) => {
  const response = await api.get("/reimbursements", {
    params: {
      statusId: statusId,
      typeId: typeId,
    },
  });
  return response.data;
};

export const getReimbursementByUserId = async (userId, statusId, typeId) => {
  const response = await api.get(`/reimbursements/${userId}`, {
    params: {
      statusId: statusId,
      typeId: typeId,
    },
  });
  return response.data;
};

export const createReimbursement = async (userId, reimbRequestDto) => {
  const response = await api.post(`/reimbursements/${userId}`, reimbRequestDto);
  return response.data;
};
