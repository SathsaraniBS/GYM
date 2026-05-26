// src/pages/Membership.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  MapPin, Clock, Package, Calendar, Tag,
  ArrowUpRight, Check, Zap, CreditCard,
  User, Mail, Phone, Home, ChevronRight,
  Shield, Star
} from 'lucide-react';

function Membership() {
  const [step,        setStep]        = useState(1);
  const [branch,      setBranch]      = useState('');
  const [time,        setTime]        = useState('');
  const [packageName, setPackageName] = useState('');
  const [duration,    setDuration]    = useState('');
  const [promoCode,   setPromoCode]   = useState('');
  const [promoApplied,setPromoApplied]= useState(false);

  // Contact form
  const [form, setForm] = useState({
    email: '', phone: '', firstName: '', lastName: '', address: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);

  // ── Pricing data ──
  const pricingData = {
    '2 Gents (Buddy Offer)': { monthly: 10000, half_yearly: 55000, annual: 110000 },
    'Buddy Gents':           { monthly: 7500,  half_yearly: 42500, annual: 85000  },
    'Buddy Ladies':          { monthly: 7500,  half_yearly: 42500, annual: 85000  },
    'Individual Ladies':     { daily: 1000,    monthly: 8000,  half_yearly: 45000, annual: 90000  },
    'Individual Gents':      { daily: 1000,    monthly: 8500,  half_yearly: 47500, annual: 95000  },
    'Couple':                { monthly: 14000, half_yearly: 80000, annual: 160000 },
    'Family':                { monthly: 22000, half_yearly: 125000,annual: 250000 },
    'Student':               { daily: 700,     monthly: 5500,  half_yearly: 35000, annual: 60000  },
  };

  const durationMap = {
    daily:      { label: 'Daily',       key: 'daily'      },
    monthly:    { label: 'Monthly',     key: 'monthly'    },
    halfyearly: { label: 'Half Yearly', key: 'half_yearly'},
    annual:     { label: 'Annual',      key: 'annual'     },
  };

  const branches = [
    { value: 'moors',    label: 'Moors Sports Club', sub: 'Colombo 2' },
    { value: 'jaela',    label: 'Ja Ela Branch',     sub: 'Ja-ela'    },
    { value: 'colombo7', label: 'Colombo 7 Branch',  sub: 'Maitland Crescent' },
  ];

  const times = [
    { value: 'offpeak', label: 'Off Peak', sub: '5 AM – 4 PM' },
    { value: 'peak',    label: 'Peak',     sub: '4 PM – 10 PM'},
    { value: 'fulltime',label: 'Full Time',sub: 'Unrestricted' },
  ];

  const packages = Object.keys(pricingData);
  const durations = ['daily','monthly','halfyearly','annual'];

  const getPrice = () => {
    if (!packageName || !duration) return 0;
    return pricingData[packageName]?.[durationMap[duration]?.key] || 0;
  };

  const discount     = promoApplied ? Math.round(getPrice() * 0.1) : 0;
  const total        = getPrice() - discount;
  const canProceed1  = branch && time && packageName && duration && getPrice() > 0;
  const canProceed2  = form.email && form.phone && form.firstName && form.lastName;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'FIT10') setPromoApplied(true);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const steps = [
    { n: 1, label: 'Select Plan'  },
    { n: 2, label: 'Your Details' },
    { n: 3, label: 'Payment'      },
  ];

  // ── Select card ──
  const SelectCard = ({ value, selected, onClick, children }) => (
    <button onClick={onClick}
      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
        selected
          ? 'bg-red-600/10 border-red-600/50 text-white'
          : 'bg-gray-950 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'
      }`}>
      <div className="flex items-center justify-between">
        <div>{children}</div>
        {selected && <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0"><Check size={11} className="text-white" /></div>}
      </div>
    </button>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-green-600/20 border-2 border-green-600/40 flex items-center justify-center mx-auto mb-6">
              <Check size={36} className="text-green-500" />
            </div>
            <h2 className="text-4xl font-black uppercase mb-3">You're In!</h2>
            <p className="text-gray-400 mb-8">
              Your membership registration has been submitted. We'll contact you at{' '}
              <span className="text-white font-bold">{form.email}</span> within 24 hours.
            </p>
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 text-left mb-8">
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Package',  val: packageName },
                  { label: 'Branch',   val: branches.find(b => b.value === branch)?.label },
                  { label: 'Duration', val: durationMap[duration]?.label },
                  { label: 'Total',    val: `Rs. ${total.toLocaleString()}` },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-500">{r.label}</span>
                    <span className="text-white font-bold">{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <a href="/"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all">
              Back to Home <ArrowUpRight size={15} />
            </a>
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
      <section className="relative overflow-hidden pt-28 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={13} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em]">Join FitTrack</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase leading-none mb-4">
            Membership<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Registration</span>
          </h1>
          <p className="text-gray-400 text-base max-w-md">
            Choose your plan, fill your details, and start your fitness journey today.
          </p>
        </div>
      </section>

      {/* ── Step indicator ── */}
      <div className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-0 w-full max-w-md">
            {steps.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all duration-300 ${
                    step > s.n  ? 'bg-green-600 border-green-600 text-white' :
                    step === s.n ? 'bg-red-600 border-red-600 text-white' :
                    'bg-black border-gray-700 text-gray-600'
                  }`}>
                    {step > s.n ? <Check size={14} /> : s.n}
                  </div>
                  <p className={`text-[10px] uppercase tracking-widest mt-1.5 font-bold ${step === s.n ? 'text-red-400' : 'text-gray-600'}`}>
                    {s.label}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mb-5 transition-all duration-500 ${step > s.n ? 'bg-green-600' : 'bg-gray-800'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Form steps ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* ════ STEP 1 ════ */}
            {step === 1 && (
              <div className="space-y-6">

                {/* Branch */}
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center">
                      <MapPin size={14} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest">Step 1 of 3</p>
                      <h3 className="text-white font-black uppercase text-sm">Select Branch</h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    {branches.map(b => (
                      <SelectCard key={b.value} value={b.value} selected={branch === b.value} onClick={() => setBranch(b.value)}>
                        <p className="font-bold text-sm text-white">{b.label}</p>
                        <p className="text-gray-500 text-xs">{b.sub}</p>
                      </SelectCard>
                    ))}
                  </div>
                </div>

                {/* Time slot */}
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-600/30 flex items-center justify-center">
                      <Clock size={14} className="text-blue-500" />
                    </div>
                    <h3 className="text-white font-black uppercase text-sm">Time Slot</h3>
                  </div>
                  <div className="p-6 grid grid-cols-3 gap-3">
                    {times.map(t => (
                      <SelectCard key={t.value} value={t.value} selected={time === t.value} onClick={() => setTime(t.value)}>
                        <p className="font-bold text-sm">{t.label}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5">{t.sub}</p>
                      </SelectCard>
                    ))}
                  </div>
                </div>

                {/* Package */}
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-600/15 border border-green-600/30 flex items-center justify-center">
                      <Package size={14} className="text-green-500" />
                    </div>
                    <h3 className="text-white font-black uppercase text-sm">Package</h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {packages.map(pkg => (
                      <SelectCard key={pkg} value={pkg} selected={packageName === pkg} onClick={() => setPackageName(pkg)}>
                        <p className="font-bold text-sm">{pkg}</p>
                        {pricingData[pkg].monthly && (
                          <p className="text-gray-500 text-[10px] mt-0.5">
                            From Rs. {pricingData[pkg].monthly?.toLocaleString()}/mo
                          </p>
                        )}
                      </SelectCard>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-600/15 border border-yellow-600/30 flex items-center justify-center">
                      <Calendar size={14} className="text-yellow-500" />
                    </div>
                    <h3 className="text-white font-black uppercase text-sm">Duration</h3>
                  </div>
                  <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {durations.map(d => {
                      const price = packageName ? pricingData[packageName]?.[durationMap[d].key] : null;
                      const available = !packageName || price;
                      return (
                        <SelectCard key={d} value={d} selected={duration === d}
                          onClick={() => available && setDuration(d)}>
                          <p className={`font-bold text-sm ${!available ? 'opacity-30' : ''}`}>{durationMap[d].label}</p>
                          {packageName && (
                            <p className={`text-[10px] mt-0.5 ${!available ? 'text-gray-700' : 'text-gray-400'}`}>
                              {price ? `Rs. ${price.toLocaleString()}` : 'N/A'}
                            </p>
                          )}
                        </SelectCard>
                      );
                    })}
                  </div>
                </div>

                {/* Promo code */}
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Tag size={14} className="text-yellow-500" />
                    <p className="text-white font-bold text-sm uppercase tracking-wider">Promo Code</p>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text" placeholder="Enter code (try FIT10)"
                      value={promoCode} onChange={e => setPromoCode(e.target.value.toUpperCase())}
                      disabled={promoApplied}
                      className="flex-1 px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors disabled:opacity-50"
                    />
                    {!promoApplied ? (
                      <button onClick={handlePromo}
                        className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all">
                        Apply
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 px-4 text-green-400 text-sm font-bold">
                        <Check size={14}/> 10% Off!
                      </div>
                    )}
                  </div>
                </div>

                <button onClick={() => setStep(2)} disabled={!canProceed1}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl text-sm uppercase tracking-wider transition-all duration-300">
                  Continue to Details <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* ════ STEP 2 ════ */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center">
                      <User size={14} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest">Step 2 of 3</p>
                      <h3 className="text-white font-black uppercase text-sm">Your Details</h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">First Name</label>
                        <div className="relative">
                          <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                          <input type="text" placeholder="John"
                            value={form.firstName}
                            onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">Last Name</label>
                        <input type="text" placeholder="Silva"
                          value={form.lastName}
                          onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
                          className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">Email</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                        <input type="email" placeholder="you@example.com"
                          value={form.email}
                          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">Phone</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                        <input type="tel" placeholder="+94 77 123 4567"
                          value={form.phone}
                          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2 block">Address</label>
                      <div className="relative">
                        <Home size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                        <input type="text" placeholder="No. 123, Galle Road, Colombo"
                          value={form.address}
                          onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)}
                    className="px-6 py-4 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold rounded-2xl text-sm transition-all">
                    Back
                  </button>
                  <button onClick={() => setStep(3)} disabled={!canProceed2}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl text-sm uppercase tracking-wider transition-all">
                    Continue to Payment <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* ════ STEP 3 ════ */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center">
                      <CreditCard size={14} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest">Step 3 of 3</p>
                      <h3 className="text-white font-black uppercase text-sm">Payment</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    {/* Payment methods */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { label: 'Bank Transfer', icon: '🏦' },
                        { label: 'Cash',          icon: '💵' },
                        { label: 'Card',          icon: '💳' },
                      ].map((m, i) => (
                        <div key={i} className={`py-4 rounded-xl border text-center transition-all cursor-pointer ${
                          i === 0 ? 'bg-red-600/10 border-red-600/50' : 'bg-gray-950 border-gray-800 hover:border-gray-600'
                        }`}>
                          <div className="text-2xl mb-1">{m.icon}</div>
                          <p className="text-white text-xs font-bold">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Bank details */}
                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-5 mb-6">
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4 font-bold">Bank Transfer Details</p>
                      {[
                        { label: 'Bank',          val: 'Commercial Bank of Ceylon' },
                        { label: 'Account Name',  val: 'FitTrack Gym (Pvt) Ltd'    },
                        { label: 'Account No.',   val: '1234567890'                 },
                        { label: 'Branch',        val: 'Colombo 7'                  },
                        { label: 'Reference',     val: `${form.firstName} ${form.lastName} - ${packageName}` },
                      ].map((r, i) => (
                        <div key={i} className="flex justify-between py-2 border-b border-gray-800 last:border-0">
                          <span className="text-gray-500 text-sm">{r.label}</span>
                          <span className="text-white text-sm font-bold">{r.val || '—'}</span>
                        </div>
                      ))}
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {[
                        { icon: Shield, label: 'Secure Payment' },
                        { icon: Star,   label: 'Verified Gym'   },
                        { icon: Check,  label: '24/7 Support'   },
                      ].map((b, i) => (
                        <div key={i} className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2">
                          <b.icon size={12} className="text-green-500" />
                          <span className="text-gray-400 text-xs font-semibold">{b.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)}
                    className="px-6 py-4 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold rounded-2xl text-sm transition-all">
                    Back
                  </button>
                  <button onClick={handleSubmit} disabled={submitting}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-black py-4 rounded-2xl text-sm uppercase tracking-wider transition-all duration-300">
                    {submitting
                      ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
                      : <><CreditCard size={16}/> Confirm & Register</>
                    }
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Order summary (sticky) ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">

              {/* Summary card */}
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Summary</p>
                  <h3 className="text-white font-black uppercase">Order Details</h3>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { icon: MapPin,   label: 'Branch',   val: branches.find(b => b.value === branch)?.label || '—'  },
                    { icon: Clock,    label: 'Time',     val: times.find(t => t.value === time)?.label || '—'        },
                    { icon: Package,  label: 'Package',  val: packageName || '—'                                     },
                    { icon: Calendar, label: 'Duration', val: durationMap[duration]?.label || '—'                    },
                  ].map((r, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <r.icon size={12} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-gray-600 text-[9px] uppercase tracking-widest">{r.label}</p>
                        <p className="text-white text-sm font-bold">{r.val}</p>
                      </div>
                    </div>
                  ))}

                  {getPrice() > 0 && (
                    <div className="border-t border-gray-800 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="text-white font-bold">Rs. {getPrice().toLocaleString()}</span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400">Promo (FIT10)</span>
                          <span className="text-green-400 font-bold">− Rs. {discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-black border-t border-gray-800 pt-3">
                        <span className="text-white">Total</span>
                        <span className="text-red-500">Rs. {total.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {!packageName && (
                    <p className="text-gray-700 text-xs text-center py-2">
                      Select a package to see pricing
                    </p>
                  )}
                </div>
              </div>

              {/* Contact info preview (step 2+) */}
              {step >= 2 && form.firstName && (
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4 font-bold">Contact Info</p>
                  <div className="space-y-2">
                    <p className="text-white font-bold">{form.firstName} {form.lastName}</p>
                    {form.email && <p className="text-gray-400 text-sm">{form.email}</p>}
                    {form.phone && <p className="text-gray-400 text-sm">{form.phone}</p>}
                  </div>
                </div>
              )}

              {/* Help box */}
              <div className="bg-red-600/5 border border-red-600/20 rounded-2xl p-5">
                <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Need Help?</p>
                <p className="text-gray-500 text-xs mb-3">Contact us before registering if you have any questions.</p>
                <a href="/contact"
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs font-bold transition-colors">
                  Contact Us <ArrowUpRight size={11}/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Membership;