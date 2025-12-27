// src/pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // ← New import
import { ProtectedRoute } from "../../components/ProtectedRoute";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axiosInstance.get("/admin/stats") // ← Use axiosInstance + relative path
      .then((res) => setStats(res.data))
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
        // Optional: handle 401 by redirecting to login
      });
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
      </div>
    </ProtectedRoute>
  );
}

export default AdminDashboard;