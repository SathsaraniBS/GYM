import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // <nav className="bg-gray-800 py-10 px-4 text-white flex justify-between items-center shadow-md">
    <nav className="bg-gray-800 fixed w-full top-0 z-50  py-4 h-20 text-white flex justify-between items-center fixed top-0 z-10 shadow-md">

      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        {/* Logo */}
        <div className="text-3xl font-bold ml-8 text-white">
          <Link to="/">FitTrack</Link>
        </div>

        {/* Desktop Menu */}
        <div className=" gap-4 hidden md:flex space-x-10 items-center">
          <Link to="/" className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300">
            HOME
          </Link>
          <Link to="/course" className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300">
            COURSE
          </Link>
          <Link to="/gallery" className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300">
            GALLERY
          </Link>
          <Link to="/contact" className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300">
            CONTACT
          </Link>
          <Link to="/about" className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300">
            ABOUT
          </Link>

        </div>
        <div className='flex gap-4 mr-4'>
          <Link
            to="/login"
            className="bg-red-500 px-4 py-2  rounded mr-4 "
          >
          
            Login
          </Link>
          <Link
            to="/register"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <Link
            to="/"
            className="block text-white hover:text-gray-200 py-2 px-4 transition duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/course"
            className="block text-white hover:text-gray-200 py-2 px-4 transition duration-300"
            onClick={toggleMenu}
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="block text-white hover:text-gray-200 py-2 px-4 transition duration-300"
            onClick={toggleMenu}
          >
            About
          </Link>
          {/* <Link
            to="/login"
            className="block bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-2"
            onClick={toggleMenu}
          >
            Login
          </Link> */}

          <Link
            to="/login"
            className="block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-2"
            onClick={toggleMenu}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="block bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-2"
            onClick={toggleMenu}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;  