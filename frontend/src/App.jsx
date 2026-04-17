import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import OfferPopup from "./components/OfferPopup";
import Footer from "./components/Footer";

import Home from "./pages/common/Home";
import About from "./pages/common/About";
import Feedback from "./pages/common/Feedback";
import ContactUs from "./pages/common/ContactUs";
import Menu from "./pages/common/Menu";
import Unsubscribe from "./pages/common/Unsubscribe";
import LoginModal from "./components/LoginModal";

const App = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);

  const slides = [
    "/images/Banner1.png",
    "/images/Banner2.png",
    "/images/Banner3.png",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLoginClick={() => setLoginOpen(true)} />

      <OfferPopup />

      <main className="flex-grow bg-gray-100">
        <Routes>
          <Route path="/" element={<Home slides={slides} />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="unsubscribe" element={<Unsubscribe />} />
        </Routes>
      </main>

      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />

      <Footer />
    </div>
  );
};

export default App;
