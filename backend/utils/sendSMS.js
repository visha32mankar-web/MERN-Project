const sendSMS = async (mobile, otp) => {
  try {
    console.log("==================================");
    console.log("📱 Mobile :", mobile);
    console.log("🔐 OTP    :", otp);
    console.log("==================================");

    // Always return true (for testing)
    return true;
  } catch (error) {
    console.error("SMS Error:", error);
    return false;
  }
};

module.exports = { sendSMS };