import axios from "axios";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzc3MzMzMjEiLCJpYXQiOjE2MTkzNDAzOTR9.RoLNs2UhiSjb52S2Hm3rk8aZmXiNKbd_HTOwADAhgw4";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  // baseURL: window.location.origin,
});

// axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
