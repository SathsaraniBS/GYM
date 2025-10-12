import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';

function Course() {
  const classes = [
    { title: "STRENGTH", category: "WEIGHTLIFTING", image: "/class-1.jpg" },
    { title: "CARDIO", category: "INDOOR CYCLING", image: "/class-2.jpg" },
    { title: "STRENGTH", category: "KETTLEBELL POWER", image: "/class-3.jpg" },
    { title: "CARDIO", category: "INDOOR CYCLING", image: "/class-4.jpg" },
    { title: "TRAINING", category: "BOXING", image: "/class-5.jpg" },
  ];

  const plans = [
    {
      title: "Class drop-in",
      price: "$39.0",
      features: ["Free riding", "Unlimited equipments", "Personal trainer", "Weight losing classes", "Month to month", "No time restriction"],
    },
    {
      title: "12 Month unlimited",
      price: "$99.0",
      features: ["Free riding", "Unlimited equipments", "Personal trainer", "Weight losing classes", "Month to month", "No time restriction"],
    },
    {
      title: "6 Month unlimited",
      price: "$59.0",
      features: ["Free riding", "Unlimited equipments", "Personal trainer", "Weight losing classes", "Month to month", "No time restriction"],
    },
  ];

  return (
    <div className="bg-gray-100">
      <Navbar />
      <section className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply z-10"></div>
        <div className="relative z-20">
          {/* Add content here if needed */}
        </div>
      </section>
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto py-10">
          <h1 className="text-xl font-bold text-center text-orange-500 mb-6">OUR CLASSES</h1>
          <h2 className="text-2xl font-bold text-center mb-10">WHAT WE CAN OFFER</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto px-4">
            {classes.map((cls, index) => (
              <div
                key={index}
                className="bg-gray-800 shadow-lg overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-xl">
                <img
                  src={cls.image}
                  alt={`${cls.title} - ${cls.category} class`}
                  className="object-cover w-full h-64 transition-transform duration-300 hover:scale-110"
                />
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-orange-500">{cls.title}</h3>
                    <p className="text-gray-400">{cls.category}</p>
                  </div>
                  <button className="bg-gray-800 text-white p-2 rounded transition-colors duration-300 hover:bg-gray-700">&gt;</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-6 relative">
        <img
          src="/img3.jpg" // Must be in public folder
          alt="Fitness workout"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">REGISTRATION NOW TO GET MORE DEALS</h1>
          <p className="text-lg md:text-xl mb-6">where health, beauty and fitness meet.</p>
          <button className="bg-orange-500 text-white font-semibold py-2 px-6 rounded hover:bg-orange-600">
            APPOINTMENT
          </button>
        </div>
      </div>
      <div className="bg-black min-h-screen flex flex-col items-center justify-center py-10 px-4">
        <div className="text-center">
          <h2 className="text-orange-500 text-lg font-bold mb-2">OUR PLAN</h2>
          <h1 className="text-white text-4xl font-bold">CHOOSE YOUR PRICING PLAN</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-5xl">
          {plans.map((plan, index) => (
            <div key={index} className="bg-black rounded-lg p-6 shadow-lg text-white border-2 border-orange-500 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-4xl font-bold text-orange-500 mb-6">{plan.price}<span className="text-base font-normal"> SINGLE CLASS</span></p>
              <ul className="text-gray-400 space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="w-full bg-black border-2 border-orange-500 text-white py-2 rounded hover:bg-orange-500 transition-colors duration-300">
                ENROLL NOW
              </button>
            </div>
          ))}
        </div>
      </div>
      <Gallery />
      <Footer />
    </div>
  );
}

export default Course;