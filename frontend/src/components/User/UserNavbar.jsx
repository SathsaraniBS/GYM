// src/components/User/UserNavbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function UserNavbar() {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-full top-0 z-50 py-4 h-20 text-white flex justify-between items-center shadow-md transition duration-300 ${
        isScrolled ? 'bg-gradient-to-r from-black to-red-900' : 'bg-black'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-4">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <Link to="/" className="text-white hover:text-red-400 transition">
            FitTrack
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
          <Link to="/" className="hover:text-red-400 transition">HOME</Link>
          <Link to="/course" className="hover:text-red-400 transition">COURSE</Link>
          <Link to="/gallery" className="hover:text-red-400 transition">GALLERY</Link>
          <Link to="/contact" className="hover:text-red-400 transition">CONTACT</Link>
          <Link to="/about" className="hover:text-red-400 transition">ABOUT</Link>
          <Link to="/ourteam" className="hover:text-red-400 transition">OUR TEAM</Link>
          <Link to="/reviews" className="hover:text-red-400 transition">REVIEWS</Link>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4 ml-8">
            {!user ? (
              <>
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition">
                  Login
                </Link>
                <Link to="/register" className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold transition">
                  Signup
                </Link>
              </>
            ) : (
              <>
                <span className="text-yellow-300 font-medium">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
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

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-red-900 shadow-lg">
          <Link to="/" className="block py-3 px-6 hover:bg-red-800" onClick={toggleMenu}>Home</Link>
          <Link to="/course" className="block py-3 px-6 hover:bg-red-800" onClick={toggleMenu}>Course</Link>
          <Link to="/gallery" className="block py-3 px-6 hover:bg-red-800" onClick={toggleMenu}>Gallery</Link>
          <Link to="/contact" className="block py-3 px-6 hover:bg-red-800" onClick={toggleMenu}>Contact</Link>
          <Link to="/about" className="block py-3 px-6 hover:bg-red-800" onClick={toggleMenu}>About</Link>
          <Link to="/ourteam" className="block py-3 px-6 hover:bg-red-800" onClick={toggleMenu}>Our Team</Link>
          <Link to="/reviews" className="block py-3 px-6 hover:bg-red-800" onClick={toggleMenu}>Reviews</Link>

          <div className="border-t border-red-800 py-4 px-6">
            {!user ? (
              <>
                <Link to="/login" className="block bg-blue-600 py-2 text-center rounded mb-2" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/register" className="block bg-green-600 py-2 text-center rounded" onClick={toggleMenu}>
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => { logout(); toggleMenu(); }}
                className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-semibold"
              >
                Logout ({user.name})
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default UserNavbar;