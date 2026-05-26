// src/components/Admin/AdminSidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Dumbbell, Image, Settings,
  LogOut, Zap, ChevronRight, X, Menu, Bell,
  TrendingUp, Calendar, UserCog, Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar({ open, setOpen }) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();

  const handleLogout = () => { logout(); navigate('/login'); };

  const navGroups = [
    {
      label: 'Main',
      items: [
        { to: '/admindashboard',              icon: LayoutDashboard, label: 'Dashboard'         },
        { to: '/admindashboard/members',      icon: Users,           label: 'Members'           },
        { to: '/admindashboard/trainers',     icon: Dumbbell,        label: 'Trainers'          },
        { to: '/admindashboard/revenue',      icon: TrendingUp,      label: 'Revenue'           },
        { to: '/admindashboard/classes',      icon: Calendar,        label: 'Classes'           },
      ],
    },
    {
      label: 'Content',
      items: [
        { to: '/admindashboard/media',        icon: Image,           label: 'Media Manager'     },
      ],
    },
    {
      label: 'System',
      items: [
        { to: '/admindashboard/settings',     icon: Settings,        label: 'Settings'          },
      ],
    },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#050505] border-r border-gray-800/60 z-40 flex flex-col transition-transform duration-300 ${
        open ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>

        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-800/60 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <h2 className="text-white font-black text-lg uppercase tracking-wider">FitTrack</h2>
            </div>
            <p className="text-gray-600 text-[9px] uppercase tracking-[0.3em] mt-0.5 ml-9">Admin Panel</p>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-gray-600 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Admin info */}
        <div className="px-4 py-4 border-b border-gray-800/60">
          <div className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-400 font-black text-sm flex-shrink-0">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">{user?.name || 'Admin'}</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-gray-500 text-[9px] uppercase tracking-widest">Super Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              <p className="text-gray-700 text-[9px] uppercase tracking-[0.25em] font-bold px-3 mb-2">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map((item, ii) => (
                  <Link key={ii} to={item.to} onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                      isActive(item.to)
                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
                        : 'text-gray-500 hover:text-white hover:bg-gray-900'
                    }`}>
                    <item.icon size={16} className={isActive(item.to) ? 'text-white' : 'text-gray-600 group-hover:text-red-400 transition-colors'} />
                    <span className="text-sm font-semibold">{item.label}</span>
                    {isActive(item.to) && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-800/60 space-y-1">
          <Link to="/" target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-white hover:bg-gray-900 transition-all text-sm font-semibold group">
            <Shield size={16} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
            View Website
          </Link>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-600/10 transition-all group">
            <LogOut size={16} className="text-gray-600 group-hover:text-red-400 transition-colors group-hover:-translate-x-0.5 transform duration-200" />
            <span className="text-sm font-semibold">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}