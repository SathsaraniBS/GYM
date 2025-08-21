import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black sticky top-0 z-50 h-20 flex items-center justify-between px-6 text-white font-bold text-lg">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold">
          FitTrack
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className=" hidden md:flex space-x-4 items-center">
        <li>
          <Link
            to="/"
            className="px-4 py-2 hover:border-b-4 border-[#79a7c5] hover:text-[#79a7c5] transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="px-4 py-2 hover:border-b-4 border-[#79a7c5] hover:text-[#79a7c5] transition"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/pricing"
            className="px-4 py-2 hover:border-b-4 border-[#79a7c5] hover:text-[#79a7c5] transition"
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            to="/gallery"
            className="px-4 py-2 hover:border-b-4 border-[#79a7c5] hover:text-[#79a7c5] transition"
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="px-4 py-2 hover:border-b-4 border-[#79a7c5] hover:text-[#79a7c5] transition"
          >
            Contact
          </Link>
        </li>
        <li className="flex items-center space-x-3">
          <span>UserName</span>
          <Link
            to="/login"
            className="bg-red-500 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Logout
          </Link>
          <Link
            to="/register"
            className="bg-red-500 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Signup
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Menu */}
      <ul
        className={`absolute top-20 left-0 w-full h-screen bg-[#242222] flex flex-col items-center justify-center space-y-6 transform ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } transition-all duration-500 md:hidden`}
      >
        <li>
          <Link
            to="/"
            onClick={toggleMenu}
            className="block text-2xl px-4 py-2 hover:bg-white hover:text-black rounded"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="block text-2xl px-4 py-2 hover:bg-white hover:text-black rounded"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/pricing"
            onClick={toggleMenu}
            className="block text-2xl px-4 py-2 hover:bg-white hover:text-black rounded"
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            to="/gallery"
            onClick={toggleMenu}
            className="block text-2xl px-4 py-2 hover:bg-white hover:text-black rounded"
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            onClick={toggleMenu}
            className="block text-2xl px-4 py-2 hover:bg-white hover:text-black rounded"
          >
            Contact
          </Link>
        </li>
        <li>
          <span className="text-2xl">UserName</span>
        </li>
        <li>
          <Link
            to="/login"
            onClick={toggleMenu}
            className="bg-red-500 px-6 py-3 rounded text-xl hover:bg-blue-700 transition"
          >
            Logout
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            onClick={toggleMenu}
            className="bg-red-500 px-6 py-3 rounded text-xl hover:bg-blue-700 transition"
          >
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
