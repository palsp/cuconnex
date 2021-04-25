import axios from "axios";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjQ1Nzg4MjEiLCJpYXQiOjE2MTkzNDIwMjJ9.HP7GRu9cjIfWWrqSx_bWlwNkjmMvq-e9vz7XDbXKgeU";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  // baseURL: window.location.origin,
});

// axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
