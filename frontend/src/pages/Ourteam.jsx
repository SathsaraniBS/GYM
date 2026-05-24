// src/pages/Ourteam.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaDumbbell, FaAppleAlt, FaClipboardList, FaHeart, FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, ArrowUpRight } from 'lucide-react';

function Ourteam() {
  const navigate = useNavigate();
  const [hoveredTrainer, setHoveredTrainer] = useState(null);

  const features = [
    {
      icon: FaDumbbell,
      title: "Modern Equipment",
      desc: "State-of-the-art fitness machines designed to optimize your workouts and maximize results.",
      stat: "200+",
      statLabel: "Machines",
    },
    {
      icon: FaAppleAlt,
      title: "Nutrition Plans",
      desc: "Expert-guided nutrition plans tailored to fuel your body and support your fitness journey.",
      stat: "50+",
      statLabel: "Meal Plans",
    },
    {
      icon: FaClipboardList,
      title: "Training Programs",
      desc: "Certified trainers create personalized workout plans to maximize your strength and progress.",
      stat: "30+",
      statLabel: "Programs",
    },
    {
      icon: FaHeart,
      title: "Personal Approach",
      desc: "Customized fitness solutions that adapt to your lifestyle, preferences, and personal goals.",
      stat: "100%",
      statLabel: "Dedicated",
    },
  ];

  const trainers = [
    {
      name: "Ayesh Ranasinghe",
      specialty: "Strength & Conditioning",
      qualification: "National Diploma (SLF)",
      experience: "8 Years",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&h=800&fit=crop",
      tags: ["Powerlifting", "HIIT", "Conditioning"],
    },
    {
      name: "Thumesh Almeda",
      specialty: "Physical Fitness",
      qualification: "NVQ Level 4",
      experience: "6 Years",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
      tags: ["Cardio", "Weight Loss", "Endurance"],
    },
    {
      name: "Dulshan Miyuranga",
      specialty: "Physical Fitness",
      qualification: "NVQ Level 4 — South Asian Academy",
      experience: "5 Years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
      tags: ["Yoga", "Flexibility", "Recovery"],
    },
  ];

  return (
    <div className="bg-black">
      <Navbar />

      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* ── Full Screen Background Video ── */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/video2-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 50 }}
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>

        {/* ── Left-side dark gradient overlay (like VoltIQ) ── */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 10,
            background: 'linear-gradient(105deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.15) 100%)',
          }}
        />

        {/* ── Bottom fade to black ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            zIndex: 11,
            background: 'linear-gradient(to top, #000 0%, transparent 100%)',
          }}
        />

        {/* ── HERO CONTENT (left aligned — like VoltIQ) ── */}
        <div
          className="relative w-full max-w-7xl mx-auto px-8 md:px-16 pt-30 pb-12"
          style={{ zIndex: 60 }}
        >
          <div className="max-w-xl">

            {/* Main Heading — huge, bold, left */}
            <h1 className="text-7xl md:text-8xl font-black text-white leading-[0.9] mb-5 uppercase">
              Meet the<br />
              <span className="text-red-500">Elite Team</span>
              
            </h1>

            {/* Italic tagline — like "Master the Modern Urban Jungle" */}
            <p className="text-white italic text-bold text-3xl mb-8 ">
              "We push limits, break barriers, and build strength together."
            </p>

            

            {/* Description — like VoltIQ's body text */}
            <p className="text-gray-300  leading-relaxed mb-10 max-w-md text-xl text-bold">
              World-class fitness experts dedicated to your transformation.
              Our certified trainers bring decades of experience to help you
              achieve your goals faster, stronger, and safer.
            </p>

            {/* CTA Buttons — like "Find Charging Station" + "Technical Specs" */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/membership')}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-4 rounded-full text-base transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-900/50"
              >
                Book a Session
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => {
                  document.getElementById('trainers-section').scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 border border-white/30 hover:border-white/70 text-white font-bold px-7 py-4 rounded-full text-base transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
              >
                <span className="w-5 h-5 rounded-full border border-white/50 flex items-center justify-center text-xs">▶</span>
                Meet The Trainers
              </button>
            </div>

          </div>
        </div>

        {/* Scroll line indicator */}
        <div
          className="absolute bottom-10 right-10 flex flex-col items-center gap-2 hidden md:flex"
          style={{ zIndex: 60 }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-400 to-transparent animate-pulse" />
          <span className="text-gray-500 text-[10px] uppercase tracking-widest rotate-90 mt-4">scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY CHOOSE US — Professional Redesign
          • Numbered cards with border accent
          • Stat callout per feature
          • Dark sophisticated look
      ══════════════════════════════════════ */}
      <section className="bg-black text-white py-32 px-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Why Choose Us</p>
              <h2 className="text-6xl md:text-7xl font-black uppercase leading-none text-white">
                Push Your<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>
                  Limits
                </span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed md:text-right">
              Everything we offer is engineered to deliver real, measurable results — not just motivation.
            </p>
          </div>

          {/* Feature Cards — horizontal numbered layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800 rounded-2xl overflow-hidden">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-black p-8 group hover:bg-gray-950 transition-all duration-500 relative overflow-hidden"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-6 text-7xl font-black text-gray-900 group-hover:text-gray-800 transition-colors select-none">
                  0{index + 1}
                </span>

                {/* Top accent line */}
                <div className="w-8 h-0.5 bg-red-600 mb-8 group-hover:w-16 transition-all duration-500" />

                {/* Icon */}
                <div className="mb-6">
                  <item.icon className="text-red-500 text-3xl" />
                </div>

                {/* Stat */}
                <div className="mb-4">
                  <span className="text-4xl font-black text-white">{item.stat}</span>
                  <span className="text-gray-500 text-xs uppercase tracking-widest ml-2">{item.statLabel}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>

                {/* Desc */}
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HEAD COACH
      ══════════════════════════════════════ */}
      <section className="bg-black text-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch gap-0 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-600/40 transition-all duration-500">
            {/* Left — Image */}
            <div className="md:w-2/5 relative overflow-hidden">
              <img
                src="https://www.shutterstock.com/image-photo/closeup-portrait-professional-bodybuilder-workout-600nw-368281814.jpg"
                alt="Alex Johnson"
                className="w-full h-full object-cover min-h-[400px] hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
              {/* Badge */}
              <div className="absolute top-6 left-6 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                Head Coach
              </div>
            </div>

            {/* Right — Content */}
            <div className="md:w-3/5 bg-gray-950 p-10 md:p-14 flex flex-col justify-center">
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Leading The Way</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
                Alex "The Rock" Johnson
              </h2>
              <p className="text-red-500 font-semibold mb-6 text-lg">Head of Performance • Powerlifting</p>

              <div className="flex gap-8 mb-8 border-y border-gray-800 py-6">
                {[["15+","Years Exp."],["500+","Athletes"],["3x","Champion"]].map(([val, label]) => (
                  <div key={label}>
                    <p className="text-white text-2xl font-black">{val}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-widest">{label}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-400 leading-relaxed mb-8">
                "Strength is a mindset." With over 15 years of competitive experience, Alex leads our elite programming division. Specialized in maximizing raw power and injury prevention through evidence-based training.
              </p>
              <button
                onClick={() => navigate('/membership')}
                className="self-start flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 text-sm uppercase tracking-wider"
              >
                Book a Session <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRAINERS — Professional Redesign
          • Large image, info overlay on hover
          • Tags / qualifications
          • Clean minimal card
      ══════════════════════════════════════ */}
      <section id="trainers-section" className="bg-black text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Team</p>
              <h2 className="text-6xl md:text-7xl font-black uppercase leading-none text-white">
                Train With<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>
                  Experts
                </span>
              </h2>
            </div>
            <button
              onClick={() => navigate('/membership')}
              className="self-start md:self-end flex items-center gap-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold px-8 py-4 rounded-full transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Book Appointment <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Trainer Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {trainers.map((trainer, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredTrainer(index)}
                onMouseLeave={() => setHoveredTrainer(null)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: '3/4' }}
              >
                {/* Image */}
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />

                {/* Default gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-500" />

                {/* Hover full overlay */}
                <div className={`absolute inset-0 bg-black/80 transition-opacity duration-500 ${hoveredTrainer === index ? 'opacity-100' : 'opacity-0'}`} />

                {/* Index number top-right */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="text-white/50 text-sm font-bold">0{index + 1}</span>
                </div>

                {/* Default bottom info */}
                <div className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 ${hoveredTrainer === index ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  <h3 className="text-2xl font-black text-white mb-1">{trainer.name}</h3>
                  <p className="text-red-500 text-sm font-semibold uppercase tracking-wider">{trainer.specialty}</p>
                </div>

                {/* Hover info */}
                <div className={`absolute inset-0 flex flex-col justify-center p-8 transition-all duration-500 ${hoveredTrainer === index ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">{trainer.specialty}</p>
                  <h3 className="text-3xl font-black text-white mb-2">{trainer.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{trainer.qualification}</p>
                  <p className="text-gray-500 text-xs mb-6">{trainer.experience} Experience</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {trainer.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-red-600/20 border border-red-600/30 text-red-400 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Social icons */}
                  <div className="flex gap-3">
                    {[FaEnvelope, FaFacebookF, FaInstagram].map((Icon, i) => (
                      <a key={i} href="#"
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 border border-white/10 flex items-center justify-center transition-all duration-300">
                        <Icon className="text-white w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Ourteam;