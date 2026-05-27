// src/components/AdminComponents/Adminsidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Dumbbell, Image,
  Settings, LogOut, Zap, X, ChevronRight,
  Calendar, UserCog, MessageSquare,
  Shield, Activity, ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      { to:'/admindashboard',          icon:LayoutDashboard, label:'Overview'      },
      { to:'/admindashboard/members',  icon:Users,           label:'Members'       },
      { to:'/admindashboard/users',    icon:UserCog,         label:'Users'         },
      { to:'/admindashboard/trainers', icon:Dumbbell,        label:'Trainers'      },
    ],
  },
  {
    label: 'Management',
    items: [
      { to:'/admindashboard/classes', icon:Calendar,      label:'Classes'        },
      { to:'/admindashboard/contact', icon:MessageSquare, label:'Contact'        },
      { to:'/admindashboard/media',   icon:Image,         label:'Media Manager'  },
    ],
  },
  {
    label: 'System',
    items: [
      { to:'/admindashboard/settings', icon:Settings, label:'Settings' },
    ],
  },
];

const NavItem = ({ item, active, onClick }) => (
  <Link
    to={item.to}
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
      active
        ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
        : 'text-gray-500 hover:text-white hover:bg-gray-900/80'
    }`}
  >
    <item.icon size={16} className={`flex-shrink-0 transition-colors ${
      active ? 'text-white' : 'text-gray-600 group-hover:text-red-400'
    }`} />
    <span className="text-sm font-semibold truncate">{item.label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />}
  </Link>
);

export default function Adminsidebar({ open, setOpen }) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();

  const handleLogout = () => { logout(); navigate('/login'); };
  const isActive = (to) => location.pathname === to;

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 z-40 flex flex-col
        bg-[#050505] border-r border-gray-800/60
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>

        {/* ── Logo header ── */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800/60">

          {/* Left — icon + text */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40 flex-shrink-0">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-white font-black text-base uppercase leading-none tracking-wider">
                FitTrack
              </h2>
              <p className="text-gray-600 text-[9px] uppercase tracking-[0.25em] mt-0.5">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Right — ExternalLink on desktop, X on mobile — gap-2 separates from text */}
          <div className="flex items-center gap-2 flex-shrink-0 pl-3">
            {/* Desktop: go to website */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              title="View Website"
              className="hidden lg:flex w-7 h-7 rounded-lg bg-gray-900 border border-gray-800
                items-center justify-center hover:border-red-600/50 hover:bg-red-600/10
                text-gray-600 hover:text-red-500 transition-all duration-200 group"
            >
              <ExternalLink size={13} className="group-hover:scale-110 transition-transform" />
            </Link>

            {/* Mobile: close sidebar */}
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden w-7 h-7 rounded-lg bg-gray-900 border border-gray-800
                flex items-center justify-center hover:border-gray-600 transition-colors"
            >
              <X size={14} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* ── Admin profile card ── */}
        <div className="px-4 py-4 border-b border-gray-800/60">
          <div className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-400 font-black text-sm flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-bold truncate leading-tight">
                {user?.name || 'Admin'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <p className="text-gray-500 text-[9px] uppercase tracking-widest truncate">
                  Super Admin
                </p>
              </div>
            </div>
            <Shield size={13} className="text-gray-700 flex-shrink-0" />
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>
              <p className="text-gray-700 text-[9px] uppercase tracking-[0.25em] font-bold px-3 mb-2">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item, ii) => (
                  <NavItem
                    key={ii}
                    item={item}
                    active={isActive(item.to)}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* ── Footer ── */}
        <div className="px-4 pb-4 border-t border-gray-800/60 pt-4 space-y-0.5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500
              hover:text-red-400 hover:bg-red-600/10 transition-all duration-200 group"
          >
            <LogOut size={16} className="text-gray-600 group-hover:text-red-400 transition-all group-hover:-translate-x-0.5 flex-shrink-0" />
            <span className="text-sm font-semibold">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}