// src/components/CustomerReview.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import { FaStar } from 'react-icons/fa';

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleReviewSubmitted = () => {
    fetchReviews(); // Refresh immediately
    setIsModalOpen(false);
  };

  return (
    <section className="bg-black py-20 px-4" id="reviews">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Customer Reviews
        </h2>

        <div className="text-center mb-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-12 rounded-full text-xl transition transform hover:scale-110 shadow-2xl"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <p className="text-center text-gray-400 text-xl">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No reviews yet. Be the first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-900 border border-red-800 rounded-2xl p-8 hover:border-orange-600 hover:shadow-2xl hover:shadow-orange-600/20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{review.name}</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.stars ? "text-yellow-400" : "text-gray-600"}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <ReviewForm
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleReviewSubmitted}
          />
        )}
      </div>
    </section>
  );
};

export default CustomerReview;