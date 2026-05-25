// src/pages/user/Workouts.jsx
import React, { useState } from 'react';
import {
  Dumbbell, Play, Clock, Flame, ChevronRight,
  Search, Filter, Star, Zap, Lock, Check,
  BarChart2, Target, TrendingUp, Plus, X,
  BookOpen, Users, Award, ArrowUpRight
} from 'lucide-react';

// ── Difficulty badge ──
const DiffBadge = ({ level }) => {
  const map = {
    Beginner:     'bg-green-600/15 text-green-400 border-green-600/30',
    Intermediate: 'bg-yellow-600/15 text-yellow-400 border-yellow-600/30',
    Advanced:     'bg-red-600/15 text-red-400 border-red-600/30',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${map[level] || map.Beginner}`}>
      {level}
    </span>
  );
};

// ── Mini progress bar ──
const MiniBar = ({ pct, color = '#dc2626' }) => (
  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
    <div className="h-full rounded-full transition-all duration-700"
      style={{ width: `${pct}%`, backgroundColor: color }} />
  </div>
);

export default function UserWorkouts() {
  const [activeTab,    setActiveTab]    = useState('plans');
  const [searchTerm,   setSearchTerm]   = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activePlan,   setActivePlan]   = useState(null);
  const [expanded,     setExpanded]     = useState(null);
  const [completedEx,  setCompletedEx]  = useState({});

  // ── Data ──
  const categories = ['All', 'Strength', 'Cardio', 'HIIT', 'Yoga', 'Recovery'];

  const plans = [
    {
      id: 1,
      title: 'Power Builder',
      category: 'Strength',
      difficulty: 'Intermediate',
      duration: '8 Weeks',
      sessions: '4x / week',
      calories: '450 avg',
      description: 'A structured hypertrophy program focused on compound lifts to build raw strength and muscle mass.',
      progress: 62,
      enrolled: true,
      image: 'bg-gradient-to-br from-red-900/40 to-black',
      color: '#dc2626',
      tags: ['Compound', 'Hypertrophy', 'Progressive'],
      weeks: 8,
      doneWeeks: 5,
    },
    {
      id: 2,
      title: 'HIIT Shred',
      category: 'HIIT',
      difficulty: 'Advanced',
      duration: '6 Weeks',
      sessions: '5x / week',
      calories: '600 avg',
      description: 'High-intensity interval training designed to torch fat and improve cardiovascular endurance rapidly.',
      progress: 0,
      enrolled: false,
      image: 'bg-gradient-to-br from-orange-900/40 to-black',
      color: '#f97316',
      tags: ['Fat Loss', 'Cardio', 'Endurance'],
      weeks: 6,
      doneWeeks: 0,
    },
    {
      id: 3,
      title: 'Beginner Foundation',
      category: 'Strength',
      difficulty: 'Beginner',
      duration: '4 Weeks',
      sessions: '3x / week',
      calories: '280 avg',
      description: 'A perfect starting point for gym newcomers. Learn proper form and build a solid movement foundation.',
      progress: 100,
      enrolled: true,
      image: 'bg-gradient-to-br from-green-900/40 to-black',
      color: '#22c55e',
      tags: ['Form', 'Foundation', 'Full Body'],
      weeks: 4,
      doneWeeks: 4,
    },
    {
      id: 4,
      title: 'Yoga Flow & Mobility',
      category: 'Yoga',
      difficulty: 'Beginner',
      duration: '4 Weeks',
      sessions: '6x / week',
      calories: '180 avg',
      description: 'Improve flexibility, reduce muscle soreness, and enhance mind-body connection through daily yoga flows.',
      progress: 0,
      enrolled: false,
      image: 'bg-gradient-to-br from-purple-900/40 to-black',
      color: '#8b5cf6',
      tags: ['Flexibility', 'Recovery', 'Mindfulness'],
      weeks: 4,
      doneWeeks: 0,
    },
    {
      id: 5,
      title: 'Cardio Endurance',
      category: 'Cardio',
      difficulty: 'Intermediate',
      duration: '6 Weeks',
      sessions: '5x / week',
      calories: '500 avg',
      description: 'Build your cardiovascular base with progressive running, cycling and rowing protocols.',
      progress: 30,
      enrolled: true,
      image: 'bg-gradient-to-br from-blue-900/40 to-black',
      color: '#3b82f6',
      tags: ['Running', 'Cycling', 'VO2 Max'],
      weeks: 6,
      doneWeeks: 2,
    },
    {
      id: 6,
      title: 'Active Recovery',
      category: 'Recovery',
      difficulty: 'Beginner',
      duration: '2 Weeks',
      sessions: '7x / week',
      calories: '120 avg',
      description: 'Dedicated recovery protocols with foam rolling, stretching and light movement to keep you fresh.',
      progress: 0,
      enrolled: false,
      image: 'bg-gradient-to-br from-cyan-900/40 to-black',
      color: '#06b6d4',
      tags: ['Foam Rolling', 'Stretching', 'Rest'],
      weeks: 2,
      doneWeeks: 0,
    },
  ];

  // Today's workout sessions
  const todaySessions = [
    {
      id: 'A',
      name: "Push Day — Chest & Triceps",
      plan: "Power Builder",
      week: 5, day: 3,
      warmup: [
        { name: 'Jump Rope', sets: '1', reps: '3 min', note: 'Moderate pace' },
        { name: 'Arm Circles', sets: '2', reps: '30 sec', note: 'Each direction' },
      ],
      exercises: [
        { id: 'e1', name: 'Barbell Bench Press',   sets: '4', reps: '8',  weight: '80 kg',  rest: '90s', muscle: 'Chest'    },
        { id: 'e2', name: 'Incline Dumbbell Press', sets: '3', reps: '10', weight: '28 kg',  rest: '75s', muscle: 'Upper Chest' },
        { id: 'e3', name: 'Cable Fly',              sets: '3', reps: '12', weight: '15 kg',  rest: '60s', muscle: 'Chest'    },
        { id: 'e4', name: 'Close-Grip Bench',       sets: '3', reps: '10', weight: '60 kg',  rest: '75s', muscle: 'Triceps'  },
        { id: 'e5', name: 'Tricep Pushdown',        sets: '3', reps: '12', weight: '25 kg',  rest: '60s', muscle: 'Triceps'  },
        { id: 'e6', name: 'Overhead Tricep Ext.',   sets: '3', reps: '12', weight: '20 kg',  rest: '60s', muscle: 'Triceps'  },
      ],
      cooldown: [
        { name: 'Chest Stretch', sets: '1', reps: '60 sec', note: 'Each side' },
        { name: 'Tricep Stretch', sets: '1', reps: '30 sec', note: 'Each arm' },
      ],
      duration: '55 min',
      calories: 420,
    },
  ];

  const exerciseLibrary = [
    { name: 'Barbell Bench Press', muscle: 'Chest',     equipment: 'Barbell', difficulty: 'Intermediate', sets: '3-5', reps: '4-8'  },
    { name: 'Back Squat',          muscle: 'Legs',      equipment: 'Barbell', difficulty: 'Intermediate', sets: '4-5', reps: '4-6'  },
    { name: 'Conventional Deadlift', muscle: 'Back',    equipment: 'Barbell', difficulty: 'Advanced',     sets: '3-5', reps: '3-5'  },
    { name: 'Pull-up',             muscle: 'Back',      equipment: 'Bodyweight',difficulty: 'Intermediate',sets: '3-4',reps: '6-10' },
    { name: 'Overhead Press',      muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate', sets: '3-4', reps: '6-8'  },
    { name: 'Romanian Deadlift',   muscle: 'Hamstrings',equipment: 'Barbell', difficulty: 'Intermediate', sets: '3-4', reps: '8-10' },
    { name: 'Dumbbell Curl',       muscle: 'Biceps',    equipment: 'Dumbbell',difficulty: 'Beginner',     sets: '3-4', reps: '10-12'},
    { name: 'Tricep Pushdown',     muscle: 'Triceps',   equipment: 'Cable',   difficulty: 'Beginner',     sets: '3-4', reps: '10-15'},
    { name: 'Lateral Raise',       muscle: 'Shoulders', equipment: 'Dumbbell',difficulty: 'Beginner',     sets: '3-4', reps: '12-15'},
    { name: 'Leg Press',           muscle: 'Legs',      equipment: 'Machine', difficulty: 'Beginner',     sets: '3-4', reps: '10-12'},
    { name: 'Cable Row',           muscle: 'Back',      equipment: 'Cable',   difficulty: 'Beginner',     sets: '3-4', reps: '10-12'},
    { name: 'Leg Curl',            muscle: 'Hamstrings',equipment: 'Machine', difficulty: 'Beginner',     sets: '3-4', reps: '10-15'},
  ];

  // Filter plans
  const filtered = plans.filter(p =>
    (activeFilter === 'All' || p.category === activeFilter) &&
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const myPlans    = plans.filter(p => p.enrolled);
  const todayPlan  = todaySessions[0];

  // Toggle exercise complete
  const toggleEx = (id) => setCompletedEx(prev => ({ ...prev, [id]: !prev[id] }));
  const doneCount = todayPlan.exercises.filter(e => completedEx[e.id]).length;
  const pct       = Math.round((doneCount / todayPlan.exercises.length) * 100);

  const tabs = [
    { id: 'plans',   label: 'Plans',    icon: BookOpen },
    { id: 'today',   label: 'Today',    icon: Play     },
    { id: 'my',      label: 'My Plans', icon: Star     },
    { id: 'library', label: 'Library',  icon: Dumbbell },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em]">Training</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase leading-none">
            Workout<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Plans</span>
          </h1>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Dumbbell,  label: `${myPlans.length} Active`,   sub: 'plans enrolled' },
            { icon: BarChart2, label: '18 Sessions',                sub: 'this month'     },
            { icon: Award,     label: '1 Completed',                sub: 'programs'       },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3">
              <s.icon size={14} className="text-red-500" />
              <div>
                <p className="text-white text-sm font-black">{s.label}</p>
                <p className="text-gray-600 text-[9px] uppercase tracking-widest">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 mb-8 bg-gray-950 border border-gray-800 rounded-xl p-1 w-fit overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
              activeTab === t.id ? 'bg-red-600 text-white shadow-lg shadow-red-900/30' : 'text-gray-500 hover:text-white'
            }`}>
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════ PLANS TAB ═══════════════ */}
      {activeTab === 'plans' && (
        <div className="space-y-6">

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input
                placeholder="Search workout plans..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-950 border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Plan grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(plan => (
              <div key={plan.id}
                className={`relative rounded-2xl border overflow-hidden flex flex-col transition-all duration-500 group ${
                  activePlan === plan.id
                    ? 'border-red-600/60 scale-[1.01]'
                    : 'border-gray-800 hover:border-gray-600'
                }`}
              >
                {/* Card header image area */}
                <div className={`${plan.image} p-6 border-b border-gray-800`}>
                  <div className="flex items-start justify-between mb-4">
                    <DiffBadge level={plan.difficulty} />
                    {plan.enrolled && plan.progress === 100
                      ? <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center"><Check size={12} className="text-white" /></div>
                      : plan.enrolled
                      ? <div className="flex items-center gap-1 bg-black/40 border border-gray-700 px-2.5 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span className="text-green-400 text-[9px] font-bold uppercase">Active</span></div>
                      : null
                    }
                  </div>

                  <h3 className="text-white font-black text-xl mb-1">{plan.title}</h3>
                  <p className="text-gray-400 text-xs mb-4">{plan.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {plan.tags.map(tag => (
                      <span key={tag} className="text-[9px] bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Card body */}
                <div className="bg-[#0a0a0a] p-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { icon: Clock,   val: plan.duration  },
                      { icon: Users,   val: plan.sessions  },
                      { icon: Flame,   val: plan.calories  },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <s.icon size={13} className="text-gray-600 mx-auto mb-1" />
                        <p className="text-white text-xs font-bold">{s.val}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress (enrolled) */}
                  {plan.enrolled && (
                    <div className="mb-5">
                      <div className="flex justify-between text-[10px] text-gray-600 mb-1.5 uppercase tracking-widest">
                        <span>Week {plan.doneWeeks}/{plan.weeks}</span>
                        <span style={{ color: plan.color }}>{plan.progress}%</span>
                      </div>
                      <MiniBar pct={plan.progress} color={plan.color} />
                    </div>
                  )}

                  <button
                    onClick={() => { setActivePlan(plan.id); if (plan.enrolled) setActiveTab('today'); }}
                    className={`mt-auto w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 ${
                      plan.enrolled
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20'
                        : 'border border-gray-700 hover:border-red-600 text-gray-400 hover:text-white hover:bg-red-600/5'
                    }`}>
                    {plan.enrolled
                      ? plan.progress === 100 ? <><Award size={14}/> Completed</> : <><Play size={14}/> Continue</>
                      : <><Plus size={14}/> Enroll Now</>
                    }
                  </button>
                </div>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500 ${
                  activePlan === plan.id ? 'w-full' : 'w-0'
                }`} style={{ backgroundColor: plan.color }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════ TODAY TAB ═══════════════ */}
      {activeTab === 'today' && (
        <div className="max-w-3xl space-y-5">

          {/* Session header */}
          <div className="bg-gradient-to-r from-red-900/25 to-black border border-red-800/30 rounded-2xl p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-red-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                  Power Builder • Week {todayPlan.week} • Day {todayPlan.day}
                </p>
                <h2 className="text-white font-black text-2xl">{todayPlan.name}</h2>
              </div>
              <div className="flex gap-4">
                {[
                  { icon: Clock, val: todayPlan.duration },
                  { icon: Flame, val: `${todayPlan.calories} kcal` },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <s.icon size={14} className="text-red-500 mx-auto mb-1" />
                    <p className="text-white text-sm font-black">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Session progress */}
            <div className="mt-5">
              <div className="flex justify-between text-[10px] text-gray-500 mb-2 uppercase tracking-widest">
                <span>{doneCount}/{todayPlan.exercises.length} exercises done</span>
                <span className="text-red-400 font-bold">{pct}%</span>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>

          {/* Warmup */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <p className="text-yellow-400 text-xs font-black uppercase tracking-widest">Warm-Up</p>
            </div>
            <div className="divide-y divide-gray-800/50">
              {todayPlan.warmup.map((w, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-3.5">
                  <div>
                    <p className="text-gray-300 text-sm font-semibold">{w.name}</p>
                    <p className="text-gray-600 text-xs">{w.note}</p>
                  </div>
                  <p className="text-gray-500 text-xs">{w.sets} × {w.reps}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Main exercises */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <p className="text-red-400 text-xs font-black uppercase tracking-widest">Main Workout</p>
            </div>
            <div className="divide-y divide-gray-800/50">
              {todayPlan.exercises.map((ex, i) => {
                const done = !!completedEx[ex.id];
                return (
                  <div
                    key={ex.id}
                    onClick={() => toggleEx(ex.id)}
                    className={`flex items-center justify-between px-6 py-4 cursor-pointer transition-all duration-300 ${
                      done ? 'bg-green-600/5' : 'hover:bg-gray-950'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Number / Check */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm transition-all duration-300 ${
                        done ? 'bg-green-600 text-white' : 'bg-gray-900 border border-gray-700 text-gray-500'
                      }`}>
                        {done ? <Check size={14} /> : `${i + 1}`}
                      </div>
                      <div>
                        <p className={`text-sm font-bold transition-colors ${done ? 'text-green-400' : 'text-white'}`}>
                          {ex.name}
                        </p>
                        <p className="text-gray-600 text-xs">{ex.muscle} • Rest {ex.rest}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-black transition-colors ${done ? 'text-green-400' : 'text-white'}`}>
                        {ex.sets} × {ex.reps}
                      </p>
                      <p className="text-gray-600 text-xs">{ex.weight}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cooldown */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <p className="text-blue-400 text-xs font-black uppercase tracking-widest">Cool-Down</p>
            </div>
            <div className="divide-y divide-gray-800/50">
              {todayPlan.cooldown.map((c, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-3.5">
                  <div>
                    <p className="text-gray-300 text-sm font-semibold">{c.name}</p>
                    <p className="text-gray-600 text-xs">{c.note}</p>
                  </div>
                  <p className="text-gray-500 text-xs">{c.reps}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Finish button */}
          <button
            disabled={pct < 100}
            className={`w-full flex items-center justify-center gap-2 font-black py-5 rounded-2xl text-sm uppercase tracking-wider transition-all duration-300 ${
              pct === 100
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/30'
                : 'bg-gray-900 border border-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {pct === 100
              ? <><Award size={18}/> Workout Complete! Log It</>
              : <><Lock size={14}/> Complete all exercises to finish</>
            }
          </button>
        </div>
      )}

      {/* ═══════════════ MY PLANS TAB ═══════════════ */}
      {activeTab === 'my' && (
        <div className="space-y-4">
          {myPlans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-4">
                <Dumbbell size={28} className="text-gray-700" />
              </div>
              <p className="text-gray-500 text-sm uppercase tracking-widest">No plans enrolled yet</p>
              <button onClick={() => setActiveTab('plans')}
                className="mt-5 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-sm transition-all">
                <Plus size={14}/> Browse Plans
              </button>
            </div>
          ) : (
            myPlans.map(plan => (
              <div key={plan.id}
                className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300">

                <div
                  className="flex items-center justify-between p-6 cursor-pointer"
                  onClick={() => setExpanded(expanded === plan.id ? null : plan.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${plan.color}15`, border: `1px solid ${plan.color}30` }}>
                      <Dumbbell size={18} style={{ color: plan.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-white font-black">{plan.title}</p>
                        <DiffBadge level={plan.difficulty} />
                        {plan.progress === 100 && (
                          <span className="text-[9px] bg-green-600/15 text-green-400 border border-green-600/30 px-2 py-0.5 rounded-full font-black uppercase">Done</span>
                        )}
                      </div>
                      <p className="text-gray-500 text-xs">{plan.sessions} • {plan.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-white font-black text-lg" style={{ color: plan.color }}>{plan.progress}%</p>
                      <p className="text-gray-600 text-xs">Wk {plan.doneWeeks}/{plan.weeks}</p>
                    </div>
                    <ChevronRight size={16} className={`text-gray-600 transition-transform duration-300 ${expanded === plan.id ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {/* Expanded detail */}
                {expanded === plan.id && (
                  <div className="border-t border-gray-800 p-6 space-y-4">
                    <div className="mb-2">
                      <div className="flex justify-between text-[10px] text-gray-600 mb-2 uppercase tracking-widest">
                        <span>Week {plan.doneWeeks} of {plan.weeks}</span>
                        <span style={{ color: plan.color }}>{plan.progress}% complete</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${plan.progress}%`, backgroundColor: plan.color }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Duration',  val: plan.duration  },
                        { label: 'Frequency', val: plan.sessions  },
                        { label: 'Calories',  val: plan.calories  },
                      ].map((s, i) => (
                        <div key={i} className="bg-gray-900 rounded-xl p-4 text-center">
                          <p className="text-white font-black text-sm">{s.val}</p>
                          <p className="text-gray-600 text-[9px] uppercase tracking-widest mt-1">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setActiveTab('today')}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all">
                        <Play size={14}/> Continue
                      </button>
                      <button className="px-5 py-3.5 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white rounded-xl text-sm transition-all">
                        Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* ═══════════════ LIBRARY TAB ═══════════════ */}
      {activeTab === 'library' && (
        <div className="space-y-5">
          {/* Search */}
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors"
            />
          </div>

          {/* Exercise grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {exerciseLibrary
              .filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((ex, i) => (
                <div key={i}
                  className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 group">

                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                      <Dumbbell size={16} className="text-red-500" />
                    </div>
                    <DiffBadge level={ex.difficulty} />
                  </div>

                  <h3 className="text-white font-black mb-1 group-hover:text-red-400 transition-colors">{ex.name}</h3>
                  <p className="text-gray-600 text-xs mb-4">{ex.muscle} • {ex.equipment}</p>

                  <div className="flex gap-3">
                    <div className="flex-1 bg-gray-900 rounded-lg px-3 py-2 text-center">
                      <p className="text-white text-xs font-black">{ex.sets}</p>
                      <p className="text-gray-600 text-[9px] uppercase tracking-widest">Sets</p>
                    </div>
                    <div className="flex-1 bg-gray-900 rounded-lg px-3 py-2 text-center">
                      <p className="text-white text-xs font-black">{ex.reps}</p>
                      <p className="text-gray-600 text-[9px] uppercase tracking-widest">Reps</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

    </div>
  );
}