// CustomerReview.jsx
import React, { useState } from 'react';  // Fixed: Added useState
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';

const CustomerReview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Main Page */}
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center p-8 max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Customer Reviews
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={openModal}
              className="bg-red-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-red-600 transition duration-300"
            >
              Write a Review
            </button>

            <Link
              to="/read-reviews"
              className="bg-red-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-red-600 transition duration-300"
            >
              Read Reviews
            </Link>
          </div>
        </div>
      </div>

      {/* Modal - Only shows when isModalOpen is true */}
      {isModalOpen && <ReviewForm onClose={closeModal} />}
    </>
  );
};

export default CustomerReview;