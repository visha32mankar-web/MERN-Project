import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { sendOTP, verifyOTP, sendEmailOTP, verifyEmailOTP } from "../services/authService";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loginType, setLoginType] = useState("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      role === "admin" ? navigate("/admin") : navigate("/");
    }
  }, [navigate]);

  if (!isOpen) return null;

  /* ================= PHONE OTP ================= */
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
      setError("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EMAIL OTP ================= */
  const handleSendEmailOTP = async () => {
    setError("");

    if (!email) {
      setError("Please enter email");
      return;
    }

    try {
      setLoading(true);
      await sendEmailOTP(email);
      setShowOTP(true);
    } catch (err) {
      setError("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP (COMMON) ================= */
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res =
        loginType === "phone"
          ? await verifyOTP(mobile, otp)
          : await verifyEmailOTP(email, otp);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      onLoginSuccess?.();
      onClose();

      res.data.role === "admin" ? navigate("/admin") : navigate("/");
    } catch (err) {
      setError("Invalid OTP");
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
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500"
        >
          ✕
        </button>

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} className="h-20 mb-2" />
          <h2 className="text-2xl font-semibold">Delight Biryani</h2>
          <p className="text-gray-500">
            {showOTP ? "Enter OTP" : "Log in or Sign up"}
          </p>
        </div>

        {/* TABS */}
        {!showOTP && (
          <div className="flex justify-center mb-6 border-b">
            <button
              onClick={() => {
                setLoginType("phone");
                setError("");
              }}
              className={`px-6 py-2 ${
                loginType === "phone"
                  ? "border-b-2 border-black"
                  : "text-gray-400"
              }`}
            >
              Phone
            </button>

            <button
              onClick={() => {
                setLoginType("email");
                setError("");
              }}
              className={`px-6 py-2 ${
                loginType === "email"
                  ? "border-b-2 border-black"
                  : "text-gray-400"
              }`}
            >
              Email
            </button>
          </div>
        )}

        {/* ================= PHONE ================= */}
        {loginType === "phone" && !showOTP && (
          <form onSubmit={handleSendOTP} className="space-y-5">
            <div className="flex items-center border rounded-xl px-3 py-3">
              <span className="mr-2">+91</span>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, ""))
                }
                maxLength={10}
                className="w-full outline-none"
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              disabled={mobile.length !== 10}
              className={`w-full py-3 rounded-lg ${
                mobile.length === 10
                  ? "bg-[var(--color-secondary)] text-white"
                  : "bg-gray-300"
              }`}
            >
              Continue
            </button>
          </form>
        )}

        {/* ================= EMAIL ================= */}
        {loginType === "email" && !showOTP && (
          <form className="space-y-5">
            <div className="flex items-center border rounded-xl px-3 py-3">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              type="button"
              onClick={handleSendEmailOTP}
              disabled={!email}
              className={`w-full py-3 rounded-lg ${
                email
                  ? "bg-[var(--color-secondary)] text-white"
                  : "bg-gray-300"
              }`}
            >
              Continue
            </button>
          </form>
        )}

        {/* ================= OTP ================= */}
        {showOTP && (
          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full border px-3 py-3 rounded-xl"
            />

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button className="w-full py-3 bg-green-600 text-white rounded-lg">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;