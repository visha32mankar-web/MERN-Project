import React from "react";
import feedback1 from "../../assets/images/DiscountOffer.jpg";
import feedback2 from "../../assets/images/DiscountOffer.jpg";

const Feedback = () => {
  return (
    <section className="bg-gray-100 px-4 sm:px-6 md:px-12 lg:px-24 py-12 md:py-16">
      {/* PAGE TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 md:mb-12">
        Customer Feedback
      </h2>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* LEFT SIDE - FEEDBACK FORM */}
        <div className="bg-white shadow-lg rounded-lg p-5 sm:p-6 md:p-8">
          <form className="space-y-6 text-sm md:text-base">
            {/* Q1 */}
            <div>
              <label className="block text-gray-700 mb-3 font-medium">
                1. How would you rate your overall experience?
              </label>
              <div className="flex flex-wrap gap-4">
                {["Excellent", "Good", "Average", "Poor"].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input type="radio" name="overallExperience" />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                2. How was the taste and quality of the biryani?
              </label>
              <select className="w-full border border-gray-300 rounded-md px-4 py-2">
                <option>Select</option>
                <option>★★★★★ Excellent</option>
                <option>★★★★☆ Very Good</option>
                <option>★★★☆☆ Good</option>
                <option>★★☆☆☆ Fair</option>
                <option>★☆☆☆☆ Poor</option>
              </select>
            </div>

            {/* Q3 */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                3. Was the spice level as per your preference?
              </label>
              <div className="flex flex-wrap gap-4">
                {["Yes", "Too Spicy", "Less Spicy"].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input type="radio" name="spice" />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Q4 */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                4. How easy was it to use our website?
              </label>
              <div className="flex flex-wrap gap-4">
                {["Very Easy", "Easy", "Average", "Difficult"].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input type="radio" name="websiteEase" />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Q5 */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                5. Was your order delivered on time?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" name="delivery" /> Yes
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="delivery" /> No
                </label>
              </div>
            </div>

            {/* Q6 */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                6. How satisfied are you with our service?
              </label>
              <div className="flex flex-wrap gap-4">
                {["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied"].map(
                  (option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input type="radio" name="service" />
                      {option}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Q7 */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                7. Would you recommend our biryani to others?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" name="recommend" /> Yes
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="recommend" /> No
                </label>
              </div>
            </div>

            {/* Q8 */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                8. Any suggestions or comments?
              </label>
              <textarea
                rows="3"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] text-white py-3 rounded-md transition font-semibold"
            >
              Submit Feedback
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - IMAGES */}
        <div className="flex flex-col gap-6">
          <img
            src={feedback1}
            alt="Biryani offer"
            className="w-full h-[200px] sm:h-[260px] md:h-[320px] lg:h-[400px] rounded-lg shadow-md object-cover"
          />
          <img
            src={feedback2}
            alt="Special discount offer"
            className="w-full h-[200px] sm:h-[260px] md:h-[320px] lg:h-[400px] rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Feedback;
