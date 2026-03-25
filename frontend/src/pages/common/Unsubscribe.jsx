import React from "react";
// import logo from "../assets/images/logo.png";

const Unsubscribe = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Unsubscribe from Offers
          </h1>

          <p className="text-gray-600 mb-8">
            If you no longer wish to receive promotional offers, you can
            unsubscribe below or contact us via call or email.
          </p>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Enter your mobile number"
              className="w-full px-4 py-3 border rounded-lg 
             focus:outline-none 
             focus:ring-[var(--color-primary)]
             focus:border-[var(--color-primary)]"
            />

            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border rounded-lg 
             focus:outline-none 
             focus:ring-[var(--color-primary)]
             focus:border-[var(--color-primary)]"
            />

            <select
              className="w-full px-4 py-3 border rounded-lg bg-white 
             focus:outline-none focus:ring-[var(--color-primary)]
             focus:border-[var(--color-primary)] 
             text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Please Select
              </option>
              <option value="not_interested">Not interested</option>
              <option value="too_frequent">
                Your messages are too frequent
              </option>
              <option value="dont_remember">
                I don't remember signing up for this
              </option>
              <option value="no_longer">
                I no longer want to receive these messages
              </option>
              <option value="others">Others</option>
            </select>

            <button
              type="submit"
              className="w-full bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] text-white hover:text-[var(--color-secondary)] py-3 rounded-lg font-semibold transition"
            >
              Unsubscribe
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-6 text-sm text-gray-500">
            📞 Call: +91 98765 43210 <br />
            📧 Email: support@yourwebsite.com
          </div>
        </div>

        {/* RIGHT SIDE (LOGO) */}
        <div
          className="bg-[var(--color-secondary)] 
                hover:text-[#930035] 
                flex flex-col 
                items-center 
                justify-center 
                p-10"
        >
          <img
            src="/images/logo.png"
            alt="Company Logo"
            className="w-48 h-auto object-contain mb-4"
          />

          <h4 className="text-3xl font-bold text-[var(--color-primary)]">
            𝒟𝑒𝓁𝒾𝑔𝒽𝓉 𝒮𝓉𝑜𝓇𝑒
          </h4>
          <p className="text-white">Taste & Aroma</p>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
