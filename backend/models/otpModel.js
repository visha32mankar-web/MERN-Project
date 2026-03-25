const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    mobile: {
        type : String,
        required: true,
    },
    otp: {
        type:String,
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

// Auto delete OTP after expiry (TTL index)
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


module.exports = mongoose.model("OTP" , otpSchema);