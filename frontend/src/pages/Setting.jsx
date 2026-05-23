// src/pages/Setting.jsx
// This component is rendered inside the Admin panel <Outlet>
// AdminSidebar is already provided by Adminpanel.jsx — no sidebar needed here

import React, { useState } from 'react';
import { Building2, Phone, Mail, MapPin, Globe, DollarSign, Upload, Save } from 'lucide-react';

function Settings() {
  // Gym Name & Logo
  const [gymName, setGymName] = useState('FitTrack Gym');

  // Contact Info
  const [address, setAddress] = useState('123 Fitness Lane, Colombo 7');
  const [phone, setPhone] = useState('+94 11 234 5678');
  const [email, setEmail] = useState('contact@fittrack.lk');

  // Regional
  const [timezone, setTimezone] = useState('Asia/Colombo');
  const [currency, setCurrency] = useState('LKR');

  // Save handlers (wire to your API when ready)
  const handleSaveBranding = () => {
    alert(`Branding saved: ${gymName}`);
    // await api.put('/api/admin/settings/branding', { gymName });
  };

  const handleSaveContact = () => {
    alert('Contact info saved.');
    // await api.put('/api/admin/settings/contact', { address, phone, email });
  };

  const handleSaveRegional = () => {
    alert('Regional settings saved.');
    // await api.put('/api/admin/settings/regional', { timezone, currency });
  };

  return (
    <div className="text-white">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">General Settings</h1>
        <p className="text-gray-400 mt-1">
          Configure gym branding, contact details, and regional preferences.
        </p>
      </div>

      <div className="max-w-4xl space-y-8">

        {/* ── Gym Name & Logo ── */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="text-red-500" size={22} />
              <div>
                <h2 className="text-xl font-semibold">Gym Name & Logo</h2>
                <p className="text-gray-400 text-sm">Update your gym's branding and public profile.</p>
              </div>
            </div>
            <button
              onClick={handleSaveBranding}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              <Save size={15} /> Save
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gym Name</label>
              <input
                type="text"
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500 transition text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gym Logo</label>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg text-sm w-fit transition">
                <Upload size={16} /> Upload New Logo
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* ── Contact Information ── */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <Phone className="text-red-500" size={22} />
              <div>
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <p className="text-gray-400 text-sm">Update your gym's address and contact details.</p>
              </div>
            </div>
            <button
              onClick={handleSaveContact}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              <Save size={15} /> Save
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MapPin size={14} className="inline mr-1 text-red-400" /> Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500 transition text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Phone size={14} className="inline mr-1 text-red-400" /> Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500 transition text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail size={14} className="inline mr-1 text-red-400" /> Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500 transition text-white"
              />
            </div>
          </div>
        </div>

        {/* ── Regional Settings ── */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <Globe className="text-red-500" size={22} />
              <div>
                <h2 className="text-xl font-semibold">Regional Settings</h2>
                <p className="text-gray-400 text-sm">Set the correct timezone and currency for your region.</p>
              </div>
            </div>
            <button
              onClick={handleSaveRegional}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              <Save size={15} /> Save
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Globe size={14} className="inline mr-1 text-red-400" /> Timezone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500 transition text-white"
              >
                <option value="Asia/Colombo">(GMT+05:30) Colombo</option>
                <option value="Asia/Kolkata">(GMT+05:30) Mumbai, New Delhi</option>
                <option value="America/New_York">(GMT-05:00) Eastern Time</option>
                <option value="America/Los_Angeles">(GMT-08:00) Pacific Time</option>
                <option value="Europe/London">(GMT+00:00) London</option>
                <option value="UTC">(GMT+00:00) UTC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <DollarSign size={14} className="inline mr-1 text-red-400" /> Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500 transition text-white"
              >
                <option value="LKR">LKR - Sri Lankan Rupee</option>
                <option value="USD">USD - United States Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;