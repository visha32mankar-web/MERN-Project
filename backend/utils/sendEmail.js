// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,   
//     }
// });

// const sendEmailOTP = async (email,otp) =>{
//     await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: "Ypur OTP Code",
//         html: `<h2>Your OTP is : ${otp}</h2>`
//     });
// };

// module.exports = {sendEmailOTP};

// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");

const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      html: `
        <h2>Your OTP is: ${otp}</h2>
        <p>Valid for 5 minutes</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent to:", email);

    return true;
  } catch (error) {
    console.log("❌ Email error:", error);

    return false;
  }
};

module.exports = { sendOTPEmail };