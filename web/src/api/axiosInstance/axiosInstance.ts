import axios from "axios";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzc3ODg4MjYiLCJpYXQiOjE2MTkxNzc0MzV9.ku_ZJh55ZpZ_nAAXijGQixeNMsMu0whnZp656AS0_7w";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  // baseURL: window.location.origin,
});

// axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
