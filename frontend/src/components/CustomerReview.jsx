// src/components/CustomerReview.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const CustomerReview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleReviewSubmitted = () => {
    fetchReviews(); // Refresh list
  };

  return (
    <section className="bg-gray-900 py-20 px-4" id="reviews">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Customer Reviews
        </h2>

        <div className="text-center mb-12">
          <button
            onClick={openModal}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition transform hover:scale-105 shadow-xl"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center col-span-full text-gray-400">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center col-span-full text-gray-400 text-xl">
              No reviews yet. Be the first to share your experience!
            </p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-800 rounded-2xl p-6 border border-red-900 shadow-2xl hover:shadow-red-900/50 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{review.name}</h3>
                  <div className="flex text-yellow-400 text-2xl">
                    {Array.from({ length: review.stars }, (_, i) => (
                      <span key={i}>Star</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">{review.text}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ReviewForm
          onClose={closeModal}
          onSuccess={handleReviewSubmitted}
        />
      )}
    </section>
  );
};

export default CustomerReview;