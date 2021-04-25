import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjQ1Nzg4MjEiLCJpYXQiOjE2MTkzNDEwMjR9._vQjzoH36vz37Klc6Q4TgQHzednGVrMQD9JKdzAqDQk";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  // baseURL: window.location.origin,
});

axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
