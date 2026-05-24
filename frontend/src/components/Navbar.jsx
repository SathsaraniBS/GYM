// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // ✅ Fix: z-50 → z-[100] — video(z-0), overlay(z-10), content(z-60) සියල්ලටම ඉහළින්
    <nav
      className={`fixed w-full top-0 z-[100] py-4 h-20 text-white flex justify-between items-center shadow-md transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-black to-red-600'
          : 'bg-black/40 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-6">

        {/* Logo */}
        <div className="text-3xl font-bold text-white">
          <Link to="/">FitTrack</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/"         className="font-bold text-lg text-white hover:text-red-500 transition duration-300">HOME</Link>
          <Link to="/course"   className="font-bold text-lg text-white hover:text-red-500 transition duration-300">CLASSES</Link>
          <Link to="/gallery"  className="font-bold text-lg text-white hover:text-red-500 transition duration-300">GALLERY</Link>
          <Link to="/contact"  className="font-bold text-lg text-white hover:text-red-500 transition duration-300">CONTACT</Link>
          <Link to="/about"    className="font-bold text-lg text-white hover:text-red-500 transition duration-300">ABOUT</Link>
          <Link to="/ourteam"  className="font-bold text-lg text-white hover:text-red-500 transition duration-300">OUR TEAM</Link>
        </div>

        {/* Login / Register Buttons */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="border-2 border-white text-white font-semibold py-2 px-5 hover:bg-red-600 hover:border-red-600 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border-2 border-white text-white font-semibold py-2 px-5 hover:bg-red-600 hover:border-red-600 transition duration-300"
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
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-sm border-t border-red-600 py-4 z-[100]">
          {[
            { to: '/',          label: 'HOME' },
            { to: '/course',    label: 'CLASSES' },
            { to: '/gallery',   label: 'GALLERY' },
            { to: '/contact',   label: 'CONTACT' },
            { to: '/about',     label: 'ABOUT' },
            { to: '/ourteam',   label: 'OUR TEAM' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={toggleMenu}
              className="block text-white font-bold py-3 px-6 hover:bg-red-600 transition duration-300"
            >
              {label}
            </Link>
          ))}

          <div className="flex gap-3 px-6 mt-4">
            <Link
              to="/login"
              onClick={toggleMenu}
              className="flex-1 text-center border-2 border-white text-white font-semibold py-2 hover:bg-red-600 hover:border-red-600 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={toggleMenu}
              className="flex-1 text-center border-2 border-white text-white font-semibold py-2 hover:bg-red-600 hover:border-red-600 transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;