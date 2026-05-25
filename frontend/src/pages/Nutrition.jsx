// src/pages/user/Nutrition.jsx
import React, { useState } from 'react';
import {
  Apple, Flame, Droplets, Zap, Plus, Search,
  ChevronRight, Check, X, TrendingUp, TrendingDown,
  BarChart2, Target, Coffee, Sun, Moon, Utensils,
  ArrowUpRight, Minus
} from 'lucide-react';

// ── Macro ring (SVG) ──
const MacroRing = ({ pct, color, size = 72, stroke = 6, label, value, unit }) => {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off  = circ - (Math.min(pct, 100) / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1f2937" strokeWidth={stroke} />
          <circle cx={size/2} cy={size/2} r={r} fill="none"
            stroke={color} strokeWidth={stroke}
            strokeDasharray={circ} strokeDashoffset={off}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1.2s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white font-black text-sm leading-none">{value}</span>
          <span className="text-gray-600 text-[9px]">{unit}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-400 text-[10px] uppercase tracking-widest">{label}</p>
        <p className="text-[10px] font-bold" style={{ color }}>{Math.round(pct)}%</p>
      </div>
    </div>
  );
};

// ── Horizontal macro bar ──
const MacroBar = ({ label, current, target, color, unit = 'g' }) => {
  const pct = Math.min((current / target) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-gray-400 font-semibold">{label}</span>
        <span className="font-black" style={{ color }}>{current}<span className="text-gray-600 font-normal">/{target}{unit}</span></span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
};

// ── Water drop button ──
const WaterDrop = ({ filled, onClick }) => (
  <button onClick={onClick}
    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border ${
      filled
        ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
        : 'bg-gray-900 border-gray-800 text-gray-700 hover:border-gray-600'
    }`}>
    <Droplets size={14} />
  </button>
);

export default function Nutrition() {
  const [activeTab,   setActiveTab]   = useState('today');
  const [searchFood,  setSearchFood]  = useState('');
  const [water,       setWater]       = useState(5);   // glasses
  const [mealLog,     setMealLog]     = useState({
    breakfast: [
      { name: 'Oats with Banana',    cal: 320, protein: 12, carbs: 58, fat: 6  },
      { name: 'Boiled Eggs (2)',     cal: 155, protein: 13, carbs: 1,  fat: 11 },
    ],
    lunch: [
      { name: 'Grilled Chicken Rice',cal: 520, protein: 45, carbs: 52, fat: 8  },
      { name: 'Mixed Salad',         cal: 85,  protein: 3,  carbs: 12, fat: 2  },
    ],
    snack: [
      { name: 'Whey Protein Shake',  cal: 130, protein: 25, carbs: 5,  fat: 2  },
    ],
    dinner: [],
  });

  const [addingTo,    setAddingTo]    = useState(null);
  const [newFood,     setNewFood]     = useState({ name: '', cal: '', protein: '', carbs: '', fat: '' });

  // ── Targets ──
  const targets = { cal: 2400, protein: 180, carbs: 240, fat: 65, water: 8 };

  // ── Totals ──
  const allFoods = Object.values(mealLog).flat();
  const totals   = allFoods.reduce((acc, f) => ({
    cal:     acc.cal     + f.cal,
    protein: acc.protein + f.protein,
    carbs:   acc.carbs   + f.carbs,
    fat:     acc.fat     + f.fat,
  }), { cal: 0, protein: 0, carbs: 0, fat: 0 });

  const remaining = targets.cal - totals.cal;

  // ── Add food ──
  const handleAddFood = (meal) => {
    if (!newFood.name || !newFood.cal) return;
    setMealLog(prev => ({
      ...prev,
      [meal]: [...prev[meal], {
        name:    newFood.name,
        cal:     parseInt(newFood.cal)     || 0,
        protein: parseInt(newFood.protein) || 0,
        carbs:   parseInt(newFood.carbs)   || 0,
        fat:     parseInt(newFood.fat)     || 0,
      }],
    }));
    setNewFood({ name: '', cal: '', protein: '', carbs: '', fat: '' });
    setAddingTo(null);
  };

  const handleRemoveFood = (meal, idx) => {
    setMealLog(prev => ({
      ...prev,
      [meal]: prev[meal].filter((_, i) => i !== idx),
    }));
  };

  // ── Food database ──
  const foodDB = [
    { name: 'Chicken Breast (100g)',  cal: 165, protein: 31, carbs: 0,  fat: 3.6 },
    { name: 'Brown Rice (100g)',      cal: 216, protein: 5,  carbs: 45, fat: 1.8 },
    { name: 'Whole Egg',              cal: 78,  protein: 6,  carbs: 0.6,fat: 5   },
    { name: 'Banana',                 cal: 89,  protein: 1,  carbs: 23, fat: 0.3 },
    { name: 'Greek Yogurt (100g)',    cal: 59,  protein: 10, carbs: 3.6,fat: 0.4 },
    { name: 'Oats (100g)',            cal: 389, protein: 17, carbs: 66, fat: 7   },
    { name: 'Sweet Potato (100g)',    cal: 86,  protein: 2,  carbs: 20, fat: 0.1 },
    { name: 'Whey Protein (1 scoop)', cal: 120, protein: 24, carbs: 3,  fat: 1   },
    { name: 'Almonds (28g)',          cal: 164, protein: 6,  carbs: 6,  fat: 14  },
    { name: 'Salmon (100g)',          cal: 208, protein: 20, carbs: 0,  fat: 13  },
    { name: 'Broccoli (100g)',        cal: 34,  protein: 2.8,carbs: 7,  fat: 0.4 },
    { name: 'Tuna (100g)',            cal: 132, protein: 29, carbs: 0,  fat: 1   },
  ];

  const weeklyCalories = [
    { day: 'Mon', cal: 2310, target: 2400 },
    { day: 'Tue', cal: 2180, target: 2400 },
    { day: 'Wed', cal: 2490, target: 2400 },
    { day: 'Thu', cal: 2250, target: 2400 },
    { day: 'Fri', cal: 2400, target: 2400 },
    { day: 'Sat', cal: 1980, target: 2400 },
    { day: 'Sun', cal: totals.cal, target: 2400 },
  ];

  const mealIcons = { breakfast: Coffee, lunch: Sun, snack: Apple, dinner: Moon };
  const mealColors = { breakfast: '#f59e0b', lunch: '#22c55e', snack: '#3b82f6', dinner: '#8b5cf6' };
  const mealTimes = { breakfast: '7:00 AM', lunch: '12:30 PM', snack: '4:00 PM', dinner: '7:30 PM' };

  const tabs = [
    { id: 'today',  label: 'Today' },
    { id: 'macros', label: 'Macros' },
    { id: 'meals',  label: 'Meal Log' },
    { id: 'plan',   label: 'Meal Plan' },
    { id: 'foods',  label: 'Food DB' },
  ];

  const mealPlan = [
    {
      meal: 'Breakfast', time: '7:00 AM', icon: Coffee, color: '#f59e0b',
      items: ['Oats (80g) with almond milk', '2 boiled eggs', '1 banana', 'Black coffee'],
      cal: 480, protein: 28, carbs: 65, fat: 14,
    },
    {
      meal: 'Mid-Morning', time: '10:30 AM', icon: Apple, color: '#22c55e',
      items: ['Greek yogurt (150g)', 'Mixed berries (100g)', '10 almonds'],
      cal: 220, protein: 16, carbs: 22, fat: 8,
    },
    {
      meal: 'Lunch', time: '12:30 PM', icon: Sun, color: '#3b82f6',
      items: ['Grilled chicken breast (180g)', 'Brown rice (120g)', 'Steamed broccoli (100g)', 'Olive oil drizzle'],
      cal: 580, protein: 52, carbs: 58, fat: 14,
    },
    {
      meal: 'Pre-Workout', time: '4:00 PM', icon: Zap, color: '#dc2626',
      items: ['1 scoop whey protein', '1 apple', 'Black coffee'],
      cal: 220, protein: 26, carbs: 28, fat: 2,
    },
    {
      meal: 'Dinner', time: '7:30 PM', icon: Moon, color: '#8b5cf6',
      items: ['Baked salmon (200g)', 'Sweet potato (150g)', 'Mixed salad with lemon dressing'],
      cal: 520, protein: 45, carbs: 42, fat: 18,
    },
    {
      meal: 'Night Snack', time: '9:30 PM', icon: Moon, color: '#06b6d4',
      items: ['Casein protein shake', '1 tbsp peanut butter'],
      cal: 180, protein: 22, carbs: 8, fat: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em]">Nutrition</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase leading-none">
            Diet &<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Nutrition</span>
          </h1>
        </div>

        {/* Daily summary pills */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Flame,    val: `${totals.cal}`,      sub: `/ ${targets.cal} kcal`,  color: 'text-red-500'    },
            { icon: Target,   val: `${totals.protein}g`, sub: `/ ${targets.protein}g protein`, color: 'text-blue-400' },
            { icon: Droplets, val: `${water}`,           sub: `/ ${targets.water} glasses`,    color: 'text-cyan-400' },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3">
              <p.icon size={14} className={p.color} />
              <div>
                <p className="text-white text-sm font-black">{p.val}</p>
                <p className="text-gray-600 text-[9px] uppercase tracking-widest">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 mb-8 bg-gray-950 border border-gray-800 rounded-xl p-1 w-fit overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
              activeTab === t.id ? 'bg-red-600 text-white shadow-lg shadow-red-900/30' : 'text-gray-500 hover:text-white'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════ TODAY ═══════════════ */}
      {activeTab === 'today' && (
        <div className="space-y-6">

          {/* Calorie hero card */}
          <div className="bg-gradient-to-br from-red-900/20 to-black border border-red-800/30 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

              {/* Big calorie number */}
              <div className="text-center md:text-left">
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-2">Calories Today</p>
                <p className="text-6xl font-black text-white leading-none mb-1">{totals.cal}</p>
                <p className="text-gray-500 text-sm">of <span className="text-white font-bold">{targets.cal}</span> goal</p>
                <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 rounded-full transition-all duration-700"
                    style={{ width: `${Math.min((totals.cal / targets.cal) * 100, 100)}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-gray-600 mt-1.5 uppercase tracking-widest">
                  <span>Consumed</span>
                  <span className={remaining >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {remaining >= 0 ? `${remaining} left` : `${Math.abs(remaining)} over`}
                  </span>
                </div>
              </div>

              {/* Macro rings */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-4 gap-4 place-items-center">
                  <MacroRing pct={(totals.cal / targets.cal) * 100}     color="#dc2626" size={80} stroke={6} label="Calories" value={totals.cal}     unit="kcal" />
                  <MacroRing pct={(totals.protein / targets.protein)*100} color="#3b82f6" size={80} stroke={6} label="Protein"  value={`${totals.protein}g`} unit="" />
                  <MacroRing pct={(totals.carbs / targets.carbs) * 100}  color="#f59e0b" size={80} stroke={6} label="Carbs"    value={`${totals.carbs}g`}   unit="" />
                  <MacroRing pct={(totals.fat / targets.fat) * 100}      color="#22c55e" size={80} stroke={6} label="Fat"      value={`${totals.fat}g`}     unit="" />
                </div>
              </div>
            </div>
          </div>

          {/* Water + meals row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Water tracker */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Hydration</p>
                  <h3 className="text-white font-black uppercase">Water Intake</h3>
                </div>
                <Droplets size={18} className="text-cyan-400" />
              </div>

              <div className="flex items-end gap-2 mb-5">
                <p className="text-4xl font-black text-cyan-400">{water}</p>
                <p className="text-gray-500 text-sm mb-1">/ {targets.water} glasses</p>
              </div>

              {/* Glass grid */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[...Array(targets.water)].map((_, i) => (
                  <WaterDrop key={i} filled={i < water} onClick={() => setWater(i < water ? i : i + 1)} />
                ))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setWater(w => Math.max(0, w - 1))}
                  className="flex-1 flex items-center justify-center py-2 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-600 text-gray-400 hover:text-white transition text-sm font-bold">
                  <Minus size={14} />
                </button>
                <button onClick={() => setWater(w => Math.min(targets.water, w + 1))}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 text-cyan-400 transition text-sm font-bold">
                  <Plus size={14} /> Add Glass
                </button>
              </div>
            </div>

            {/* Today meal summary */}
            <div className="lg:col-span-2 bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Summary</p>
                <h3 className="text-white font-black uppercase">Today's Meals</h3>
              </div>
              <div className="divide-y divide-gray-800/50">
                {Object.entries(mealLog).map(([meal, foods]) => {
                  const Icon  = mealIcons[meal];
                  const color = mealColors[meal];
                  const mCal  = foods.reduce((s, f) => s + f.cal, 0);
                  return (
                    <div key={meal}
                      onClick={() => setActiveTab('meals')}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-950 cursor-pointer transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
                          <Icon size={14} style={{ color }} />
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm capitalize">{meal}</p>
                          <p className="text-gray-600 text-xs">{foods.length} items • {mealTimes[meal]}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-white font-black text-sm">{mCal} <span className="text-gray-600 font-normal text-xs">kcal</span></p>
                        <ChevronRight size={14} className="text-gray-700 group-hover:text-gray-400 transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Weekly calories bar chart */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">This Week</p>
                <h3 className="text-white font-black uppercase">Calorie History</h3>
              </div>
              <BarChart2 size={16} className="text-gray-600" />
            </div>
            <div className="flex items-end gap-2" style={{ height: 100 }}>
              {weeklyCalories.map((d, i) => {
                const max  = Math.max(...weeklyCalories.map(w => w.target));
                const hPct = (d.cal / max) * 80;
                const over = d.cal > d.target;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg transition-all duration-700 relative group"
                      style={{ height: `${hPct}px`, backgroundColor: over ? '#dc2626' : '#374151' }}>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded px-1.5 py-0.5 text-[9px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {d.cal}
                      </div>
                    </div>
                    <span className="text-gray-600 text-[9px] uppercase">{d.day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-4 text-[10px] text-gray-600">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-gray-700" />Under target</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-red-600" />Over target</div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ MACROS ═══════════════ */}
      {activeTab === 'macros' && (
        <div className="space-y-6">

          {/* Macro overview cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Calories', current: totals.cal,     target: targets.cal,     color: '#dc2626', unit: 'kcal', icon: Flame },
              { label: 'Protein',  current: totals.protein, target: targets.protein, color: '#3b82f6', unit: 'g',    icon: TrendingUp },
              { label: 'Carbs',    current: totals.carbs,   target: targets.carbs,   color: '#f59e0b', unit: 'g',    icon: Zap },
              { label: 'Fat',      current: totals.fat,     target: targets.fat,     color: '#22c55e', unit: 'g',    icon: Target },
            ].map((m, i) => {
              const pct = Math.min((m.current / m.target) * 100, 100);
              return (
                <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <m.icon size={16} style={{ color: m.color }} />
                    <span className="text-xs font-bold" style={{ color: m.color }}>{Math.round(pct)}%</span>
                  </div>
                  <p className="text-2xl font-black text-white mb-0.5">{m.current}<span className="text-gray-600 text-sm font-normal">{m.unit}</span></p>
                  <p className="text-gray-600 text-xs mb-3">of {m.target}{m.unit}</p>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: m.color }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Macro breakdown + distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Detailed bars */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
              <div className="mb-8">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Breakdown</p>
                <h3 className="text-white font-black uppercase">Daily Macros</h3>
              </div>
              <div className="space-y-6">
                <MacroBar label="Protein"       current={totals.protein} target={targets.protein} color="#3b82f6" />
                <MacroBar label="Carbohydrates" current={totals.carbs}   target={targets.carbs}   color="#f59e0b" />
                <MacroBar label="Healthy Fats"  current={totals.fat}     target={targets.fat}     color="#22c55e" />
                <MacroBar label="Fiber"         current={18}             target={30}              color="#8b5cf6" />
                <MacroBar label="Sugar"         current={42}             target={50}              color="#ec4899" />
              </div>
            </div>

            {/* Calorie split */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
              <div className="mb-8">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Distribution</p>
                <h3 className="text-white font-black uppercase">Calorie Split</h3>
              </div>

              {/* Visual stacked bar */}
              <div className="h-10 rounded-xl overflow-hidden flex mb-6">
                <div className="h-full bg-blue-500 transition-all" style={{ width: `${(totals.protein * 4 / totals.cal) * 100}%` }} title="Protein" />
                <div className="h-full bg-yellow-500 transition-all" style={{ width: `${(totals.carbs * 4 / totals.cal) * 100}%` }} title="Carbs" />
                <div className="h-full bg-green-500 transition-all" style={{ width: `${(totals.fat * 9 / totals.cal) * 100}%` }} title="Fat" />
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Protein',  cal: totals.protein * 4, pct: Math.round((totals.protein * 4 / totals.cal) * 100), color: '#3b82f6' },
                  { label: 'Carbs',    cal: totals.carbs * 4,   pct: Math.round((totals.carbs * 4 / totals.cal) * 100),   color: '#f59e0b' },
                  { label: 'Fat',      cal: totals.fat * 9,     pct: Math.round((totals.fat * 9 / totals.cal) * 100),     color: '#22c55e' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: s.color }} />
                      <span className="text-gray-400 text-sm">{s.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-xs">{s.cal} kcal</span>
                      <span className="text-white font-black text-sm">{s.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-950 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-xs text-center">
                  Ideal split: <span className="text-blue-400">30%</span> protein •{' '}
                  <span className="text-yellow-400">40%</span> carbs •{' '}
                  <span className="text-green-400">30%</span> fat
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ MEAL LOG ═══════════════ */}
      {activeTab === 'meals' && (
        <div className="space-y-5">
          {Object.entries(mealLog).map(([meal, foods]) => {
            const Icon  = mealIcons[meal];
            const color = mealColors[meal];
            const mCal  = foods.reduce((s, f) => s + f.cal, 0);
            return (
              <div key={meal} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors">

                {/* Meal header */}
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-black capitalize">{meal}</h3>
                      <p className="text-gray-600 text-xs">{mealTimes[meal]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-white font-black">{mCal} <span className="text-gray-600 font-normal text-xs">kcal</span></p>
                    <button onClick={() => setAddingTo(addingTo === meal ? null : meal)}
                      className="flex items-center gap-1.5 bg-red-600/10 hover:bg-red-600 border border-red-600/30 hover:border-red-600 text-red-400 hover:text-white font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition-all duration-300">
                      <Plus size={12} /> Add
                    </button>
                  </div>
                </div>

                {/* Foods */}
                {foods.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <p className="text-gray-700 text-sm">No foods logged yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-800/50">
                    {foods.map((food, idx) => (
                      <div key={idx} className="flex items-center justify-between px-6 py-3.5 group hover:bg-gray-950 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: color }} />
                          <div>
                            <p className="text-white text-sm font-semibold">{food.name}</p>
                            <p className="text-gray-600 text-xs">
                              P:{food.protein}g • C:{food.carbs}g • F:{food.fat}g
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-white font-black text-sm">{food.cal} kcal</p>
                          <button onClick={() => handleRemoveFood(meal, idx)}
                            className="w-6 h-6 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-600 hover:text-red-400 hover:border-red-600/50 opacity-0 group-hover:opacity-100 transition-all duration-200">
                            <X size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Macro summary row */}
                {foods.length > 0 && (
                  <div className="px-6 py-3 bg-black/20 flex gap-6 border-t border-gray-800/50">
                    {[
                      { label: 'P', val: foods.reduce((s,f) => s+f.protein,0), color: '#3b82f6' },
                      { label: 'C', val: foods.reduce((s,f) => s+f.carbs,0),   color: '#f59e0b' },
                      { label: 'F', val: foods.reduce((s,f) => s+f.fat,0),     color: '#22c55e' },
                    ].map((m, i) => (
                      <span key={i} className="text-xs font-bold" style={{ color: m.color }}>
                        {m.label}: {m.val}g
                      </span>
                    ))}
                  </div>
                )}

                {/* Add food form */}
                {addingTo === meal && (
                  <div className="p-6 bg-gray-950 border-t border-gray-800 space-y-4">
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Add Food</p>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                      <input placeholder="Food name" value={newFood.name}
                        onChange={e => setNewFood(p => ({ ...p, name: e.target.value }))}
                        className="sm:col-span-2 px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                      {[
                        { key: 'cal',     ph: 'Kcal'    },
                        { key: 'protein', ph: 'Protein g' },
                        { key: 'carbs',   ph: 'Carbs g'   },
                        { key: 'fat',     ph: 'Fat g'     },
                      ].map(f => (
                        <input key={f.key} type="number" placeholder={f.ph} value={newFood[f.key]}
                          onChange={e => setNewFood(p => ({ ...p, [f.key]: e.target.value }))}
                          className="px-4 py-2.5 bg-black border border-gray-800 rounded-lg focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => handleAddFood(meal)}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all">
                        <Check size={13}/> Add Food
                      </button>
                      <button onClick={() => setAddingTo(null)}
                        className="px-5 py-2.5 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white rounded-lg text-sm transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══════════════ MEAL PLAN ═══════════════ */}
      {activeTab === 'plan' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Recommended</p>
              <h2 className="text-2xl font-black uppercase">Daily Meal Plan</h2>
            </div>
            <div className="bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-center">
              <p className="text-white font-black">{mealPlan.reduce((s,m) => s+m.cal,0)}</p>
              <p className="text-gray-600 text-[9px] uppercase tracking-widest">total kcal</p>
            </div>
          </div>

          {mealPlan.map((m, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 group">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}30` }}>
                    <m.icon size={18} style={{ color: m.color }} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[9px] uppercase tracking-widest mb-0.5">{m.time}</p>
                    <h3 className="text-white font-black">{m.meal}</h3>
                    <div className="flex gap-3 mt-1">
                      {[
                        { label: 'P', val: `${m.protein}g`, color: '#3b82f6' },
                        { label: 'C', val: `${m.carbs}g`,   color: '#f59e0b' },
                        { label: 'F', val: `${m.fat}g`,     color: '#22c55e' },
                      ].map((macro, j) => (
                        <span key={j} className="text-[10px] font-bold" style={{ color: macro.color }}>
                          {macro.label}: {macro.val}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-black text-xl">{m.cal}</p>
                  <p className="text-gray-600 text-[9px] uppercase tracking-widest">kcal</p>
                </div>
              </div>

              {/* Food items */}
              <div className="px-6 pb-6 pt-0">
                <div className="border-t border-gray-800 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {m.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                      <p className="text-gray-400 text-xs">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════ FOOD DB ═══════════════ */}
      {activeTab === 'foods' && (
        <div className="space-y-5">
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              placeholder="Search food database..."
              value={searchFood}
              onChange={e => setSearchFood(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {foodDB
              .filter(f => f.name.toLowerCase().includes(searchFood.toLowerCase()))
              .map((food, i) => (
                <div key={i}
                  className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 group">

                  <div className="flex items-start justify-between mb-5">
                    <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                      <Apple size={15} className="text-red-500" />
                    </div>
                    <span className="text-red-400 font-black text-lg">{food.cal}<span className="text-gray-600 text-xs font-normal"> kcal</span></span>
                  </div>

                  <h3 className="text-white font-black mb-4 group-hover:text-red-400 transition-colors">{food.name}</h3>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Protein', val: `${food.protein}g`, color: '#3b82f6' },
                      { label: 'Carbs',   val: `${food.carbs}g`,   color: '#f59e0b' },
                      { label: 'Fat',     val: `${food.fat}g`,     color: '#22c55e' },
                    ].map((m, j) => (
                      <div key={j} className="bg-gray-900 rounded-lg px-2 py-2 text-center">
                        <p className="font-black text-sm" style={{ color: m.color }}>{m.val}</p>
                        <p className="text-gray-700 text-[9px] uppercase tracking-widest mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}