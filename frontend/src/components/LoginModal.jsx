import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import loginSuccessImg from "../assets/images/LoginImg1.png";
import {
  sendOTP,
  verifyOTP,
  sendEmailOTP,
  verifyEmailOTP,
} from "../services/authService";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [loginType, setLoginType] = useState("phone");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const role = localStorage.getItem("role");

  //   if (token && role) {
  //     role === "admin" ? navigate("/admin") : navigate("/");
  //   }
  // }, [navigate]);



  // resend OTP method
  useEffect(() => {
    if (!showOTP) return;

    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    setCanResend(false);

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showOTP, timer]);

    if (!isOpen) return null;
  /* ================= PHONE OTP ================= */
  // const handleSendOTP = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   if (mobile.length !== 10) {
  //     setError("Please enter a valid 10-digit mobile number");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     await sendOTP(mobile);
  //      console.log("📱 Mobile:", mobile);
  //   console.log("🔐 OTP:", res.data.otp);
  //     setShowOTP(true);
  //   } catch (err) {
  //     setError("Error sending OTP");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      const res = await sendOTP(mobile);

      console.log("📱 Mobile:", mobile);
      console.log("🔐 OTP:", res.data.otp);

      setShowOTP(true);

      // resnd OTP
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      console.error(err);
      setError("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOTP = async () => {
    setError("");

    if (!email) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const res = await sendEmailOTP(email);

      console.log("📧 Email:", email);
      console.log("🔐 OTP:", res.data.otp);

      setShowOTP(true);
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      console.error(err);
      setError("Error sending Email OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EMAIL OTP ================= */
  const handleResendOTP = async () => {
    try {
      setLoading(true);
      setError("");

      if (loginType === "phone") {
        const res = await sendOTP(mobile);

        console.log("📱 Mobile:", mobile);
        console.log("🔐 New OTP:", res.data.otp);
      } else {
        const res = await sendEmailOTP(email);

        console.log("📧 Email:", email);
        console.log("🔐 New OTP:", res.data.otp);
      }

      setTimer(30);
      setCanResend(false);
    } catch (err) {
      console.error(err);
      setError("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP (COMMON) ================= */
 const handleVerifyOTP = async (e) => {
  e.preventDefault();
  setError("");

  if (otp.length !== 6) {
    setError("Please enter a valid 6-digit OTP");
    return;
  }

  try {
    setLoading(true);

    const res =
      loginType === "phone"
        ? await verifyOTP(mobile, otp)
        : await verifyEmailOTP(email, otp);

    // Check API response
    if (!res?.data?.token) {
      throw new Error("Login failed. Token not received.");
    }

    // Save Login Details
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    // Hide OTP Screen
    setShowOTP(false);

    // Show Success Popup
    setShowSuccess(true);

    // Notify Parent Component
    onLoginSuccess?.();

    // Redirect after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onClose();

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }, 3000);

  } catch (err) {
    console.error("OTP Verification Error:", err);

    setError(
      err.response?.data?.message ||
      err.message ||
      "OTP verification failed. Please try again."
    );
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
      className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 relative"
    >
      {/* ================= CLOSE BUTTON ================= */}
      {!showOTP && !showSuccess && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
        >
          ✕
        </button>
      )}

      {/* ================= LOGIN SCREEN ================= */}
      {!showOTP && !showSuccess && (
        <>
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="h-20 mb-3" />
            <h2 className="text-2xl font-bold">Delight Biryani</h2>
            <p className="text-gray-500">Log in or Sign up</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center border-b mb-6">
            <button
              onClick={() => {
                setLoginType("phone");
                setError("");
              }}
              className={`px-6 py-3 font-medium ${
                loginType === "phone"
                  ? "border-b-2 border-black text-black"
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
              className={`px-6 py-3 font-medium ${
                loginType === "email"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-400"
              }`}
            >
              Email
            </button>
          </div>

          {/* PHONE LOGIN */}
          {loginType === "phone" && (
            <form className="space-y-5">
              <div className="flex items-center border rounded-xl h-14 px-4">
                <span className="mr-2 font-medium text-gray-600">+91</span>

                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  maxLength={10}
                  className="w-full outline-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-center">{error}</p>
              )}

              <button
                type="button"
                onClick={handleSendOTP}
                disabled={mobile.length !== 10 || loading}
                className={`w-full h-14 rounded-xl font-semibold ${
                  mobile.length === 10
                    ? "bg-[var(--color-secondary)] text-white"
                    : "bg-gray-300 text-white"
                }`}
              >
                {loading ? "Sending..." : "Continue"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to our{" "}
                <a
                  href="/terms-of-service"
                  target="_blank"
                  className="text-pink-600 font-medium hover:underline"
                >
                  Terms of Service
                </a>{" "}
                &{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-pink-600 font-medium hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            </form>
          )}

          {/* EMAIL LOGIN */}
          {loginType === "email" && (
            <form className="space-y-5">
              <div className="border rounded-xl h-14 px-4 flex items-center">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-center">{error}</p>
              )}

              <button
                type="button"
                onClick={handleSendEmailOTP}
                disabled={!email || loading}
                className={`w-full h-14 rounded-xl font-semibold ${
                  email
                    ? "bg-[var(--color-secondary)] text-white"
                    : "bg-gray-300 text-white"
                }`}
              >
                {loading ? "Sending..." : "Continue"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By continuing, you agree to our{" "}
                <a
                  href="/terms-of-service"
                  target="_blank"
                  className="text-pink-600 font-medium hover:underline"
                >
                  Terms of Service
                </a>{" "}
                &{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-pink-600 font-medium hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            </form>
          )}
        </>
      )}

      {/* ================= OTP SCREEN ================= */}
      {showOTP && !showSuccess && (
        <form onSubmit={handleVerifyOTP} className="space-y-6">
          <button
            type="button"
            onClick={() => {
              setShowOTP(false);
              setOtp("");
              setError("");
              setTimer(30);
              setCanResend(false);
            }}
            className="text-2xl"
          >
            ←
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold">
              OTP Verification
            </h2>

            <p className="text-gray-500 mt-4">
              We have sent a verification code to
            </p>

            <p className="font-semibold mt-2">
              {loginType === "phone"
                ? `+91-${mobile}`
                : email}
            </p>
          </div>

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value.replace(/\D/g, "").slice(0, 6)
              )
            }
            placeholder="______"
            className="w-full border rounded-xl py-4 text-center text-3xl tracking-[18px]"
          />

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full h-14 rounded-xl bg-green-600 text-white font-semibold"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center">
            <p className="text-gray-500">
              Didn't receive the OTP?
            </p>

            {canResend ? (
              <button
                type="button"
                onClick={handleResendOTP}
                className="mt-2 text-[var(--color-secondary)] font-semibold hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <p className="mt-2 text-gray-500">
                Resend OTP in{" "}
                <span className="font-semibold">
                  {timer}s
                </span>
              </p>
            )}
          </div>
        </form>
      )}

      {/* ================= LOGIN SUCCESS ================= */}
      {showSuccess && (
        <div className="flex flex-col items-center justify-center text-center py-6 animate-fadeIn">
          <img
            src={loginSuccessImg}
            alt="Login Successful"
            className="w-full rounded-2xl shadow-lg"
          />

          <h2 className="mt-5 text-3xl font-bold text-green-600">
            Login Successful!
          </h2>

          <p className="mt-3 text-gray-600">
            Thank you for choosing
          </p>

          <h3 className="text-xl font-bold text-[var(--color-secondary)]">
            Delight Biryani 🍛
          </h3>

          <p className="mt-5 text-sm text-gray-400 animate-pulse">
            Redirecting...
          </p>
        </div>
      )}
    </div>
  </div>
);

};

export default LoginModal;
