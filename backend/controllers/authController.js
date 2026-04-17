const OTP = require("../models/otpModel");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const axios = require("axios");

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// SEND OTP
exports.sendOTP = async (req, res) => {
  try {
    console.log("SEND OTP API CALLED");

    const { mobile } = req.body;

    // Validate mobile
    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    const otp = generateOTP();

    // Remove old OTP
    await OTP.deleteMany({ mobile });

    // Save new OTP
    await OTP.create({
      mobile,
      otp,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000),
    });

    // console.log("✅ OTP SAVED:", otp);

    // // Send OTP in response (for testing)
    // res.status(200).json({
    //   success: true,
    //   message: "OTP sent successfully",
    //   otp: otp,
    // });
    console.log("OTP:", otp);

// 📲 SEND SMS
await axios.get("https://www.fast2sms.com/dev/bulkV2", {
  params: {
    authorization: "YOUR_API_KEY",
    variables_values: otp,
    route: "otp",
    numbers: mobile,
  },
});

  } catch (error) {
    console.error("❌ SEND OTP ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

// VERIFY OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile and OTP are required",
      });
    }

    const record = await OTP.findOne({ mobile });

    if (!record || record.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP Expired",
      });
    }

    // Find or create user
    let user = await User.findOne({ mobile });

    if (!user) {
      user = await User.create({
        name: "New User",
        email: `${mobile}@example.com`,
        mobile,
        role: "user",
      });
    }

    // Delete OTP
    await OTP.deleteMany({ mobile });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, mobile: user.mobile },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
    });

  } catch (error) {
    console.error("❌ VERIFY OTP ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};

// REGISTER WITH EMAIL
exports.registerWithEmail = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      mobile,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("❌ REGISTER ERROR:", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// LOGIN WITH EMAIL
exports.loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};