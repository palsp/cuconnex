import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM3h4eHh4MjEiLCJpYXQiOjE2MTkxMTAxNTZ9.PufmDhczbRfppx_c9BkbCnT-_bdW0qHaECK7M-SZ_7o";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  // baseURL: window.location.origin,
});

// axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
