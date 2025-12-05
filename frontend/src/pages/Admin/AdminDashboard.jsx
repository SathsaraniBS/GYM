import React, { useEffect, useState } from "react";
import axios from "axios";
import { ProtectedRoute } from "../../components/ProtectedRoute";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <ProtectedRoute adminOnly>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl">Total Users</h3>
            <p className="text-4xl font-bold text-red-500">{stats.totalUsers || 0}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl">Active Members</h3>
            <p className="text-4xl font-bold text-green-500">{stats.activeUsers || 0}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl">Total Reviews</h3>
            <p className="text-4xl font-bold text-yellow-500">{stats.totalReviews || 0}</p>
          </div>
        </div>
        {/* You can add more sections (users list, charts, etc.) */}
      </div>
    </ProtectedRoute>
  );
}

export default AdminDashboard;