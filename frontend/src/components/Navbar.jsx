import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {


  return (
    <nav className='bg-black text-white flex justify-between items-center p-4'>
      <div className='text-2xl font-bold'>
        <Link to="/"> FitTrack</Link>
      </div>
      <div>
      <Link to="/" className='mr-4 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Home</Link>
      <Link to="/about" className='mr-4 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>About</Link>
      <Link to="/pricing"className='mr-4 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Pricing</Link>
      <Link to="/gallery" className='mr-4 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Gallery</Link>
      <Link to="/contact" className='mr-4 bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Contact</Link>
      <span className='mr-4'>UserName</span>
      <Link to="/login" className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Logout</Link>
      <Link to="/register" className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'>Signup</Link>
      </div>
      
    </nav> 
    
     
  );
}

export default Navbar
