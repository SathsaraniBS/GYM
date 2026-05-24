// src/pages/Ourteam.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaDumbbell, FaAppleAlt, FaClipboardList, FaHeart, FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Ourteam() {
  const navigate = useNavigate();

  const features = [
    { icon: FaDumbbell,     title: "Modern Equipment",         desc: "Our gym is equipped with state-of-the-art fitness machines and tools, designed to optimize your workouts." },
    { icon: FaAppleAlt,     title: "Healthy Nutrition Plan",   desc: "Expert-guided nutrition plans tailored to fuel your body and support your fitness journey with balanced meals." },
    { icon: FaClipboardList,title: "Professional Training Plan",desc: "Certified trainers create personalized workout plans to maximize your strength, endurance, and progress." },
    { icon: FaHeart,        title: "Unique to Your Needs",     desc: "Customized fitness solutions that adapt to your lifestyle, preferences, and goals for a personal experience." },
  ];

  const trainers = [
    { name: "Ayesh Ranasinghe",  specialty: "National Diploma in Sports Strength & Conditioning (SLF)",          image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&h=800&fit=crop" },
    { name: "Thumesh Almeda",    specialty: "Physical Fitness Trainer (NVQ Level 4)",                            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop" },
    { name: "Dulshan Miyuranga", specialty: "Physical Fitness Trainer (NVQ Level 4 - South Asian Academy)",      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop" },
  ];

  return (
    <div className="bg-black">
      <Navbar />

      {/* ── Hero Section with Video Background ── */}
      <section className="min-h-screen relative flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/video2-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover z-60"
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto">
          <p className="text-red-500 text-xl font-bold uppercase tracking-widest mb-4">
            FitTrack Professionals
          </p>
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-tight mb-6">
            MEET THE<br />
            <span className="text-red-500">ELITE TEAM</span>
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            World-class experts dedicated to your transformation. We push limits,
            break barriers, and build strength together.
          </p>
          <button
            onClick={() => navigate('/membership')}
            className="mt-10 bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-full text-lg transition transform hover:scale-105"
          >
            BOOK A SESSION
          </button>
        </div>
      </section>

      {/* ── Head Coach Section ── */}
      <section className="bg-black text-white py-24 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-red-500 text-xl font-bold uppercase tracking-widest mb-4 text-center">
            Leading The Way
          </p>
          <h2 className="text-5xl font-black uppercase text-center mb-4">Head Coach</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-16" />

          <div className="bg-gray-900 rounded-3xl p-10 md:p-14 border border-gray-800 flex flex-col md:flex-row items-center gap-12">
            <img
              src="https://www.shutterstock.com/image-photo/closeup-portrait-professional-bodybuilder-workout-600nw-368281814.jpg"
              alt="Alex Johnson"
              className="w-64 h-64 rounded-2xl object-cover border-4 border-red-600 flex-shrink-0"
            />
            <div className="text-center md:text-left">
              <h3 className="text-4xl font-black text-white mb-2">Alex "The Rock" Johnson</h3>
              <p className="text-red-500 text-xl font-semibold mb-6">Head of Performance • Powerlifting</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                "Strength is a mindset." With over 15 years of competitive experience, Alex leads
                our elite programming division. Specialized in maximizing raw power and injury prevention.
              </p>
              <button
                onClick={() => navigate('/membership')}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-bold text-lg text-white transition transform hover:scale-105"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us Section ── */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500 text-xl font-bold uppercase tracking-widest mb-4">
            Why Choose Us?
          </p>
          <h1 className="text-5xl font-black uppercase mb-4">Push Your Limits Forward</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-gray-900 border border-gray-800 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300 group-hover:scale-110">
                  <item.icon className="text-3xl text-red-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trainers Section ── */}
      <section className="bg-black text-white py-24 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 text-xl font-bold uppercase tracking-widest mb-4">
            Our Team
          </p>
          <h1 className="text-5xl font-black uppercase mb-4">Train With Experts</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-16" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {trainers.map((trainer, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all duration-500 group"
              >
                {/* Trainer Image */}
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Red gradient overlay on bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent" />
                </div>

                {/* Trainer Info */}
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{trainer.name}</h3>
                  <p className="text-red-500 font-medium mb-6 text-sm">{trainer.specialty}</p>
                  <div className="flex justify-center gap-6">
                    <a href="#" aria-label="Email"     className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors duration-300">
                      <FaEnvelope className="text-gray-400 hover:text-white w-4 h-4" />
                    </a>
                    <a href="#" aria-label="Facebook"  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors duration-300">
                      <FaFacebookF className="text-gray-400 hover:text-white w-4 h-4" />
                    </a>
                    <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors duration-300">
                      <FaInstagram className="text-gray-400 hover:text-white w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/membership')}
            className="mt-16 bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-5 rounded-full shadow-2xl shadow-red-900/30 transform hover:scale-105 transition duration-300"
          >
            Book Appointment
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Ourteam;