import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">

      {/* <div className='flex justify-center items-center h-screen bg-gray-100'> */}
        {/* <div className='border shadow p-6 w-100 bg-white'> */}
        <div className='border-2 border-orange-500 shadow-lg p-6 w-100 bg-black rounded-lg h-[450px] w-[400px]'>
          <h2 className='text-3xl font-bold mb-6 mt-3 text-white text-center'>Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='text-xl block text-gray font-semibold mb-2'>Name</label>
              <input type="text"
                onChange={(e) => setName(e.target.value)}
                className='w-full px-3 py-2 border text-gray' placeholder='Enter Username' />

            </div>

            <div className='mb-4'>
              <label className='text-xl block text-gray font-semibold mb-2'>Email</label>
              <input type="text"
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-3 py-2 border text-gray' placeholder='Enter email' />

            </div>

            <div className='mb-4'>
              <label className='text-xl block text-gray font-semibold mb-2'>Password</label>
              <input type="text"
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 border text-gray' placeholder='Enter password' />

            </div>

            <div className='mb-4'>
              <button type='submit' className='text-center w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded'>Sign up</button>

              <p className='text-center text-gray'>Already have an account? <Link to="/login" className='text-gray'>Login</Link></p>
            </div>

          </form>

        </div>

      {/* </div> */}
    </div>
      )
}

export default Signup
