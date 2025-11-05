// CustomerReview.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerReview = () => {
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${name}!\nYour ${rating}★ review is submitted.`);
    setShowForm(false);
    setRating(0);
    setName('');
    setReview('');
  };

  const Star = ({ filled, onClick }) => (
    <span
      className={`text-4xl cursor-pointer transition ${filled ? 'text-yellow-400' : 'text-gray-600'}`}
      onClick={onClick}
    >
      ★
    </span>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
      <div className="text-center p-8 max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Customer Reviews
        </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {/* Write a Review – Opens Form */}
          <button
            onClick={() => setShowForm(true)}
            className="block bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-5 px-10 rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/50"
          >
            Write a Review
          </button>

          <Link
            to="/read-reviews"
            className="block bg-gray-700 hover:bg-gray-600 text-white font-bold text-xl py-5 px-10 rounded-full shadow-xl border-2 border-gray-600 hover:border-red-500 transform transition-all duration-300 hover:scale-105"
          >
            Read Reviews
          </Link>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-white"
            >
              ×
            </button>

            <h3 className="text-3xl font-bold mb-6 text-center">Write Your Review</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500 text-white placeholder-gray-400"
              />

              {/* Star Rating */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= rating}
                    onClick={() => setRating(star)}
                  />
                ))}
                <span className="ml-4 text-xl">{rating} / 5</span>
              </div>

              {/* Review Text */}
              <textarea
                placeholder="Share your experience..."
                rows="5"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-500 text-white placeholder-gray-400 resize-none"
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReview;