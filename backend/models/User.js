const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    sparse: true, 
  },
  mobile: {
  type: String,
  unique: true,
  sparse: true, 
},
  otp: String,
  otpExpire: Date,

    password: {
      type: String,
    },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
},{ timestamps: true });

userSchema.pre("save",async function(next){
  if(!this.isModified("password") || !this.password){
    return;
  }
  this.password =  await bcrypt.hash(this.password,10);
});

module.exports = mongoose.model("User", userSchema);
