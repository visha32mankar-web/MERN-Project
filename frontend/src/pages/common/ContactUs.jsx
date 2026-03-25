import React from "react";

const ContactUs = () => {
  return (
   <section className="min-h-screen bg-gray-100 px-4 md:px-12 lg:px-24 pt-16 pb-0">
{/* PAGE TITLE */}
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Contact Us
      </h2>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT CONTAINER - MAP */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="h-[400px] md:h-full">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Delhi,India&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* RIGHT CONTAINER - CONTACT FORM */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h3>

          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full    
                        bg-[var(--color-secondary)]
                        hover:bg-[var(--color-primary)] 
                        text-white 
                        hover:text-[var(--color-secondary)]
                        py-3 
                        rounded-md  
                        transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
