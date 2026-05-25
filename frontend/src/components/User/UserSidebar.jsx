// src/components/User/UserSidebar.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Dumbbell, User, CalendarCheck,
  Apple, CreditCard, LogOut, Trophy, Sun, Moon,
  Activity, Settings, ExternalLink, HeartPulse
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext'; // ✅ ThemeContext now exists

const UserSidebar = () => {
  const { pathname } = useLocation();
  const navigate     = useNavigate();
  const { logout }   = useAuth();
  const { theme, toggleTheme } = useTheme(); // ✅ No longer crashes

  const links = [
    { path: '/user/dashboard',          icon: LayoutDashboard, label: 'Overview'         },
    { path: '/user/dashboard/userworkouts', icon: Dumbbell,        label: 'Workout Plans'    },
    { path: '/user/dashboard/progress', icon: Activity,        label: 'Progress'         },
    { path: '/course',                  icon: CalendarCheck,   label: 'Book Classes'     },
    { path: '/user/dashboard/nutrition',icon: Apple,           label: 'Diet & Nutrition' },
    { path: '/user/dashboard/milestones',icon: Trophy,         label: 'Milestones'       },
    { path: '/membership',              icon: CreditCard,      label: 'Membership'       },
    { path: '/profile',                 icon: User,            label: 'My Profile'       },
    { path: '/user/dashboard/settings', icon: Settings,        label: 'Settings'         },
  ];

  const isActive = (path) => pathname === path || (path !== '/user/dashboard' && pathname.startsWith(path));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-80px)] w-64 bg-black border-r border-gray-800 text-white z-40 hidden lg:flex flex-col shadow-xl">

      {/* ── Branding ── */}
      <div className="px-6 py-6 flex items-center justify-between border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              FitTrack
            </h2>
          </div>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] ml-7">
            Member Portal
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

      {/* ── Navigation ── */}
      <nav className="px-3 py-4 flex-1 overflow-y-auto space-y-1">
        {links.map((link) => {
          const active = isActive(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                active
                  ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-900/30'
                  : 'text-gray-500 hover:text-white hover:bg-gray-900'
              }`}
            >
              {/* Active left bar */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-white rounded-r-full" />
              )}
              <link.icon className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${active ? 'text-white' : 'text-gray-600 group-hover:text-red-500'}`} />
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom: Logout + Theme toggle ── */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 group"
            title="Logout"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Exit</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-gray-800 hover:border-gray-600 text-gray-500 hover:text-white transition-all duration-300 group"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            ) : (
              <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;