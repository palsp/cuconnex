import axios from "axios";

const token =
"";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  //baseURL: window.location.origin,
});

axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzcyNjM3MjEiLCJpYXQiOjE2MTk3NzQwMDd9.TvE3aIPUcjI8K068fNPkPKtFaveFK7gBoiENwlM8jbE"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM3MjgzMjMiLCJpYXQiOjE2MTk3NjQyMjd9.107PhLfTC8EndfbwuN8FilKW7qAX2uthS60bW6VKhZo"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzcyODM3MjMiLCJpYXQiOjE2MTk3NjQxMjJ9.SG1ojaQWwckAVYmu5qSCzIpR3N8Y76cdhA9JERPNcgo"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjM2NDczMjQiLCJpYXQiOjE2MTk3NjQwMjV9.vqC70C14TUr5oa5G1vb7ZiMDao3rNc_G9xliuifclko"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzM4NDczMjQiLCJpYXQiOjE2MTk3MzI4OTJ9.zUOpLehL2E0w5G09aAx_Dmx2-j5L4iC9Nxpg_PRCATA"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzI1MzY0MjUiLCJpYXQiOjE2MTk3MzAwNzd9.NmzR-aQ0cTXf_oSBY7SgUHOkf1Qe3eVUGH8IbPNAZFI"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzQ2NTc0MjQiLCJpYXQiOjE2MTk3Mjc1NTF9.lj34-XRjR2wynIbslS292_OYpWTpvWqCwLp0rZeN4AA"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzQ1NjM3MjEiLCJpYXQiOjE2MTk3MTUzMDJ9.S8TRYPPLmF2-Qn9N1mrV7GHH5068tO1yS-5XXG7yqq8"