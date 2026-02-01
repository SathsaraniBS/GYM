import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, User, CalendarCheck, Apple, CreditCard, LogOut, Trophy, Sun, Moon, Activity, Settings, ExternalLink, HeartPulse } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const UserSidebar = () => {
    const { pathname } = useLocation();
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    // User-centric fitness links
    const links = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { path: '/workouts', icon: Dumbbell, label: 'Workout Plans' },
        { path: '/progress', icon: Activity, label: 'Progress Tracking' },
        { path: '/classes', icon: CalendarCheck, label: 'Book Classes' },
        { path: '/nutrition', icon: Apple, label: 'Diet & Nutrition' },
        { path: '/achievements', icon: Trophy, label: 'Milestones' },
        { path: '/membership', icon: CreditCard, label: 'Membership' },
        { path: '/profile', icon: User, label: 'My Profile' },
        { path: '/settings', icon: Settings, label: 'Settings' },
    ];

    const isActive = (path) => {
        if (path === '/dashboard' && pathname === '/dashboard') return true;
        if (path !== '/dashboard' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white z-50 pt-10 hidden lg:flex flex-col transition-colors duration-500 shadow-xl">
            {/* Branding Section */}
            <div className="px-6 mb-8 flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <HeartPulse className="w-6 h-6 text-lime-500" />
                        <h2 className="text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-white">
                            VITALITY
                        </h2>
                    </div>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-[0.2em] ml-8">
                        Member Portal
                    </p>
                </div>
                <Link
                    to="/"
                    className="p-2 rounded-lg transition-all duration-300 hover:bg-lime-500/10 border border-zinc-200 dark:border-zinc-800 hover:border-lime-500/40 group text-zinc-500 hover:text-lime-500"
                    title="Home Page"
                >
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Link>
            </div>

            {/* Navigation */}
            <nav className="px-4 space-y-1 flex-1 overflow-y-auto scrollbar-hide">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive(link.path)
                            ? 'bg-lime-500 text-black font-bold shadow-lg shadow-lime-500/20'
                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-800'
                            }`}
                    >
                        <link.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive(link.path) ? 'text-black' : ''}`} />
                        <span className="text-sm">{link.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 p-2 rounded-lg text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 group"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-wider">Exit</span>
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full transition-all duration-300 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 group"
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