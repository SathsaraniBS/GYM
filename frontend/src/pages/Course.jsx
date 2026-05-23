// src/pages/Course.jsx

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import { useNavigate } from 'react-router-dom';

function Course() {
  const navigate = useNavigate();

  const classes = [
    { title: "STRENGTH", category: "WEIGHTLIFTING", image: "/class-1.jpg" },
    { title: "CARDIO", category: "INDOOR CYCLING", image: "/class-2.jpg" },
    { title: "STRENGTH", category: "KETTLEBELL POWER", image: "/class-3.jpg" },
    { title: "CARDIO", category: "INDOOR CYCLING", image: "/class-4.jpg" },
    { title: "TRAINING", category: "BOXING", image: "/class-5.jpg" },
  ];

  const plans = [
    {
      title: "Gents Buddy Package",
      location: "MOORS",
      price: "Rs.110,000",
      features: [
        "Fully equipped gym",
        "Ladies Only Area",
        "Certified trainers",
        "Shower & Changing room facilities",
        "Free meal plan & workout schedules",
        "Body assessment",
        "Ample parking",
      ],
    },
    {
      title: "Buy 6 Months Get 6 Months",
      location: "JA ELA",
      price: "Rs.40,000",
      features: [
        "Fully equipped gym",
        "Swimming pool, sauna & steam room",
        "Certified trainers",
        "Access to all 4 branches",
        "In-house supplements store",
        "Shower & Changing room facilities",
        "Free meal plan & workout schedules",
        "Body assessment",
        "Ample parking",
      ],
    },
    {
      title: "Gents Buddy Package",
      location: "JA ELA",
      price: "Rs.85,000",
      features: [
        "Fully equipped gym",
        "Certified trainers",
        "Shower & Changing room facilities",
        "Body assessment",
        "Ample parking",
      ],
    },
    {
      title: "Family Package",
      location: "COLOMBO 7",
      price: "Rs.160,000",
      features: [
        "Body assessment",
        "Free meal plan & workout schedules",
        "In-house supplements store",
        "Shower & Changing room facilities",
        "Certified trainers",
        "Fully equipped gym",
        "Swimming pool, sauna & steam room",
      ],
    },
  ];

  return (
    <div className="bg-black">
      <Navbar />

      {/* Hero Video Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/video1-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">OUR COURSES</h1>
          <p className="text-xl md:text-2xl text-gray-300">Train harder. Live stronger.</p>
        </div>
      </section>

      {/* Classes Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <p className="text-red-500 text-xl font-bold text-center uppercase mb-2">What We Offer</p>
          <h1 className="text-5xl font-bold text-center mb-12">OUR CLASSES</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto">
            {classes.map((cls, index) => (
              <div
                key={index}
                className="bg-gray-900 shadow-lg overflow-hidden rounded-xl group"
              >
                <div className="overflow-hidden">
                  <img
                    src={cls.image}
                    alt={`${cls.title} - ${cls.category}`}
                    className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-red-500">{cls.title}</h3>
                    <p className="text-gray-400">{cls.category}</p>
                  </div>
                  <button
                    className="border-2 border-red-500 text-white font-bold w-10 h-10 rounded flex items-center justify-center transition-colors duration-300 hover:bg-red-500"
                    aria-label={`View ${cls.title}`}
                  >
                    &rsaquo;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center text-white">
        <img
          src="/img3.jpg"
          alt="Fitness workout"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            REGISTER NOW TO GET MORE DEALS
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Where health, beauty and fitness meet.
          </p>
          <button
            onClick={() => navigate('/becomeamember')}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full text-lg transition transform hover:scale-105"
          >
            BECOME A MEMBER
          </button>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="bg-black py-20 px-4">
        <div className="text-center mb-14">
          <p className="text-red-500 text-xl font-bold uppercase mb-2">Our Plans</p>
          <h1 className="text-white text-4xl md:text-5xl font-bold">CHOOSE YOUR PRICING PLAN</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl flex flex-col border-2 border-red-800 hover:border-red-500 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Title & Price */}
              <div className="p-8 text-center border-b border-gray-800">
                <h2 className="text-xl font-bold text-white mb-2">{plan.title}</h2>
                {plan.location && (
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    {plan.location}
                  </p>
                )}
                <p className="text-2xl font-bold text-red-500">{plan.price}</p>
              </div>

              {/* Features */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <ul className="space-y-3 text-gray-300">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/membership')}
                  className="mt-8 w-full border-2 border-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-500 transition-colors duration-300"
                >
                  ENROLL NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Gallery />
      <Footer />
    </div>
  );
}

export default Course;