// src/components/AdminComponents/AdminOverview.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, CreditCard, TrendingUp, TrendingDown,
  DollarSign, AlertTriangle, UserCheck, UserX,
  Dumbbell, Calendar, ChevronRight, Check, X,
  Activity, BarChart2, Zap, RefreshCw, Eye,
  ArrowUpRight, Clock, Star
} from 'lucide-react';
import api from '../../api/axios';

// ─────────────────────────────────────────────
// HELPER — Mini sparkline bar
// ─────────────────────────────────────────────
const Spark = ({ data, color = '#dc2626' }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height:          `${(v / max) * 100}%`,
            backgroundColor: color,
            opacity:         i === data.length - 1 ? 1 : 0.2 + (i / data.length) * 0.65,
          }}
        />
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// HELPER — Bar chart
// ─────────────────────────────────────────────
const BarChart = ({ data, color = '#dc2626', height = 100 }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-sm group relative cursor-default"
            style={{
              height:          `${(d.value / max) * (height - 14)}px`,
              backgroundColor: color,
              opacity:         0.3 + (i / data.length) * 0.7,
            }}
          >
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700
              rounded px-1.5 py-0.5 text-[9px] text-white font-bold opacity-0 group-hover:opacity-100
              transition-opacity whitespace-nowrap z-10 pointer-events-none">
              {d.value}
            </div>
          </div>
          <span className="text-gray-700 text-[8px] uppercase">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
// COMPONENT — KPI card
// ─────────────────────────────────────────────
const KpiCard = ({ label, value, change, up, icon: Icon, color, bg, border, spark }) => (
  <div className={`bg-[#0a0a0a] border ${border} rounded-2xl p-6
    hover:border-gray-600 transition-all duration-300 group`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl ${bg} border ${border}
        flex items-center justify-center`}>
        <Icon size={18} style={{ color }} />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
        up ? 'bg-green-600/10 text-green-400' : 'bg-red-600/10 text-red-400'
      }`}>
        {up ? '↑' : '↓'} {change}
      </span>
    </div>
    <p className="text-2xl font-black text-white mb-0.5">{value}</p>
    <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-4">{label}</p>
    <Spark data={spark} color={color} />
  </div>
);

// ─────────────────────────────────────────────
// COMPONENT — Status badge
// ─────────────────────────────────────────────
const Badge = ({ status }) => {
  const map = {
    Active:   'bg-green-600/15 text-green-400 border-green-600/30',
    Expired:  'bg-red-600/15 text-red-400 border-red-600/30',
    Pending:  'bg-yellow-600/15 text-yellow-400 border-yellow-600/30',
    Inactive: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
  };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border
      ${map[status] || map.Inactive}`}>
      {status}
    </span>
  );
};

// ─────────────────────────────────────────────
// COMPONENT — Quick nav card
// ─────────────────────────────────────────────
const QuickNav = ({ label, icon: Icon, to, color, navigate }) => (
  <button
    onClick={() => navigate(to)}
    className="flex items-center gap-3 bg-[#0a0a0a] border border-gray-800
      hover:border-gray-600 rounded-2xl p-4 transition-all duration-200 group text-left w-full"
  >
    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor:`${color}15`, border:`1px solid ${color}30` }}>
      <Icon size={16} style={{ color }} />
    </div>
    <span className="text-white text-sm font-bold leading-tight flex-1">{label}</span>
    <ChevronRight size={14} className="text-gray-700 group-hover:text-gray-400 transition-colors flex-shrink-0" />
  </button>
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function AdminOverview() {
  const navigate = useNavigate();

  const [stats,    setStats]    = useState(null);
  const [members,  setMembers]  = useState([]);
  const [pending,  setPending]  = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [timeRange,setTimeRange]= useState('month');
  const [pendingList, setPendingList] = useState([]);

  // ── Load data ──
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [statsRes, membersRes] = await Promise.all([
          api.get('/api/admin/stats'),
          api.get('/api/admin/members?limit=6'),
        ]);
        setStats(statsRes.data);
        setMembers(membersRes.data?.members || membersRes.data || []);
      } catch {
        // Demo fallback
        setStats({
          totalMembers:   2847,
          monthlyRevenue: 'Rs. 4.2M',
          activePlans:    1943,
          expiring:       124,
          memberGrowth:   '+12.5%',
          revenueGrowth:  '+8.3%',
          planGrowth:     '+5.1%',
          expiryChange:   '-3.2%',
        });
        setMembers([
          { _id:'1', name:'Ayesh Ranasinghe',   email:'ayesh@gmail.com',  branch:'Colombo 7', plan:'Individual Gents',  status:'Active',  joined:'Jan 2025', expires:'Jan 2026', paid:'Rs. 95,000'  },
          { _id:'2', name:'Nimal Perera',        email:'nimal@gmail.com',  branch:'Moors',     plan:'Buddy Gents',       status:'Active',  joined:'Feb 2025', expires:'Feb 2026', paid:'Rs. 85,000'  },
          { _id:'3', name:'Chamari Silva',       email:'cham@gmail.com',   branch:'Ja Ela',    plan:'Ind. Ladies',       status:'Expired', joined:'Jan 2024', expires:'Jan 2025', paid:'Rs. 90,000'  },
          { _id:'4', name:'Ruwan Jayawardena',   email:'ruwan@gmail.com',  branch:'Colombo 7', plan:'Family',            status:'Active',  joined:'Mar 2025', expires:'Mar 2026', paid:'Rs. 160,000' },
          { _id:'5', name:'Dilshan Madushanka',  email:'dil@gmail.com',    branch:'Moors',     plan:'Student',           status:'Pending', joined:'May 2025', expires:'Nov 2025', paid:'Rs. 35,000'  },
          { _id:'6', name:'Priya Fernando',      email:'priya@gmail.com',  branch:'Ja Ela',    plan:'Couple',            status:'Active',  joined:'Apr 2025', expires:'Apr 2026', paid:'Rs. 80,000'  },
        ]);
      }

      setPendingList([
        { id:'FT005', name:'Dilshan Madushanka', action:'Membership Approval',  plan:'Student',    branch:'Moors'     },
        { id:'FT009', name:'Saman Kumara',       action:'Payment Verification', plan:'Couple',     branch:'Colombo 7' },
        { id:'FT010', name:'Nimali Perera',      action:'Plan Upgrade Request', plan:'Individual', branch:'Ja Ela'    },
      ]);

      setActivity([
        { icon:UserCheck,     text:'Ayesh Ranasinghe joined Individual Gents', time:'2 min ago',  color:'#22c55e' },
        { icon:CreditCard,    text:'Payment Rs. 95,000 received — FT001',      time:'15 min ago', color:'#3b82f6' },
        { icon:AlertTriangle, text:'Chamari Silva membership expired',          time:'1 hr ago',   color:'#f59e0b' },
        { icon:UserX,         text:'Kasun Dissanayake marked inactive',         time:'3 hr ago',   color:'#dc2626' },
        { icon:DollarSign,    text:'Rs. 160,000 received — FT004',             time:'5 hr ago',   color:'#22c55e' },
        { icon:Dumbbell,      text:'Boxing HIIT class — 12 bookings today',    time:'6 hr ago',   color:'#06b6d4' },
        { icon:Star,          text:'Thumesh Almeda rated 4.9 by members',      time:'8 hr ago',   color:'#f59e0b' },
      ]);

      setLoading(false);
    };
    load();
  }, []);

  // ── Approve / Reject pending ──
  const handlePendingAction = (id, action) => {
    setPendingList(prev => prev.filter(p => p.id !== id));
  };

  // ── KPI data ──
  const kpis = [
    {
      label:  'Total Members',
      value:  stats?.totalMembers?.toLocaleString() || '2,847',
      change: stats?.memberGrowth  || '+12.5%',
      up:     true,
      icon:   Users,
      color:  '#dc2626',
      bg:     'bg-red-600/10',
      border: 'border-red-600/20',
      spark:  [180,210,195,240,220,265,285],
    },
    {
      label:  'Monthly Revenue',
      value:  stats?.monthlyRevenue || 'Rs. 4.2M',
      change: stats?.revenueGrowth  || '+8.3%',
      up:     true,
      icon:   DollarSign,
      color:  '#22c55e',
      bg:     'bg-green-600/10',
      border: 'border-green-600/20',
      spark:  [31,34,32,38,36,40,42],
    },
    {
      label:  'Active Plans',
      value:  stats?.activePlans?.toLocaleString() || '1,943',
      change: stats?.planGrowth    || '+5.1%',
      up:     true,
      icon:   CreditCard,
      color:  '#3b82f6',
      bg:     'bg-blue-600/10',
      border: 'border-blue-600/20',
      spark:  [140,160,155,175,170,188,194],
    },
    {
      label:  'Expiring This Month',
      value:  stats?.expiring?.toString() || '124',
      change: stats?.expiryChange         || '-3.2%',
      up:     false,
      icon:   AlertTriangle,
      color:  '#f59e0b',
      bg:     'bg-yellow-600/10',
      border: 'border-yellow-600/20',
      spark:  [90,110,105,130,120,128,124],
    },
  ];

  const revenueData = [
    {label:'Jan',value:31},{label:'Feb',value:34},{label:'Mar',value:32},
    {label:'Apr',value:38},{label:'May',value:36},{label:'Jun',value:40},
    {label:'Jul',value:42},
  ];

  const membershipDist = [
    {label:'Individual Gents', count:820, color:'#dc2626', pct:29},
    {label:'Individual Ladies',count:640, color:'#3b82f6', pct:22},
    {label:'Couple',           count:410, color:'#22c55e', pct:14},
    {label:'Family',           count:280, color:'#f59e0b', pct:10},
    {label:'Student',          count:390, color:'#8b5cf6', pct:14},
    {label:'Buddy Packages',   count:307, color:'#06b6d4', pct:11},
  ];

  const branchStats = [
    {name:'Colombo 7', members:1240, revenue:'Rs. 1.8M', capacity:82, color:'#dc2626'},
    {name:'Moors',     members:980,  revenue:'Rs. 1.4M', capacity:71, color:'#3b82f6'},
    {name:'Ja Ela',    members:627,  revenue:'Rs. 0.9M', capacity:58, color:'#22c55e'},
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 text-xs uppercase tracking-widest">Loading overview...</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap size={11} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[9px] font-bold uppercase tracking-[0.3em]">Dashboard</span>
          </div>
          <h1 className="text-3xl font-black uppercase leading-none">Overview</h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', {
              weekday:'long', year:'numeric', month:'long', day:'numeric'
            })}
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex gap-1 bg-gray-950 border border-gray-800 rounded-xl p-1">
          {['week','month','year'].map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                timeRange === r ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>

      {/* ── Quick navigation ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label:'Manage Members',  icon:Users,     to:'/admindashboard/members',  color:'#dc2626' },
          { label:'Manage Trainers', icon:Dumbbell,  to:'/admindashboard/trainers', color:'#3b82f6' },
          { label:'Media Manager',   icon:Activity,  to:'/admindashboard/media',    color:'#22c55e' },
          { label:'View Classes',    icon:Calendar,  to:'/admindashboard/classes',  color:'#f59e0b' },
        ].map((q, i) => (
          <QuickNav key={i} {...q} navigate={navigate} />
        ))}
      </div>

      {/* ── Revenue chart + Pending actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Revenue</p>
              <h3 className="text-white font-black uppercase">Monthly Overview</h3>
            </div>
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold
              bg-green-600/10 border border-green-600/20 px-3 py-1.5 rounded-full">
              <TrendingUp size={12}/> +8.3% vs last month
            </div>
          </div>
          <BarChart data={revenueData} color="#dc2626" height={130} />
          <p className="text-gray-700 text-[9px] text-center mt-3 uppercase tracking-widest">
            Rs. × 100,000
          </p>
        </div>

        {/* Pending actions */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Action Required</p>
              <h3 className="text-white font-black uppercase text-sm">Pending</h3>
            </div>
            {pendingList.length > 0 && (
              <span className="w-6 h-6 bg-yellow-600/20 border border-yellow-600/30 rounded-full
                flex items-center justify-center text-yellow-400 text-[10px] font-black">
                {pendingList.length}
              </span>
            )}
          </div>
          <div className="divide-y divide-gray-800/50">
            {pendingList.length === 0 ? (
              <div className="p-8 text-center">
                <Check size={24} className="text-green-500 mx-auto mb-2" />
                <p className="text-gray-600 text-xs uppercase tracking-widest">All clear!</p>
              </div>
            ) : pendingList.map((p, i) => (
              <div key={i} className="p-4 hover:bg-gray-950 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1 mr-2">
                    <p className="text-white text-sm font-bold truncate">{p.name}</p>
                    <p className="text-gray-600 text-xs">{p.id} • {p.branch}</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handlePendingAction(p.id, 'approve')}
                      className="w-7 h-7 rounded-lg bg-green-600/15 hover:bg-green-600 border border-green-600/30
                        flex items-center justify-center transition-all"
                    >
                      <Check size={11} className="text-green-400" />
                    </button>
                    <button
                      onClick={() => handlePendingAction(p.id, 'reject')}
                      className="w-7 h-7 rounded-lg bg-red-600/15 hover:bg-red-600 border border-red-600/30
                        flex items-center justify-center transition-all"
                    >
                      <X size={11} className="text-red-400" />
                    </button>
                  </div>
                </div>
                <span className="text-[9px] bg-yellow-600/15 border border-yellow-600/30
                  text-yellow-400 px-2 py-0.5 rounded-full font-black uppercase">
                  {p.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Membership distribution */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
          <div className="mb-5">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Plans</p>
            <h3 className="text-white font-black uppercase">Membership Split</h3>
          </div>
          <div className="space-y-3.5">
            {membershipDist.map((m, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-400">{m.label}</span>
                  <span className="text-white font-bold">
                    {m.count} <span className="text-gray-600">({m.pct}%)</span>
                  </span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width:`${m.pct}%`, backgroundColor:m.color }}
                  />
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
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor:b.color }} />
                    <p className="text-white font-bold text-sm">{b.name}</p>
                  </div>
                  <p className="text-white font-black text-sm">{b.members}</p>
                </div>
                <div className="flex justify-between text-[10px] text-gray-600 mb-1.5">
                  <span>{b.revenue}</span>
                  <span>{b.capacity}% capacity</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width:`${b.capacity}%`, backgroundColor:b.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live activity feed */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Live Feed</p>
              <h3 className="text-white font-black uppercase">Recent Activity</h3>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div className="divide-y divide-gray-800/50 max-h-72 overflow-y-auto">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-4 hover:bg-gray-950 transition-colors">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor:`${a.color}15`, border:`1px solid ${a.color}30` }}
                >
                  <a.icon size={12} style={{ color:a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 text-xs leading-relaxed">{a.text}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock size={9} className="text-gray-700" />
                    <p className="text-gray-700 text-[9px]">{a.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent members table ── */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Latest</p>
            <h3 className="text-white font-black uppercase">Recent Members</h3>
          </div>
          <button
            onClick={() => navigate('/admindashboard/members')}
            className="flex items-center gap-1.5 text-red-500 hover:text-red-400 text-xs
              font-bold uppercase tracking-wider transition-colors"
          >
            View All <ChevronRight size={12}/>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                {['Member','Branch','Plan','Status','Expires','Paid',''].map((h, i) => (
                  <th key={i} className="px-5 py-3.5 text-left text-[9px] text-gray-600
                    uppercase tracking-widest font-bold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {members.map((m, i) => (
                <tr key={i} className="hover:bg-gray-950/60 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-red-600/10 border border-red-600/20
                        flex items-center justify-center text-red-500 font-black text-sm flex-shrink-0">
                        {(m.name || '?').charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm whitespace-nowrap">{m.name}</p>
                        <p className="text-gray-600 text-xs">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-400 text-sm whitespace-nowrap">{m.branch}</td>
                  <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">{m.plan}</td>
                  <td className="px-5 py-4"><Badge status={m.status} /></td>
                  <td className="px-5 py-4 text-gray-500 text-xs whitespace-nowrap">{m.expires}</td>
                  <td className="px-5 py-4 text-green-400 font-black text-xs whitespace-nowrap">{m.paid}</td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => navigate('/admindashboard/members')}
                      className="w-7 h-7 rounded-lg bg-gray-900 border border-gray-700
                        hover:border-blue-500 flex items-center justify-center transition-all
                        opacity-0 group-hover:opacity-100"
                    >
                      <Eye size={11} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}