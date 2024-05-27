import { api } from "../api.config";

export const getUsers = async () => {
  try {
    const response = await api.get("/v1/user");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
