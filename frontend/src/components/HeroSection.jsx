import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaUtensils,
} from "react-icons/fa";

const HeroSection = () => {
  return (
    <div className="space-y-6">

      {/* Hero Image */}
      <div className="relative overflow-hidden rounded-3xl">

        <img
          src="/images/restaurant.jpg"
          alt="Restaurant"
          className="w-full h-[420px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 p-6 text-white">

          <h1 className="text-4xl font-bold">
            Royal Biryani House
          </h1>

          <div className="flex items-center gap-2 mt-3">
            <FaStar className="text-yellow-400" />
            <span>4.8 (2.3k Reviews)</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <FaMapMarkerAlt />
            <span>Pune, Maharashtra</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <FaClock />
            <span>Open • 11:00 AM - 11:30 PM</span>
          </div>

        </div>

      </div>

      {/* Good Food Card */}

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

            <FaUtensils className="text-red-600 text-2xl"/>

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Good Food,
            </h2>

            <h2 className="text-2xl font-bold text-red-600">
              Good Mood ❤️
            </h2>

            <p className="text-gray-500 mt-2">
              Reserve your favourite table and enjoy an unforgettable dining experience.
            </p>

          </div>

        </div>

      </div>

      {/* Today's Offer */}

      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-6 text-white">

        <p className="uppercase tracking-widest">
          Today's Special
        </p>

        <h2 className="text-3xl font-bold mt-2">
          Flat 25% OFF
        </h2>

        <p className="mt-2">
          On Table Booking before 7 PM
        </p>

        <button className="mt-5 bg-white text-red-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
          Reserve Now
        </button>

      </div>

    </div>
  );
};

export default HeroSection;