import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      {/* <div className="flex justify-center items-center h-screen bg-gray-100"> */}
        <div className="border-2 border-orange-500 shadow-lg p-6 w-100 bg-black rounded-lg h-[450px] w-[400px]">
          {/* <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2> */}
          {/* <div className='flex justify-center mb-6 mt-7'> */}
          <h2 className="text-3xl font-bold mb-6 mt-4 text-white text-center">Login</h2>
          {/* </div> */}
          <form onSubmit={handleSubmit} >
            <div className="mb-6">
              <label className="text-xl block text-gray-100 font-semibold mb-2">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 px-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                placeholder="Enter Email"
              />
            </div>

            <div className="mb-6">
              <label className="text-xl block text-gray font-semibold mb-2">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 px-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2"
                placeholder="Enter Password"
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="text-xl w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
              >
                Login
              </button>
              <p className="text-center mt-4 text-gray">
                Don't have an account?{' '}
                <Link to="/register" className="text-bold text-blue-500 hover:underline font-medium">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      {/* </div> */}
    </div>
      );
}

export default Login;