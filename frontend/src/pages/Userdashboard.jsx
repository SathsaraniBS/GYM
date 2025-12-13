// src/pages/Userdashboard.jsx
import React, { useEffect, useState } from 'react';
import UserNavbar from '../components/User/UserNavbar';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { FaUserCircle, FaEdit, FaWhatsapp } from 'react-icons/fa';

function Userdashboard() {
  const { user, token } = useAuth(); // Get real logged-in user
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch real user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !token) return;

      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load profile:', err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, token]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <p className="text-2xl">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <p className="text-3xl">Please log in to view your dashboard</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10 pt-24">
        <h2 className="text-5xl font-bold mb-10 text-center bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Welcome back, {user.name}!
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-800 rounded-2xl p-8 shadow-2xl border border-red-900">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <FaUserCircle className="text-9xl text-gray-600" />
                  <div className="absolute bottom-2 right-2 bg-green-500 border-4 border-black rounded-full w-10 h-10"></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{user.name || 'Member'}</h3>
                  <p className="text-gray-400 text-lg">{user.email}</p>
                  <p className="text-green-400 mt-2">Active Member</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-900 rounded-xl p-6 space-y-4 border border-gray-800">
              <div className="flex justify-between">
                <span className="text-gray-400">Membership</span>
                <span className="text-yellow-400 font-bold">Premium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Join Date</span>
                <span>Jan 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Workouts</span>
                <span className="text-2xl font-bold text-red-500">127</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-red-900 to-orange-900 rounded-xl p-6 text-center">
              <h4 className="text-xl font-bold mb-4">Quick Actions</h4>
              <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition mb-3">
                Book a Class
              </button>
              <button className="w-full bg-black border-2 border-white font-bold py-3 rounded-lg hover:bg-gray-900 transition">
                View Schedule
              </button>
            </div>
          </div>

          {/* Right Side - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
              <h3 className="text-3xl font-bold mb-6">Your Progress</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-black rounded-xl p-6">
                  <p className="text-4xl font-bold text-red-500">24</p>
                  <p className="text-gray-400">This Month</p>
                </div>
                <div className="bg-black rounded-xl p-6">
                  <p className="text-4xl font-bold text-orange-500">89%</p>
                  <p className="text-gray-400">Attendance</p>
                </div>
                <div className="bg-black rounded-xl p-6">
                  <p className="text-4xl font-bold text-green-500">+12kg</p>
                  <p className="text-gray-400">Strength Gain</p>
                </div>
                <div className="bg-black rounded-xl p-6">
                  <p className="text-4xl font-bold text-blue-500">4.9</p>
                  <p className="text-gray-400">Avg Rating</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
              <h3 className="text-3xl font-bold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-black/50 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold">Morning Cardio Session</p>
                    <p className="text-gray-400 text-sm">Today • 6:00 AM</p>
                  </div>
                  <span className="text-green-500 font-bold">Completed</span>
                </div>
                <div className="flex items-center justify-between bg-black/50 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold">Chest & Triceps</p>
                    <p className="text-gray-400 text-sm">Yesterday • 5:30 PM</p>
                  </div>
                  <span className="text-green-500 font-bold">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/94743357593"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-5 shadow-2xl transition z-50"
      >
        <FaWhatsapp className="text-5xl" />
      </a>
    </div>
  );
}

export default Userdashboard;