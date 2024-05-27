import { api } from "../api.config";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/v1/user/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const signUp = async ({
  email,
  password,
  username,
  dateOfBirth,
}: {
  email: string;
  password: string;
  username: string;
  dateOfBirth: string;
}) => {
  const response = await api.post("/v1/user/auth/register", {
    email,
    password,
    username,
    dateOfBirth,
  });
  if (response.status !== 201 && response.status !== 200) {
    return Promise.reject(response.data);
  }

  return response.data;
};
