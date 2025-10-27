import React from 'react';

function AdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '1,250' },
    { title: 'Active Members', value: '875' },
    { title: 'New Signups', value: '120' },
  ];

  

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 fixed h-full">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-2 py-2 px-4 bg-red-700 rounded text-red-300 font-bold">
            <span>🏠</span>
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded">
            <span>👥</span>
            <span>Users</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded">
            <span>📄</span>
            <span>Content</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded">
            <span>⚙️</span>
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded">
            <span>🔔</span>
            <span>Notifications</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded">
            <span>❓</span>
            <span>Support</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded text-gray-300 mt-auto">
            <span>←</span>
            <span>Logout</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8 w-full">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold text-gray-400 mb-2">{stat.title}</h2>
              <p className="text-4xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity Table */}
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3 text-left">USER</th>
                <th className="p-3 text-left">ACTIVITY</th>
                <th className="p-3 text-left">DATE</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-3">{activity.user}</td>
                  <td className="p-3">{activity.activity}</td>
                  <td className="p-3">{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;