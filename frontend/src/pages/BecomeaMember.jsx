// src/pages/BecomeaMember.jsx
import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Clock, User, Dumbbell, Users, Check } from 'lucide-react';

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

  const features = [
    { icon: Clock, title: "24/7 Access", desc: "Workout on your schedule, anytime, day or night." },
    { icon: User, title: "Personal Training", desc: "Get guidance from our certified expert trainers." },
    { icon: Dumbbell, title: "State-of-the-Art Equipment", desc: "Top-tier machines and free weights for every workout." },
    { icon: Users, title: "Supportive Community", desc: "Join a motivating and friendly fitness family." },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 z-10"></div>
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
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition duration-300">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <div key={i} className="bg-gray-900/50 backdrop-blur border border-red-900/30 rounded-2xl p-8 text-center hover:border-red-600 transition group">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Perfect Plan</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-gray-900/80 backdrop-blur border-2 ${index === 1 ? 'border-orange-500 scale-105 shadow-2xl' : 'border-gray-700'} rounded-3xl p-8 text-center hover:border-red-600 transition-all duration-300`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
              <div className="text-6xl font-black text-orange-500 mb-8">
                {plan.price}
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center justify-center gap-3">
                    <Check className="w-6 h-6 text-green-400" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-xl font-bold text-lg shadow-xl transform hover:scale-105 transition">
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
            <input type="text" placeholder="Full Name" className="w-full mb-4 px-6 py-4 bg-gray-800/70 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none text-white placeholder-gray-400" />
            <input type="email" placeholder="Email address" className="w-full mb-4 px-6 py-4 bg-gray-800/70 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none text-white placeholder-gray-400" />
            <input type="tel" placeholder="Phone Number" className="w-full mb-8 px-6 py-4 bg-gray-800/70 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none text-white placeholder-gray-400" />
            <button className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-xl font-bold text-xl shadow-xl transform hover:scale-105 transition">
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