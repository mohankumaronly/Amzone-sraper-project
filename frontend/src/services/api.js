import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_API_URL;


const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  timeout: 10000,
});

// this for the compose running
// const api = axios.create({
//   baseURL: "/api",
//   withCredentials: true,
//   timeout: 10000,
// });

export default api;