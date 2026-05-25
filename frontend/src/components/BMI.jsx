// src/components/BMI.jsx
import React, { useState } from 'react';
import { ArrowUpRight, Zap, Activity } from 'lucide-react';

function BMI() {
  const [weight,   setWeight]   = useState('');
  const [height,   setHeight]   = useState('');
  const [gender,   setGender]   = useState('male');
  const [bmi,      setBmi]      = useState(null);
  const [category, setCategory] = useState('');
  const [error,    setError]    = useState('');

  const categories = [
    { label: 'Underweight', range: 'Below 18.5', max: 18.5, color: 'text-blue-400',   bg: 'bg-blue-500'   },
    { label: 'Healthy',     range: '18.5 – 24.9',max: 25,   color: 'text-green-400',  bg: 'bg-green-500'  },
    { label: 'Overweight',  range: '25.0 – 29.9',max: 30,   color: 'text-yellow-400', bg: 'bg-yellow-500' },
    { label: 'Obese',       range: '30.0+',       max: 999,  color: 'text-red-400',    bg: 'bg-red-500'    },
  ];

  const getCategoryColor = (cat) => categories.find(c => c.label === cat)?.color || 'text-white';
  const getCategoryBg    = (cat) => categories.find(c => c.label === cat)?.bg    || 'bg-gray-600';
  const getGaugePercent  = (val) => Math.min((parseFloat(val) / 40) * 100, 100);

  const calculateBMI = () => {
    setError('');
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setError('Please enter valid height and weight values.');
      setBmi(null); setCategory('');
      return;
    }
    const bmiVal = w / Math.pow(h / 100, 2);
    setBmi(bmiVal.toFixed(1));
    if      (bmiVal < 18.5) setCategory('Underweight');
    else if (bmiVal < 25)   setCategory('Healthy');
    else if (bmiVal < 30)   setCategory('Overweight');
    else                    setCategory('Obese');
  };

  const handleReset = () => {
    setWeight(''); setHeight(''); setGender('male');
    setBmi(null); setCategory(''); setError('');
  };

  return (
    <div className="bg-black text-white">

      {/* ════════════════════════════════
          HERO — Fixed z-index bug
      ════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* ✅ Fix: zIndex 0 (was 40 — covering gradient/content) */}
        <div
          className="absolute inset-0 bg-[url('/img9.jpg')] bg-center bg-cover bg-no-repeat"
          style={{ zIndex: 50 }}
        />

        {/* ✅ Left gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 10,
            background: 'linear-gradient(105deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.80) 55%, rgba(0,0,0,0.20) 100%)',
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ zIndex: 11, background: 'linear-gradient(to top, #000, transparent)' }}
        />

        {/* Left red accent line */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600" style={{ zIndex: 15 }} />

        {/* ✅ Hero content — pt-24 for navbar clearance */}
        <div
          className="relative w-full max-w-7xl mx-auto px-10 md:px-20 pt-24 pb-16"
          style={{ zIndex: 60 }}
        >
          {/* <div className="max-w-2xl">

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-5">
              BMI<br />
              <span className="text-red-500">Calculator</span>
            </h1>


          </div> */}
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce"
          style={{ zIndex: 60 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════
          CALCULATOR + RESULT
      ════════════════════════════════ */}
      <section id="bmi-calculator" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Check Your Body</p>
              <h2 className="text-5xl md:text-6xl font-black uppercase leading-none">
                Calculate<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Your BMI</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-xs text-sm leading-relaxed md:text-right">
              BMI measures body fat based on height and weight — a key health indicator.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT: Form */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors duration-300">
              <div className="p-8 border-b border-gray-800 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/30 flex items-center justify-center">
                  <Activity size={18} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-white font-black text-lg uppercase">Your Measurements</h3>
                  <p className="text-gray-600 text-xs">Enter your details below</p>
                </div>
              </div>

              <div className="p-8 space-y-5">
                {/* Gender toggle */}
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-3 block">Gender</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['male', 'female'].map((g) => (
                      <button key={g} onClick={() => setGender(g)}
                        className={`py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                          gender === g
                            ? 'bg-red-600 text-white border border-red-600'
                            : 'bg-gray-900 text-gray-500 border border-gray-800 hover:border-gray-600'
                        }`}
                      >{g}</button>
                    ))}
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">
                    Height <span className="text-gray-700 normal-case tracking-normal">(cm)</span>
                  </label>
                  <input type="number" placeholder="e.g. 175" value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white placeholder-gray-700 transition-colors duration-300 text-lg font-bold"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-2 block">
                    Weight <span className="text-gray-700 normal-case tracking-normal">(kg)</span>
                  </label>
                  <input type="number" placeholder="e.g. 70" value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white placeholder-gray-700 transition-colors duration-300 text-lg font-bold"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/50 rounded-xl text-red-400 text-sm">
                    <span>✕</span> {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button onClick={calculateBMI}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-red-900/30"
                  >
                    Calculate <ArrowUpRight size={15} />
                  </button>
                  <button onClick={handleReset}
                    className="border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition-all duration-300"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Result */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors duration-300 flex flex-col">
              <div className="p-8 border-b border-gray-800">
                <h3 className="text-white font-black text-lg uppercase">Your Result</h3>
                <p className="text-gray-600 text-xs mt-1">BMI score and health classification</p>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                {bmi ? (
                  <>
                    <div className="text-center mb-8">
                      <div className={`text-8xl font-black mb-3 ${getCategoryColor(category)}`}>{bmi}</div>
                      <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-black uppercase tracking-widest ${getCategoryBg(category)}`}>
                        {category}
                      </div>
                    </div>

                    {/* Gauge */}
                    <div className="mb-8">
                      <div className="flex justify-between text-xs text-gray-600 mb-2 uppercase tracking-widest">
                        <span>0</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
                      </div>
                      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${getCategoryBg(category)}`}
                          style={{ width: `${getGaugePercent(bmi)}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-0.5 mt-2">
                        {categories.map((c) => (
                          <div key={c.label} className={`h-1 rounded-sm ${c.bg} ${category === c.label ? 'opacity-100' : 'opacity-20'}`} />
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-5 mb-6">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Your BMI of <span className={`font-black ${getCategoryColor(category)}`}>{bmi}</span> falls
                        within the <span className={`font-black ${getCategoryColor(category)}`}>{category.toLowerCase()}</span> range.
                        {category === 'Healthy'
                          ? ' Great work! Maintain your balanced diet and regular exercise routine.'
                          : ' A balanced diet and regular exercise can help you reach a healthy range.'}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                    <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center mb-6">
                      <Activity size={32} className="text-gray-700" />
                    </div>
                    <p className="text-gray-600 text-sm uppercase tracking-widest font-semibold">
                      Enter your details<br />to see your result
                    </p>
                  </div>
                )}

                <div className="space-y-2 mt-auto">
                  {categories.map((c) => (
                    <div key={c.label}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                        category === c.label ? 'bg-gray-900 border border-gray-700' : 'border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${c.bg}`} />
                        <span className={`text-sm font-bold ${category === c.label ? c.color : 'text-gray-600'}`}>{c.label}</span>
                      </div>
                      <span className={`text-xs font-semibold ${category === c.label ? 'text-gray-300' : 'text-gray-700'}`}>{c.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BMI Chart */}
          <div className="mt-8">
            <div className="mb-10">
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-3">Reference</p>
              <h3 className="text-4xl font-black uppercase">
                BMI <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Chart</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-gray-800/40 rounded-2xl overflow-hidden">
              {categories.map((c, i) => (
                <div key={i}
                  className={`p-8 transition-all duration-300 ${category === c.label ? 'bg-gray-900' : 'bg-[#0a0a0a] hover:bg-gray-950'}`}
                >
                  <div className={`h-0.5 mb-6 transition-all duration-500 ${c.bg} ${category === c.label ? 'w-16' : 'w-8'}`} />
                  <div className={`w-3 h-3 rounded-full ${c.bg} mb-4`} />
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-1">BMI Range</p>
                  <p className="text-white text-xl font-black mb-3">{c.range}</p>
                  <p className={`text-lg font-black uppercase ${c.color}`}>{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BMI;