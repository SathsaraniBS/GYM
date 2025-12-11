import React from 'react'

function UserNavbar() {
  return (
    <nav
          className={`fixed w-full top-0 z-50 py-4 h-20 text-white flex justify-between items-center shadow-md transition duration-300 ${
            isScrolled ? 'bg-gradient-to-r from-black to-red-500' : 'bg-transparent'
          }`} // FIXED: Dynamic background color
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-4">
            {/* Logo */}
            <div className="text-3xl font-bold ml-8 text-white">
              <Link to="/">FitTrack</Link>
            </div>
    
            {/* Desktop Menu */}
            <div className="gap-4 hidden md:flex space-x-10 items-center">
              <Link
                to="/"
                className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300"
              >
                HOME
              </Link>
              <Link
                to="/course"
                className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300"
              >
                COURSE
              </Link>
              <Link
                to="/gallery"
                className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300"
              >
                GALLERY
              </Link>
              <Link
                to="/contact"
                className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300"
              >
                CONTACT
              </Link>
              <Link
                to="/about"
                className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300"
              >
                ABOUT
              </Link>
              <Link
                to="/ourteam"
                className="font-roboto font-bold text-2xl text-white hover:text-red-500 transition duration-300"
              >
                OUR TEAM
              </Link>
            </div>
            
    
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none mr-4"
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
            <div className="md:hidden bg-red-500 w-full"> {/* FIXED: Match scrolled background */}
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
                Course
              </Link>
              <Link
                to="/gallery"
                className="block text-white hover:text-gray-200 py-2 px-4 transition duration-300"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="block text-white hover:text-gray-200 py-2 px-4 transition duration-300"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="block text-white hover:text-gray-200 py-2 px-4 transition duration-300"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/reviews"
                className="block text-white hover:text-gray-200 py-2 px-4 transition duration-300"
                onClick={toggleMenu}
              >
                Reviews
              </Link>
              
              
            </div>
          )}
        </nav>
      );
      
    
    
}

export default UserNavbar
