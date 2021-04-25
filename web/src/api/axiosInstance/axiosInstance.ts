import axios from "axios";

const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzE4MjQ3MjIiLCJpYXQiOjE2MTkyODE4NjR9.bhdsa5H1z4yYH-PYnn4ihEXLwRDydJzH22ajj1wlKKA";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  // baseURL: window.location.origin,
});

 axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzE4MjQ3MjIiLCJpYXQiOjE2MTkyODE4NjR9.bhdsa5H1z4yYH-PYnn4ihEXLwRDydJzH22ajj1wlKKA"