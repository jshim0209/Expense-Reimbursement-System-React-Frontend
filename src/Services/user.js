import api from "./api";

export const signUp = async (userDto) => {
  const response = await api.post("/users", userDto);
  return response.data;
};
