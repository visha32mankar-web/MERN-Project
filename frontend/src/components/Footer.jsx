import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contactus" },
    { name: "Order Online", path: "/order" },
    { name: "Unsubscribe", path: "/unsubscribe" },
  ];
  return (
    <footer className="bg-[var(--color-secondary)] text-white px-6 md:px-16 lg:px-24 py-12 mt-4">
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* ================= COLUMN 1 : LOGO + ABOUT ================= */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Delight Biryani Logo"
              className="h-16 w-14 object-contain"
            />
            <span className="text-lg font-semibold text-white">
              Delight Biryani
            </span>
          </div>

          <p className="mt-4 text-gray-200 text-sm leading-relaxed">
            Delight Biryani brings you authentic, flavorful biryani crafted with
            traditional recipes and a modern touch. <br />
            From classic chicken and mutton to delightful vegetarian options, we
            serve rich Indian flavors with quality, hygiene, and customer
            satisfaction at heart.
          </p>
        </div>

        {/* ================= COLUMN 2 : QUICK LINKS ================= */}
        <div>
          <p className="text-[var(--color-primary)] text-[24px] font-medium italic mb-4">
            Quick Links
          </p>

          {quickLinks.map((item, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <i className="fa fa-arrow-right text-[var(--color-primary)]" />
      
      <Link
        to={item.path}
        className="cursor-pointer hover:text-[var(--color-primary)] transition"
      >
        {item.name}
      </Link>
    </div>
  ))}
        </div>

        {/* ================= COLUMN 3 : FOLLOW US + ADDRESS ================= */}
        <div>
          <p className="text-[var(--color-primary)] text-[24px] font-medium italic mb-4">
            Follow Us
          </p>

          <div className="flex gap-4 mb-6">
            {/* Facebook */}
            <i className="fa fa-facebook-f text-xl cursor-pointer hover:text-[var(--color-primary)] transition" />

            {/* Twitter */}
            <i className="fa fa-twitter text-xl cursor-pointer hover:text-[var(--color-primary)] transition" />

            {/* Instagram */}
            <i className="fa fa-instagram text-xl cursor-pointer hover:text-[var(--color-primary)] transition" />

            {/* WhatsApp */}
            <i className="fa fa-whatsapp text-xl cursor-pointer hover:text-[var(--color-primary)] transition" />
          </div>

          <p className="text-[var(--color-primary)] text-[24px] font-medium italic mb-2">
            Address
          </p>

          <p className="text-gray-200 text-sm leading-relaxed">
            Xion Mall, Hinjawadi, Pune, Maharashtra 411057 <br />
            Hours: Open 24 hours
          </p>
        </div>

        {/* ================= COLUMN 4 : CONTACT + APP LINKS ================= */}
        <div>
          <p className="text-[var(--color-primary)] text-[24px] font-medium italic mb-4">
            Contact Us
          </p>

          <div className="flex items-center gap-3 mb-6">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2
                   19.86 19.86 0 0 1-8.63-3.07
                   19.5 19.5 0 0 1-6-6
                   A19.86 19.86 0 0 1 2.11 4.18
                   2 2 0 0 1 4.05 2h3
                   a2 2 0 0 1 2 1.72
                   c.12.9.33 1.77.63 2.6
                   a2 2 0 0 1-.45 2L8.09 9.91
                   a16 16 0 0 0 6 6l1.59-1.13
                   a2 2 0 0 1 2-.45
                   c.83.3 1.7.51 2.6.63
                   a2 2 0 0 1 1.72 2z"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-[var(--color-primary)] text-lg font-bold">
              +91 99770 03434
            </span>
          </div>

          <p className="text-[var(--color-primary)] text-[24px] font-medium italic mb-3">
            Explore on Mobile
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=in.bbk.android"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/applink1.png"
                alt="Android App"
                className="h-12 hover:scale-105 transition"
              />
            </a>

            <a
              href="https://apps.apple.com/in/app/biryani-by-kilo-order-online/id1106886101"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/images/iPhoneapplink.png"
                alt="iOS App"
                className="h-12 hover:scale-105 transition"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
