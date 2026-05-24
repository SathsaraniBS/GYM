// src/pages/About.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaDumbbell, FaAppleAlt, FaClipboardList, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Zap } from 'lucide-react';

const carouselStyle = `
  @keyframes infiniteScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .carousel-track {
    display: flex;
    width: max-content;
    animation: infiniteScroll 40s linear infinite;
  }
  .carousel-track:hover { animation-play-state: paused; }
`;

function About() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(null); // ✅ null — no card active by default

  const teamMembers = [
    { id: 1, image: "/img5.jpg", name: "Alex Rivera",   role: "Head Trainer" },
    { id: 2, image: "/img6.jpg", name: "Samantha Lee",  role: "Nutrition Specialist" },
    { id: 3, image: "/img7.jpg", name: "Marcus Chen",   role: "Strength Coach" },
    { id: 4, image: "/img8.jpg", name: "Emma Watson",   role: "Yoga Instructor" },
    { id: 5, image: "/img4.jpg", name: "Daniel Brooks", role: "Fitness Director" },
  ];

  const features = [
    {
      icon: FaDumbbell,
      title: "Modern Equipment",
      stat: "200+", statLabel: "Machines",
      desc: "Our gym is equipped with the latest state-of-the-art fitness machines and technology, designed to deliver maximum performance and safety for every fitness level.",
    },
    {
      icon: FaAppleAlt,
      title: "Nutrition Plans",
      stat: "50+", statLabel: "Meal Plans",
      desc: "We go beyond the gym floor. With FitTrack meal plans, you'll get nutritious, ready-to-follow food guidance that fuels performance and supports lasting health.",
    },
    {
      icon: FaClipboardList,
      title: "Training Programs",
      stat: "30+", statLabel: "Programs",
      desc: "Our certified trainers create structured, results-driven programs that help you train smarter, not harder — from strength and conditioning to fat loss and endurance.",
    },
    {
      icon: FaHeart,
      title: "Personal Approach",
      stat: "100%", statLabel: "Dedicated",
      desc: "Your fitness journey is personal, and so is our approach. Everything we offer is uniquely crafted to match your individual needs and help you reach your goals faster.",
    },
  ];

  const stats = [
    { number: "15+",    label: "Years Experience" },
    { number: "5,000+", label: "Happy Members"    },
    { number: "50+",    label: "Expert Trainers"  },
    { number: "3",      label: "Branches"         },
  ];

  return (
    <div className="bg-black">
      <style>{carouselStyle}</style>
      <Navbar />

      {/* ── Hero ── */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/a3.jpg')] bg-center bg-cover bg-no-repeat" style={{ zIndex: 0 }} />
        <div className="absolute inset-0" style={{ zIndex: 10, background: 'linear-gradient(105deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.10) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ zIndex: 11, background: 'linear-gradient(to top, #000, transparent)' }} />

        <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16 pt-28 pb-20" style={{ zIndex: 60 }}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={14} className="text-red-500 fill-red-500" />
              <span className="text-red-500 font-bold uppercase tracking-[0.25em] text-xs">Since 2010</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black text-white leading-none uppercase mb-5">
              About<br /><span className="text-red-500">FitTrack</span>
            </h1>
            <p className="text-gray-300 italic text-xl mb-8 font-light border-l-2 border-red-600 pl-4">
              "More than a gym — a community built on strength."
            </p>
            <div className="flex items-center gap-8 mb-10">
              {[["2010","Founded"],["3","Branches"],["50+","Trainers"]].map(([val, label], i) => (
                <React.Fragment key={i}>
                  {i !== 0 && <div className="w-px h-10 bg-gray-700" />}
                  <div>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold">{label}</p>
                    <p className="text-white text-2xl font-black">{val}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-md">
              Forging stronger bodies and sharper minds since 2010. We are a community
              dedicated to empowering individuals to achieve their fitness goals through
              personalized training and cutting-edge facilities.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/becomeamember')}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-900/50"
              >
                Join Us Today <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => document.getElementById('mission').scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
              >
                Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section id="mission" className="bg-black text-white py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">Our Purpose</p>
            <h2 className="text-6xl font-black uppercase leading-none mb-8">
              Our<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Mission</span>
            </h2>
            <div className="w-12 h-0.5 bg-red-600 mb-8" />
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              At FitTrack, our mission is to empower individuals to achieve their fitness goals
              through personalized training, cutting-edge facilities, and a supportive community.
            </p>
            <p className="text-gray-500 leading-relaxed">
              We believe in fostering a culture of health and wellness, where every member feels
              motivated and inspired to reach their full potential — regardless of where they start.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-12 relative overflow-hidden hover:border-gray-700 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-600 rounded-l-2xl" />
              <span className="text-gray-800 text-8xl font-black leading-none absolute top-4 left-8">"</span>
              <p className="text-white text-2xl font-bold leading-relaxed relative z-10 mt-8 mb-8">
                We don't just build bodies. We build confidence, discipline, and a lifelong
                commitment to health.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center">
                  <FaDumbbell className="text-red-500 text-lg" />
                </div>
                <div>
                  <p className="text-white font-bold">FitTrack Philosophy</p>
                  <p className="text-gray-500 text-sm">Est. 2010</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section
        className="relative py-32 px-6 overflow-hidden"
        style={{ backgroundImage: "url('/ab2.avif')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/92" />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Why Choose Us</p>
              <h2 className="text-6xl md:text-7xl font-black uppercase leading-none text-white">
                Push Your<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Limits</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed md:text-right">
              Everything we offer is engineered to deliver real, measurable results — not just motivation.
            </p>
          </div>

          {/* ✅ Feature cards — hover only, no default active red */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800/50 rounded-2xl overflow-hidden">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                onMouseLeave={() => setActiveFeature(null)}
                className={`p-8 cursor-pointer relative overflow-hidden transition-all duration-500 ${
                  activeFeature === index
                    ? 'bg-gray-900 border-t-2 border-red-600'   // ✅ Subtle highlight — NOT full red
                    : 'bg-[#0a0a0a] hover:bg-gray-900'
                }`}
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-6 text-7xl font-black select-none text-gray-900">
                  0{index + 1}
                </span>

                {/* ✅ Accent line — red only on hover */}
                <div className={`h-0.5 mb-8 transition-all duration-500 ${
                  activeFeature === index ? 'w-16 bg-red-600' : 'w-8 bg-gray-700'
                }`} />

                {/* Icon */}
                <feature.icon className={`text-3xl mb-6 transition-colors duration-300 ${
                  activeFeature === index ? 'text-red-500' : 'text-gray-600'
                }`} />

                {/* Stat */}
                <div className="mb-4">
                  <span className="text-4xl font-black text-white">{feature.stat}</span>
                  <span className={`text-xs uppercase tracking-widest ml-2 transition-colors ${
                    activeFeature === index ? 'text-red-400' : 'text-gray-600'
                  }`}>{feature.statLabel}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>

                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  activeFeature === index ? 'text-gray-300' : 'text-gray-600'
                }`}>{feature.desc}</p>

                {/* Bottom red line on hover */}
                <div className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-500 ${
                  activeFeature === index ? 'w-full' : 'w-0'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-black border-t border-b border-gray-800 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center py-8 group hover:bg-gray-950 transition-colors duration-300 ${
                i !== stats.length - 1 ? 'border-r border-gray-800' : ''
              }`}
            >
              {/* ✅ Stat numbers — white not red */}
              <h2 className="text-5xl md:text-6xl font-black text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                {stat.number}
              </h2>
              <div className="w-8 h-0.5 bg-red-600 mx-auto mb-3" />
              <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team Carousel ── */}
      <section className="bg-black text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Team</p>
              <h2 className="text-6xl md:text-7xl font-black uppercase leading-none text-white">
                Train With<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Experts</span>
              </h2>
            </div>
            <button
              onClick={() => navigate('/membership')}
              className="self-start md:self-end flex items-center gap-2 border border-gray-700 hover:border-red-600 text-gray-400 hover:text-white font-bold px-8 py-4 rounded-full transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Book Appointment <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="overflow-hidden">
            <div className="carousel-track">
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <div key={`${member.id}-${index}`} className="flex-shrink-0 w-72 mx-4">
                  <div
                    className="group relative rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-500"
                    style={{ aspectRatio: '3/4' }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {/* Red accent line */}
                      <div className="w-6 h-0.5 bg-red-600 mb-3 group-hover:w-12 transition-all duration-500" />
                      <h3 className="text-xl font-black text-white">{member.name}</h3>
                      <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;