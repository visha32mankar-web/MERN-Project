import React, { useEffect, useState } from "react";
import offerImg from "../assets/images/DiscountOffer.png";

const OfferPopup = ({ onLoginClick }) => {
 
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div
      onClick={() => setShow(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] max-w-md transform transition-all duration-300 scale-100"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setShow(false)}
          className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-red-600 transition"
          aria-label="Close"
        >
          ✕
        </button>

        {/* OFFER IMAGE */}
        <img
          src={offerImg}
          alt="Discount Offer"
          onClick={() => {
            setShow(false);
            onLoginClick();
          }}
          className="w-full rounded-xl shadow-2xl cursor-pointer hover:scale-105 transition duration-300"
        />
      </div>
    </div>
  );
};

export default OfferPopup;
