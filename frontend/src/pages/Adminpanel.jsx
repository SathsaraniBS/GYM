// src/pages/GymAdminDashboard.jsx
import React from 'react';

const GymAdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 border-r border-gray-800 fixed h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-yellow-500">FitTrack Gym</h1>
          <p className="text-sm text-gray-400">ADMIN PANEL</p>
        </div>
        <nav className="mt-10">
          <ul className="space-y-2 px-4">
            <li className="flex items-center space-x-4 py-3 px-4 bg-yellow-900/30 rounded-lg">
              <span className="text-yellow-500">📊</span>
              <span>Overview</span>
            </li>
            <li className="flex items-center space-x-4 py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span>💪</span>
              <span>Trainers</span>
            </li>
            <li className="flex items-center space-x-4 py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span>👥</span>
              <span>Members</span>
            </li>
            <li className="flex items-center space-x-4 py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span>🏋️</span>
              <span>Classes</span>
            </li>
            <li className="flex items-center space-x-4 py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span>📅</span>
              <span>Memberships</span>
            </li>
            <li className="flex items-center space-x-4 py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span>💰</span>
              <span>Revenue</span>
            </li>
            <li className="flex items-center space-x-4 py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span>📊</span>
              <span>Attendance</span>
            </li>
            <li className="flex items-center space-x-4 py-3 px-4 hover:bg-gray-800 rounded-lg cursor-pointer">
              <span>⚙️</span>
              <span>Settings</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
            <p className="text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <button className="px-4 py-2 bg-gray-800 rounded-lg">Last 7 Days</button>
        </header>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-4xl">💰</span>
              <span className="text-green-500 text-sm">+12.5%</span>
            </div>
            <h3 className="text-lg">Total Revenue</h3>
            <p className="text-3xl font-bold">$0</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-4xl">📅</span>
              <span className="text-green-500 text-sm">+8.2%</span>
            </div>
            <h3 className="text-lg">Total Bookings</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-4xl">👥</span>
              <span className="text-green-500 text-sm">+2.4%</span>
            </div>
            <h3 className="text-lg">Active Members</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-4xl">🏋️</span>
              <span className="text-green-500 text-sm">+5.1%</span>
            </div>
            <h3 className="text-lg">Total Trainers</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Revenue Trend</h3>
            {/* Placeholder for line chart (use Recharts or Chart.js) */}
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Line Chart Placeholder</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Daily Attendance</h3>
            {/* Placeholder for bar chart */}
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Bar Chart Placeholder</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GymAdminDashboard;