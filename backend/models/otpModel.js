const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  mobile: {
    type: String,
    default: null,
  },

  email: {
    type: String,
    default: null,
  },

  otp: {
    type: String,
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

otpSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

module.exports = mongoose.model("OTP", otpSchema);