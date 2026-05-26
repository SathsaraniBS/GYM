// src/pages/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Bell, Search, RefreshCw, Zap } from 'lucide-react';
import AdminSidebar from '../../components/Admin/AdminSidebar';

// ── Page title map ──
const pageTitles = {
  '/admindashboard':          { title: 'Dashboard',       sub: 'Overview & analytics'      },
  '/admindashboard/members':  { title: 'User Management', sub: 'Manage all gym members'    },
  '/admindashboard/trainers': { title: 'Trainers',        sub: 'Manage training staff'     },
  '/admindashboard/revenue':  { title: 'Revenue',         sub: 'Financial reports'         },
  '/admindashboard/classes':  { title: 'Classes',         sub: 'Schedule & bookings'       },
  '/admindashboard/media':    { title: 'Media Manager',   sub: 'Images & videos'           },
  '/admindashboard/settings': { title: 'Settings',        sub: 'System configuration'      },
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasNotif,    setHasNotif]    = useState(true);
  const [searchVal,   setSearchVal]   = useState('');
  const location = useLocation();

  const current = pageTitles[location.pathname] || { title: 'Admin', sub: 'FitTrack panel' };

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* ── Sidebar ── */}
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* ── Main ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* ── Top bar ── */}
        <header className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm border-b border-gray-800/60 px-6 py-3.5 flex items-center justify-between gap-4">

          {/* Left — hamburger + page title */}
          <div className="flex items-center gap-4 min-w-0">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center hover:border-gray-600 transition-colors flex-shrink-0"
            >
              <Menu size={16} className="text-gray-400" />
            </button>

            {/* Page title (desktop) */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 mb-0.5">
                <Zap size={10} className="text-red-500 fill-red-500" />
                <span className="text-red-500 text-[9px] font-bold uppercase tracking-[0.3em]">FitTrack</span>
              </div>
              <h2 className="text-white font-black text-base uppercase leading-none">{current.title}</h2>
            </div>

            {/* Search bar */}
            <div className="hidden sm:flex items-center gap-2 bg-gray-950 border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-2.5 w-64 transition-colors focus-within:border-red-600">
              <Search size={13} className="text-gray-600 flex-shrink-0" />
              <input
                placeholder="Search members, plans..."
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                className="bg-transparent text-white text-sm placeholder-gray-700 outline-none w-full"
              />
              {searchVal && (
                <button onClick={() => setSearchVal('')}
                  className="text-gray-600 hover:text-white transition-colors">
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Date (desktop) */}
            <span className="hidden xl:block text-gray-600 text-xs mr-2">
              {new Date().toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })}
            </span>

            {/* Refresh */}
            <button
              onClick={() => window.location.reload()}
              title="Refresh"
              className="w-9 h-9 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center hover:border-gray-600 transition-colors group"
            >
              <RefreshCw size={14} className="text-gray-500 group-hover:rotate-180 transition-transform duration-500" />
            </button>

            {/* Notifications */}
            <button
              onClick={() => setHasNotif(false)}
              title="Notifications"
              className="relative w-9 h-9 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center hover:border-gray-600 transition-colors"
            >
              <Bell size={15} className="text-gray-500" />
              {hasNotif && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>
          </div>
        </header>

        {/* ── Page content via Outlet ── */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-gray-800/40 px-8 py-3 flex items-center justify-between">
          <p className="text-gray-700 text-[10px] uppercase tracking-widest">
            FitTrack Admin Panel
          </p>
          <p className="text-gray-700 text-[10px]">
            © {new Date().getFullYear()} FitTrack Gym
          </p>
        </footer>
      </div>
    </div>
  );
}