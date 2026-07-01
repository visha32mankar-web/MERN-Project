import React from "react";
import BiryaniVideo from "../../assets/videos/BiryaniGarnishing.mp4";
// D:\Demo\MERN\frontend\src\assets\videos\BiryaniGarnishing.mp4
const About = () => {
  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <h2 className="text-2xl font-semibold text-gray-800 mb-10 text-center">
        About Us
      </h2>

      <div className="flex justify-center">
        <div className="w-full max-w-8xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* LEFT TEXT */}
            <div className="lg:w-1/4 text-gray-700 leading-relaxed text-justify">
              <p>
                Delight Biryani is rooted in tradition and passion for authentic
                flavors. Every grain of rice is carefully selected, and every
                spice is blended to perfection to give you a memorable dining
                experience.
                <br />
                Our chefs follow slow-cooking dum techniques passed down through
                generations, ensuring rich aroma, authentic taste, and
                unforgettable flavors in every serving.
                <br />
                Our chefs follow slow-cooking dum techniques passed down through
                generations, ensuring rich aroma, authentic taste, and
                unforgettable flavors in every serving.
                <br />
                Our chefs follow slow-cooking dum techniques passed down through
                generations, ensuring rich aroma, authentic taste, and
                unforgettable flavors in every serving.
                <br />
                Our chefs follow slow-cooking dum techniques passed down through
                generations, ensuring rich aroma, authentic taste, and
                unforgettable flavors in every serving.
              </p>
            </div>

            {/* VIDEO */}
            <div className="flex flex-col items-center ">
             <video autoPlay loop muted playsInline>
  <source src={BiryaniVideo} type="video/mp4" />
</video>
              <span className="mt-4 pt-2 border-t text-[var(--color-secondary)] text-2xl font-semibold text-center w-full">
               Authentic Taste 
              </span>
            </div>

            {/* RIGHT TEXT */}
            <div className="lg:w-1/4 text-gray-700 leading-relaxed text-justify">
              <p>
                Delight Biryani is rooted in tradition and passion for authentic
                flavors. Every grain of rice is carefully selected, and every
                spice is blended to perfection to give you a memorable dining
                experience.
                <br />
                Our chefs follow slow-cooking dum techniques passed down through
                generations, ensuring rich aroma, authentic taste, and
                unforgettable flavors in every serving.
                <br />
                Our chefs follow slow-cooking dum techniques passed down through
                generations, ensuring rich aroma, authentic taste, and
                unforgettable flavors in every serving.
                <br />
                Our chefs follow slow-cooking dum techniques passed down through
                generations, ensuring rich aroma, authentic taste, and
                unforgettable flavors in every serving.
                <br />
                Our chefs follow slow-cooking dum techniques passed down through
                generations, ensuring rich aroma, authentic taste, and
                unforgettable flavors in every serving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
