import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      <div className="flex">
       

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-white text-3xl font-bold mb-8">Dashboard</h2>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <h3 className="text-gray-400">Total Users</h3>
              <p className="text-white text-4xl font-bold">1,250</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <h3 className="text-gray-400">Active Members</h3>
              <p className="text-white text-4xl font-bold">875</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <h3 className="text-gray-400">New Signups</h3>
              <p className="text-white text-4xl font-bold">120</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <h3 className="text-white text-xl font-bold p-4">Recent Activity</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-900">
                  <th className="p-4">USER</th>
                  <th className="p-4">ACTIVITY</th>
                  <th className="p-4">DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Ethan Carter</td>
                  <td className="p-4">Signed up for a new membership</td>
                  <td className="p-4">2023-09-15</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Olivia Bennett</td>
                  <td className="p-4">Updated profile information</td>
                  <td className="p-4">2023-09-14</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Liam Harper</td>
                  <td className="p-4">Completed a workout session</td>
                  <td className="p-4">2023-09-13</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Ava Morgan</td>
                  <td className="p-4">Purchased a personal training package</td>
                  <td className="p-4">2023-09-12</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Noah Foster</td>
                  <td className="p-4">Renewed membership</td>
                  <td className="p-4">2023-09-11</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;