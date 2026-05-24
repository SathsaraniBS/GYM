// src/pages/Course.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Gallery from '../components/Gallery';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Zap, ChevronRight, Check } from 'lucide-react';

function Course() {
  const navigate = useNavigate();
  const [activeClass, setActiveClass] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  const classes = [
    { title: "STRENGTH",  category: "WEIGHTLIFTING",   image: "/class-1.jpg", desc: "Build raw power with Olympic lifts and progressive overload programming." },
    { title: "CARDIO",    category: "INDOOR CYCLING",  image: "/class-2.jpg", desc: "High-energy cycling sessions that torch calories and boost endurance." },
    { title: "STRENGTH",  category: "KETTLEBELL POWER",image: "/class-3.jpg", desc: "Functional strength training using kettlebells for total body conditioning." },
    { title: "CARDIO",    category: "INDOOR CYCLING",  image: "/class-4.jpg", desc: "Interval-based cycling to maximize fat burn and cardiovascular health." },
    { title: "TRAINING",  category: "BOXING",          image: "/class-5.jpg", desc: "Combat fitness combining technique, speed, and explosive power." },
  ];

  const plans = [
    {
      title: "Gents Buddy Package",
      location: "MOORS",
      price: "Rs.110,000",
      period: "Annual",
      featured: false,
      features: [
        "Fully equipped gym",
        "Ladies Only Area",
        "Certified trainers",
        "Shower & Changing room",
        "Free meal plan & workout",
        "Body assessment",
        "Ample parking",
      ],
    },
    {
      title: "Buy 6 Get 6 Months",
      location: "JA ELA",
      price: "Rs.40,000",
      period: "6 Months",
      featured: true, // ✅ highlight this one
      features: [
        "Fully equipped gym",
        "Swimming pool, sauna & steam",
        "Certified trainers",
        "Access to all 4 branches",
        "In-house supplements store",
        "Shower & Changing room",
        "Free meal plan & workout",
        "Body assessment",
        "Ample parking",
      ],
    },
    {
      title: "Gents Buddy Package",
      location: "JA ELA",
      price: "Rs.85,000",
      period: "Annual",
      featured: false,
      features: [
        "Fully equipped gym",
        "Certified trainers",
        "Shower & Changing room",
        "Body assessment",
        "Ample parking",
      ],
    },
    {
      title: "Family Package",
      location: "COLOMBO 7",
      price: "Rs.160,000",
      period: "Annual",
      featured: false,
      features: [
        "Body assessment",
        "Free meal plan & workout",
        "In-house supplements store",
        "Shower & Changing room",
        "Certified trainers",
        "Fully equipped gym",
        "Swimming pool, sauna & steam",
      ],
    },
  ];

  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* ══════════════════════════════════════
          HERO — VoltIQ style video background
      ══════════════════════════════════════ */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        <video
          autoPlay loop muted playsInline
          poster="/video1-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ zIndex: 10, background: 'linear-gradient(105deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0.10) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ zIndex: 11, background: 'linear-gradient(to top, #000, transparent)' }} />

        <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16 pt-28 pb-20" style={{ zIndex: 60 }}>
          <div className="max-w-2xl">
           
            <h1 className="text-7xl md:text-8xl font-black text-white leading-none uppercase mb-5">
              Our<br /><span className="text-red-500">Courses</span>
            </h1>
            <p className="text-gray-300 italic text-xl mb-8 font-light border-l-2 border-red-600 pl-4">
              "Train harder. Push further. Live stronger."
            </p>
            <div className="flex items-center gap-8 mb-10">
              {[["5","Classes"],["4","Branches"],["50+","Trainers"]].map(([val, label], i) => (
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
              From Olympic lifting to high-intensity boxing — our programs are designed
              by certified professionals to deliver real, measurable results.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('classes').scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-900/50"
              >
                View Classes <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
              >
                See Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CLASSES — Professional grid
      ══════════════════════════════════════ */}
      <section id="classes" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">What We Offer</p>
              <h2 className="text-6xl md:text-7xl font-black uppercase leading-none">
                Our<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Classes</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed md:text-right">
              Every class is designed by certified coaches to push you beyond your limits.
            </p>
          </div>

          {/* Classes grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveClass(index)}
                onMouseLeave={() => setActiveClass(null)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: '4/3' }}
              >
                <img
                  src={cls.image}
                  alt={`${cls.title} - ${cls.category}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Default overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black/75 transition-opacity duration-500 ${activeClass === index ? 'opacity-100' : 'opacity-0'}`} />

                {/* Index */}
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="text-white/40 text-xs font-bold">0{index + 1}</span>
                </div>

                {/* Default bottom info */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${activeClass === index ? 'opacity-0 translate-y-3' : 'opacity-100'}`}>
                  <div className="w-6 h-0.5 bg-red-600 mb-3" />
                  <h3 className="text-2xl font-black text-white">{cls.title}</h3>
                  <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">{cls.category}</p>
                </div>

                {/* Hover info */}
                <div className={`absolute inset-0 flex flex-col justify-center p-8 transition-all duration-500 ${activeClass === index ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-3">{cls.category}</p>
                  <h3 className="text-3xl font-black text-white mb-4">{cls.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">{cls.desc}</p>
                  <button
                    onClick={() => navigate('/membership')}
                    className="self-start flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all duration-300"
                  >
                    Join Class <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <img src="/img3.jpg" alt="Fitness" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-8 md:px-16" style={{ zIndex: 10 }}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={14} className="text-red-500 fill-red-500" />
              <span className="text-red-500 font-bold uppercase tracking-[0.25em] text-xs">Limited Time</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black uppercase leading-none mb-6">
              Register<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Now</span><br />
              For Deals
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-md leading-relaxed">
              Where health, beauty and fitness meet. Join FitTrack today and unlock
              exclusive member benefits across all our branches.
            </p>
            <button
              onClick={() => navigate('/becomeamember')}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-5 rounded-full text-base uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-900/50"
            >
              Become A Member <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING PLANS — Professional cards
      ══════════════════════════════════════ */}
      <section id="plans" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Our Plans</p>
              <h2 className="text-6xl md:text-7xl font-black uppercase leading-none">
                Choose<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Your Plan</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed md:text-right">
              Flexible memberships designed to fit your lifestyle and fitness goals.
            </p>
          </div>

          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative rounded-2xl overflow-hidden flex flex-col transition-all duration-500 ${
                  plan.featured
                    ? 'border-2 border-red-600 bg-gray-950'
                    : hoveredPlan === index
                    ? 'border border-gray-600 bg-gray-950'
                    : 'border border-gray-800 bg-[#0a0a0a]'
                }`}
              >
                {/* Featured badge */}
                {plan.featured && (
                  <div className="bg-red-600 text-white text-xs font-black uppercase tracking-widest text-center py-2 px-4">
                    ★ Most Popular
                  </div>
                )}

                {/* Header */}
                <div className="p-8 border-b border-gray-800">
                  {/* Number */}
                  <span className="text-gray-800 text-5xl font-black">0{index + 1}</span>

                  <h3 className="text-lg font-black text-white mt-2 mb-1">{plan.title}</h3>
                  <p className="text-gray-600 text-xs uppercase tracking-widest mb-4">{plan.location}</p>

                  <div className="flex items-end gap-2">
                    <span className={`text-3xl font-black transition-colors duration-300 ${
                      plan.featured || hoveredPlan === index ? 'text-red-500' : 'text-white'
                    }`}>{plan.price}</span>
                  </div>
                  <p className="text-gray-600 text-xs uppercase tracking-widest mt-1">{plan.period}</p>
                </div>

                {/* Features */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                          plan.featured || hoveredPlan === index
                            ? 'bg-red-600/20 border border-red-600/40'
                            : 'bg-gray-800 border border-gray-700'
                        }`}>
                          <Check size={10} className={plan.featured || hoveredPlan === index ? 'text-red-500' : 'text-gray-600'} />
                        </div>
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate('/membership')}
                    className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 ${
                      plan.featured
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'border border-gray-700 hover:border-red-600 text-gray-400 hover:text-white hover:bg-red-600/10'
                    }`}
                  >
                    Enroll Now <ChevronRight size={14} />
                  </button>
                </div>

                {/* Bottom accent line on hover */}
                <div className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-500 ${
                  hoveredPlan === index || plan.featured ? 'w-full' : 'w-0'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Gallery />
      <Footer />
    </div>
  );
}

export default Course;