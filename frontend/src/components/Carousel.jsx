import React, { useState } from "react";

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  // Go to previous slide
  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  // Go to next slide
  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  return (
<div className="relative w-screen max-w-none h-[450px] mx-auto overflow-hidden rounded-none shadow-lg mt-3">
 
      {/* SLIDES CONTAINER */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* PREVIOUS BUTTON */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-full z-10"
      >
        ❮
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-full z-10"
      >
        ❯
      </button>
    </div>
  );
};

export default Carousel;
