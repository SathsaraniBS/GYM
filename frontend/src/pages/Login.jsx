import axios from 'axios';
import React, { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
function Login() {

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form onSubmit={handleSubmit} >

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-3 border"
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-3 border"
              placeholder="Enter Password"
            />
          </div>

          <div className="mb-4">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                Login
            </button>
            <p className="text-center mt-2">
              Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
