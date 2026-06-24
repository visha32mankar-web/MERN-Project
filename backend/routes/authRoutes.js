
const  express = require("express");
const router =express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  sendOTP,
  verifyOTP, 
  registerWithEmail, 
  loginWithEmail
  } = require("../controllers/authController");

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Protected route working",
    user: req.user,
  });
});

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

router.post("/register-email",registerWithEmail);
router.post("/login-email",loginWithEmail);

// ✅ SEND EMAIL OTP
// router.post("/send-email-otp", (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: "Email required" });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000);

//   console.log("Email:", email);
//   console.log("OTP:", otp);

//   // (Later you will save in DB + send email)

//   res.json({ message: "OTP sent successfully" });
// });

// ✅ VERIFY EMAIL OTP (dummy for now)
// router.post("/verify-email-otp", (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ message: "Missing data" });
//   }

//   res.json({
//     token: "dummy-token",
//     role: "user"
//   });
// });

module.exports = router;

