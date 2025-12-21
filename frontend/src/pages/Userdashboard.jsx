// src/pages/Userdashboard.jsx
import React, { useEffect, useState } from 'react';
import UserNavbar from '../components/User/UserNavbar';
import { useAuth } from '../hooks/useAuth';
import { FaUserCircle, FaWhatsapp } from 'react-icons/fa';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import PersonalInfoForm from '../components/User/PresonalInfo';
import ChangePasswordForm from '../components/User/ChangePasswordForm';

function Userdashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const handleShowChangePassword = () => {
    setShowChangePassword(true);
  };

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showMembership, setShowMembership] = useState(false);
  const [showBookClass, setShowBookClass] = useState(false);
  const [showViewSchedule, setShowViewSchedule] = useState(false);

  useEffect(() => {
    if (user !== undefined) setLoading(false);
  }, [user]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <p className="text-3xl">Please log in</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Welcome back, {user.name}!
        </h2>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Sidebar */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-red-900">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <FaUserCircle className="text-9xl text-gray-600" />
                  <div className="absolute bottom-3 right-3 w-10 h-10 bg-green-500 rounded-full border-4 border-black"></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                  <p className="text-green-400 mt-2">Active Member</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-red-900 to-orange-900 rounded-xl p-6 text-center">
              <h4 className="text-xl font-bold mb-6 text-white">Quick Actions</h4>

              <div className="space-y-4">
                {/* Personal Information - Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                  className="flex items-center justify-between bg-white text-black py-4 px-6 rounded-lg font-bold hover:bg-gray-200 transition w-full text-left"
                >
                  <span>Personal Information</span>
                  <span
                    className={`bg-transparent border-2 border-red-500 text-red-500 w-10 h-10 rounded flex items-center justify-center text-lg font-bold transition-transform ${
                      showPersonalInfo ? 'rotate-180' : ''
                    }`}
                  >
                    &gt;
                  </span>
                </button>

                {/* Book Class */}
                <button
                  type="button"
                  onClick={() => setShowBookClass(!ShowBookClass)}
                  className="flex items-center justify-between bg-white text-black py-4 px-6 rounded-lg font-bold hover:bg-gray-200 transition w-full text-left"

                >
                  <span>Book Class</span>
                  <span
                    className={`bg-transparent border-2 border-red-500 text-red-500 w-10 h-10 rounded flex items-center justify-center text-lg font-bold transition-transform ${
                      showBookClass ? 'rotate-180' : ''
                    }`}
                  >
                    &gt;
                  </span>
                </button>

                {/* View Schedule */}
                <button
                  type="button"
                  onClick={() => setShowViewSchedule(!setShowViewSchedule)}
                  className="flex items-center justify-between bg-white text-black py-4 px-6 rounded-lg font-bold hover:bg-gray-200 transition w-full text-left"

                >
                  <span>View Schedule</span>
                  <span
                    className={`bg-transparent border-2 border-red-500 text-red-500 w-10 h-10 rounded flex items-center justify-center text-lg font-bold transition-transform ${
                      ShowBookClass ? 'rotate-180' : ''
                    }`}
                  >
                    &gt;
                  </span>
                </button>

                {/* Membership Details */}
                <button
                  type="button"
                  onClick={() => setShowMembership(!setShowMembership)}
                  className="flex items-center justify-between bg-white text-black py-4 px-6 rounded-lg font-bold hover:bg-gray-200 transition w-full"
                >
                  <span>Membership Details</span>
                  <span
                    className={`bg-transparent border-2 border-red-500 text-red-500 w-10 h-10 rounded flex items-center justify-center text-lg font-bold transition-transform ${
                      showMembership ? 'rotate-180' : ''
                    }`}
                  >
                    &gt;
                  </span>
                </button>

                {/* Change Password */}
                <button
                  type="button"
                  onClick={(handleShowChangePassword) => setShowChangePassword(!setShowChangePassword)}
                  className="flex items-center justify-between bg-white text-black py-4 px-6 rounded-lg font-bold hover:bg-gray-200 transition w-full"

                >
                  <span>Change Password</span>
                  <span
                    className={`bg-transparent border-2 border-red-500 text-red-500 w-10 h-10 rounded flex items-center justify-center text-lg font-bold transition-transform ${
                      ShowBookClass ? 'rotate-180' : ''
                    }`}
                  >
                    &gt;
                  </span>
                  
                </button>

                {/* Logout */}
                <Link
                  to="/"
                  className="flex items-center justify-between bg-white text-black py-4 px-6 rounded-lg font-bold hover:bg-gray-200 transition w-full"
                >
                  <span>Logout</span>
                  <span className="bg-transparent border-2 border-red-500 text-red-500 w-10 h-10 rounded flex items-center justify-center text-lg font-bold">
                    &gt;
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Progress & Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Stats */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
              <h3 className="text-3xl font-bold mb-6">Your Progress</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-black p-6 rounded-xl">
                  <p className="text-4xl font-bold text-red-500">24</p>
                  <p className="text-gray-400">This Month</p>
                </div>
                <div className="bg-black p-6 rounded-xl">
                  <p className="text-4xl font-bold text-orange-500">89%</p>
                  <p className="text-gray-400">Attendance</p>
                </div>
                <div className="bg-black p-6 rounded-xl">
                  <p className="text-4xl font-bold text-green-500">+12kg</p>
                  <p className="text-gray-400">Strength</p>
                </div>
                <div className="bg-black p-6 rounded-xl">
                  <p className="text-4xl font-bold text-blue-500">4.9</p>
                  <p className="text-gray-400">Rating</p>
                </div>
              </div>
            </div>

            {/* Personal Information Form - Only shown when toggled */}
            {showPersonalInfo && (
              <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
                <h3 className="text-3xl font-bold mb-6">Personal Information</h3>
                <PersonalInfoForm />
              </div>
            )}

            {/* Book a Class - Only shown when toggled */}
            {showBookClass && (
              <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
                <h3 className="text-3xl font-bold mb-6">Book a Class</h3>
                <BookClass />
              </div>
            )}

            {/* View Schedule - Only shown when toggled */}
            {showViewSchedule && (
              <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
                <h3 className="text-3xl font-bold mb-6">View Schedule</h3>
                <ViewSchedule />
              </div>
            )}

            {/* Membership Details - Only shown when toggled */}
            {showMembership && (
              <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
                <h3 className="text-3xl font-bold mb-6">Membership Details</h3>
                <MembershipDetails />
              </div>
            )}

            {/* Change Password - Only shown when toggled */}
            {showChangePassword && (
              <div className="bg-gray-900 rounded-2xl p-8 border border-red-800">
                <h3 className="text-3xl font-bold mb-6">Change Password</h3>
                <ChangePassword />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/94743357593"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 p-5 rounded-full shadow-2xl z-50 transition"
      >
        <FaWhatsapp className="text-5xl text-white" />
      </a>

      <Footer />
    </div>
  );
}

export default Userdashboard;