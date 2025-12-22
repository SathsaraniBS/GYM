// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa'; // ← Added icons from react-icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false); // Light mode state

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLightMode = () => setIsLightMode(!isLightMode);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic classes based on mode
  const navBg = isLightMode
    ? 'bg-white/90 backdrop-blur-md shadow-lg'
    : isScrolled
    ? 'bg-gradient-to-r from-black to-red-900'
    : 'bg-transparent';

  const textColor = isLightMode ? 'text-gray-900' : 'text-white';
  const hoverColor = isLightMode ? 'hover:text-red-600' : 'hover:text-red-400';
  const mobileBg = isLightMode ? 'bg-white/95' : 'bg-red-900';

  return (
    <nav
      className={`fixed w-full top-0 z-50 py-4 h-20 ${textColor} flex justify-between items-center shadow-md transition duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-4">
        {/* Logo */}
        <div className="text-3xl font-bold ml-8">
          <Link to="/" className={`${textColor} ${hoverColor} transition`}>
            FitTrack
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center text-lg font-medium">
          <Link to="/" className={`${hoverColor} transition`}>
            HOME
          </Link>
          <Link to="/course" className={`${hoverColor} transition`}>
            COURSE
          </Link>
          <Link to="/gallery" className={`${hoverColor} transition`}>
            GALLERY
          </Link>
          <Link to="/contact" className={`${hoverColor} transition`}>
            CONTACT
          </Link>
          <Link to="/about" className={`${hoverColor} transition`}>
            ABOUT
          </Link>
          <Link to="/ourteam" className={`${hoverColor} transition`}>
            OUR TEAM
          </Link>
          <Link to="/reviews" className={`${hoverColor} transition`}>
            REVIEWS
          </Link>

          <Link
            to="/login"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Register
          </Link>
        </div>

        {/* Light/Dark Mode Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button with React Icons */}
          <button
            onClick={toggleLightMode}
            className={`p-2 rounded-full ${isLightMode ? 'bg-gray-200 text-gray-900' : 'bg-gray-800 text-yellow-400'} transition flex items-center justify-center`}
            aria-label="Toggle theme"
          >
            {isLightMode ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className={`${textColor} focus:outline-none`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden absolute top-20 left-0 w-full ${mobileBg} shadow-lg`}>
          <Link
            to="/"
            className={`block ${textColor} ${hoverColor} py-3 px-6 transition`}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/course"
            className={`block ${textColor} ${hoverColor} py-3 px-6 transition`}
            onClick={toggleMenu}
          >
            Course
          </Link>
          <Link
            to="/gallery"
            className={`block ${textColor} ${hoverColor} py-3 px-6 transition`}
            onClick={toggleMenu}
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            className={`block ${textColor} ${hoverColor} py-3 px-6 transition`}
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link
            to="/about"
            className={`block ${textColor} ${hoverColor} py-3 px-6 transition`}
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/ourteam"
            className={`block ${textColor} ${hoverColor} py-3 px-6 transition`}
            onClick={toggleMenu}
          >
            Our Team
          </Link>
          <Link
            to="/reviews"
            className={`block ${textColor} ${hoverColor} py-3 px-6 transition`}
            onClick={toggleMenu}
          >
            Reviews
          </Link>
          <Link
            to="/login"
            className="block bg-red-600 text-white font-semibold py-3 px-6 hover:bg-red-700 transition mt-2"
            onClick={toggleMenu}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block bg-red-600 text-white font-semibold py-3 px-6 hover:bg-red-700 transition mb-4"
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