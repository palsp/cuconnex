import axios from "axios";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM…xNDR9.z7hD_wtJjqNtFpZjPLONXjYhq6sb3lPs9PT39Cn_-Wc";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  // baseURL: window.location.origin,
});

// axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
