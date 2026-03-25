const OTP = require("../models/otpModel");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOTP = async (req, res) => {
  try {
    console.log("SEND OTP API CALLED");

    const { mobile } = req.body;

    if (!mobile || !/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number",
      });
    }

    const otp = generateOTP();

    await OTP.deleteMany({ mobile });

    await OTP.create({
      mobile,
      otp,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000),
    });

    console.log("OTP SAVED IN DB");

    // SEND SMS HERE
    const message = await client.messages.create({
      body: `Your Delight App OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: `+91${mobile}`,
    });

    console.log("SMS SENT SID:", message.sid);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({
        success: false,
        message: "Mobile and OTP are required",
      });
    }

    const record = await OTP.findOne({ mobile});

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

    let user = await User.findOne({ mobile });
    if (!user) {
      user = await User.create({
        name: "New User",
        email: `${mobile}@example.com`,
        mobile,
        role: "user",
      });
    }

    // Remove OTP after successful verification
    await OTP.deleteMany({ mobile });

    // res.status(200).json({
    // success: true,
    // message: "Login Successful",
    // });
    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role, mobile: user.mobile },

      // { mobile }, // data to store inside token
      process.env.JWT_SECRET, // secret key
      { expiresIn: "7d" }, // valid for 7 days
    );

    // Send token in response
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: token,
      role: user.role,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP",
    });
  }
};

exports.registerWithEmail = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create user (password will auto-hash via pre-save)
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
    console.error("Register Error:", error); // 👈 IMPORTANT
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.loginWithEmail = async (req, res) =>{
  try{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({ message: "User not found" });
    }

    const  isMatch= await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET,
      {expiresIn: "7d"}
    );

    res.json({
      token,
      role:  user.role,
      email: user.email,
    });
  }catch {
    res.status(500).json({message: "Server error"});
  }
};

