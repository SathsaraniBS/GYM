// src/pages/user/Progress.jsx
import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, Flame, Dumbbell, Activity,
  Scale, Target, Plus, ChevronRight, ArrowUpRight,
  BarChart2, Calendar, Check, Trophy, Zap
} from 'lucide-react';

// ── Reusable ring progress ──
const Ring = ({ pct, size = 80, stroke = 5, color = '#dc2626', label, value }) => {
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
          <span className="text-gray-600 text-[9px] uppercase tracking-wider">{Math.round(pct)}%</span>
        </div>
      </div>
      {label && <p className="text-gray-500 text-[10px] uppercase tracking-widest text-center">{label}</p>}
    </div>
  );
};

// ── Mini bar chart ──
const BarChart = ({ data, color = '#dc2626', height = 60 }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-sm transition-all duration-700"
            style={{
              height: `${(d.value / max) * (height - 16)}px`,
              backgroundColor: color,
              opacity: i === data.length - 1 ? 1 : 0.25 + (i / data.length) * 0.6,
            }}
          />
          <span className="text-gray-700 text-[8px] uppercase">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ── Weight sparkline ──
const LineChart = ({ data, color = '#dc2626' }) => {
  const vals = data.map(d => d.value);
  const min  = Math.min(...vals);
  const max  = Math.max(...vals);
  const w    = 100 / (data.length - 1);
  const norm = v => 100 - ((v - min) / (max - min || 1)) * 80 - 10;
  const pts  = data.map((d, i) => `${i * w},${norm(d.value)}`).join(' ');
  return (
    <div className="relative w-full" style={{ height: 80 }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => (
          <circle key={i} cx={i * w} cy={norm(d.value)} r="2.5" fill={color} />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex justify-between">
        {data.map((d, i) => (
          <span key={i} className="text-[8px] text-gray-700 uppercase">{d.label}</span>
        ))}
      </div>
    </div>
  );
};

export default function Progress() {
  const [activeTab,    setActiveTab]    = useState('overview');
  const [logWeight,    setLogWeight]    = useState('');
  const [logReps,      setLogReps]      = useState('');
  const [logExercise,  setLogExercise]  = useState('Bench Press');
  const [logs,         setLogs]         = useState([
    { exercise: 'Bench Press',  weight: 80,  reps: 8,  date: 'May 20' },
    { exercise: 'Squat',        weight: 100, reps: 6,  date: 'May 19' },
    { exercise: 'Deadlift',     weight: 120, reps: 5,  date: 'May 18' },
    { exercise: 'Bench Press',  weight: 77,  reps: 10, date: 'May 17' },
  ]);

  const handleAddLog = () => {
    if (!logWeight || !logReps) return;
    setLogs(prev => [
      { exercise: logExercise, weight: parseFloat(logWeight), reps: parseInt(logReps), date: 'Today' },
      ...prev,
    ]);
    setLogWeight(''); setLogReps('');
  };

  // ── Data ──
  const weeklyCalories = [
    { label: 'M', value: 420 }, { label: 'T', value: 380 }, { label: 'W', value: 390 },
    { label: 'T', value: 0   }, { label: 'F', value: 460 }, { label: 'S', value: 0   }, { label: 'S', value: 310 },
  ];

  const monthlyWorkouts = [
    { label: 'W1', value: 4 }, { label: 'W2', value: 5 }, { label: 'W3', value: 3 },
    { label: 'W4', value: 6 }, { label: 'W5', value: 4 },
  ];

  const weightHistory = [
    { label: 'Jan', value: 86 }, { label: 'Feb', value: 85 }, { label: 'Mar', value: 84 },
    { label: 'Apr', value: 83 }, { label: 'May', value: 82 },
  ];

  const prs = [
    { exercise: 'Bench Press', value: '85 kg', date: 'May 15', icon: Dumbbell, color: '#ef4444' },
    { exercise: 'Back Squat',  value: '110 kg', date: 'May 10', icon: Activity, color: '#3b82f6' },
    { exercise: 'Deadlift',    value: '130 kg', date: 'May 3',  icon: Flame,    color: '#f59e0b' },
    { exercise: 'OHP',         value: '55 kg',  date: 'Apr 28', icon: TrendingUp,color: '#22c55e' },
  ];

  const goals = [
    { label: 'Weekly Workouts',  current: 4, target: 5,   unit: 'sessions', pct: 80,  color: '#dc2626' },
    { label: 'Protein Intake',   current: 145, target: 180,unit: 'g / day', pct: 80,  color: '#3b82f6' },
    { label: 'Cardio Minutes',   current: 120, target: 150,unit: 'min / wk',pct: 80,  color: '#22c55e' },
    { label: 'Target Weight',    current: 82,  target: 78, unit: 'kg',      pct: 50,  color: '#f59e0b' },
    { label: 'Sleep Average',    current: 6.5, target: 8,  unit: 'hrs',     pct: 81,  color: '#8b5cf6' },
    { label: 'Water Intake',     current: 2.1, target: 3,  unit: 'L / day', pct: 70,  color: '#06b6d4' },
  ];

  const bodyMetrics = [
    { label: 'Weight',   value: '82 kg',  change: '-4 kg',  up: false, color: '#22c55e' },
    { label: 'Body Fat', value: '18.2%',  change: '-2.1%',  up: false, color: '#22c55e' },
    { label: 'Muscle',   value: '38.5 kg',change: '+1.8 kg',up: true,  color: '#3b82f6' },
    { label: 'BMI',      value: '24.1',   change: '-1.3',   up: false, color: '#22c55e' },
  ];

  const tabs = ['overview', 'strength', 'body', 'goals'];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={13} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em]">Your Progress</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase leading-none">
            Progress<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #dc2626' }}>Tracking</span>
          </h1>
        </div>

        {/* Summary pills */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Flame,    label: '2,340 kcal', sub: 'this week'  },
            { icon: Dumbbell, label: '18 sessions', sub: 'this month' },
            { icon: TrendingDown, label: '-4 kg',  sub: 'since Jan'  },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-2.5 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3">
              <p.icon size={14} className="text-red-500" />
              <div>
                <p className="text-white text-sm font-black">{p.label}</p>
                <p className="text-gray-600 text-[9px] uppercase tracking-widest">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 mb-8 bg-gray-950 border border-gray-800 rounded-xl p-1 w-fit overflow-x-auto">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
              activeTab === t ? 'bg-red-600 text-white shadow-lg shadow-red-900/30' : 'text-gray-500 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ═══════════════ OVERVIEW ═══════════════ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">

          {/* Body metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyMetrics.map((m, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-2">{m.label}</p>
                <p className="text-white text-2xl font-black mb-1">{m.value}</p>
                <div className="flex items-center gap-1">
                  {m.up ? <TrendingUp size={12} style={{ color: m.color }} /> : <TrendingDown size={12} style={{ color: m.color }} />}
                  <span className="text-xs font-bold" style={{ color: m.color }}>{m.change}</span>
                  <span className="text-gray-700 text-xs">since Jan</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Weekly calories burned */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Weekly Calories</p>
                <Flame size={14} className="text-red-500" />
              </div>
              <p className="text-white text-2xl font-black mb-5">1,960 <span className="text-gray-600 text-sm font-normal">kcal</span></p>
              <BarChart data={weeklyCalories} color="#dc2626" height={72} />
            </div>

            {/* Monthly workouts */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Monthly Sessions</p>
                <BarChart2 size={14} className="text-blue-500" />
              </div>
              <p className="text-white text-2xl font-black mb-5">22 <span className="text-gray-600 text-sm font-normal">sessions</span></p>
              <BarChart data={monthlyWorkouts} color="#3b82f6" height={72} />
            </div>

            {/* Weight trend */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Weight Trend</p>
                <Scale size={14} className="text-green-500" />
              </div>
              <p className="text-white text-2xl font-black mb-3">82 kg <span className="text-green-400 text-sm font-normal">↓ 4 kg</span></p>
              <LineChart data={weightHistory} color="#22c55e" />
            </div>
          </div>

          {/* Weekly heatmap */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Activity</p>
                <h3 className="text-white font-black uppercase">This Week</h3>
              </div>
              <Calendar size={16} className="text-gray-600" />
            </div>
            <div className="grid grid-cols-7 gap-3">
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => {
                const done  = [true, true, true, false, true, false, false][i];
                const cal   = [420, 380, 390, 0, 460, 0, 0][i];
                const type  = ['Chest','HIIT','Back','Rest','Legs','—','—'][i];
                return (
                  <div key={i} className="text-center">
                    <p className="text-gray-600 text-[10px] uppercase mb-2">{day}</p>
                    <div className={`aspect-square rounded-xl flex items-center justify-center mb-1.5 transition-all duration-300 ${
                      done ? 'bg-red-600/20 border border-red-600/40' : 'bg-gray-900 border border-gray-800'
                    }`}>
                      {done ? <Check size={14} className="text-red-500" /> : <span className="text-gray-700 text-xs">—</span>}
                    </div>
                    <p className="text-[8px] text-gray-700 uppercase">{type}</p>
                    {cal > 0 && <p className="text-[8px] text-red-500 font-bold">{cal}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* PRs */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Records</p>
                <h3 className="text-white font-black uppercase">Personal Bests</h3>
              </div>
              <Trophy size={16} className="text-yellow-500" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {prs.map((pr, i) => (
                <div key={i} className="bg-gray-950 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-all duration-300 group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-all duration-300"
                    style={{ backgroundColor: `${pr.color}15`, border: `1px solid ${pr.color}30` }}>
                    <pr.icon size={14} style={{ color: pr.color }} />
                  </div>
                  <p className="text-white font-black text-lg">{pr.value}</p>
                  <p className="text-gray-500 text-xs">{pr.exercise}</p>
                  <p className="text-gray-700 text-[9px] mt-1">{pr.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ STRENGTH ═══════════════ */}
      {activeTab === 'strength' && (
        <div className="space-y-6">

          {/* Log form */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-600/30 flex items-center justify-center">
                <Plus size={16} className="text-red-500" />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest">Log Entry</p>
                <h3 className="text-white font-black text-sm uppercase">Add Strength Record</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="text-gray-600 text-[10px] uppercase tracking-widest mb-2 block">Exercise</label>
                  <select value={logExercise} onChange={e => setLogExercise(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm transition-colors">
                    {['Bench Press','Back Squat','Deadlift','OHP','Pull-up','Barbell Row','Leg Press','Incline Press'].map(e => (
                      <option key={e}>{e}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 text-[10px] uppercase tracking-widest mb-2 block">Weight (kg)</label>
                  <input type="number" placeholder="e.g. 80" value={logWeight} onChange={e => setLogWeight(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                </div>
                <div>
                  <label className="text-gray-600 text-[10px] uppercase tracking-widest mb-2 block">Reps</label>
                  <input type="number" placeholder="e.g. 8" value={logReps} onChange={e => setLogReps(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
                </div>
              </div>
              <button onClick={handleAddLog}
                className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-wider transition-all duration-300">
                <Plus size={14} /> Log Set
              </button>
            </div>
          </div>

          {/* Log history */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">History</p>
              <h3 className="text-white font-black uppercase">Recent Logs</h3>
            </div>
            <div className="divide-y divide-gray-800">
              {logs.map((log, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-gray-950 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center">
                      <Dumbbell size={14} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{log.exercise}</p>
                      <p className="text-gray-600 text-xs">{log.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black">{log.weight} kg</p>
                    <p className="text-gray-600 text-xs">{log.reps} reps</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PR cards */}
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-4">Personal Records</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {prs.map((pr, i) => (
                <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                  <div className="w-9 h-9 rounded-xl mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${pr.color}15`, border: `1px solid ${pr.color}30` }}>
                    <pr.icon size={16} style={{ color: pr.color }} />
                  </div>
                  <p className="text-white font-black text-xl">{pr.value}</p>
                  <p className="text-gray-400 text-sm font-semibold">{pr.exercise}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Trophy size={10} className="text-yellow-500" />
                    <p className="text-gray-600 text-xs">{pr.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ BODY ═══════════════ */}
      {activeTab === 'body' && (
        <div className="space-y-6">

          {/* Metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyMetrics.map((m, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-3">{m.label}</p>
                <p className="text-white text-3xl font-black mb-2">{m.value}</p>
                <div className="flex items-center gap-1.5">
                  {m.up ? <TrendingUp size={12} style={{ color: m.color }} /> : <TrendingDown size={12} style={{ color: m.color }} />}
                  <span className="text-xs font-bold" style={{ color: m.color }}>{m.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Weight chart */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">5 Month Trend</p>
                <h3 className="text-white font-black uppercase text-lg">Weight Progress</h3>
              </div>
              <div className="flex items-center gap-2 bg-green-600/10 border border-green-600/20 px-3 py-1.5 rounded-full">
                <TrendingDown size={12} className="text-green-400" />
                <span className="text-green-400 text-xs font-bold">-4 kg total</span>
              </div>
            </div>
            <LineChart data={weightHistory} color="#22c55e" />
          </div>

          {/* Body composition rings */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
            <div className="mb-8">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Composition</p>
              <h3 className="text-white font-black uppercase text-lg">Body Breakdown</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 place-items-center">
              <Ring pct={82}  size={100} stroke={7} color="#dc2626" label="Weight Goal"  value="82kg" />
              <Ring pct={78}  size={100} stroke={7} color="#22c55e" label="Fat Loss"     value="18.2%" />
              <Ring pct={91}  size={100} stroke={7} color="#3b82f6" label="Muscle"       value="38.5kg" />
              <Ring pct={85}  size={100} stroke={7} color="#f59e0b" label="Hydration"    value="85%" />
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ GOALS ═══════════════ */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {goals.map((g, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-7 hover:border-gray-600 transition-all duration-300">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1">Goal</p>
                    <h3 className="text-white font-black">{g.label}</h3>
                  </div>
                  <Ring pct={g.pct} size={64} stroke={5} color={g.color} value={`${g.pct}%`} />
                </div>

                <div className="flex items-end gap-2 mb-4">
                  <span className="text-3xl font-black text-white">{g.current}</span>
                  <span className="text-gray-500 text-sm mb-1">/ {g.target} {g.unit}</span>
                </div>

                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-2">
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${g.pct}%`, backgroundColor: g.color }} />
                </div>

                <div className="flex justify-between text-[10px] text-gray-700 uppercase tracking-widest">
                  <span>0</span>
                  <span style={{ color: g.color }}>{g.target - g.current} {g.unit} left</span>
                  <span>{g.target}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add goal CTA */}
          <button className="w-full flex items-center justify-center gap-3 border-2 border-dashed border-gray-800 hover:border-red-600/50 rounded-2xl py-8 text-gray-600 hover:text-red-500 transition-all duration-300 group">
            <Plus size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-bold uppercase tracking-wider text-sm">Add New Goal</span>
          </button>
        </div>
      )}

    </div>
  );
}