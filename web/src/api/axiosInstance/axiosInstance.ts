import axios from "axios";

const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzI0NTI2MjEiLCJpYXQiOjE2MjAxMzIxOTh9.S2Me_4v9h1X5PmDwRsZFq9deVFQlGB90JJpDkTrBhl0";
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM1NDUyMjEiLCJpYXQiOjE2MjAxMjA2NjF9.iflXZWetqTw77sGMPb4Bq4Qod6ykJdKMVIOoAqhiBvc";

// ("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM1NDUyMjEiLCJpYXQiOjE2MjAxMjA2NjF9.iflXZWetqTw77sGMPb4Bq4Qod6ykJdKMVIOoAqhiBvc");
const axiosInstance = axios.create({
  //baseURL: "https://www.cu-connex.com",
  baseURL: window.location.origin,
});

// axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
export default axiosInstance;

//in some teams
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzc3MzMzMjMiLCJpYXQiOjE2MTk5NzExOTB9.EyE0n7fQY1aS1gbqGHusfTZyqD3T1hVSymMkPtYXVm8"
//not in any team
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzMyMzIzMjEiLCJpYXQiOjE2MjAwMjY0MDd9.84prTWP7OlkJBsD2VHV0jIfEzSUtbVyRAVXCGKFTAbk"

//loong01

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzE3MzYzMjEiLCJpYXQiOjE2MTk3OTc0MTJ9.BeMcj-CogN3IewAwd7ekZMwJIHebenhIw9IA3DmA5Rg";
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzcyNjM3MjEiLCJpYXQiOjE2MTk3NzQwMDd9.TvE3aIPUcjI8K068fNPkPKtFaveFK7gBoiENwlM8jbE"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM3MjgzMjMiLCJpYXQiOjE2MTk3NjQyMjd9.107PhLfTC8EndfbwuN8FilKW7qAX2uthS60bW6VKhZo"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzcyODM3MjMiLCJpYXQiOjE2MTk3NjQxMjJ9.SG1ojaQWwckAVYmu5qSCzIpR3N8Y76cdhA9JERPNcgo"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM2NDczMjQiLCJpYXQiOjE2MTk3NjQwMjV9.vqC70C14TUr5oa5G1vb7ZiMDao3rNc_G9xliuifclko"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzM4NDczMjQiL CJpYXQiOjE2MTk3MzI4OTJ9.zUOpLehL2E0w5G09aAx_Dmx2-j5L4iC9Nxpg_PRCATA"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzI1MzY0MjUiLCJpYXQiOjE2MTk3MzAwNzd9.NmzR-aQ0cTXf_oSBY7SgUHOkf1Qe3eVUGH8IbPNAZFI"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzQ2NTc0MjQiLCJpYXQiOjE2MTk3Mjc1NTF9.lj34-XRjR2wynIbslS292_OYpWTpvWqCwLp0rZeN4AA"
