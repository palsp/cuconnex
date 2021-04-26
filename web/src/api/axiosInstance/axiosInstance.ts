import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODU3NDY1MjEiLCJpYXQiOjE2MTkzNzM4NTJ9.XJOBxI1g_cvL4Gvj1X2UkObSLK6EeZjTbpN_r8Ydn30";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  // baseURL: window.location.origin,
});

axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
//Friend111
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzIzNDUyMjUiLCJpYXQiOjE2MTkzNzk0ODF9.lU56F3B1Ai0Z1ad4zE_sv_Qz94yIb0wZ6fh73RYulaE"
//Friend110
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzQ1NjcyMjMiLCJpYXQiOjE2MTkzNzkzOTJ9.S-jfQ1q9E2eSqAB4yx1y3HCGsz4gQpo1dgh0fQnoaU4"
//Friend109
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzQ2NTc4MjIiLCJpYXQiOjE2MTkzNzkyOTB9.YqoI23Yyw3XwaL9yFiK0tdTqWsc6xrUe5ZcRD_pfbZQ"
//Friend108
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzQ3NDc0MjEiLCJpYXQiOjE2MTkzNzY2NTN9.J1q6bxqSrSC4-MFNpV21PJSowJ8yC_fzc8P63IdW-mA"
//Friend105
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODU3NDY1MjEiLCJpYXQiOjE2MTkzNzM4NTJ9.XJOBxI1g_cvL4Gvj1X2UkObSLK6EeZjTbpN_r8Ydn30"
//Friend103
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTg0NzU4MjEiLCJpYXQiOjE2MTkzNzE2ODR9.Qqe4quOpQ-tD3aqjhxW-Rv0xteLDIr2urLhBuu6ljgc"
//Friend101
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODU3NDg1MjEiLCJpYXQiOjE2MTkzNzE1NDd9.lsLBsXz46qEeVq1GDv_H-mNB-BTZWwqgIycdPYfNo78"
