// src/pages/admin/UserManagement.jsx
import React, { useState } from 'react';

const AdminUssers = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = [
    { id: 'ALL', label: 'ALL', count: 1240, color: 'red' },
    { id: 'ACTIVE', label: 'ACTIVE', count: 1085, color: 'green' },
    { id: 'EXPIRED', label: 'EXPIRED', count: 94, color: 'red' },
    { id: 'PENDING', label: 'PENDING', count: 61, color: 'yellow' },
  ];

  const sampleUsers = [
    {
      id: 'PG-9821',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
      email: 'john.doe@gmail.com',
      membership: 'PREMIUM',
      joinDate: 'Jan 12, 2023',
      status: 'ACTIVE',
    },
    {
      id: 'PG-9755',
      name: 'Sarah Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
      email: 'sarah.s@gmail.com',
      membership: 'BASIC',
      joinDate: 'Feb 05, 2023',
      status: 'ACTIVE',
    },
    {
      id: 'PG-9231',
      name: 'Mike Ross',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
      email: 'm.ross@outlook.com',
      membership: 'PREMIUM',
      joinDate: 'Nov 20, 2022',
      status: 'EXPIRED',
    },
    {
      id: 'PG-8812',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
      email: 'emmaw@company.com',
      membership: 'BASIC',
      joinDate: 'Mar 15, 2023',
      status: 'ACTIVE',
    },
    {
      id: 'PG-8722',
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop',
      email: 'dchen@net.com',
      membership: 'TRIAL',
      joinDate: 'Apr 01, 2023',
      status: 'PENDING',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: 'bg-green-900/60 text-green-400',
      EXPIRED: 'bg-red-900/60 text-red-400',
      PENDING: 'bg-yellow-900/60 text-yellow-400',
    };
    return colors[status] || 'bg-gray-800 text-gray-400';
  };

  const getMembershipColor = (type) => {
    const colors = {
      PREMIUM: 'bg-red-900/70 text-red-300',
      BASIC: 'bg-blue-900/70 text-blue-300',
      TRIAL: 'bg-purple-900/70 text-purple-300',
    };
    return colors[type] || 'bg-gray-800 text-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Top Navigation */}
      <header className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-xl font-bold">
            P
          </div>
          <div>
            <h1 className="text-xl font-bold">PowerGym Admin</h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Dashboard</a>
          <a href="#" className="text-red-500 font-medium">User Management</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Staff</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Inventory</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Settings</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop"
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 md:p-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-gray-400">
              Manage and monitor gym memberships and user accounts.
            </p>
          </div>

          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors flex items-center gap-2">
            <span>+</span> Add New User
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? `bg-${filter.color}-600 text-white`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {filter.label} ({filter.count.toLocaleString()})
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium">
                All Members ▼
              </button>
              <button className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium">
                Membership Status ▼
              </button>
              <button className="px-5 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium flex items-center gap-2">
                <span>Export</span> ↓
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              🔍
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left px-8 py-5 font-medium">USER DETAILS</th>
                  <th className="text-left px-8 py-5 font-medium">EMAIL ADDRESS</th>
                  <th className="text-left px-8 py-5 font-medium">MEMBERSHIP</th>
                  <th className="text-left px-8 py-5 font-medium">JOIN DATE</th>
                  <th className="text-left px-8 py-5 font-medium">STATUS</th>
                  <th className="text-right px-8 py-5 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {sampleUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-300">{user.email}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${getMembershipColor(user.membership)}`}>
                        {user.membership}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-gray-300">{user.joinDate}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button className="text-gray-400 hover:text-white transition-colors">✏️</button>
                        <button className="text-gray-400 hover:text-red-400 transition-colors">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-6 border-t border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              PAGE 1 OF 24
            </div>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-lg font-medium">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                24
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                >
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 p-6 text-center text-sm text-gray-500">
        <p>© 2024 PowerGym Systems Inc.</p>
        <div className="flex justify-center gap-8 mt-2">
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default UserManagement;