import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCamera,
} from "react-icons/fa";

const Profile = () => {
  return (
 <div className="bg-gray-100  px-4 pt-4 pb-2">
  <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">

    {/* Top Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

      {/* Profile Upload */}
      <div className="flex flex-col items-center">

        <div className="relative">

          <div className="w-32 h-32 rounded-full border-2 border-dashed border-[var(--color-primary)] bg-[#FFF8E6] flex items-center justify-center">

            <FaUser
              size={55}
              className="text-[var(--color-primary)]"
            />

          </div>

          <label className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center cursor-pointer hover:scale-105 transition shadow-lg">

            <FaCamera size={16} />

            <input
              type="file"
              accept="image/*"
              className="hidden"
            />

          </label>

        </div>

        <p className="mt-3 font-semibold text-[var(--color-secondary)]">
          Upload Photo
        </p>

        <span className="text-xs text-gray-500">
          JPG, PNG (Max 2MB)
        </span>

      </div>

      {/* Name */}
      <div className="md:col-span-2">

        <label className="block font-semibold mb-2">
          Name
        </label>

        <div className="flex items-center h-12 border-2 border-[var(--color-primary)] rounded-xl px-4">

          <FaUser className="text-[var(--color-secondary)] mr-3" />

          <input
            type="text"
            placeholder="Enter your full name"
            className="flex-1 outline-none bg-transparent"
          />

        </div>

      </div>

    </div>

    {/* Mobile & Email */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

      <div>

        <label className="block font-semibold mb-2">
          Mobile Number
        </label>

        <div className="flex items-center h-12 border-2 border-[var(--color-primary)] rounded-xl px-4">

          <FaPhoneAlt className="text-[var(--color-secondary)] mr-3" />

          <input
            type="tel"
            placeholder="Enter mobile number"
            className="flex-1 outline-none bg-transparent"
          />

        </div>

      </div>

      <div>

        <label className="block font-semibold mb-2">
          Email
        </label>

        <div className="flex items-center h-12 border-2 border-[var(--color-primary)] rounded-xl px-4">

          <FaEnvelope className="text-[var(--color-secondary)] mr-3" />

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 outline-none bg-transparent"
          />

        </div>

      </div>

    </div>

    {/* Address */}

    <div className="mt-6">

      <label className="block font-semibold mb-2">
        Address
      </label>

      <div className="flex border-2 border-[var(--color-primary)] rounded-xl px-4 py-3">

        <FaMapMarkerAlt className="text-[var(--color-secondary)] mt-1 mr-3" />

        <textarea
          rows={3}
          placeholder="Enter your address"
          className="flex-1 resize-none outline-none bg-transparent"
        />

      </div>

    </div>

    {/* Submit Button */}

    <div className="flex justify-center mt-8">

      <button className="bg-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-black text-white font-semibold px-12 py-3 rounded-xl transition-all duration-300 shadow-md">
        Submit
      </button>

    </div>

  </div>
</div>
  );
};

export default Profile;
