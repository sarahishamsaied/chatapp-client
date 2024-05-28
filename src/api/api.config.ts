import axios from "axios";
import { store } from "../store";

const VITE_LOCAL_BASE_URL = import.meta.env.VITE_LOCAL_BASE_URL;
const VITE_PROD_BASE_URL = import.meta.env.VITE_PROD_BASE_URL;
const VITE_CURRENT_ENV = import.meta.env.VITE_CURRENT_ENV;
export const api = axios.create({
  withCredentials: false,
  baseURL:
    VITE_CURRENT_ENV === "development"
      ? VITE_LOCAL_BASE_URL
      : VITE_PROD_BASE_URL,
  timeout: 80000,
});

const errorHandler = (
  error: Error & {
    response?: { data: { [key: string]: string }; status: number };
  }
) => {
  const statusCode = error.response?.status;

  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

api.interceptors.request.use((config) => {
  const storage = store.getState();
  const token = storage.auth.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
