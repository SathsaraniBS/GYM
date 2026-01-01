// src/pages/Membership.jsx
import React, { useState } from 'react';  // ← Fixed: Added useState
import Navbar from '../components/Navbar';

function Membership() {
  const [branch, setBranch] = useState('');
  const [time, setTime] = useState('Off Peak');
  const [packageName, setPackageName] = useState('');
  const [duration, setDuration] = useState('');

  const pricingData = {
    '2 Gents (Buddy Offer)': { annual: 110000, monthly: 10000 },
    'Buddy Gents': { annual: 85000, monthly: 7500 },
    'Buddy Ladies': { annual: 85000, monthly: 7500 },
    'Individual Ladies': { annual: 90000, monthly: 8000 },
    'Individual Gents': { annual: 95000, monthly: 8500 },
    'Couple': { annual: 160000, monthly: 14000 },
    'Family': { annual: 250000, monthly: 22000 },
    'Student': { annual: 60000, monthly: 5500 },
  };

  const calculateTotal = () => {
    if (!packageName || !duration) return 0;
    return pricingData[packageName]?.[duration.toLowerCase()] || 0;
  };

  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Membership Registration
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Selection Form */}
          <div className="space-y-8">
            <div>
              <label className="block text-xl font-semibold mb-3">Branch:</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              >
                <option value="">Select Branch</option>
                <option value="moors">Moors</option>
                <option value="jaela">Ja Ela</option>
                <option value="colombo7">Colombo 7</option>
              </select>
            </div>

            <div>
              <label className="block text-xl font-semibold mb-3">Time:</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              >
                <option>Off Peak</option>
                <option>Peak</option>
                <option>Full Time</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xl font-semibold mb-3">Package Name:</label>
                <select
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
                >
                  <option value="">Select Package Name</option>
                  <option>2 Gents (Buddy Offer)</option>
                  <option>Buddy Gents</option>
                  <option>Buddy Ladies</option>
                  <option>Individual Ladies</option>
                  <option>Individual Gents</option>
                  <option>Couple</option>
                  <option>Family</option>
                  <option>Student</option>
                </select>
              </div>

              <div>
                <label className="block text-xl font-semibold mb-3">Membership:</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
                >
                  <option value="">Select Duration</option>
                  <option value="annual">Annual</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="text-right">
              <a href="#" className="text-yellow-400 hover:underline text-lg">
                Promotion Code here!
              </a>
            </div>
          </div>

          {/* Right Side - Summary & Contact Form */}
          <div className="space-y-8">
            {packageName && duration && (
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
                <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
                  {packageName}
                </h2>
                <div className="space-y-4 text-lg">
                  <div className="flex justify-between">
                    <span>{packageName}</span>
                    <span>1 X</span>
                    <span>Rs. {(pricingData[packageName]?.[duration.toLowerCase()] || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{time}</span>
                    <span></span>
                    <span>{duration === 'annual' ? 'Annual' : 'Monthly'}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Total</span>
                      <span>Rs. {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700">
              <h2 className="text-3xl font-bold mb-8 text-center">Contact</h2>
              <div className="space-y-6">
                <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
                  <input type="text" placeholder="Last Name" className="px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <input type="text" placeholder="Address" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500" />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 rounded-lg transition transform hover:scale-105">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Membership;