import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default api;
