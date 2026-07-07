import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaChevronDown,
  FaGift,
} from "react-icons/fa";

const TableBooking = () => {
  const [booking, setBooking] = useState({
    city: "",
    date: "",
    time: "",
    guests: 2,
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const reserveTable = () => {
    if (!booking.city || !booking.date || !booking.time || !booking.guests) {
      alert("Please fill all details.");
      return;
    }

    console.log(booking);

    alert("Table Reserved Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Container */}
      <div className="flex justify-start py-10 pl-15">
        <div className="w-full max-w-4xl">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-black">Hi Vishakha,</h2>

            <p className="text-2xl font-semibold mt-2">
              Plan Your Dining Experience
            </p>

            {/* <button className="mt-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto">
              <FaGift />
              View Offers
            </button> */}
          </div>

          {/* Booking Card */}

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* City */}

            <div className="relative mb-6">
              <select
                name="city"
                value={booking.city}
                onChange={handleChange}
                className="w-full border rounded-xl h-14 px-4 appearance-none outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Your City</option>

                <option>Pune</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Hyderabad</option>
                <option>Bangalore</option>
              </select>

              <FaChevronDown className="absolute right-5 top-5 text-gray-500" />
            </div>

            {/* Date */}

            <div className="relative mb-6">
              <input
                type="date"
                name="date"
                value={booking.date}
                onChange={handleChange}
                className="w-full border rounded-xl h-14 px-4 pr-16 outline-none focus:ring-2 focus:ring-red-500"
              />

              {/* <FaCalendarAlt className="absolute right-5 top-5 text-red-600" /> */}
            </div>

            {/* Time */}

            <div className="relative mb-6">
              <input
                type="time"
                name="time"
                value={booking.time}
                onChange={handleChange}
                className="w-full border rounded-xl h-14 px-4 pr-16 outline-none focus:ring-2 focus:ring-red-500"
              />

              {/* <FaClock className="absolute right-5 top-5 text-red-600" /> */}
            </div>

            {/* Guests */}

            <div className="relative mb-8">
              <select
                name="guests"
                value={booking.guests}
                onChange={handleChange}
                className="w-full border rounded-xl h-14 px-4 appearance-none outline-none focus:ring-2 focus:ring-red-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <option key={item} value={item}>
                    {item} Guest{item > 1 && "s"}
                  </option>
                ))}
              </select>

              <FaUsers className="absolute right-12 top-5 text-red-600" />

              <FaChevronDown className="absolute right-5 top-5 text-gray-500" />
            </div>

            {/* Button */}

            <button
              onClick={reserveTable}
              className="w-full h-14 bg-red-700 hover:bg-red-800 text-white text-lg rounded-xl font-semibold transition"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBooking;
