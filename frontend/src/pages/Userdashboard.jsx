// src/pages/Userdashboard.jsx (or similar)
import React from 'react';
import UserNavbar from '../components/User/UserNavbar';
import { FaUserCircle, FaEdit, FaBookmark, FaWallet, FaIdCard, FaPercent, FaWhatsapp } from 'react-icons/fa';

function Userdashboard() {
  return (
    <div className="bg-black min-h-screen text-white">
      <UserNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold mb-8">Profile</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Info & Menu */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Card */}
            <div className="bg-white text-black rounded-lg shadow-md p-6 flex items-center space-x-4">
              <div className="relative">
                <FaUserCircle className="text-8xl text-gray-400" />
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full px-2 py-1">10</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">sandun batarenae</h3>
                <p className="text-gray-600">+94743357593</p>
              </div>
              <FaEdit className="text-red-600 text-xl cursor-pointer ml-auto" />
            </div>

            {/* Quick Info */}
            <div className="bg-white text-black rounded-lg shadow-md p-6 grid grid-cols-3 text-center text-sm">
              <div className="border-r border-gray-300">
                <p className="text-gray-500">GENDER</p>
                <p className="font-bold">MALE</p>
              </div>
              <div className="border-r border-gray-300">
                <p className="text-gray-500">DATE OF BIRTH</p>
                <p className="font-bold">N/A</p>
              </div>
              <div>
                <p className="text-gray-500">COUNTRY</p>
                <p className="font-bold">Sri Lanka</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white text-black rounded-lg shadow-md p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-500">EMAIL</p>
                <p className="font-semibold">sbatarenae@gmail.com</p>
              </div>
              <FaEdit className="text-red-600 text-xl cursor-pointer" />
            </div>

            {/* Menu Items */}
            <div className="bg-white text-black rounded-lg shadow-md divide-y divide-gray-300">
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <FaUserCircle className="text-red-600 text-2xl" />
                  <span className="font-medium">Personal Information</span>
                </div>
                <span>&gt;</span>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <FaBookmark className="text-red-600 text-2xl" />
                  <span className="font-medium">My Cards</span>
                </div>
                <span>&gt;</span>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <FaWallet className="text-red-600 text-2xl" />
                  <span className="font-medium">My Wallet</span>
                </div>
                <span>&gt;</span>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <FaIdCard className="text-red-600 text-2xl" />
                  <span className="font-medium">My Membership</span>
                </div>
                <span>&gt;</span>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <FaPercent className="text-red-600 text-2xl" />
                  <span className="font-medium">My Discounts</span>
                </div>
                <span>&gt;</span>
              </div>
            </div>
          </div>

          {/* Right Side - Personal Information Form */}
          <div className="lg:col-span-2 bg-white text-black rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold mb-6">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2">First Name</label>
                <input type="text" value="sandun" readOnly className="w-full border-b-2 border-gray-300 py-2 focus:border-red-600 outline-none" />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Last Name</label>
                <input type="text" value="batarenae" readOnly className="w-full border-b-2 border-gray-300 py-2 focus:border-red-600 outline-none" />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Gender</label>
                <select className="w-full border-b-2 border-gray-300 py-2 bg-white" defaultValue="Male">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Date of Birth</label>
                <input type="text" placeholder="N/A" className="w-full border-b-2 border-gray-300 py-2 outline-none" />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Country</label>
                <input type="text" value="Sri Lanka" readOnly className="w-full border-b-2 border-gray-300 py-2 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="border-2 border-red-600 rounded-lg p-4 text-center">
                <label className="block text-gray-600 mb-2">Height(CM)</label>
                <input type="text" placeholder="" className="w-full text-center outline-none" />
              </div>
              <div className="border-2 border-red-600 rounded-lg p-4 text-center">
                <label className="block text-gray-600 mb-2">Weight(KG)</label>
                <input type="text" placeholder="" className="w-full text-center outline-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition z-50">
        <FaWhatsapp className="text-4xl" />
      </a>
    </div>
  );
}

export default Userdashboard;