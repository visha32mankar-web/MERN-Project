import React, { useState } from "react";

/* COMPONENTS */
import Carousel from "../../components/Carousel";

/* ICONS */
import vegIcon from "../../assets/images/veg.png";
import nonVegIcon from "../../assets/images/nonveg.png";

/* DISH IMAGES */
import gimg1 from "../../assets/images/gimg1.png";
import gimg5 from "../../assets/images/gimg5.png";
import gimg11 from "../../assets/images/gimg11.png";
import gimg6 from "../../assets/images/gimg6.png";

const Home = ({ slides }) => {
  const [filter, setFilter] = useState("all"); // all | veg | nonveg

  /* DISH DATA */
  const dishes = [
    {
      id: 1,
      name: "Chicken Biryani",
      desc: "Authentic dum biryani with rich spices",
      price: 249,
      image: gimg1,
      type: "nonveg",
    },
    {
      id: 2,
      name: "Mutton Biryani",
      desc: "Slow-cooked mutton with aromatic rice",
      price: 349,
      image: gimg5,
      type: "nonveg",
    },
    {
      id: 3,
      name: "Veg Biryani",
      desc: "Fresh veggies with fragrant basmati rice",
      price: 199,
      image: gimg11,
      type: "veg",
    },
    {
      id: 4,
      name: "Egg Biryani",
      desc: "Eggs cooked with aromatic spices",
      price: 129,
      image: gimg6,
      type: "nonveg",
    },
  ];

  /* FILTER */
  const filteredDishes =
    filter === "all"
      ? dishes
      : dishes.filter((item) => item.type === filter);

  return (
    <>
      {/* CAROUSEL */}
      <Carousel slides={slides} />

      {/* DISHES */}
      <section className="w-full px-6 md:px-8 py-14">
        {/* HEADER + FILTER */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Our Popular Dishes
          </h2>

          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 border transition ${
                filter === "all"
                  ? "bg-[var(--color-secondary)] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("veg")}
              className={`flex items-center gap-2 px-4 py-2 border transition ${
                filter === "veg"
                  ? "bg-[var(--color-secondary)] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <img src={vegIcon} alt="Veg" className="w-4 h-4" />
              Veg
            </button>

            <button
              onClick={() => setFilter("nonveg")}
              className={`flex items-center gap-2 px-4 py-2 border transition ${
                filter === "nonveg"
                  ? "bg-[var(--color-secondary)] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <img src={nonVegIcon} alt="Non-Veg" className="w-4 h-4" />
              Non-Veg
            </button>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDishes.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow hover:shadow-lg transition"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover"
                />

                <img
                  src={item.type === "veg" ? vegIcon : nonVegIcon}
                  alt={item.type}
                  className="absolute top-3 right-3 w-6 h-6"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold">
                    ₹{item.price}
                  </span>

                  <button className="px-4 py-2 bg-[var(--color-secondary)] text-white hover:bg-[var(--color-primary)] transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
