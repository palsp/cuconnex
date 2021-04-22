import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM3h4eHh4MjEiLCJpYXQiOjE2MTkxMDYwNjR9.8Ne0heTtkpGi7zAMq8YZ4eRH_rxIrBhMF4hkMPTFO5U";

const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  // baseURL: window.location.origin,
});

export default axiosInstance;
