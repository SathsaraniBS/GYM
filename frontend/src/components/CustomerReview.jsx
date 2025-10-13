import { useState } from 'react';
import ReviewForm from './ReviewForm'; // FIXED: Ensure path matches src/components/ReviewForm.jsx

function CustomerReview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const reviews = [
    { name: 'Amila Prabhath', stars: 4, text: "Fitness is a huge thing in everybody's life..." },
    { name: 'Dinith Athukorala', stars: 5, text: "Amazing staff and support..." },
    { name: 'Chithmi Ranawaka', stars: 5, text: "One of the best fitness place..." },
    { name: 'Esala Sumanasena', stars: 5, text: "Best place to go if you consider your fitness..." },
    { name: 'Shafraz Asnavi', stars: 5, text: "A fitness club with a vision..." },
    { name: 'K Chinthaka', stars: 4, text: "Used this gym on a day membership..." }
  ];

  const renderStars = (stars) =>
    Array.from({ length: stars }, (_, i) => <span key={i}>⭐</span>);

  return (
    <section className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">CUSTOMER REVIEWS</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-black border-3 border-red-500 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <h3 className="text-lg font-semibold text-white mb-2">{review.name}</h3>
            <div className="flex gap-1 text-yellow-400 mb-2">{renderStars(review.stars)}</div>
            <p className="text-white">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          WRITE A REVIEW
        </button>
        {isModalOpen && <ReviewForm onClose={closeModal} />}
        <button
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => console.log('Show more reviews clicked')}
        >
          SHOW MORE REVIEWS
        </button>
      </div>
    </section>
  );
}

export default CustomerReview;