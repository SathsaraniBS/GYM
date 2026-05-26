// src/pages/BecomeaMember.jsx
import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import {
  Clock, User, Dumbbell, Users, Zap,
  ArrowUpRight, Check, ChevronRight,
  Mail, Phone, Calendar, Shield, Star,
  Heart, TrendingUp, Award
} from 'lucide-react';

function BecomeaMember() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', age: '', gender: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const features = [
    {
      icon: Clock,
      title: "24/7 Access",
      stat: "365", statLabel: "Days/Year",
      desc: "Workout on your schedule, anytime day or night — no restrictions.",
      color: '#dc2626',
    },
    {
      icon: User,
      title: "Personal Training",
      stat: "50+", statLabel: "Trainers",
      desc: "Get one-on-one guidance from our certified expert coaches.",
      color: '#3b82f6',
    },
    {
      icon: Dumbbell,
      title: "Premium Equipment",
      stat: "200+", statLabel: "Machines",
      desc: "State-of-the-art machines and free weights for every workout goal.",
      color: '#22c55e',
    },
    {
      icon: Users,
      title: "Community",
      stat: "5,000+", statLabel: "Members",
      desc: "Join a motivating, friendly fitness family that pushes you forward.",
      color: '#f59e0b',
    },
  ];

  const steps = [
    { n: 1, label: 'Your Details', icon: User     },
    { n: 2, label: 'Choose Plan',  icon: Award    },
    { n: 3, label: 'Payment',      icon: Shield   },
  ];

  const stats = [
    { value: '15+',    label: 'Years Experience' },
    { value: '5,000+', label: 'Happy Members'    },
    { value: '50+',    label: 'Expert Trainers'  },
    { value: '3',      label: 'Branches'         },
  ];

  const canSubmit = formData.fullName && formData.email && formData.phone && formData.age && formData.gender;

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-6">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 rounded-full bg-green-600/20 border-2 border-green-600/40 flex items-center justify-center mx-auto mb-6">
              <Check size={42} className="text-green-500" />
            </div>
            <div className="flex items-center gap-2 justify-center mb-3">
              <Zap size={13} className="text-red-500 fill-red-500" />
              <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em]">Welcome to FitTrack</span>
            </div>
            <h2 className="text-4xl font-black uppercase mb-3">You're In!</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Welcome to the FitTrack family, <span className="text-white font-bold">{formData.fullName}</span>!
              We'll contact you at <span className="text-white font-bold">{formData.email}</span> within 24 hours
              to complete your membership setup.
            </p>
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 text-left mb-8 space-y-3">
              {[
                { label: 'Name',  val: formData.fullName },
                { label: 'Email', val: formData.email    },
                { label: 'Phone', val: formData.phone    },
                { label: 'Age',   val: formData.age      },
              ].map((r, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-500">{r.label}</span>
                  <span className="text-white font-bold">{r.val}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate('/membership')}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full text-sm uppercase tracking-wider transition-all">
                Choose Plan <ArrowUpRight size={14}/>
              </button>
              <button onClick={() => navigate('/')}
                className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-4 rounded-full text-sm transition-all">
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="min-h-screen relative flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/h1_hero.png')] bg-center bg-cover bg-no-repeat" style={{ zIndex: 0 }} />
        {/* Left gradient */}
        <div className="absolute inset-0" style={{
          zIndex: 10,
          background: 'linear-gradient(105deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.20) 100%)',
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ zIndex: 11, background: 'linear-gradient(to top, #000, transparent)' }} />
        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" style={{ zIndex: 15 }} />

        <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16 pt-28 pb-20" style={{ zIndex: 60 }}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={13} className="text-red-500 fill-red-500" />
              <span className="text-red-500 font-bold uppercase tracking-[0.25em] text-xs">Join FitTrack Today</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-none uppercase mb-5">
              Unlock<br />
              Your<br />
              <span className="text-red-500">Potential</span>
            </h1>

            <p className="text-gray-300 italic text-xl mb-8 font-light border-l-2 border-red-600 pl-4">
              "Join a community dedicated to making you your strongest self."
            </p>

            {/* Stats */}
            <div className="flex items-center gap-0 mb-10">
              {stats.slice(0,3).map((s, i) => (
                <React.Fragment key={i}>
                  {i !== 0 && <div className="w-px h-10 bg-gray-700 mx-6" />}
                  <div>
                    <p className="text-gray-500 text-[9px] uppercase tracking-widest font-semibold mb-0.5">{s.label}</p>
                    <p className="text-white text-2xl font-black">{s.value}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>

            <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-md">
              FitTrack is more than a gym — it's a caring community with expert trainers,
              premium equipment, and personalized programs designed for your goals.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('join-form').scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-900/50"
              >
                Become a Member <ArrowUpRight size={15} />
              </button>
              <button
                onClick={() => navigate('/membership')}
                className="flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:bg-white/5"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-red-600 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className={`text-center py-2 ${i !== stats.length - 1 ? 'border-r border-red-500' : ''}`}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-1">{s.value}</h2>
              <p className="text-red-100 text-xs font-bold uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Why Join Us</p>
              <h2 className="text-6xl md:text-7xl font-black uppercase leading-none">
                More Than<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>a Membership</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed md:text-right">
              Everything you need to transform your body and mindset — under one roof.
            </p>
          </div>

          {/* Numbered feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800/40 rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`p-8 cursor-pointer relative overflow-hidden transition-all duration-500 ${
                  hoveredFeature === i ? 'bg-gray-900' : 'bg-[#0a0a0a] hover:bg-gray-950'
                }`}
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-5 text-7xl font-black select-none text-gray-900">0{i+1}</span>

                {/* Accent line */}
                <div className={`h-0.5 mb-8 transition-all duration-500 ${
                  hoveredFeature === i ? 'w-16' : 'w-8 bg-gray-700'
                }`} style={hoveredFeature === i ? { backgroundColor: f.color, width: '4rem' } : {}} />

                <f.icon size={28} className="mb-5" style={{ color: hoveredFeature === i ? f.color : '#4b5563' }} />

                <div className="mb-4">
                  <span className="text-3xl font-black text-white">{f.stat}</span>
                  <span className={`text-xs uppercase tracking-widest ml-2 transition-colors ${
                    hoveredFeature === i ? 'text-gray-400' : 'text-gray-600'
                  }`}>{f.statLabel}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                  hoveredFeature === i ? 'text-gray-300' : 'text-gray-600'
                }`}>{f.desc}</p>

                {/* Bottom slide line */}
                <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500 ${
                  hoveredFeature === i ? 'w-full' : 'w-0'
                }`} style={{ backgroundColor: f.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join Form ── */}
      <section id="join-form" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — copy */}
            <div className="lg:sticky lg:top-24">
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Get Started</p>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-none mb-6">
                Join in<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>3 Steps</span>
              </h2>
              <div className="w-12 h-0.5 bg-red-600 mb-10" />

              {/* Step indicators */}
              <div className="space-y-6 mb-10">
                {steps.map((s) => (
                  <div key={s.n} className={`flex items-center gap-5 transition-all duration-300 ${
                    activeStep === s.n ? 'opacity-100' : 'opacity-40'
                  }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 transition-all duration-300 ${
                      activeStep > s.n  ? 'bg-green-600 text-white' :
                      activeStep === s.n ? 'bg-red-600 text-white' :
                      'bg-gray-900 border border-gray-800 text-gray-600'
                    }`}>
                      {activeStep > s.n ? <Check size={18} /> : s.n}
                    </div>
                    <div>
                      <p className={`font-black text-sm uppercase tracking-wider ${activeStep === s.n ? 'text-white' : 'text-gray-500'}`}>
                        {s.label}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {s.n === 1 ? 'Tell us about yourself' : s.n === 2 ? 'Pick your perfect plan' : 'Complete payment'}
                      </p>
                    </div>
                    {activeStep === s.n && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-4">Member Benefits</p>
                <div className="space-y-3">
                  {[
                    { icon: Heart,      text: 'Cancel anytime — no lock-in contracts' },
                    { icon: TrendingUp, text: 'Free fitness assessment on join'        },
                    { icon: Star,       text: 'First month discount for new members'  },
                    { icon: Shield,     text: 'Secure, hassle-free registration'      },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <b.icon size={14} className="text-red-500 flex-shrink-0" />
                      <p className="text-gray-400 text-sm">{b.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-8 border-b border-gray-800">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Step 1 of 3</p>
                <h3 className="text-white font-black text-xl uppercase">Your Details</h3>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-5">

                {/* Full name */}
                <div>
                  <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">Full Name</label>
                  <div className="relative">
                    <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input type="text" name="fullName" value={formData.fullName}
                      onChange={handleChange} placeholder="John Silva" required
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">Email</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input type="email" name="email" value={formData.email}
                      onChange={handleChange} placeholder="you@example.com" required
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">Phone</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                    <input type="tel" name="phone" value={formData.phone}
                      onChange={handleChange} placeholder="+94 77 123 4567" required
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                  </div>
                </div>

                {/* Age + Gender row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">Age</label>
                    <div className="relative">
                      <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input type="number" name="age" value={formData.age}
                        onChange={handleChange} placeholder="25" required min="16" max="80"
                        className="w-full pl-10 pr-4 py-3.5 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">Gender</label>
                    <select name="gender" value={formData.gender}
                      onChange={handleChange} required
                      className="w-full px-4 py-3.5 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors appearance-none">
                      <option value="" disabled>Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* Live preview */}
                {formData.fullName && (
                  <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
                    <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-2">Preview</p>
                    <p className="text-white font-bold text-sm">{formData.fullName}</p>
                    {formData.email && <p className="text-gray-400 text-xs">{formData.email}</p>}
                    {formData.phone && <p className="text-gray-400 text-xs">{formData.phone}</p>}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={!canSubmit || submitting}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-black py-5 rounded-xl text-sm uppercase tracking-wider transition-all duration-300">
                  {submitting
                    ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                    : <>Continue to Plan Selection <ChevronRight size={16} /></>
                  }
                </button>

                <p className="text-gray-600 text-xs text-center">
                  By continuing, you agree to our{' '}
                  <span className="text-red-400 cursor-pointer hover:underline">Terms of Service</span>
                  {' '}and{' '}
                  <span className="text-red-400 cursor-pointer hover:underline">Privacy Policy</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default BecomeaMember;