// src/pages/user/Milestones.jsx
import React, { useState } from 'react';
import {
  Trophy, Star, Zap, Lock, Check, Flame,
  Dumbbell, Target, TrendingUp, Calendar,
  Award, Medal, Crown, Shield, Heart,
  ChevronRight, BarChart2, Clock, Users
} from 'lucide-react';

// ── Rarity badge ──
const RarityBadge = ({ rarity }) => {
  const map = {
    Common:    'bg-gray-700/50 text-gray-400 border-gray-600',
    Rare:      'bg-blue-600/15 text-blue-400 border-blue-600/30',
    Epic:      'bg-purple-600/15 text-purple-400 border-purple-600/30',
    Legendary: 'bg-yellow-600/15 text-yellow-400 border-yellow-600/30',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${map[rarity]}`}>
      {rarity}
    </span>
  );
};

// ── XP Progress bar ──
const XPBar = ({ current, max, color = '#dc2626' }) => (
  <div>
    <div className="flex justify-between text-[10px] mb-1.5 uppercase tracking-widest">
      <span className="text-gray-600">{current} XP</span>
      <span style={{ color }}>{max} XP</span>
    </div>
    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000"
        style={{ width: `${(current / max) * 100}%`, backgroundColor: color }} />
    </div>
  </div>
);

// ── Stat ring ──
const StatRing = ({ pct, color, size = 64, stroke = 5, children }) => {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off  = circ - (Math.min(pct, 100) / 100) * circ;
  return (
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
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
};

export default function Milestones() {
  const [activeTab,     setActiveTab]     = useState('overview');
  const [activeFilter,  setActiveFilter]  = useState('All');
  const [hoveredBadge,  setHoveredBadge]  = useState(null);

  // ── Player level data ──
  const player = {
    name:       'John',
    level:      12,
    title:      'Iron Athlete',
    xp:         2840,
    xpNext:     3000,
    totalXP:    8840,
    streak:     7,
    rank:       'Silver II',
    badges:     18,
    completed:  24,
  };

  // ── Achievements ──
  const achievements = [
    // Workout
    { id: 1,  icon: Flame,    title: 'First Blood',         desc: 'Complete your first workout',                   xp: 50,   rarity: 'Common',    cat: 'Workout',   done: true,  date: 'Jan 5, 2025',  color: '#ef4444' },
    { id: 2,  icon: Dumbbell, title: 'Iron Will',           desc: 'Complete 10 workouts',                         xp: 150,  rarity: 'Common',    cat: 'Workout',   done: true,  date: 'Jan 18, 2025', color: '#dc2626' },
    { id: 3,  icon: Dumbbell, title: 'Grind Mode',          desc: 'Complete 50 workouts',                         xp: 500,  rarity: 'Rare',      cat: 'Workout',   done: true,  date: 'Mar 2, 2025',  color: '#3b82f6' },
    { id: 4,  icon: Crown,    title: 'Century Club',        desc: 'Complete 100 workouts',                        xp: 1000, rarity: 'Epic',      cat: 'Workout',   done: false, date: null,           color: '#8b5cf6', progress: 48, target: 100 },
    { id: 5,  icon: Trophy,   title: 'Legend Status',       desc: 'Complete 500 workouts',                        xp: 5000, rarity: 'Legendary', cat: 'Workout',   done: false, date: null,           color: '#f59e0b', progress: 48, target: 500 },

    // Streak
    { id: 6,  icon: Zap,      title: 'Spark',               desc: 'Maintain a 3-day streak',                      xp: 75,   rarity: 'Common',    cat: 'Streak',    done: true,  date: 'Jan 8, 2025',  color: '#f59e0b' },
    { id: 7,  icon: Zap,      title: 'On Fire',             desc: 'Maintain a 7-day streak',                      xp: 200,  rarity: 'Rare',      cat: 'Streak',    done: true,  date: 'Jan 12, 2025', color: '#f97316' },
    { id: 8,  icon: Flame,    title: 'Unstoppable',         desc: 'Maintain a 30-day streak',                     xp: 750,  rarity: 'Epic',      cat: 'Streak',    done: false, date: null,           color: '#ef4444', progress: 7, target: 30 },
    { id: 9,  icon: Crown,    title: 'Immortal',            desc: 'Maintain a 365-day streak',                    xp: 10000,rarity: 'Legendary', cat: 'Streak',    done: false, date: null,           color: '#f59e0b', progress: 7, target: 365 },

    // Strength PRs
    { id: 10, icon: TrendingUp, title: 'First PR',          desc: 'Set your first personal record',               xp: 100,  rarity: 'Common',    cat: 'Strength',  done: true,  date: 'Jan 25, 2025', color: '#22c55e' },
    { id: 11, icon: TrendingUp, title: 'PR Machine',        desc: 'Set 10 personal records',                      xp: 400,  rarity: 'Rare',      cat: 'Strength',  done: false, date: null,           color: '#3b82f6', progress: 5, target: 10 },
    { id: 12, icon: Shield,   title: '100kg Club',          desc: 'Bench press 100kg',                            xp: 500,  rarity: 'Epic',      cat: 'Strength',  done: false, date: null,           color: '#8b5cf6', progress: 85, target: 100 },
    { id: 13, icon: Crown,    title: '2x Body Weight',      desc: 'Deadlift 2x your body weight',                 xp: 1500, rarity: 'Legendary', cat: 'Strength',  done: false, date: null,           color: '#f59e0b', progress: 130, target: 164 },

    // Nutrition
    { id: 14, icon: Target,   title: 'Fuel Up',             desc: 'Log your first meal',                          xp: 25,   rarity: 'Common',    cat: 'Nutrition', done: true,  date: 'Jan 6, 2025',  color: '#22c55e' },
    { id: 15, icon: Target,   title: 'Macro Master',        desc: 'Hit all macros for 7 consecutive days',        xp: 300,  rarity: 'Rare',      cat: 'Nutrition', done: false, date: null,           color: '#3b82f6', progress: 3, target: 7 },
    { id: 16, icon: Heart,    title: 'Clean Eater',         desc: 'Log meals for 30 consecutive days',            xp: 600,  rarity: 'Epic',      cat: 'Nutrition', done: false, date: null,           color: '#ec4899', progress: 12, target: 30 },

    // Cardio
    { id: 17, icon: Flame,    title: 'Cardio Starter',      desc: 'Complete your first cardio session',           xp: 50,   rarity: 'Common',    cat: 'Cardio',    done: true,  date: 'Jan 7, 2025',  color: '#f97316' },
    { id: 18, icon: Medal,    title: 'Half Marathon Ready', desc: 'Run 21km total distance',                      xp: 800,  rarity: 'Epic',      cat: 'Cardio',    done: false, date: null,           color: '#8b5cf6', progress: 14, target: 21 },
  ];

  // ── Monthly challenges ──
  const challenges = [
    { title: 'May Shred Challenge',    desc: 'Complete 20 workouts this month',    progress: 12, target: 20, reward: '500 XP + Epic Badge', ends: '5 days', color: '#dc2626', icon: Dumbbell },
    { title: 'Hydration Hero',         desc: 'Hit water goal for 25 days in May',  progress: 18, target: 25, reward: '300 XP + Rare Badge', ends: '5 days', color: '#3b82f6', icon: Target   },
    { title: 'Cardio King',            desc: 'Burn 5000 kcal through cardio',       progress: 3200, target: 5000, reward: '750 XP + Epic Badge', ends: '5 days', color: '#f97316', icon: Flame },
    { title: 'Protein Power',          desc: 'Hit protein goal for 20 days',        progress: 14, target: 20, reward: '400 XP + Rare Badge', ends: '5 days', color: '#22c55e', icon: Medal  },
  ];

  // ── Leaderboard ──
  const leaderboard = [
    { rank: 1, name: 'Ayesh R.',    xp: 12500, badge: 'Legendary', avatar: 'A', color: '#f59e0b' },
    { rank: 2, name: 'Thumesh A.',  xp: 10800, badge: 'Epic',      avatar: 'T', color: '#8b5cf6' },
    { rank: 3, name: 'Dulshan M.',  xp: 9400,  badge: 'Epic',      avatar: 'D', color: '#8b5cf6' },
    { rank: 4, name: 'Kasun P.',    xp: 8900,  badge: 'Rare',      avatar: 'K', color: '#3b82f6' },
    { rank: 5, name: 'John S.',     xp: 8840,  badge: 'Rare',      avatar: 'J', color: '#3b82f6', isUser: true },
    { rank: 6, name: 'Nimal S.',    xp: 7200,  badge: 'Rare',      avatar: 'N', color: '#3b82f6' },
    { rank: 7, name: 'Ruwan D.',    xp: 6100,  badge: 'Common',    avatar: 'R', color: '#6b7280' },
  ];

  const categories  = ['All', 'Workout', 'Streak', 'Strength', 'Nutrition', 'Cardio'];
  const done        = achievements.filter(a => a.done);
  const inProgress  = achievements.filter(a => !a.done && a.progress !== undefined);
  const locked      = achievements.filter(a => !a.done && a.progress === undefined);
  const filtered    = achievements.filter(a =>
    (activeFilter === 'All' || a.cat === activeFilter)
  );

  const tabs = [
    { id: 'overview',    label: 'Overview',   icon: BarChart2  },
    { id: 'achievements',label: 'Badges',     icon: Trophy     },
    { id: 'challenges',  label: 'Challenges', icon: Target     },
    { id: 'leaderboard', label: 'Leaderboard',icon: Users      },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em]">Achievements</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase leading-none">
            Milestones &<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Achievements</span>
          </h1>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Trophy,    label: `${done.length} Earned`,   sub: 'achievements'  },
            { icon: Zap,       label: `${player.streak}-Day`,    sub: 'current streak'},
            { icon: Star,      label: `${player.totalXP} XP`,   sub: 'total earned'  },
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

      {/* ══════════ OVERVIEW ══════════ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">

          {/* Player card */}
          <div className="bg-gradient-to-br from-red-900/20 via-black to-black border border-red-800/30 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

              {/* Avatar + level ring */}
              <div className="relative flex-shrink-0">
                <StatRing pct={(player.xp / player.xpNext) * 100} color="#dc2626" size={100} stroke={6}>
                  <div className="text-center">
                    <p className="text-white font-black text-lg leading-none">{player.level}</p>
                    <p className="text-gray-600 text-[8px] uppercase">LVL</p>
                  </div>
                </StatRing>
                <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                  {player.rank}
                </div>
              </div>

              {/* Player info */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-red-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">{player.title}</p>
                <h2 className="text-white font-black text-3xl mb-4">{player.name}</h2>
                <XPBar current={player.xp} max={player.xpNext} color="#dc2626" />
                <p className="text-gray-600 text-xs mt-2">{player.xpNext - player.xp} XP to Level {player.level + 1}</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 flex-shrink-0">
                {[
                  { label: 'Total XP',  val: player.totalXP.toLocaleString(), color: '#f59e0b' },
                  { label: 'Badges',    val: player.badges,    color: '#8b5cf6' },
                  { label: 'Streak',    val: `${player.streak}d`, color: '#22c55e' },
                  { label: 'Completed', val: player.completed, color: '#3b82f6' },
                ].map((s, i) => (
                  <div key={i} className="bg-black/40 border border-gray-800 rounded-xl p-4 text-center">
                    <p className="font-black text-xl" style={{ color: s.color }}>{s.val}</p>
                    <p className="text-gray-600 text-[9px] uppercase tracking-widest mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Recent achievements */}
            <div className="lg:col-span-2 bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Latest</p>
                  <h3 className="text-white font-black uppercase">Recent Badges</h3>
                </div>
                <button onClick={() => setActiveTab('achievements')}
                  className="flex items-center gap-1 text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-colors">
                  See All <ChevronRight size={12} />
                </button>
              </div>
              <div className="divide-y divide-gray-800/50">
                {done.slice(0, 5).map((a, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-gray-950 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${a.color}15`, border: `1px solid ${a.color}30` }}>
                        <a.icon size={16} style={{ color: a.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-white font-bold text-sm">{a.title}</p>
                          <RarityBadge rarity={a.rarity} />
                        </div>
                        <p className="text-gray-600 text-xs">{a.desc}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="text-yellow-400 font-black text-sm">+{a.xp} XP</p>
                      <p className="text-gray-700 text-[9px]">{a.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress towards next */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
              <div className="mb-6">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">In Progress</p>
                <h3 className="text-white font-black uppercase">Almost There</h3>
              </div>
              <div className="space-y-5">
                {inProgress.slice(0, 4).map((a, i) => {
                  const pct = Math.round((a.progress / a.target) * 100);
                  return (
                    <div key={i}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${a.color}15`, border: `1px solid ${a.color}30` }}>
                          <a.icon size={12} style={{ color: a.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="text-white text-xs font-bold truncate">{a.title}</p>
                            <p className="text-[10px] font-bold ml-2 flex-shrink-0" style={{ color: a.color }}>{pct}%</p>
                          </div>
                          <p className="text-gray-700 text-[9px]">{a.progress}/{a.target}</p>
                        </div>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, backgroundColor: a.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-800/40 rounded-2xl overflow-hidden">
            {[
              { label: 'Total Badges',      val: done.length,                icon: Trophy,     color: '#f59e0b' },
              { label: 'In Progress',       val: inProgress.length,          icon: Target,     color: '#3b82f6' },
              { label: 'Locked',            val: locked.length,              icon: Lock,       color: '#6b7280' },
              { label: 'Completion Rate',   val: `${Math.round((done.length / achievements.length) * 100)}%`, icon: BarChart2, color: '#22c55e' },
            ].map((s, i) => (
              <div key={i} className="bg-[#0a0a0a] p-8 hover:bg-gray-950 transition-colors">
                <div className="w-8 h-0.5 bg-red-600 mb-6" />
                <s.icon size={20} style={{ color: s.color }} className="mb-3" />
                <p className="text-white text-3xl font-black mb-1">{s.val}</p>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════ ACHIEVEMENTS / BADGES ══════════ */}
      {activeTab === 'achievements' && (
        <div className="space-y-6">

          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-950 border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Earned section */}
          {filtered.filter(a => a.done).length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Earned ({filtered.filter(a => a.done).length})
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.filter(a => a.done).map((a) => (
                  <div key={a.id}
                    onMouseEnter={() => setHoveredBadge(a.id)}
                    onMouseLeave={() => setHoveredBadge(null)}
                    className={`relative bg-[#0a0a0a] border rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden ${
                      hoveredBadge === a.id ? 'border-gray-600 scale-[1.01]' : 'border-gray-800'
                    }`}
                  >
                    {/* Glow effect */}
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10 pointer-events-none"
                      style={{ backgroundColor: a.color }} />

                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${a.color}20`, border: `1px solid ${a.color}40` }}>
                        <a.icon size={22} style={{ color: a.color }} />
                      </div>
                      <RarityBadge rarity={a.rarity} />
                    </div>

                    <h3 className="text-white font-black text-lg mb-1">{a.title}</h3>
                    <p className="text-gray-500 text-xs mb-4 leading-relaxed">{a.desc}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Check size={12} className="text-green-500" />
                        <span className="text-green-400 text-xs font-bold">{a.date}</span>
                      </div>
                      <span className="text-yellow-400 font-black text-sm">+{a.xp} XP</span>
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500"
                      style={{ backgroundColor: a.color, opacity: hoveredBadge === a.id ? 1 : 0 }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* In progress section */}
          {filtered.filter(a => !a.done && a.progress !== undefined).length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  In Progress ({filtered.filter(a => !a.done && a.progress !== undefined).length})
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.filter(a => !a.done && a.progress !== undefined).map((a) => {
                  const pct = Math.round((a.progress / a.target) * 100);
                  return (
                    <div key={a.id}
                      className="relative bg-[#0a0a0a] border border-gray-800 hover:border-gray-600 rounded-2xl p-6 transition-all duration-300 overflow-hidden">

                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${a.color}10`, border: `1px solid ${a.color}20` }}>
                          <a.icon size={22} style={{ color: a.color, opacity: 0.7 }} />
                        </div>
                        <RarityBadge rarity={a.rarity} />
                      </div>

                      <h3 className="text-white font-black text-lg mb-1">{a.title}</h3>
                      <p className="text-gray-500 text-xs mb-5 leading-relaxed">{a.desc}</p>

                      <div className="mb-2">
                        <div className="flex justify-between text-[10px] mb-1.5 uppercase tracking-widest">
                          <span className="text-gray-600">{a.progress} / {a.target}</span>
                          <span style={{ color: a.color }}>{pct}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${pct}%`, backgroundColor: a.color }} />
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <span className="text-gray-600 text-[10px] uppercase tracking-widest">Reward</span>
                        <span className="text-yellow-400 font-black text-sm">+{a.xp} XP</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Locked section */}
          {filtered.filter(a => !a.done && a.progress === undefined).length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-gray-600" />
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Locked ({filtered.filter(a => !a.done && a.progress === undefined).length})
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.filter(a => !a.done && a.progress === undefined).map((a) => (
                  <div key={a.id}
                    className="relative bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 opacity-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                        <Lock size={18} className="text-gray-600" />
                      </div>
                      <RarityBadge rarity={a.rarity} />
                    </div>
                    <h3 className="text-gray-400 font-black text-lg mb-1">{a.title}</h3>
                    <p className="text-gray-600 text-xs mb-4">{a.desc}</p>
                    <span className="text-gray-600 font-black text-sm">+{a.xp} XP</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════ CHALLENGES ══════════ */}
      {activeTab === 'challenges' && (
        <div className="space-y-5">

          {/* Active challenge banner */}
          <div className="bg-gradient-to-r from-red-900/25 to-black border border-red-800/30 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-400 text-[10px] font-bold uppercase tracking-[0.3em]">Active This Month</span>
            </div>
            <h2 className="text-white font-black text-2xl mb-2">May Fitness Challenge</h2>
            <p className="text-gray-400 text-sm mb-5">Complete all 4 challenges to earn the <span className="text-yellow-400 font-bold">May Champion</span> legendary badge + 2000 bonus XP!</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '25%' }} />
              </div>
              <span className="text-gray-500 text-xs font-bold">1/4 complete</span>
            </div>
          </div>

          {/* Challenge cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {challenges.map((c, i) => {
              const pct = Math.round((c.progress / c.target) * 100);
              const done = pct >= 100;
              return (
                <div key={i}
                  className={`bg-[#0a0a0a] border rounded-2xl overflow-hidden transition-all duration-300 ${
                    done ? 'border-green-600/40' : 'border-gray-800 hover:border-gray-600'
                  }`}>
                  <div className="p-7">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${c.color}15`, border: `1px solid ${c.color}30` }}>
                          <c.icon size={18} style={{ color: c.color }} />
                        </div>
                        <div>
                          <h3 className="text-white font-black">{c.title}</h3>
                          <p className="text-gray-600 text-[10px] flex items-center gap-1 mt-0.5">
                            <Clock size={9} /> Ends in {c.ends}
                          </p>
                        </div>
                      </div>
                      {done && (
                        <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </div>

                    <p className="text-gray-400 text-sm mb-5">{c.desc}</p>

                    <div className="mb-5">
                      <div className="flex justify-between text-[10px] mb-1.5 uppercase tracking-widest">
                        <span className="text-gray-600">{c.progress.toLocaleString()} / {c.target.toLocaleString()}</span>
                        <span style={{ color: c.color }}>{pct}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: done ? '#22c55e' : c.color }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-950 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Award size={13} className="text-yellow-500" />
                        <span className="text-gray-400 text-xs">Reward</span>
                      </div>
                      <span className="text-yellow-400 font-black text-xs">{c.reward}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upcoming challenges teaser */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Coming Soon</p>
                <h3 className="text-white font-black uppercase">June Challenges</h3>
              </div>
              <Calendar size={16} className="text-gray-600" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Summer Shred Series', 'Beast Mode Protocol', 'Clean Eating Month'].map((name, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3 opacity-60">
                  <Lock size={14} className="text-gray-600 flex-shrink-0" />
                  <p className="text-gray-400 text-sm font-semibold">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════ LEADERBOARD ══════════ */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-5">

          {/* Top 3 podium */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
            <div className="mb-8">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">This Month</p>
              <h3 className="text-white font-black uppercase text-lg">Top Performers</h3>
            </div>
            <div className="flex items-end justify-center gap-4">
              {/* 2nd */}
              <div className="text-center flex-1 max-w-[140px]">
                <div className="w-14 h-14 rounded-2xl bg-gray-700 flex items-center justify-center text-white font-black text-xl mx-auto mb-3 border-2 border-gray-600">
                  {leaderboard[1].avatar}
                </div>
                <div className="bg-gray-800 rounded-xl pt-4 pb-5 px-3">
                  <p className="text-white text-sm font-black">{leaderboard[1].name}</p>
                  <p className="text-yellow-400 font-black">{leaderboard[1].xp.toLocaleString()}</p>
                  <p className="text-gray-600 text-[9px]">XP</p>
                </div>
                <div className="bg-gray-600 h-8 rounded-b-lg -mt-1 flex items-center justify-center">
                  <Medal size={14} className="text-gray-400" />
                </div>
              </div>

              {/* 1st */}
              <div className="text-center flex-1 max-w-[160px]">
                <Crown size={20} className="text-yellow-400 mx-auto mb-2" />
                <div className="w-16 h-16 rounded-2xl bg-yellow-600/20 border-2 border-yellow-500/50 flex items-center justify-center text-yellow-400 font-black text-2xl mx-auto mb-3">
                  {leaderboard[0].avatar}
                </div>
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-xl pt-4 pb-5 px-3">
                  <p className="text-white text-sm font-black">{leaderboard[0].name}</p>
                  <p className="text-yellow-400 font-black text-lg">{leaderboard[0].xp.toLocaleString()}</p>
                  <p className="text-gray-600 text-[9px]">XP</p>
                </div>
                <div className="bg-yellow-600 h-12 rounded-b-lg -mt-1 flex items-center justify-center">
                  <Trophy size={16} className="text-white" />
                </div>
              </div>

              {/* 3rd */}
              <div className="text-center flex-1 max-w-[140px]">
                <div className="w-14 h-14 rounded-2xl bg-orange-700/20 flex items-center justify-center text-orange-400 font-black text-xl mx-auto mb-3 border-2 border-orange-700/30">
                  {leaderboard[2].avatar}
                </div>
                <div className="bg-gray-800 rounded-xl pt-4 pb-5 px-3">
                  <p className="text-white text-sm font-black">{leaderboard[2].name}</p>
                  <p className="text-yellow-400 font-black">{leaderboard[2].xp.toLocaleString()}</p>
                  <p className="text-gray-600 text-[9px]">XP</p>
                </div>
                <div className="bg-orange-800/50 h-6 rounded-b-lg -mt-1 flex items-center justify-center">
                  <Medal size={12} className="text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Full leaderboard */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Rankings</p>
              <h3 className="text-white font-black uppercase">Full Leaderboard</h3>
            </div>
            <div className="divide-y divide-gray-800/50">
              {leaderboard.map((p, i) => (
                <div key={i}
                  className={`flex items-center justify-between px-6 py-4 transition-colors ${
                    p.isUser ? 'bg-red-600/5 border-l-2 border-red-600' : 'hover:bg-gray-950'
                  }`}>
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 ${
                      p.rank === 1 ? 'bg-yellow-600/20 text-yellow-400' :
                      p.rank === 2 ? 'bg-gray-600/30 text-gray-400' :
                      p.rank === 3 ? 'bg-orange-700/20 text-orange-400' :
                      'bg-gray-900 text-gray-600'
                    }`}>
                      {p.rank}
                    </div>

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black"
                      style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}>
                      {p.avatar}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`font-bold text-sm ${p.isUser ? 'text-red-400' : 'text-white'}`}>{p.name}</p>
                        {p.isUser && <span className="text-[9px] bg-red-600/20 text-red-400 border border-red-600/30 px-2 py-0.5 rounded-full font-black uppercase">You</span>}
                      </div>
                      <RarityBadge rarity={p.badge} />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-yellow-400 font-black">{p.xp.toLocaleString()}</p>
                    <p className="text-gray-600 text-[9px] uppercase tracking-widest">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}