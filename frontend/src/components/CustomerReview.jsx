import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import ReviewForm from './ReviewForm'; // FIXED: Ensure path matches src/components/ReviewForm.jsx

function CustomerReview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3); // FIXED: Start with 3 reviews
  const [sentiments, setSentiments] = useState({}); // Store sentiment for each review

  // Expanded list of reviews
  // const reviews = [
  //   { name: 'Amila Prabhath', stars: 4, text: "Fitness is a huge thing in everybody's life, and FitTrack makes it fun and accessible!" },
  //   { name: 'Dinith Athukorala', stars: 5, text: "Amazing staff and support, always there to help you succeed." },
  //   { name: 'Chithmi Ranawaka', stars: 5, text: "One of the best fitness places I've been to, highly recommend!" },
  //   { name: 'Esala Sumanasena', stars: 5, text: "Best place to go if you consider your fitness seriously." },
  //   { name: 'Shafraz Asnavi', stars: 5, text: "A fitness club with a vision, love the community vibe." },
  //   { name: 'K Chinthaka', stars: 4, text: "Used this gym on a day membership, great equipment but crowded at times." },
  //   { name: 'Nimali Silva', stars: 3, text: "Good facilities, but the classes could be more varied." },
  //   { name: 'Ravi Fernando', stars: 5, text: "Top-notch trainers and a motivating environment!" },
  //   { name: 'Sanjana Perera', stars: 4, text: "Really enjoy the workouts, but parking is a hassle." },
  //   { name: 'Tharindu Wijesinghe', stars: 5, text: "Transformed my fitness journey, best gym ever!" },
  // ];

  // Simple sentiment analysis model (mocked for demonstration)
  useEffect(() => {
    // Mock sentiment analysis with TensorFlow.js
    const analyzeSentiment = async (text) => {
      // Simplified: Use keyword-based scoring for demo (real model would use pre-trained LSTM or BERT)
      const positiveWords = ['amazing', 'great', 'best', 'love', 'fun', 'recommend', 'succeed', 'motivating', 'transformed'];
      const negativeWords = ['crowded', 'hassle', 'limited'];
      let score = 0;
      const words = text.toLowerCase().split(' ');
      words.forEach(word => {
        if (positiveWords.includes(word)) score += 1;
        if (negativeWords.includes(word)) score -= 1;
      });
      if (score > 0) return 'Positive';
      if (score < 0) return 'Negative';
      return 'Neutral';
    };

    // Analyze sentiment for all reviews
    const analyzeAllReviews = async () => {
      const sentimentMap = {};
      for (const [index, review] of reviews.entries()) {
        const sentiment = await analyzeSentiment(review.text);
        sentimentMap[index] = sentiment;
      }
      setSentiments(sentimentMap);
    };

    analyzeAllReviews();
  }, []); // Run once on mount

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle "Show More Reviews"
  const handleShowMore = () => {
    setVisibleReviews(prev => Math.min(prev + 3, reviews.length)); // FIXED: Show 3 more reviews, up to total
  };

  const renderStars = (stars) =>
    Array.from({ length: stars }, (_, i) => <span key={i}>⭐</span>);

  return (
    <section className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">CUSTOMER REVIEWS</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reviews.slice(0, visibleReviews).map((review, index) => (
          <div
            key={index}
            className="bg-black border-[3px] border-red-500 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300" // FIXED: Changed border-3 to border-[3px]
          >
            <h3 className="text-lg font-semibold text-white mb-2">{review.name}</h3>
            <div className="flex gap-1 text-yellow-400 mb-2">{renderStars(review.stars)}</div>
            <p className="text-white">{review.text}</p>
            <p className="text-sm text-gray-400 mt-2">
              Sentiment: {sentiments[index] || 'Analyzing...'} {/* FIXED: Display ML sentiment */}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => setIsModalOpen(true)}
          aria-label="Write a review"
        >
          WRITE A REVIEW
        </button>
        {isModalOpen && <ReviewForm onClose={closeModal} />}
        {visibleReviews < reviews.length && ( // FIXED: Hide button when all reviews are shown
          <button
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
            onClick={handleShowMore}
            aria-label="Show more reviews"
          >
            SHOW MORE REVIEWS
          </button>
        )}
      </div>
    </section>
  );
}

export default CustomerReview;