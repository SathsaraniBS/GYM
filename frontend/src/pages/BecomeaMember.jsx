// src/pages/BecomeaMember.jsx
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function BecomeaMember() {
  
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
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 z-10"></div>
        <div className="bg-gray-900 w-full h-full absolute inset-0 opacity-60"></div>
        <img 
          src="" 
          alt="Gym hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Unlock Your Potential.
            <br />
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Become a Member Today.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join a community dedicated to helping you achieve your fitness goals and 
            become your strongest self.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-10 py-5 rounded-full shadow-2xl transform hover:scale-105 transition duration-300">
            Choose Your Plan
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">More Than a Membership.</h2>
          <p className="text-xl text-gray-400">Discover the benefits that set our gym apart from the rest.</p>
        </div>

        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            { icon: "Clock", title: "24/7 Access", desc: "Workout on your schedule, anytime, day or night." },
            { icon: "User", title: "Personal Training", desc: "Get guidance from our certified expert trainers." },
            { icon: "Dumbbell", title: "State-of-the-Art Equipment", desc: "Top-tier machines and free weights for every workout." },
            { icon: "Users", title: "Supportive Community", desc: "Join a motivating and friendly fitness family." },
          ].map((feature, i) => (
            <div key={i} className="bg-gray-900/50 backdrop-blur border border-red-900/30 rounded-2xl p-8 text-center hover:border-red-600 transition">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div> */}
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Fit</h2>
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
              <button className="w-full bg-black bg-transparent border-2 border-red-500 text-lg font-semibold text-white py-2 rounded hover:bg-red-500 transition-colors duration-300">
                ENROLL NOW
              </button>
            </div>
          ))}
        </div>
        
          
      
      </section>

      {/* Join Steps */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Join the Family in 3 Easy Steps</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-xl">1</div>
              <span className="text-xl">Your Details</span>
            </div>
            <div className="hidden md:block w-24 h-1 bg-gray-700"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xl text-gray-400">2</div>
              <span className="text-xl text-gray-400">Choose Plan</span>
            </div>
            <div className="hidden md:block w-24 h-1 bg-gray-700"></div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xl text-gray-400">3</div>
              <span className="text-xl text-gray-400">Payment</span>
            </div>
          </div>

          <div className="bg-gray-900/70 backdrop-blur border border-red-900/30 rounded-3xl p-10 max-w-2xl mx-auto">
            <input type="text" placeholder="Full Name" className="w-full mb-4 px-6 py-4 bg-gray-800/70 rounded-xl border  focus:outline-none text-white placeholder-gray-400" />
            <input type="email" placeholder="Email address" className="w-full mb-4 px-6 py-4 bg-gray-800/70 rounded-xl  focus:outline-none text-white placeholder-gray-400" />
            <input type="tel" placeholder="Phone Number" className="w-full mb-8 px-6 py-4 bg-gray-800/70 rounded-xl  focus:outline-none text-white placeholder-gray-400" />
            <button className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-xl font-bold text-xl ">
              Continue to Plan Selection
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default BecomeaMember;