import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom' 

function Signup () {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const response = await axios('http://localhost:5000/api/auth/register', {
       
        name,
        email,
        password

      })
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">

        <div className='border-2 border-orange-500 shadow-lg p-6 w-100 bg-black rounded-lg h-[550px] w-[400px]'>
          <h2 className='text-3xl font-bold mb-6 mt-3 text-white text-center'>Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='text-xl block text-gray font-semibold mb-2'>Name</label>
              <input type="text"
                onChange={(e) => setName(e.target.value)}
                className='w-full py-2 px-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mt-2' placeholder='Enter Username' />

            </div>

            <div className='mb-4'>
              <label className='text-xl block text-gray font-semibold mb-2'>Email</label>
              <input type="text"
                onChange={(e) => setEmail(e.target.value)}
                className='w-full py-2 px-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mt-2' placeholder='Enter email' />

            </div>

            <div className='mb-4'>
              <label className='text-xl block text-gray font-semibold mb-2'>Password</label>
              <input type="text"
                onChange={(e) => setPassword(e.target.value)}
                className='w-full py-2 px-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mt-2' placeholder='Enter password' />

            </div>

            <div className='mb-4 mt-7'>
              <button type='submit' className='text-center w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded'>Sign up</button>

              <p className='text-center mt-4 text-gray'>Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></p>
            </div>

          </form>

        </div>

      {/* </div> */}
    </div>
      )
}

export default Signup
