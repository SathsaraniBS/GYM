// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Zap, ChevronDown } from 'lucide-react';

function Hero() {
  const navigate = useNavigate();
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { value: "5,000+", label: "Active Members"   },
    { value: "50+",    label: "Expert Trainers"  },
    { value: "15+",    label: "Years Experience" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative flex items-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/h1_hero.png')] bg-center bg-cover bg-no-repeat"
        style={{ zIndex: 0 }}
      />

      {/* Left dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 10,
          background: 'linear-gradient(105deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.82) 55%, rgba(0,0,0,0.20) 100%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ zIndex: 11, background: 'linear-gradient(to top, #000, transparent)' }}
      />

      {/* Left red accent line */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" style={{ zIndex: 15 }} />

      {/* ── HERO CONTENT ── */}
      <div
        className="relative w-full max-w-7xl mx-auto px-10 md:px-20 py-32"
        style={{ zIndex: 60 }}
      >
        <div className="max-w-xl">

          {/* Badge */}
          <div className="flex items-center gap-2 mb-5">
            <Zap size={13} className="text-red-500 fill-red-500" />
            <span className="text-red-500 font-bold uppercase tracking-[0.25em] text-xs">
              Lifetime Fitness • Est. 2010
            </span>
          </div>

          {/* ✅ Fix: reduced font size so all content fits on screen */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none uppercase mb-5">
            Unleash<br />
            Your<br />
            <span className="text-red-500">Inner</span><br />
            Strength
          </h1>

          {/* Tagline */}
          <p className="text-gray-300 italic text-base mb-6 font-light border-l-2 border-red-600 pl-4">
            "Getting in shape isn't hard when you're in a supportive environment."
          </p>

          {/* Stats row */}
          <div className="flex items-center mb-6">
            {stats.map((stat, i) => (
              <React.Fragment key={i}>
                {i !== 0 && <div className="w-px h-8 bg-gray-700 mx-5" />}
                <div className={`transition-all duration-500 ${currentStat === i ? 'opacity-100' : 'opacity-35'}`}>
                  <p className="text-gray-500 text-[9px] uppercase tracking-widest font-semibold mb-0.5">
                    {stat.label}
                  </p>
                  <p className="text-white text-xl font-black">{stat.value}</p>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
            Lifetime Fitness is more than just a gym — it's a caring community
            dedicated to helping you achieve your goals, faster and stronger.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/course')}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-900/50"
            >
              Start Your Journey
              <ArrowUpRight size={15} />
            </button>
            <button
              onClick={() => navigate('/becomeamember')}
              className="flex items-center gap-2 border border-white/25 hover:border-white/60 text-white font-bold px-7 py-3.5 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
            >
              Become a Member
            </button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce"
        style={{ zIndex: 60 }}
      >
        <ChevronDown size={20} className="text-gray-500" />
      </div>

      {/* Right vertical text */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        style={{ zIndex: 60 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gray-700" />
        <span
          className="text-gray-600 text-[10px] uppercase tracking-[0.35em] font-bold"
          style={{ writingMode: 'vertical-rl' }}
        >
          FitTrack 2025
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-gray-700 to-transparent" />
      </div>

    </section>
  );
}

export default Hero;