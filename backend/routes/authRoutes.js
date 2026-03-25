
const  express = require("express");
const router =express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {sendOTP, verifyOTP, registerWithEmail, loginWithEmail} = require("../controllers/authController");

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

module.exports = router;

