import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
// import LoginModal from "./LoginModal";
import {
  FaCalendarAlt,
  FaGift,
  FaUserShield,
  FaBell,
  FaCommentDots,
  FaPrescriptionBottleAlt,
  FaStore,
  FaMapMarkerAlt,
  FaUserCircle,
  FaMapMarkerAlt as FaLocationIcon,
  FaSearch,
  FaWallet,
  FaHeart,
} from "react-icons/fa";

const Navbar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [locationText, setLocationText] = useState("");
  // const [openLogin, setOpenLogin] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [searchText, setSearchText] = useState("");
  const accountRef = useRef(null);

  const wishlistCount = 0;

  //search flip
  const [index, setIndex] = useState(0);

  const items = [
    "Veg Biryani",
    "Non Veg Biryani",
    "Rolls",
    "Kebabs",
    "Juices",
    "Desserts",
  ];

  useEffect(() => {
    if (searchText) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [searchText]);

  // Load saved location on refresh
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setLocationText(savedLocation);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setOpenAccount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Dynamic Geolocation Function
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // 🔥 Reverse Geocoding API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await response.json();

          const city =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            data?.address.state ||
            "Unknown Location";

          setLocationText(city);
          localStorage.setItem("userLocation", city);
        } catch (error) {
          console.error("Reverse Geocoding Error:", error);
        }

        setLoadingLocation(false);
      },
      (error) => {
        alert("Location permission denied");
        setLoadingLocation(false);
      },
    );
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-20 xl:px-28 py-4">
          {/* LEFT SECTION (Logo + Location) */}
          <div className="flex items-center gap-6">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src={logo}
                alt="Delight Biryani Logo"
                className="h-12 w-10 object-contain"
              />
              <span className="text-xl font-semibold italic text-gray-800 whitespace-nowrap">
                Delight Biryani
              </span>
            </Link>

            {/* LOCATION SEARCH */}
            <div className="hidden xl:flex items-center h-[44px] w-[350px] border border-gray-300 rounded-lg px-3 bg-white shadow-sm">
              <FaLocationIcon className="text-[#930035] text-sm mr-2 shrink-0" />

              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                placeholder="Your location..."
                className="flex-1 outline-none text-sm bg-transparent"
              />

              <div className="h-4 w-px bg-gray-300 mx-2" />

              <button
                onClick={getLocation}
                disabled={loadingLocation}
                className="text-xs text-[#930035] font-medium hover:text-black transition whitespace-nowrap"
              >
                {loadingLocation ? "Detecting..." : "Detect"}
              </button>
            </div>
          </div>

          {/* CENTER SECTION (Main Search Properly Centered) */}
          <div className="relative flex items-center h-[48px] w-[500px] rounded-xl px-4 ocus-witfhin:ring-2 focus-within:ring-[#930035] transition">
            <div className="relative flex items-center w-full h-[44px] border border-gray-300 rounded-lg px-3 transition">
              {/* Search Icon */}
              <FaSearch className="text-gray-400 text-sm mr-2 flex-shrink-0" />

              {/* Input */}
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1 outline-none text-sm bg-transparent"
              />

              {/* Animated Placeholder */}
              {!searchText && (
                <span
                  key={index}
                  className="absolute left-8 text-sm text-gray-500 animate-slide pointer-events-none"
                >
                  Search "{items[index]}"
                </span>
              )}
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <Link to="/" className="hover:text-[#930035] transition">
              Home
            </Link>

            <Link to="/about" className="hover:text-[#930035] transition">
              About us
            </Link>
            {/* <Link
              to="/about"
              onClick={() => console.log("About clicked")}
              className="hover:text-[#930035] transition"
            >
              About us
            </Link> */}

            <Link to="/menu" className="hover:text-[#930035] transition">
              Menu
            </Link>

            <Link to="/feedback" className="hover:text-[#930035] transition">
              Feedback
            </Link>

            <Link to="/contactus" className="hover:text-[#930035] transition">
              Contact us
            </Link>

            {/* Wallet */}
            <button className="p-2 rounded-full hover:bg-[#930035]/10 hover:scale-110 transition duration-200">
              <FaWallet size={30} className="text-[var(--color-primary)]" />
            </button>

            {/* Login / Account */}
            {isLoggedIn ? (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setOpenAccount(!openAccount)}
                  className="h-[40px] px-5 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
                >
                  Account ▼
                </button>

                {openAccount && (
                  <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg z-50">
                    {/* PROFILE HEADER */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b">
                      <FaUserCircle className="text-gray-500 text-4xl" />
                      <div className="text-sm">
                        <p className="font-semibold">My Account</p>
                        <p className="text-gray-500 text-xs">
                          {localStorage.getItem("mobile")}
                        </p>
                      </div>
                    </div>

                    {/* MENU ITEMS */}
                    <div className="py-2">
                      {[
                        {
                          icon: <FaUserCircle />,
                          label: "Profile",
                          path: "/profile",
                        },
                        {
                          icon: <FaCalendarAlt />,
                          label: "Book a Table",
                          path: "/book-table",
                        },
                        {
                          icon: <FaGift />,
                          label: "Gift Card",
                          path: "/gift-card",
                        },
                        {
                          icon: <FaUserShield />,
                          label: "Privacy & Policy",
                          path: "/privacy-policy",
                        },
                        {
                          icon: <FaBell />,
                          label: "Notifications",
                          path: "/notifications",
                        },
                        {
                          icon: <FaCommentDots />,
                          label: "Feedback",
                          path: "/feedback",
                        },
                        {
                          icon: <FaPrescriptionBottleAlt />,
                          label: "Prescriptions",
                          path: "/prescriptions",
                        },
                        {
                          icon: <FaStore />,
                          label: "Store Locator",
                          path: "/store-locator",
                        },
                        {
                          icon: <FaMapMarkerAlt />,
                          label: "Saved Addresses",
                          path: "/saved-addresses",
                        },
                      ].map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setOpenAccount(false);
                            navigate(item.path);
                          }}
                          className="group w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 transition"
                        >
                          <span className="text-gray-500 group-hover:text-[#930035]">
                            {item.icon}
                          </span>
                          <span className="group-hover:text-[#930035]">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    <hr />

                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("mobile");
                        setIsLoggedIn(false);
                        setOpenAccount(false);
                      }}
                      className="w-full text-left text-red-600 px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="h-[40px] px-7 rounded-full bg-[var(--color-secondary)] text-white hover:bg-[var(--color-primary)] transition"
              >
                Login
              </button>
            )}

            {/* Wishlist Heart */}
            <button
              className={`relative flex items-center justify-center w-28 h-16 rounded-xl transition-all duration-300 ${
                wishlistCount === 0
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-red-50 hover:bg-red-100 hover:scale-105"
              }`}
              disabled={wishlistCount === 0}
            >
              <FaHeart
                size={28}
                className={
                  wishlistCount === 0
                    ? "text-gray-400"
                    : "text-[var(--color-primary)]"
                }
              />

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-secondary)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}

              {wishlistCount === 0 && (
                <span className="ml-2 text-gray-400 font-semibold text-sm">
                  Wishlist
                </span>
              )}
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-2xl">
            ☰
          </button>
        </div>
      </nav>

      {/* <LoginModal
        isOpen={openLogin}
        onClose={() => setOpenLogin(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setOpenLogin(false);
        }}
      /> */}
    </>
  );
};

export default Navbar;
