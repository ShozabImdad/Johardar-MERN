import React from "react";
import { FaCalendarAlt, FaHandshake, FaPenNib, FaRegSmile } from "react-icons/fa";

const WJExperience = () => {
  const steps = [
    {
      icon: <FaCalendarAlt size={60} className="text-gray-800" />, // Larger size for exact look
      title: "Book an Appointment",
    },
    {
      icon: <FaHandshake size={60} className="text-gray-800" />,
      title: "Meet with our Designer",
    },
    {
      icon: <FaPenNib size={60} className="text-gray-800" />,
      title: "Finalize your Design",
    },
    {
      icon: <FaRegSmile size={60} className="text-gray-800" />,
      title: "Enjoy the Eternal Memories",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center border-t-2 border-gray-700 pt-6 mb-10">
          <h2 className="text-4xl font-semibold tracking-wide text-gray-800">
            THE JJ EXPERIENCE
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-800">{step.title}</h3>
            </div>
          ))}
        </div>

        {/* Book Appointment Button */}
        <div className="text-center mt-12">
          <button className="py-3 px-8 border border-gray-800 text-gray-800 font-semibold text-lg tracking-wide transition hover:bg-gray-800 hover:text-white">
            BOOK APPOINTMENT
          </button>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-0 w-40 h-40 bg-cover bg-no-repeat opacity-30" style={{ backgroundImage: `url('/path-to-left-floral.png')` }}></div>
        <div className="absolute bottom-10 right-0 w-40 h-40 bg-cover bg-no-repeat opacity-30" style={{ backgroundImage: `url('/path-to-right-floral.png')` }}></div>
      </div>
    </section>
  );
};

export default WJExperience;
