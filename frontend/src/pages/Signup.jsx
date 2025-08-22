import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

  const [name ,setName] = useState('');
  const [email ,setEmail] = useState('');
  const [password ,setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Sign up</h2>
        <form  onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Name</label>
            <input type="text" 
            onChange={(e) => setName(e.target.value)}
            className='w-full px-3 py-2 border' placeholder='Enter Username'/>

          </div>

          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input type="text" 
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 border' placeholder='Enter email'/>

          </div>

          <div className='mb-4'>
            <label className='block text-gray-700'>Password</label>
            <input type="text" 
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border' placeholder='Enter password'/>

          </div>
          
          <div className='mb-4'>
          <button  type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Sign up</button>

          <p className='text-center'>Already have an account? <Link to="/login" className='text-blue-500'>Login</Link></p>
          </div>

        </form>

      </div>
      
    </div>
  )
}

export default Signup
