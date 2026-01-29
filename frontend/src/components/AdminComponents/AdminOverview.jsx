import { useState, useEffect } from 'react';
import api from '../../api/api';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

const AdminOverview = () => {
    const [stats, setStats] = useState({
        users: 0,
        bookings: 0,
        revenue: 0,
    });
    const { theme } = useTheme();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch actual data to calculate stats
                const [ usersRes, bookingsRes] = await Promise.all([
                    // api.get('/auth/users'),
                    api.get('/users'),
                    api.get('/bookings')
                ]);

                const totalRevenue = bookingsRes.data.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

                setStats({
                    movies: moviesRes.data.length,
                    users: usersRes.data.length,
                    bookings: bookingsRes.data.length,
                    revenue: totalRevenue
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    // Mock data for charts - in a real app, this would be aggregated from DB
    const revenueData = [
        { name: 'Mon', revenue: 1200 },
        { name: 'Tue', revenue: 1890 },
        { name: 'Wed', revenue: 1700 },
        { name: 'Thu', revenue: 2780 },
        { name: 'Fri', revenue: 1890 },
        { name: 'Sat', revenue: 3700 },
        { name: 'Sun', revenue: 3490 },
    ];

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <div className="glass-card p-6 rounded-2xl border border-luxury-200 dark:border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
                <Icon className="w-16 h-16" />
            </div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-white`}>
                        <Icon className={`w-6 h-6 ${color.replace('text-', '')}`} />
                        {/* Note: color prop is like 'text-gold-500', so we can't just use it for bg. 
                            Let's simplify colors logic later or use hardcoded classes for now.
                        */}
                    </div>
                    <span className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" /> {trend}%
                    </span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
                <p className="text-3xl font-bold text-luxury-900 dark:text-white mt-1 font-serif">{value}</p>
            </div>
        </div>
    );

    const chartColors = {
        stroke: theme === 'dark' ? '#EAB308' : '#D97706', // Gold-500 vs Gold-600
        fill: theme === 'dark' ? '#EAB308' : '#F59E0B',
        grid: theme === 'dark' ? '#ffffff10' : '#00000010',
        text: theme === 'dark' ? '#9CA3AF' : '#4B5563'
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-luxury-900 dark:text-white mb-2">Dashboard Overview</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-black/20 p-2 rounded-xl border border-luxury-200 dark:border-white/10">
                    <span className="text-sm text-gray-500 px-2">Last 7 Days</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.revenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="text-gold-500"
                    trend="+12.5"
                />
                <StatCard
                    title="Total Bookings"
                    value={stats.bookings}
                    icon={Ticket}
                    color="text-blue-500"
                    trend="+8.2"
                />
                <StatCard
                    title="Active classes"
                    value={stats.movies}
                    icon={Film}
                    color="text-purple-500"
                    trend="+2.4"
                />
                <StatCard
                    title="Total Users"
                    value={stats.users}
                    icon={Users}
                    color="text-green-500"
                    trend="+5.1"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <div className="glass-card p-6 rounded-2xl border border-luxury-200 dark:border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-luxury-900 dark:text-white font-serif">Revenue Trend</h3>
                        <Activity className="w-5 h-5 text-gold-500" />
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartColors.fill} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={chartColors.fill} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke={chartColors.text}
                                    tick={{ fill: chartColors.text }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke={chartColors.text}
                                    tick={{ fill: chartColors.text }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                                        border: '1px solid #333',
                                        borderRadius: '8px',
                                        color: theme === 'dark' ? '#fff' : '#000'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke={chartColors.stroke}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bookings Chart */}
                <div className="glass-card p-6 rounded-2xl border border-luxury-200 dark:border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-luxury-900 dark:text-white font-serif">Daily Bookings</h3>
                        <Ticket className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke={chartColors.text}
                                    tick={{ fill: chartColors.text }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke={chartColors.text}
                                    tick={{ fill: chartColors.text }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: theme === 'dark' ? '#ffffff05' : '#00000005' }}
                                    contentStyle={{
                                        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff',
                                        border: '1px solid #333',
                                        borderRadius: '8px',
                                        color: theme === 'dark' ? '#fff' : '#000'
                                    }}
                                />
                                <Bar
                                    dataKey="revenue"
                                    name="Bookings"
                                    fill="#3B82F6"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
