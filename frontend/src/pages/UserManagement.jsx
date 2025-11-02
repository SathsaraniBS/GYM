import React from 'react';

function UserManagement() {
  const users = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alexj@example.com',
      plan: 'Premium',
      status: 'Active',
      joinDate: '2023-05-15',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.g@example.com',
      plan: 'Basic',
      status: 'Active',
      joinDate: '2023-08-22',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      name: 'David Chen',
      email: 'david.c@example.com',
      plan: 'Premium',
      status: 'Inactive',
      joinDate: '2022-11-01',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      plan: 'Family Plan',
      status: 'Frozen',
      joinDate: '2023-01-10',
      avatar: 'https://via.placeholder.com/40',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Inactive':
        return 'bg-yellow-500';
      case 'Frozen':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <img
              src="https://via.placeholder.com/40"
              alt="Gym Admin"
              className="rounded-full mr-3"
            />
            <div>
              <div className="font-semibold">Gym Admin</div>
              <div className="text-sm text-gray-400">Management Panel</div>
            </div>
          </div>

          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center text-gray-400 hover:text-white p-2 rounded"
            >
              <span className="mr-3">Dashboard Icon</span> Dashboard
            </a>
            <a
              href="#"
              className="flex items-center text-white bg-gray-700 p-2 rounded"
            >
              <span className="mr-3">Users Icon</span> Users
            </a>
            <a
              href="#"
              className="flex items-center text-gray-400 hover:text-white p-2 rounded"
            >
              <span className="mr-3">Classes Icon</span> Classes
            </a>
            <a
              href="#"
              className="flex items-center text-gray-400 hover:text-white p-2 rounded"
            >
              <span className="mr-3">Billing Icon</span> Billing
            </a>
          </nav>
        </div>

        <div className="mt-auto">
          <a
            href="#"
            className="flex items-center text-gray-400 hover:text-white p-2 rounded mb-4"
          >
            <span className="mr-3">Settings Icon</span> Settings
          </a>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64">
        <div className="bg-gray-800 rounded-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center">
              <span className="mr-2">Back Icon</span> User Management
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none"
                />
                <span className="absolute left-3 top-2.5">Search Icon</span>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                + Add New User
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6">
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center">
              <span className="mr-2">All Users Icon</span> All Users
            </button>
            <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg flex items-center hover:bg-gray-600">
              <span className="mr-2">Active Icon</span> Active
            </button>
            <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg flex items-center hover:bg-gray-600">
              <span className="mr-2">Inactive Icon</span> Inactive
            </button>
            <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg flex items-center hover:bg-gray-600">
              <span className="mr-2">Frozen Icon</span> Frozen
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-600 text-left text-sm">
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Membership Plan</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Join Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-600 hover:bg-gray-600">
                    <td className="p-4">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>{user.name}</div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{user.email}</td>
                    <td className="p-4">{user.plan}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs text-white ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-300">{user.joinDate}</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-white">
                          Edit Icon
                        </button>
                        <button className="text-red-500 hover:text-red-400">
                          Delete Icon
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">Left Arrow</button>
            <button className="px-3 py-1 rounded bg-red-600 text-white">1</button>
            <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">2</button>
            <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">3</button>
            <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">...</button>
            <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">10</button>
            <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600">Right Arrow</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserManagement;
