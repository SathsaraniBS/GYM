// CustomerReview.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CustomerReview = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
      <div className="text-center p-8 max-w-3xl mx-auto">
        
        <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Customer Reviews
        </h2>

        {/* Fixed: className + proper closing */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          
          <Link
            to="/write-review"
            className="block bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mt-2"
          >
            Write a Review
          </Link>

          <Link
            to="/read-reviews"
            className="block bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 mt-2"
          >
            Read Reviews
          </Link>

        </div>
      </div>
    </div>
  );
};

export default CustomerReview;