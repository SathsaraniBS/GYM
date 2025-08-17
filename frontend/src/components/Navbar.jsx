import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {


  return (
    <nav className='bg-gray-800 text-white flex justify-between items-center p-4'>
      <div className='text-2xl font-bold'>
        <Link to="/"> FitTrack</Link>
      </div>
      <div>
      <span className='mr-4'>UserName</span>
      <Link to="/login" className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Logout</Link>
      <Link to="/register" className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'>Signup</Link>
      </div>
      
    </nav> 
    
     
  );
}

export default Navbar
