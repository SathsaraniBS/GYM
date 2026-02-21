import React from 'react'
import { useState, useEffect } from 'react';
import api from '../../api/api'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useTheme } from '../../context/ThemeContext';
function UserOverview() {
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
                    title="Workouts"
                    value={`{stats.Workouts.toLocaleString()}`}
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
                
      
    </div>
    </div>
  )
}

export default UserOverview
