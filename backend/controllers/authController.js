
const OTP = require("../models/otpModel");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendOTPEmail } = require("../utils/sendEmail");

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ================= SEND OTP =================
exports.sendOTP = async (req, res) => {
  try {
    console.log("========== SEND OTP ==========");
    console.log("BODY:", req.body);

    const { mobile, email } = req.body;

    if (!mobile && !email) {
      return res.status(400).json({
        success: false,
        message: "Mobile or Email is required",
      });
    }

    const otp = generateOTP();

    // ================= MOBILE OTP =================
    if (mobile && !email) {

      const cleanMobile = mobile.replace(/\D/g, "").slice(-10);

      if (cleanMobile.length !== 10) {
        return res.status(400).json({
          success: false,
          message: "Invalid mobile number",
        });
      }

      await OTP.deleteMany({ mobile: cleanMobile });

      await OTP.create({
        mobile: cleanMobile,
        otp,
        expiresAt: new Date(Date.now() + 3 * 60 * 1000),
      });

      console.log("📱 Mobile:", cleanMobile);
      console.log("🔑 OTP:", otp);

      return res.status(200).json({
        success: true,
        message: "OTP generated successfully",
        otp, // remove in production
      });
    }

    // ================= EMAIL OTP =================
    if (email) {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email address",
        });
      }

      await OTP.deleteMany({ email });

      await OTP.create({
        email,
        otp,
        expiresAt: new Date(Date.now() + 3 * 60 * 1000),
      });

      await sendOTPEmail(email, otp);

      console.log("📧 Email:", email);
      console.log("🔑 OTP:", otp);

      return res.status(200).json({
        success: true,
        message: "OTP sent to email",
      });
    }

  } catch (error) {
    console.error("❌ SEND OTP ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= VERIFY OTP =================
exports.verifyOTP = async (req, res) => {
  try {

    const { mobile, email, otp } = req.body;

    if ((!mobile && !email) || !otp) {
      return res.status(400).json({
        success: false,
        message: "OTP and Mobile/Email required",
      });
    }

    const query = mobile
      ? { mobile: mobile.replace(/\D/g, "").slice(-10) }
      : { email };

    const record = await OTP.findOne(query);

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    let user;

    if (mobile) {

      const cleanMobile = mobile.replace(/\D/g, "").slice(-10);

      user = await User.findOne({ mobile: cleanMobile });

      if (!user) {
        user = await User.create({
          name: "New User",
          mobile: cleanMobile,
          email: `${cleanMobile}@example.com`,
          role: "user",
        });
      }

    } else {

      user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          name: "New User",
          email,
          role: "user",
        });
      }
    }

    await OTP.deleteMany(query);

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      role: user.role,
      user,
    });

  } catch (error) {
    console.error("❌ VERIFY OTP ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= REGISTER =================
exports.registerWithEmail = async (req, res) => {
  try {

    const { name, email, mobile, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
    });

  } catch (error) {
    console.error("❌ REGISTER ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================
exports.loginWithEmail = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
      role: user.role,
      user,
    });

  } catch (error) {
    console.error("❌ LOGIN ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

