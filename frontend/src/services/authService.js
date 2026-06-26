import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const sendOTP = (mobile) =>
  axios.post("http://localhost:5000/api/auth/send-otp", { mobile });

export const verifyOTP = (mobile, otp) =>
  axios.post("http://localhost:5000/api/auth/verify-otp", {
    mobile,
    otp,
  });

export const sendEmailOTP = (email) =>
  axios.post("http://localhost:5000/api/auth/send-email-otp", {
    email,
  });

export const verifyEmailOTP = (email, otp) =>
  axios.post("http://localhost:5000/api/auth/verify-email-otp", {
    email,
    otp,
  });
// export const loginWithEmail = (email, password) =>{
//   return axios.post(`${API}`)
// }
// export const loginWithEmail = (email, password) => {
//   return axios.post("/api/auth/login-email", {
//     email,
//     password,
//   });
// }