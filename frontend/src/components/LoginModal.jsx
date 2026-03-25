import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { sendOTP, verifyOTP, loginWithEmail } from "../services/authService";
import { useEffect } from "react";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loginType, setLoginType] = useState("phone"); // phone | email
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  if (!isOpen) return null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      role === "admin" ? navigate("/admin") : navigate("/");
    }
  }, [navigate]);

  /* ================= SEND OTP ================= */
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);
      await sendOTP(mobile);
      setShowOTP(true);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOTP(mobile, otp);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("mobile", mobile);

      if (onLoginSuccess) onLoginSuccess();
      onClose();

      res.data.role === "admin" ? navigate("/admin") : navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EMAIL LOGIN ================= */
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginWithEmail(email, password);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", email);

      if (onLoginSuccess) onLoginSuccess();
      onClose();

      res.data.role === "admin" ? navigate("/admin") : navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[90%] max-w-md rounded-xl shadow-lg p-6 relative"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Delight Biryani Logo"
            className="h-20 w-auto object-contain mb-2"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Delight Biryani
          </h2>
          <p className="text-lg text-gray-500">
            {showOTP ? "Enter OTP" : "Log in or Sign up"}
          </p>
        </div>

        {/* ================= LOGIN TABS ================= */}
        {!showOTP && (
          <div className="flex justify-center mb-6 border-b">
            <button
              type="button"
              onClick={() => {
                setLoginType("phone");
                setError("");
              }}
              className={`px-6 py-2 font-medium ${
                loginType === "phone"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-400"
              }`}
            >
              Phone
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginType("email");
                setError("");
              }}
              className={`px-6 py-2 font-medium ${
                loginType === "email"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-400"
              }`}
            >
              Email
            </button>
          </div>
        )}

        {/* ================= PHONE LOGIN ================= */}
        {loginType === "phone" && !showOTP && (
          <form onSubmit={handleSendOTP} className="space-y-5 max-w-sm mx-auto">
            <div className="flex items-center border border-gray-300 rounded-xl px-3 py-3">
              <span className="text-gray-800 font-medium mr-3">+91</span>
              <span className="h-6 w-px bg-gray-300 mr-3"></span>

              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                maxLength={10}
                className="w-full outline-none text-sm"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={mobile.length !== 10 || loading}
              className={`w-full py-3 rounded-lg font-medium transition ${
                mobile.length === 10
                  ? "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-primary)]"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {loading ? "Sending..." : "Continue"}
            </button>
          </form>
        )}

        {/* ================= EMAIL LOGIN ================= */}
        {loginType === "email" && (
          <form
            onSubmit={handleEmailLogin}
            className="space-y-5 max-w-sm mx-auto"
          >
            <div className="border border-gray-300 rounded-xl px-3 py-3">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none text-sm"
              />
            </div>

            <div className="border border-gray-300 rounded-xl px-3 py-3">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none text-sm"
              />
            </div>

            {error && (
              <p
                className="text-red-500
              text-sm text-center"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rou
              ded-lg font-medium bg-[var(--color-secondary)] text-white hover:bg-[var(--color-primary)]"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* ================= OTP FORM ================= */}
        {showOTP && (
          <form
            onSubmit={handleVerifyOTP}
            className="space-y-5 max-w-sm mx-auto"
          >
            <div className="border border-gray-300 rounded-xl px-3 py-3">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                className="w-full outline-none text-center text-lg tracking-widest"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={otp.length !== 6 || loading}
              className={`w-full py-3 rounded-lg font-medium transition ${
                otp.length === 6
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p
              onClick={() => {
                setShowOTP(false);
                setError("");
              }}
              className="text-center text-sm text-blue-600 cursor-pointer"
            >
              Change Mobile Number
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
