import axios from "axios";

const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzQ1NjM3MjEiLCJpYXQiOjE2MTk3MTUzMDJ9.S8TRYPPLmF2-Qn9N1mrV7GHH5068tO1yS-5XXG7yqq8";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  //baseURL: window.location.origin,
});

axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
