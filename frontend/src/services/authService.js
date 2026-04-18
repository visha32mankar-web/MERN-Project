import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const sendOTP = (mobile) => {
  return axios.post(`${API}/send-otp`, { mobile });
}

export const verifyOTP = (mobile, otp) => {
  return axios.post(`${API}/verify-otp`, { mobile, otp });
};

// 📧 EMAIL OTP  ✅ ADD THIS
export const sendEmailOTP = (email) => {
  return axios.post(`${API}/send-email-otp`, { email });
};

// 📧 VERIFY EMAIL OTP ✅ ADD THIS
export const verifyEmailOTP = (email, otp) => {
  return axios.post(`${API}/verify-email-otp`, { email, otp });
};
// export const loginWithEmail = (email, password) =>{
//   return axios.post(`${API}`)
// }
// export const loginWithEmail = (email, password) => {
//   return axios.post("/api/auth/login-email", {
//     email,
//     password,
//   });
// }