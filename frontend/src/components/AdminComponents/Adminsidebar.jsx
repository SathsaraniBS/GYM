// src/components/AdminComponents/Adminsidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ExternalLink,LayoutDashboard, Users, Dumbbell, Image,
  Settings, LogOut, Zap, X, ChevronRight,
  TrendingUp, Calendar, UserCog, MessageSquare,
  Shield, Menu, Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// ─────────────────────────────────────────────
// NAV CONFIG — matches your AdminComponents files
// ─────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: 'Main',
    items: [
      {
        to:    '/admindashboard',
        icon:  LayoutDashboard,
        label: 'Overview',
        comp:  'AdminOverview',
      },
      {
        to:    '/admindashboard/members',
        icon:  Users,
        label: 'Members',
        comp:  'Adminmembers',
      },
      {
        to:    '/admindashboard/users',
        icon:  UserCog,
        label: 'Users',
        comp:  'AdminUsers',
      },
      {
        to:    '/admindashboard/trainers',
        icon:  Dumbbell,
        label: 'Trainers',
        comp:  'AdminTrainers',
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        to:    '/admindashboard/classes',
        icon:  Calendar,
        label: 'Classes',
        comp:  'AdminClass',
      },
      {
        to:    '/admindashboard/contact',
        icon:  MessageSquare,
        label: 'Contact',
        comp:  'AdminContact',
      },
      {
        to:    '/admindashboard/media',
        icon:  Image,
        label: 'Media Manager',
        comp:  'Adminmediamanager',
      },
    ],
  },
  {
    label: 'System',
    items: [
      {
        to:    '/admindashboard/settings',
        icon:  Settings,
        label: 'Settings',
        comp:  'AdminSetting',
      },
    ],
  },
];

// ─────────────────────────────────────────────
// COMPONENT — Single nav item
// ─────────────────────────────────────────────
const NavItem = ({ item, active, onClick }) => (
  <Link
    to={item.to}
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
      active
        ? 'bg-red-600 text-white shadow-lg shadow-red-900/30'
        : 'text-gray-500 hover:text-white hover:bg-gray-900/80'
    }`}
  >
    <item.icon
      size={16}
      className={`flex-shrink-0 transition-colors ${
        active
          ? 'text-white'
          : 'text-gray-600 group-hover:text-red-400'
      }`}
    />
    <span className="text-sm font-semibold truncate">{item.label}</span>
    {active && (
      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
    )}
  </Link>
);

// ─────────────────────────────────────────────
// MAIN SIDEBAR COMPONENT
// ─────────────────────────────────────────────
export default function Adminsidebar({ open, setOpen }) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (to) => location.pathname === to;

  return (
    <>
      {/* ── Mobile backdrop ── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar panel ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-40 flex flex-col
          bg-[#050505] border-r border-gray-800/60
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >

        {/* ── Logo + close button ── */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <div>
              <h2 className="text-white font-black text-base uppercase leading-none tracking-wider">
                FitTrack
              </h2>
              <p className="text-gray-600 text-[9px] uppercase tracking-[0.25em] mt-0.5">
                Admin Panel
              </p>
            </div>
            
            <Link
                to="/"
                title="Go to Home"
                className="p-2 rounded-lg border border-gray-800 hover:border-red-600/50 hover:bg-red-600/10 text-gray-600 hover:text-red-500 transition-all duration-300 group"
            >
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </Link>
        
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden w-7 h-7 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition-colors"
          >
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        {/* ── Admin profile card ── */}
        <div className="px-4 py-4 border-b border-gray-800/60">
          <div className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-400 font-black text-sm flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            {/* Info */}
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
            {/* Shield icon */}
            <Shield size={13} className="text-gray-700 flex-shrink-0" />
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-thin">
          {NAV_GROUPS.map((group, gi) => (
            <div key={gi}>
              {/* Group label */}
              <p className="text-gray-700 text-[9px] uppercase tracking-[0.25em] font-bold px-3 mb-2">
                {group.label}
              </p>
              {/* Items */}
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

        {/* ── Footer links ── */}
        <div className="px-4 pb-4 border-t border-gray-800/60 pt-4 space-y-0.5">


          {/* Sign out */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-600/10 transition-all duration-200 group"
          >
            <LogOut
              size={16}
              className="text-gray-600 group-hover:text-red-400 transition-all group-hover:-translate-x-0.5 flex-shrink-0"
            />
            <span className="text-sm font-semibold">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}