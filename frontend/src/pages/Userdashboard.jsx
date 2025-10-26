import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'; // Import Recharts for the line chart

const UserDashboard = () => {
  // Mock data for the line chart
  const chartData = [
    { week: 'W1', frequency: 2.5 },
    { week: 'W2', frequency: 1.8 },
    { week: 'W3', frequency: 3.2 },
    { week: 'W4', frequency: 2.8 },
    { week: 'W5', frequency: 3.0 },
  ];

  return (
    <div className="bg-gray-100">
    <Navbar />
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 fixed h-full">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="#" className="block py-2 px-4 bg-red-700 rounded text-red-300 font-bold">Dashboard</a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Users</a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Nutrition</a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Progress</a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Community</a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Settings</a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Notifications</a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Support</a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded text-gray-300">Logout</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8 w-full">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-400 mb-2">Total Users</h2>
            <p className="text-4xl font-bold">1,250</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-400 mb-2">Active Members</h2>
            <p className="text-4xl font-bold">875</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-400 mb-2">New Signups</h2>
            <p className="text-4xl font-bold">120</p>
          </div>
        </div>

        {/* Workout Plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-400 mb-2">Workout Plan</h2>
            <h3 className="text-xl font-bold mb-4">Strength Training</h3>
            <p className="text-gray-400 mb-4">Build muscle and increase strength with this plan.</p>
            <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300">
              Start Workout
            </button>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center">
            <img
              src=""
              alt="Gym Equipment"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Achievements */}
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <img
              src=""
              alt="Trophy"
              className="mx-auto mb-4"
            />
            <p className="text-lg font-semibold">100 Workouts Completed</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <img
              src=""
              alt="Fire"
              className="mx-auto mb-4"
            />
            <p className="text-lg font-semibold">5000 Calories Burned</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <img
              src=""
              alt="Calendar"
              className="mx-auto mb-4"
            />
            <p className="text-lg font-semibold">30 Days Streak</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default UserDashboard;