// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Menu, Bell, Search, RefreshCw, Zap } from 'lucide-react';

// ✅ Correct folder: AdminComponents (not Admin)
import Adminsidebar      from '../components/AdminComponents/Adminsidebar';
import AdminOverview     from '../components/AdminComponents/AdminOverview';
import Adminmembers      from '../components/AdminComponents/Adminmembers';
import AdminUsers        from '../components/AdminComponents/AdminUsers';
import AdminTrainers     from '../components/AdminComponents/AdminTrainers';
import AdminClass        from '../components/AdminComponents/AdminClass';
import AdminContact      from '../components/AdminComponents/AdminContact';
import Adminmediamanager from '../components/AdminComponents/Adminmediamanager';
import AdminSetting      from '../components/AdminComponents/AdminSetting';

// ── Page title map ──
const PAGE_TITLES = {
  '/admindashboard':          { title: 'Overview',      sub: 'Dashboard & analytics'  },
  '/admindashboard/members':  { title: 'Members',       sub: 'Manage gym members'     },
  '/admindashboard/users':    { title: 'Users',         sub: 'Manage user accounts'   },
  '/admindashboard/trainers': { title: 'Trainers',      sub: 'Manage training staff'  },
  '/admindashboard/classes':  { title: 'Classes',       sub: 'Schedule & bookings'    },
  '/admindashboard/contact':  { title: 'Contact',       sub: 'Member inquiries'       },
  '/admindashboard/media':    { title: 'Media Manager', sub: 'Images & videos'        },
  '/admindashboard/settings': { title: 'Settings',      sub: 'System configuration'   },
};

// ─────────────────────────────────────────────
// COMPONENT — Top bar
// ─────────────────────────────────────────────
const TopBar = ({ onMenuClick, hasNotif, onNotifClick }) => {
  const location = useLocation();
  const current  = PAGE_TITLES[location.pathname] || { title: 'Admin', sub: 'FitTrack Panel' };
  const [search, setSearch] = useState('');

  return (
    <header className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm border-b border-gray-800/60
      px-6 py-3.5 flex items-center justify-between gap-4">

      {/* Left */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 bg-gray-900 border border-gray-800 rounded-xl
            flex items-center justify-center hover:border-gray-600 transition-colors flex-shrink-0"
        >
          <Menu size={16} className="text-gray-400" />
        </button>

        {/* Page title */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 mb-0.5">
            <Zap size={10} className="text-red-500 fill-red-500" />
            <span className="text-red-500 text-[9px] font-bold uppercase tracking-[0.3em]">
              FitTrack Admin
            </span>
          </div>
          <h2 className="text-white font-black text-base uppercase leading-none">
            {current.title}
          </h2>
        </div>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-950 border border-gray-800
          hover:border-gray-700 focus-within:border-red-600 rounded-xl px-4 py-2.5 w-60 transition-colors">
          <Search size={13} className="text-gray-600 flex-shrink-0" />
          <input
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm placeholder-gray-700 outline-none w-full"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-gray-600 hover:text-white transition-colors text-xs"
            >✕</button>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="hidden xl:block text-gray-600 text-xs">
          {new Date().toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })}
        </span>

        <button
          onClick={() => window.location.reload()}
          className="w-9 h-9 bg-gray-950 border border-gray-800 rounded-xl flex items-center
            justify-center hover:border-gray-600 transition-colors group"
        >
          <RefreshCw size={14} className="text-gray-500 group-hover:rotate-180 transition-transform duration-500" />
        </button>

        <button
          onClick={onNotifClick}
          className="relative w-9 h-9 bg-gray-950 border border-gray-800 rounded-xl
            flex items-center justify-center hover:border-gray-600 transition-colors"
        >
          <Bell size={15} className="text-gray-500" />
          {hasNotif && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>
      </div>
    </header>
  );
};

// ─────────────────────────────────────────────
// MAIN — AdminDashboard
// ─────────────────────────────────────────────
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasNotif,    setHasNotif]    = useState(true);

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <Adminsidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top bar */}
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          hasNotif={hasNotif}
          onNotifClick={() => setHasNotif(false)}
        />

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Routes>
            <Route index          element={<AdminOverview />}     />
            <Route path="members" element={<Adminmembers />}      />
            <Route path="users"   element={<AdminUsers />}        />
            <Route path="trainers"element={<AdminTrainers />}     />
            <Route path="classes" element={<AdminClass />}        />
            <Route path="contact" element={<AdminContact />}      />
            <Route path="media"   element={<Adminmediamanager />} />
            <Route path="settings"element={<AdminSetting />}      />
            <Route path="*"       element={<Navigate to="/admindashboard" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800/40 px-8 py-3 flex items-center justify-between">
          <p className="text-gray-700 text-[10px] uppercase tracking-widest">FitTrack Admin Panel</p>
          <p className="text-gray-700 text-[10px]">© {new Date().getFullYear()} FitTrack Gym</p>
        </footer>
      </div>
    </div>
  );
}