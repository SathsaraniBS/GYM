// src/pages/About.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaDumbbell, FaAppleAlt, FaClipboardList, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// ✅ Carousel CSS — moved out of JSX to App.css is better,
//    but kept here as a style tag (removed invalid "jsx" attribute)
const carouselStyle = `
  @keyframes infiniteScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .carousel-track {
    display: flex;
    width: max-content;
    animation: infiniteScroll 40s linear infinite;
  }
  .carousel-track:hover {
    animation-play-state: paused;
  }
`;

function About() {
  const navigate = useNavigate();

  const teamMembers = [
    { id: 1, image: "/img5.jpg", name: "Alex Rivera",    role: "Head Trainer" },
    { id: 2, image: "/img6.jpg", name: "Samantha Lee",   role: "Nutrition Specialist" },
    { id: 3, image: "/img7.jpg", name: "Marcus Chen",    role: "Strength Coach" },
    { id: 4, image: "/img8.jpg", name: "Emma Watson",    role: "Yoga Instructor" },
    { id: 5, image: "/img4.jpg", name: "Daniel Brooks",  role: "Fitness Director" },
  ];

  const features = [
    {
      icon: FaDumbbell,
      title: "Modern Equipment",
      desc: "Our gym is equipped with the latest state-of-the-art fitness machines and technology, designed to deliver maximum performance and safety. Whether you're strength training or doing cardio, our equipment supports every fitness level and goal.",
    },
    {
      icon: FaAppleAlt,
      title: "Healthy Nutrition Plan",
      desc: "We go beyond the gym floor. With FitTrack meal plans, you'll get nutritious, ready-to-follow food guidance that fuels performance and supports lasting health — because what you eat matters.",
    },
    {
      icon: FaClipboardList,
      title: "Professional Training Plan",
      desc: "Our certified trainers create structured, results-driven programs that help you train smarter, not harder. From strength and conditioning to fat loss and endurance, we've got the perfect plan for you.",
    },
    {
      icon: FaHeart,
      title: "Unique to Your Needs",
      desc: "Your fitness journey is personal, and so is our approach. From training plans to meal programs, everything we offer is uniquely crafted to match your individual needs and help you reach your goals faster.",
    },
  ];

  return (
    // ✅ Fixed: was bg-gray-100 — changed to bg-black to match theme
    <div className="bg-black">
      <style>{carouselStyle}</style>
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="min-h-screen relative bg-[url('/a3.jpg')] bg-black/80 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center text-white max-w-4xl mx-auto">
          {/* Red accent line */}
          <p className="text-red-500 text-xl font-bold uppercase tracking-widest mb-4">
            Who We Are
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight uppercase mb-6">
            ABOUT US
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
            Forging stronger bodies and sharper minds since 2010. We are more than a gym —
            we are a community dedicated to empowering individuals to achieve their fitness goals.
          </p>
          <button
            onClick={() => navigate('/becomeamember')}
            className="mt-10 bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-4 rounded-full text-lg transition transform hover:scale-105"
          >
            JOIN US TODAY
          </button>
        </div>
      </section>

      {/* ── Mission Section ── */}
      <section className="bg-black text-white py-24 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-500 text-xl font-bold uppercase tracking-widest mb-4">
            Our Purpose
          </p>
          <h2 className="text-5xl font-black uppercase mb-8">Our Mission</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-10"></div>
          <p className="text-xl text-gray-300 leading-relaxed">
            At FitTrack, our mission is to empower individuals to achieve their fitness goals
            through personalized training, cutting-edge facilities, and a supportive community.
            We believe in fostering a culture of health and wellness, where every member feels
            motivated and inspired to reach their full potential.
          </p>
        </div>
      </section>

      {/* ── Why Choose Us Section ── */}
      <section className="relative bg-[url('/ab2.avif')] bg-center bg-cover bg-no-repeat py-32 px-6">
        <div className="absolute inset-0 bg-black/85"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <p className="text-red-500 text-xl font-bold uppercase tracking-widest mb-4">
            Why Choose Us?
          </p>
          <h1 className="text-5xl lg:text-6xl font-black text-white uppercase mb-4">
            Push Your Limits Forward
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black/60 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-800 hover:border-red-600 transition-all duration-300 group"
              >
                <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 transition-all duration-300">
                  <feature.icon className="text-red-500 text-4xl group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="bg-red-600 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { number: "15+", label: "Years Experience" },
            { number: "5000+", label: "Happy Members" },
            { number: "50+", label: "Expert Trainers" },
            { number: "3", label: "Branches" },
          ].map((stat, i) => (
            <div key={i}>
              <h2 className="text-5xl font-black mb-2">{stat.number}</h2>
              <p className="text-red-100 font-semibold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Team Section ── */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500 text-xl font-bold uppercase tracking-widest mb-4">
            Our Team
          </p>
          <h1 className="text-5xl font-black uppercase mb-4">Train With Experts</h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-16"></div>

          {/* ✅ Fixed: removed invalid jsx attribute from style tag */}
          <div className="overflow-hidden">
            <div className="carousel-track">
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <div key={`${member.id}-${index}`} className="flex-shrink-0 w-72 mx-6">
                  <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 hover:border-red-600 transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-red-500 mt-1 font-semibold">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/membership')}
            className="mt-14 bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-4 rounded-full text-xl transition transform hover:scale-105 shadow-lg shadow-red-900/30"
          >
            Book Appointment
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;