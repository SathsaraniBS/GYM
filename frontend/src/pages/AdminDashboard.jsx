// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  Users, CreditCard, TrendingUp, TrendingDown,
  Dumbbell, Calendar, Bell, Search, MoreHorizontal,
  ArrowUpRight, Check, X, Clock, Flame,
  BarChart2, Activity, UserCheck, UserX,
  ChevronRight, Zap, Star, RefreshCw,
  DollarSign, AlertTriangle, Eye
} from 'lucide-react';

// ── Mini sparkline ──
const Spark = ({ data, color = '#dc2626' }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm transition-all duration-500"
          style={{
            height: `${(v / max) * 100}%`,
            backgroundColor: color,
            opacity: i === data.length - 1 ? 1 : 0.25 + (i / data.length) * 0.65,
          }} />
      ))}
    </div>
  );
};

// ── Bar chart ──
const BarChart = ({ data, color = '#dc2626', height = 80 }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-sm transition-all duration-700 group relative"
            style={{ height: `${(d.value / max) * (height - 14)}px`, backgroundColor: color, opacity: 0.3 + (i / data.length) * 0.7 }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 rounded px-1 py-0.5 text-[9px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {d.value}
            </div>
          </div>
          <span className="text-gray-700 text-[8px] uppercase">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ── Status badge ──
const Badge = ({ status }) => {
  const map = {
    Active:   'bg-green-600/15 text-green-400 border-green-600/30',
    Expired:  'bg-red-600/15 text-red-400 border-red-600/30',
    Pending:  'bg-yellow-600/15 text-yellow-400 border-yellow-600/30',
    Inactive: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${map[status] || map.Inactive}`}>
      {status}
    </span>
  );
};

export default function AdminDashboard() {
  const [activeTab,    setActiveTab]    = useState('overview');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [notification, setNotification] = useState(true);
  const [timeRange,    setTimeRange]    = useState('month');

  // ── Mock data ──
  const kpis = [
    {
      label:   'Total Members',
      value:   '2,847',
      change:  '+12.5%',
      up:      true,
      icon:    Users,
      color:   '#dc2626',
      bg:      'bg-red-600/10',
      border:  'border-red-600/20',
      spark:   [180, 210, 195, 240, 220, 265, 285],
    },
    {
      label:   'Monthly Revenue',
      value:   'Rs. 4.2M',
      change:  '+8.3%',
      up:      true,
      icon:    DollarSign,
      color:   '#22c55e',
      bg:      'bg-green-600/10',
      border:  'border-green-600/20',
      spark:   [3.1, 3.4, 3.2, 3.8, 3.6, 4.0, 4.2],
    },
    {
      label:   'Active Plans',
      value:   '1,943',
      change:  '+5.1%',
      up:      true,
      icon:    CreditCard,
      color:   '#3b82f6',
      bg:      'bg-blue-600/10',
      border:  'border-blue-600/20',
      spark:   [140, 160, 155, 175, 170, 188, 194],
    },
    {
      label:   'Expiring This Month',
      value:   '124',
      change:  '-3.2%',
      up:      false,
      icon:    AlertTriangle,
      color:   '#f59e0b',
      bg:      'bg-yellow-600/10',
      border:  'border-yellow-600/20',
      spark:   [90, 110, 105, 130, 120, 128, 124],
    },
  ];

  const revenueData = [
    { label: 'Jan', value: 3100000 },
    { label: 'Feb', value: 3400000 },
    { label: 'Mar', value: 3200000 },
    { label: 'Apr', value: 3800000 },
    { label: 'May', value: 3600000 },
    { label: 'Jun', value: 4000000 },
    { label: 'Jul', value: 4200000 },
  ].map(d => ({ ...d, value: Math.round(d.value / 100000) }));

  const membershipDist = [
    { label: 'Individual Gents', count: 820, color: '#dc2626', pct: 29 },
    { label: 'Individual Ladies',count: 640, color: '#3b82f6', pct: 22 },
    { label: 'Couple',           count: 410, color: '#22c55e', pct: 14 },
    { label: 'Family',           count: 280, color: '#f59e0b', pct: 10 },
    { label: 'Student',          count: 390, color: '#8b5cf6', pct: 14 },
    { label: 'Buddy Packages',   count: 307, color: '#06b6d4', pct: 11 },
  ];

  const members = [
    { id: 'FT001', name: 'Ayesh Ranasinghe',  branch: 'Colombo 7', plan: 'Individual Gents', status: 'Active',   joined: 'Jan 2025',  expires: 'Jan 2026',  paid: 'Rs. 95,000'  },
    { id: 'FT002', name: 'Nimal Perera',       branch: 'Moors',     plan: 'Buddy Gents',     status: 'Active',   joined: 'Feb 2025',  expires: 'Feb 2026',  paid: 'Rs. 85,000'  },
    { id: 'FT003', name: 'Chamari Silva',      branch: 'Ja Ela',    plan: 'Individual Ladies',status: 'Expired',  joined: 'Jan 2024',  expires: 'Jan 2025',  paid: 'Rs. 90,000'  },
    { id: 'FT004', name: 'Ruwan Jayawardena',  branch: 'Colombo 7', plan: 'Family',          status: 'Active',   joined: 'Mar 2025',  expires: 'Mar 2026',  paid: 'Rs. 160,000' },
    { id: 'FT005', name: 'Dilshan Madushanka', branch: 'Moors',     plan: 'Student',         status: 'Pending',  joined: 'May 2025',  expires: 'Nov 2025',  paid: 'Rs. 35,000'  },
    { id: 'FT006', name: 'Priya Fernando',     branch: 'Ja Ela',    plan: 'Couple',          status: 'Active',   joined: 'Apr 2025',  expires: 'Apr 2026',  paid: 'Rs. 80,000'  },
    { id: 'FT007', name: 'Kasun Dissanayake',  branch: 'Colombo 7', plan: 'Individual Gents',status: 'Inactive', joined: 'Dec 2023',  expires: 'Dec 2024',  paid: 'Rs. 95,000'  },
    { id: 'FT008', name: 'Amara Wickramasinghe',branch:'Moors',     plan: 'Buddy Ladies',    status: 'Active',   joined: 'Feb 2025',  expires: 'Feb 2026',  paid: 'Rs. 85,000'  },
  ];

  const recentActivity = [
    { type: 'new',     icon: UserCheck,  text: 'Ayesh Ranasinghe joined Individual Gents',  time: '2 min ago',   color: '#22c55e' },
    { type: 'payment', icon: CreditCard, text: 'Payment received — Rs. 95,000 from FT001',  time: '15 min ago',  color: '#3b82f6' },
    { type: 'expiry',  icon: AlertTriangle,text:'Chamari Silva membership expired',           time: '1 hr ago',    color: '#f59e0b' },
    { type: 'new',     icon: UserCheck,  text: 'Dilshan Madushanka pending approval',        time: '2 hr ago',    color: '#8b5cf6' },
    { type: 'cancel',  icon: UserX,      text: 'Kasun Dissanayake marked inactive',          time: '3 hr ago',    color: '#dc2626' },
    { type: 'payment', icon: DollarSign, text: 'Rs. 160,000 received — FT004 Family Plan',  time: '5 hr ago',    color: '#22c55e' },
    { type: 'class',   icon: Dumbbell,   text: 'Boxing HIIT class — 12 bookings today',     time: '6 hr ago',    color: '#06b6d4' },
  ];

  const branchStats = [
    { name: 'Colombo 7',    members: 1240, revenue: 'Rs. 1.8M', capacity: 82, color: '#dc2626' },
    { name: 'Moors',        members: 980,  revenue: 'Rs. 1.4M', capacity: 71, color: '#3b82f6' },
    { name: 'Ja Ela',       members: 627,  revenue: 'Rs. 0.9M', capacity: 58, color: '#22c55e' },
  ];

  const classes = [
    { name: 'Boxing HIIT',     trainer: 'Ayesh R.',   time: 'Today 7:00 AM',   booked: 18, capacity: 20, color: '#dc2626' },
    { name: 'Power Yoga',      trainer: 'Dulshan M.', time: 'Today 6:30 PM',   booked: 12, capacity: 15, color: '#8b5cf6' },
    { name: 'Strength Circuit',trainer: 'Thumesh A.', time: 'Tomorrow 8:00 AM',booked: 8,  capacity: 20, color: '#f59e0b' },
    { name: 'HIIT Cardio',     trainer: 'Ayesh R.',   time: 'Tomorrow 5:00 PM',booked: 15, capacity: 20, color: '#3b82f6' },
  ];

  const pendingActions = [
    { id: 'FT005', name: 'Dilshan Madushanka', action: 'Membership Approval',  plan: 'Student',   branch: 'Moors'     },
    { id: 'FT009', name: 'Saman Kumara',       action: 'Payment Verification', plan: 'Couple',    branch: 'Colombo 7' },
    { id: 'FT010', name: 'Nimali Perera',      action: 'Plan Upgrade Request', plan: 'Individual',branch: 'Ja Ela'    },
  ];

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.plan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'overview',  label: 'Overview',  icon: BarChart2  },
    { id: 'members',   label: 'Members',   icon: Users      },
    { id: 'revenue',   label: 'Revenue',   icon: TrendingUp },
    { id: 'classes',   label: 'Classes',   icon: Dumbbell   },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={12} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em]">Admin Panel</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase leading-none">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time range */}
          <div className="flex gap-1 bg-gray-950 border border-gray-800 rounded-xl p-1">
            {['week','month','year'].map(r => (
              <button key={r} onClick={() => setTimeRange(r)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  timeRange === r ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'
                }`}>{r}</button>
            ))}
          </div>

          {/* Notification bell */}
          <button className="relative w-10 h-10 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center hover:border-gray-600 transition-colors">
            <Bell size={16} className="text-gray-400" />
            {notification && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />}
          </button>

          {/* Refresh */}
          <button className="w-10 h-10 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center hover:border-gray-600 transition-colors">
            <RefreshCw size={14} className="text-gray-400" />
          </button>
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

      {/* ═══════════ OVERVIEW ═══════════ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {kpis.map((k, i) => (
              <div key={i}
                className={`bg-[#0a0a0a] border ${k.border} rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 group`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${k.bg} border ${k.border} flex items-center justify-center`}>
                    <k.icon size={18} style={{ color: k.color }} />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${k.up ? 'bg-green-600/10 text-green-400' : 'bg-red-600/10 text-red-400'}`}>
                    {k.up ? '↑' : '↓'} {k.change}
                  </span>
                </div>
                <p className="text-2xl font-black text-white mb-0.5">{k.value}</p>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-4">{k.label}</p>
                <Spark data={k.spark} color={k.color} />
              </div>
            ))}
          </div>

          {/* Middle row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Revenue chart */}
            <div className="lg:col-span-2 bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Revenue</p>
                  <h3 className="text-white font-black uppercase">Monthly Overview</h3>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-xs font-bold bg-green-600/10 border border-green-600/20 px-3 py-1.5 rounded-full">
                  <TrendingUp size={12}/> +8.3% vs last month
                </div>
              </div>
              <BarChart data={revenueData} color="#dc2626" height={120} />
              <p className="text-gray-700 text-[9px] text-center mt-2 uppercase tracking-widest">Values in Rs. × 100,000</p>
            </div>

            {/* Pending actions */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Requires Action</p>
                  <h3 className="text-white font-black uppercase text-sm">Pending</h3>
                </div>
                <span className="w-6 h-6 bg-yellow-600/20 border border-yellow-600/30 rounded-full flex items-center justify-center text-yellow-400 text-[10px] font-black">
                  {pendingActions.length}
                </span>
              </div>
              <div className="divide-y divide-gray-800/50">
                {pendingActions.map((p, i) => (
                  <div key={i} className="p-5 hover:bg-gray-950 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white text-sm font-bold">{p.name}</p>
                        <p className="text-gray-600 text-xs">{p.id} • {p.branch}</p>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0 ml-2">
                        <button className="w-7 h-7 rounded-lg bg-green-600/15 hover:bg-green-600 border border-green-600/30 flex items-center justify-center transition-all">
                          <Check size={12} className="text-green-400" />
                        </button>
                        <button className="w-7 h-7 rounded-lg bg-red-600/15 hover:bg-red-600 border border-red-600/30 flex items-center justify-center transition-all">
                          <X size={12} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                    <span className="text-[9px] bg-yellow-600/15 border border-yellow-600/30 text-yellow-400 px-2 py-0.5 rounded-full font-black uppercase">
                      {p.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Membership distribution */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
              <div className="mb-6">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Plans</p>
                <h3 className="text-white font-black uppercase">Membership Split</h3>
              </div>
              <div className="space-y-3">
                {membershipDist.map((m, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-400">{m.label}</span>
                      <span className="text-white font-bold">{m.count} <span className="text-gray-600">({m.pct}%)</span></span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Branch performance */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Branches</p>
                <h3 className="text-white font-black uppercase">Performance</h3>
              </div>
              <div className="divide-y divide-gray-800/50">
                {branchStats.map((b, i) => (
                  <div key={i} className="p-5 hover:bg-gray-950 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
                        <p className="text-white font-bold text-sm">{b.name}</p>
                      </div>
                      <p className="text-white font-black text-sm">{b.members}</p>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-600 mb-1.5">
                      <span>{b.revenue}</span>
                      <span>{b.capacity}% capacity</span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${b.capacity}%`, backgroundColor: b.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Live Feed</p>
                <h3 className="text-white font-black uppercase">Recent Activity</h3>
              </div>
              <div className="divide-y divide-gray-800/50 max-h-72 overflow-y-auto">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 hover:bg-gray-950 transition-colors">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${a.color}15`, border: `1px solid ${a.color}30` }}>
                      <a.icon size={12} style={{ color: a.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-xs leading-relaxed">{a.text}</p>
                      <p className="text-gray-700 text-[9px] mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ MEMBERS ═══════════ */}
      {activeTab === 'members' && (
        <div className="space-y-5">

          {/* Search + controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input placeholder="Search by name, ID, or plan..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:border-red-600 text-white text-sm placeholder-gray-700 transition-colors" />
            </div>
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-sm uppercase tracking-wider transition-all">
              <Users size={14}/> Add Member
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total',    val: members.length,                                        color: '#dc2626' },
              { label: 'Active',   val: members.filter(m => m.status === 'Active').length,    color: '#22c55e' },
              { label: 'Expired',  val: members.filter(m => m.status === 'Expired').length,   color: '#ef4444' },
              { label: 'Pending',  val: members.filter(m => m.status === 'Pending').length,   color: '#f59e0b' },
            ].map((s, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-4 text-center">
                <p className="font-black text-2xl" style={{ color: s.color }}>{s.val}</p>
                <p className="text-gray-600 text-[9px] uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Members table */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    {['ID','Member','Branch','Plan','Status','Joined','Expires','Paid',''].map((h, i) => (
                      <th key={i} className="px-5 py-4 text-left text-[9px] text-gray-600 uppercase tracking-widest font-bold whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {filteredMembers.map((m, i) => (
                    <tr key={i} className="hover:bg-gray-950 transition-colors group">
                      <td className="px-5 py-4 text-red-400 font-black text-xs">{m.id}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 font-black text-sm flex-shrink-0">
                            {m.name.charAt(0)}
                          </div>
                          <p className="text-white font-semibold text-sm whitespace-nowrap">{m.name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-sm whitespace-nowrap">{m.branch}</td>
                      <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">{m.plan}</td>
                      <td className="px-5 py-4"><Badge status={m.status} /></td>
                      <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{m.joined}</td>
                      <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{m.expires}</td>
                      <td className="px-5 py-4 text-green-400 font-black text-xs whitespace-nowrap">{m.paid}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-blue-600 flex items-center justify-center transition-all">
                            <Eye size={11} className="text-gray-400" />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700 hover:border-gray-500 flex items-center justify-center transition-all">
                            <MoreHorizontal size={11} className="text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredMembers.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-gray-600 text-sm uppercase tracking-widest">No members found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ REVENUE ═══════════ */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">

          {/* Revenue KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue',    val: 'Rs. 28.4M', sub: 'All time',         color: '#dc2626', up: true,  change: '+12%'  },
              { label: 'This Month',       val: 'Rs. 4.2M',  sub: 'May 2025',         color: '#22c55e', up: true,  change: '+8.3%' },
              { label: 'Avg per Member',   val: 'Rs. 9,975', sub: 'Per active member', color: '#3b82f6', up: true,  change: '+2.1%' },
              { label: 'Outstanding',      val: 'Rs. 340K',  sub: 'Pending payments', color: '#f59e0b', up: false, change: '-5.2%' },
            ].map((r, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign size={16} style={{ color: r.color }} />
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.up ? 'bg-green-600/10 text-green-400' : 'bg-red-600/10 text-red-400'}`}>
                    {r.up ? '↑' : '↓'} {r.change}
                  </span>
                </div>
                <p className="text-2xl font-black text-white mb-1">{r.val}</p>
                <p className="text-gray-600 text-xs">{r.label}</p>
                <p className="text-gray-700 text-[9px] uppercase tracking-widest mt-1">{r.sub}</p>
              </div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">7-Month Trend</p>
                <h3 className="text-white font-black uppercase text-lg">Revenue Overview</h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 rounded-sm bg-red-600" /> Revenue (Rs. × 100K)
              </div>
            </div>
            <BarChart data={revenueData} color="#dc2626" height={160} />
          </div>

          {/* Revenue by plan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
              <div className="mb-6">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">By Plan Type</p>
                <h3 className="text-white font-black uppercase">Revenue Breakdown</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Individual Gents', rev: 'Rs. 1.2M', pct: 29, color: '#dc2626' },
                  { label: 'Family Plans',     rev: 'Rs. 0.9M', pct: 21, color: '#3b82f6' },
                  { label: 'Couple Plans',     rev: 'Rs. 0.7M', pct: 17, color: '#22c55e' },
                  { label: 'Individual Ladies',rev: 'Rs. 0.6M', pct: 14, color: '#f59e0b' },
                  { label: 'Buddy Packages',   rev: 'Rs. 0.5M', pct: 12, color: '#8b5cf6' },
                  { label: 'Student Plans',    rev: 'Rs. 0.3M', pct: 7,  color: '#06b6d4' },
                ].map((r, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-400">{r.label}</span>
                      <span className="font-bold text-white">{r.rev} <span className="text-gray-600">({r.pct}%)</span></span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
              <div className="mb-6">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">By Branch</p>
                <h3 className="text-white font-black uppercase">Branch Revenue</h3>
              </div>
              <div className="space-y-5">
                {branchStats.map((b, i) => (
                  <div key={i} className="bg-gray-950 border border-gray-800 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
                        <p className="text-white font-bold">{b.name}</p>
                      </div>
                      <p className="text-white font-black" style={{ color: b.color }}>{b.revenue}</p>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-600 mb-2">
                      <span>{b.members} members</span>
                      <span>{b.capacity}% capacity</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${b.capacity}%`, backgroundColor: b.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ CLASSES ═══════════ */}
      {activeTab === 'classes' && (
        <div className="space-y-5">

          {/* Class stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Classes',  val: '24',   color: '#dc2626', sub: 'This week'     },
              { label: 'Avg Attendance', val: '78%',  color: '#22c55e', sub: 'Fill rate'     },
              { label: 'Active Trainers',val: '3',    color: '#3b82f6', sub: 'On schedule'   },
              { label: 'Today\'s Classes',val: '6',   color: '#f59e0b', sub: 'Scheduled'     },
            ].map((s, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-5 text-center hover:border-gray-600 transition-all duration-300">
                <p className="font-black text-3xl mb-1" style={{ color: s.color }}>{s.val}</p>
                <p className="text-white text-sm font-bold">{s.label}</p>
                <p className="text-gray-600 text-[9px] uppercase tracking-widest mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Upcoming classes */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Schedule</p>
                <h3 className="text-white font-black uppercase">Upcoming Classes</h3>
              </div>
              <button className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 border border-red-600/30 text-red-400 hover:text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all">
                + Add Class
              </button>
            </div>
            <div className="divide-y divide-gray-800/50">
              {classes.map((cls, i) => {
                const pct = Math.round((cls.booked / cls.capacity) * 100);
                return (
                  <div key={i} className="flex items-center justify-between px-6 py-5 hover:bg-gray-950 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${cls.color}15`, border: `1px solid ${cls.color}30` }}>
                        <Dumbbell size={16} style={{ color: cls.color }} />
                      </div>
                      <div>
                        <p className="text-white font-bold">{cls.name}</p>
                        <p className="text-gray-500 text-xs">{cls.time} • {cls.trainer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className="flex items-center gap-2 mb-1 justify-end">
                          <span className="text-white text-sm font-black">{cls.booked}/{cls.capacity}</span>
                          <span className="text-[9px] text-gray-600 uppercase">spots</span>
                        </div>
                        <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: cls.color }} />
                        </div>
                      </div>
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs border border-gray-700 hover:border-red-600 text-gray-400 hover:text-red-400 px-3 py-1.5 rounded-lg transition-all">Edit</button>
                        <button className="text-xs border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-all">View</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trainer performance */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Staff</p>
              <h3 className="text-white font-black uppercase">Trainer Performance</h3>
            </div>
            <div className="divide-y divide-gray-800/50">
              {[
                { name: 'Ayesh Ranasinghe',  classes: 12, rating: 4.9, members: 48, color: '#dc2626' },
                { name: 'Thumesh Almeda',    classes: 8,  rating: 4.7, members: 36, color: '#3b82f6' },
                { name: 'Dulshan Miyuranga', classes: 6,  rating: 4.8, members: 29, color: '#22c55e' },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-5 hover:bg-gray-950 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
                      style={{ backgroundColor: `${t.color}15`, border: `1px solid ${t.color}30`, color: t.color }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.classes} classes this month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <div className="flex items-center gap-1 justify-end">
                        <Star size={11} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-black text-sm">{t.rating}</span>
                      </div>
                      <p className="text-gray-600 text-[9px]">Rating</p>
                    </div>
                    <div>
                      <p className="text-white font-black text-sm">{t.members}</p>
                      <p className="text-gray-600 text-[9px]">Members</p>
                    </div>
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