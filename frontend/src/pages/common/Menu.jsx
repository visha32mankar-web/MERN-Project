import React, { useRef, useState } from "react";

// ===== TOP CATEGORY CARDS =====
const tiers = [
  { id: 1, name: "Veg Biryani", key: "veg", image: "/images/menu/veg.png" },
  { id: 2, name: "Non-Veg Biryani", key: "nonveg", image: "/images/menu/nonveg.png" },
  { id: 3, name: "Paneer Tikka", key: "paneer", image: "/images/menu/panner tikka.png" },
  { id: 4, name: "Soya Chaap", key: "chaap", image: "/images/menu/chaps.png" },
  { id: 5, name: "Rolls", key: "rolls", image: "/images/menu/rolls.png" },
  { id: 6, name: "Soft Drinks", key: "softdrinks", image: "/images/menu/softdrink.png" },
  { id: 7, name: "Fresh Juices", key: "juice", image: "/images/menu/juices.png" },
  { id: 8, name: "Sweets", key: "sweets", image: "/images/menu/sweet.png" },
];

// ===== DISH DATA =====
const dishes = [
  { id: 1, name: "Veg Biryani", category: "veg", price: 180, desc: "Delicious veg biryani", image: "/images/menu/vegg.png" },
  { id: 2, name: "Paneer Tikka", category: "paneer", price: 220, desc: "Grilled paneer with spices", image: "/images/menu/pannerBiryan.png" },
  { id: 3, name: "Chicken Biryani", category: "nonveg", price: 260, desc: "Hyderabadi chicken biryani", image: "/images/menu/chicken.png" },
  { id: 4, name: "Soya Chaap Masala", category: "chaap", price: 200, desc: "Creamy soya chaap", image: "/images/menu/chaap.png" },
  { id: 5, name: "Veg Roll", category: "rolls", price: 120, desc: "Crispy veg roll", image: "/images/menu/roll1.png" },
  { id: 6, name: "Orange Juice", category: "juice", price: 90, desc: "Fresh orange juice", image: "/images/menu/orangedrink.png" },
  { id: 7, name: "Gulab Jamun", category: "sweets", price: 70, desc: "Soft and sweet", image: "/images/menu/gulabjamun.png" },
  { id: 8, name: "Rasmali", category: "sweets", price: 70, desc: "Soft and sweet", image: "/images/menu/rasmali.png" },
  { id: 9, name: "Mutton Biryani", category: "nonveg", price: 280, desc: "Authentic mutton biryani", image: "/images/menu/muttonbiryani.png" },
  { id: 10, name: "Soft Drinks", category: "softdrinks", price: 280, desc: "Cocola", image: "/images/menu/cocala.png" },
  { id: 11, name: "Soft Drinks", category: "softdrinks", price: 280, desc: "Orange Mojito", image: "/images/menu/orangedrink.png" },
  { id: 12, name: "Egg Roll", category: "rolls", price: 50, desc: "Egg Rolls", image: "/images/menu/eggroll.png" },
  { id: 13, name: "Noodles Roll", category: "rolls", price: 50, desc: "Noodles Rolls", image: "/images/menu/noodlesrolls.png" },
];

const SCROLL_AMOUNT = 260;

const Menu = () => {
  const scrollRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });

  const filteredDishes =
    selectedCategory === "all"
      ? dishes
      : dishes.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-10 w-full bg-[var(--color-background)]">
      
      {/* HEADER */}
      <div className="mx-auto max-w-4xl text-center mb-6 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-secondary)]">
          Choose the right option for you
        </h1>
      </div>

      {/* CATEGORY SCROLL */}
      <div className="relative w-full mb-12">
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white shadow"
        >
          ◀
        </button>

        <div
          ref={scrollRef}
          className="flex gap-6 px-12 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          
          {/* ALL CATEGORY */}
          <div
            onClick={() => setSelectedCategory("all")}
            className={`min-w-[180px] cursor-pointer text-center p-3 rounded-xl border transition ${
              selectedCategory === "all" ? "border-indigo-600 shadow-md" : ""
            }`}
          >
            <div className="w-40 h-40 mx-auto mb-3 rounded-full border-2 overflow-hidden">
              <img
                src="/images/menu/allImg.png"
                alt="All"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 className="font-semibold">All</h3>
          </div>

          {/* OTHER CATEGORIES */}
          {tiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedCategory(tier.key)}
              className={`min-w-[200px] cursor-pointer text-center p-3 rounded-xl border transition ${
                selectedCategory === tier.key ? "border-indigo-600 shadow-md" : ""
              }`}
            >
              <div className="w-45 h-40 mx-auto mb-3 rounded-full border-2 overflow-hidden">
                <img
                  src={tier.image}
                  alt={tier.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="font-semibold">{tier.name}</h3>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 bg-white shadow"
        >
          ▶
        </button>
      </div>

      {/* DISH CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-12">
        {filteredDishes.map((item) => (
          <div key={item.id} className="bg-white shadow hover:shadow-lg transition">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 object-cover"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold">₹{item.price}</span>
                <button className="px-4 py-2 bg-[var(--color-secondary)] text-white hover:bg-[var(--color-primary)] transition">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredDishes.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No items available
          </p>
        )}
      </div>
    </section>
  );
};

export default Menu;
