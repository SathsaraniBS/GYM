// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import UserSidebar from '../components/User/UserSidebar';
import {
  Activity, Flame, Dumbbell, Trophy, TrendingUp,
  Calendar, Clock, ChevronRight, Target, Zap,
  BarChart2, Heart, ArrowUpRight, CheckCircle2, Circle
} from 'lucide-react';

// ── Mini sparkline bar chart (CSS only) ──
const Sparkline = ({ data, color = '#dc2626' }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all duration-500"
          style={{
            height: `${(v / max) * 100}%`,
            backgroundColor: color,
            opacity: i === data.length - 1 ? 1 : 0.3 + (i / data.length) * 0.7,
          }}
        />
      ))}
    </div>
  );
};

// ── Circular progress ring ──
const RingProgress = ({ percent, size = 80, stroke = 6, color = '#dc2626', children }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1f2937" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
};

function UserDashboard() {
  const { user } = useAuth();
  const [loading, setLoading]     = useState(true);
  const [greeting, setGreeting]   = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [todayDone, setTodayDone] = useState([false, false, false, false]);

  useEffect(() => {
    if (user !== undefined) setLoading(false);
    const h = new Date().getHours();
    setGreeting(h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening');
  }, [user]);

  if (loading) return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm uppercase tracking-widest">Loading your dashboard</p>
      </div>
    </div>
  );

  if (!user) return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Please log in to access your dashboard.</p>
    </div>
  );

  // ── Mock data ──
  const stats = [
    {
      label: 'Calories Burned',
      value: '2,340',
      unit: 'kcal',
      icon: Flame,
      color: '#ef4444',
      bg: 'bg-red-600/10',
      border: 'border-red-600/20',
      change: '+12%',
      up: true,
      spark: [40, 65, 50, 80, 60, 90, 85],
    },
    {
      label: 'Workouts Done',
      value: '18',
      unit: 'sessions',
      icon: Dumbbell,
      color: '#3b82f6',
      bg: 'bg-blue-600/10',
      border: 'border-blue-600/20',
      change: '+3',
      up: true,
      spark: [2, 4, 3, 5, 4, 6, 5],
    },
    {
      label: 'Active Minutes',
      value: '840',
      unit: 'min',
      icon: Activity,
      color: '#22c55e',
      bg: 'bg-green-600/10',
      border: 'border-green-600/20',
      change: '+8%',
      up: true,
      spark: [60, 90, 75, 110, 95, 130, 120],
    },
    {
      label: 'Personal Records',
      value: '5',
      unit: 'this month',
      icon: Trophy,
      color: '#f59e0b',
      bg: 'bg-yellow-600/10',
      border: 'border-yellow-600/20',
      change: '+2',
      up: true,
      spark: [1, 1, 2, 3, 3, 4, 5],
    },
  ];

  const weeklyWorkouts = [
    { day: 'Mon', done: true,  type: 'Chest & Triceps',   duration: '52 min', cal: 420 },
    { day: 'Tue', done: true,  type: 'HIIT Cardio',       duration: '30 min', cal: 380 },
    { day: 'Wed', done: true,  type: 'Back & Biceps',     duration: '48 min', cal: 390 },
    { day: 'Thu', done: false, type: 'Rest Day',          duration: '—',      cal: 0   },
    { day: 'Fri', done: true,  type: 'Legs & Shoulders',  duration: '55 min', cal: 460 },
    { day: 'Sat', done: false, type: 'Core & Mobility',   duration: '—',      cal: 0   },
    { day: 'Sun', done: false, type: 'Active Recovery',   duration: '—',      cal: 0   },
  ];

  const todayWorkout = [
    { name: 'Barbell Squat',   sets: '4 × 8',  weight: '80 kg' },
    { name: 'Leg Press',       sets: '3 × 12', weight: '120 kg' },
    { name: 'Romanian Deadlift',sets: '3 × 10', weight: '60 kg' },
    { name: 'Leg Curl',        sets: '3 × 12', weight: '40 kg' },
  ];

  const goals = [
    { label: 'Weekly Workouts',  current: 4, target: 5,   unit: 'sessions', color: '#dc2626' },
    { label: 'Protein Intake',   current: 145, target: 180, unit: 'g/day',  color: '#3b82f6' },
    { label: 'Cardio Minutes',   current: 120, target: 150, unit: 'min/wk', color: '#22c55e' },
    { label: 'Body Weight Goal', current: 82, target: 78,   unit: 'kg',     color: '#f59e0b' },
  ];

  const upcomingClasses = [
    { name: 'Boxing HIIT',      time: 'Tomorrow 7:00 AM', trainer: 'Ayesh R.',   spots: 3  },
    { name: 'Power Yoga Flow',  time: 'Wed 6:30 PM',      trainer: 'Dulshan M.', spots: 8  },
    { name: 'Strength Circuit', time: 'Fri 8:00 AM',      trainer: 'Thumesh A.', spots: 5  },
  ];

  return (
    <div className="bg-black min-h-screen text-white">

        <UserSidebar />

        {/* ── Main Content ── */}
        <main className="flex-1 lg:ml-64 p-6 md:p-8 overflow-y-auto min-h-screen">
          <div className="max-w-7xl mx-auto">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-semibold mb-1">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <h1 className="text-3xl md:text-4xl font-black text-white">
                  {greeting},{' '}
                  <span className="text-red-500">{user?.name?.split(' ')[0] || 'Athlete'}</span> 👊
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  You're on a <span className="text-red-400 font-bold">7-day streak</span> — keep it up!
                </p>
              </div>

              {/* Quick action */}
              <button className="self-start flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg shadow-red-900/40">
                <Zap size={16} /> Log Workout
              </button>
            </div>

            {/* ── Tabs ── */}
            <div className="flex gap-1 mb-8 bg-gray-950 border border-gray-800 rounded-xl p-1 w-fit">
              {['overview', 'workouts', 'goals', 'schedule'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* ══════════════ OVERVIEW TAB ══════════════ */}
            {activeTab === 'overview' && (
              <div className="space-y-6">

                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {stats.map((s, i) => (
                    <div key={i}
                      className={`bg-[#0a0a0a] border ${s.border} rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 group`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-10 h-10 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center`}>
                          <s.icon size={18} style={{ color: s.color }} />
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.up ? 'bg-green-600/10 text-green-400' : 'bg-red-600/10 text-red-400'}`}>
                          {s.change}
                        </span>
                      </div>
                      <p className="text-2xl font-black text-white mb-0.5">{s.value}</p>
                      <p className="text-gray-600 text-xs uppercase tracking-widest mb-4">{s.unit}</p>
                      <Sparkline data={s.spark} color={s.color} />
                      <p className="text-gray-500 text-xs mt-2">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Middle row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                  {/* Today's workout */}
                  <div className="lg:col-span-2 bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Today's Plan</p>
                        <h3 className="text-white font-black text-lg uppercase">Legs & Shoulders</h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock size={12} /> 55 min est.
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      {todayWorkout.map((ex, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            const next = [...todayDone];
                            next[i] = !next[i];
                            setTodayDone(next);
                          }}
                          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                            todayDone[i] ? 'bg-green-600/10 border border-green-600/20' : 'bg-gray-950 border border-gray-800 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {todayDone[i]
                              ? <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                              : <Circle size={18} className="text-gray-700 flex-shrink-0" />
                            }
                            <div>
                              <p className={`text-sm font-bold ${todayDone[i] ? 'text-green-400 line-through' : 'text-white'}`}>{ex.name}</p>
                              <p className="text-gray-600 text-xs">{ex.sets}</p>
                            </div>
                          </div>
                          <span className="text-gray-500 text-xs font-semibold">{ex.weight}</span>
                        </div>
                      ))}
                    </div>
                    <div className="px-6 pb-6">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{todayDone.filter(Boolean).length}/{todayDone.length} exercises</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-600 rounded-full transition-all duration-500"
                          style={{ width: `${(todayDone.filter(Boolean).length / todayDone.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Goals progress */}
                  <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-white font-black uppercase text-sm">Weekly Goals</h3>
                      <Target size={16} className="text-red-500" />
                    </div>
                    <div className="space-y-5">
                      {goals.map((g, i) => {
                        const pct = Math.min((g.current / g.target) * 100, 100);
                        return (
                          <div key={i}>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-gray-400 font-semibold">{g.label}</span>
                              <span className="text-gray-600">{g.current}/{g.target} {g.unit}</span>
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{ width: `${pct}%`, backgroundColor: g.color }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Weekly activity heatmap */}
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">This Week</p>
                      <h3 className="text-white font-black uppercase">Activity Log</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <BarChart2 size={14} /> 4/7 days active
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-3">
                    {weeklyWorkouts.map((w, i) => (
                      <div key={i} className="text-center">
                        <p className="text-gray-600 text-xs uppercase mb-2">{w.day}</p>
                        <div className={`aspect-square rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${
                          w.done
                            ? 'bg-red-600/20 border border-red-600/40'
                            : 'bg-gray-900 border border-gray-800'
                        }`}>
                          {w.done
                            ? <CheckCircle2 size={18} className="text-red-500" />
                            : <Circle size={18} className="text-gray-700" />
                          }
                        </div>
                        {w.done && <p className="text-red-500 text-[9px] font-bold">{w.cal} cal</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ══════════════ WORKOUTS TAB ══════════════ */}
            {activeTab === 'workouts' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-black uppercase">This Week's Plan</h2>
                  <button className="text-red-500 text-sm flex items-center gap-1 hover:text-red-400">
                    Full Schedule <ChevronRight size={14} />
                  </button>
                </div>
                {weeklyWorkouts.map((w, i) => (
                  <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                    w.done ? 'bg-green-600/5 border-green-600/20' : 'bg-[#0a0a0a] border-gray-800 hover:border-gray-600'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm ${
                        w.done ? 'bg-green-600/20 text-green-400' : 'bg-gray-900 text-gray-600'
                      }`}>{w.day}</div>
                      <div>
                        <p className={`font-bold ${w.done ? 'text-green-400' : 'text-white'}`}>{w.type}</p>
                        <p className="text-gray-600 text-xs">{w.duration} {w.cal > 0 ? `• ${w.cal} kcal` : ''}</p>
                      </div>
                    </div>
                    {w.done
                      ? <CheckCircle2 size={20} className="text-green-500" />
                      : <button className="text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-full transition">Start</button>
                    }
                  </div>
                ))}
              </div>
            )}

            {/* ══════════════ GOALS TAB ══════════════ */}
            {activeTab === 'goals' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map((g, i) => {
                  const pct = Math.min((g.current / g.target) * 100, 100);
                  return (
                    <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-all duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Goal</p>
                          <h3 className="text-white font-black text-lg">{g.label}</h3>
                        </div>
                        <RingProgress percent={pct} size={72} stroke={5} color={g.color}>
                          <span className="text-white text-xs font-black">{Math.round(pct)}%</span>
                        </RingProgress>
                      </div>
                      <div className="flex items-end gap-2 mb-4">
                        <span className="text-4xl font-black text-white">{g.current}</span>
                        <span className="text-gray-500 text-sm mb-1">/ {g.target} {g.unit}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, backgroundColor: g.color }} />
                      </div>
                      <p className="text-gray-600 text-xs mt-2">{g.target - g.current} {g.unit} remaining</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ══════════════ SCHEDULE TAB ══════════════ */}
            {activeTab === 'schedule' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-black uppercase mb-6">Upcoming Classes</h2>
                {upcomingClasses.map((cls, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-red-600/40 transition-all duration-300 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                          <Calendar size={20} className="text-red-500" />
                        </div>
                        <div>
                          <p className="text-white font-black">{cls.name}</p>
                          <p className="text-gray-500 text-sm">{cls.time} • {cls.trainer}</p>
                          <p className="text-yellow-500 text-xs mt-1">{cls.spots} spots left</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all duration-300 opacity-0 group-hover:opacity-100">
                        Book <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Membership card */}
                <div className="mt-8 bg-gradient-to-br from-red-900/30 to-black border border-red-800/40 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart size={20} className="text-red-500" />
                    <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Active Membership</p>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Individual Gents Plan</h3>
                  <p className="text-gray-500 text-sm mb-6">Valid until: <span className="text-white font-semibold">December 31, 2025</span></p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-xs uppercase tracking-widest">Branch</p>
                      <p className="text-white font-bold">Colombo 7</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs uppercase tracking-widest">Status</p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <p className="text-green-400 font-bold text-sm">Active</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 border border-red-600/50 hover:border-red-500 text-red-400 hover:text-white font-bold px-5 py-2.5 rounded-full text-sm transition-all duration-300">
                      Renew <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
  );
}

export default UserDashboard;