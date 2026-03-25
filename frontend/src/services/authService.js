import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const sendOTP = (mobile) => {
  return axios.post(`${API}/send-otp`, { mobile });
}

export const verifyOTP = (mobile, otp) => {
  return axios.post(`${API}/verify-otp`, { mobile, otp });
};


// export const loginWithEmail = (email, password) =>{
//   return axios.post(`${API}`)
// }
export const loginWithEmail = (email, password) => {
  return axios.post("/api/auth/login-email", {
    email,
    password,
  });
}