import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewModal({ closeModal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/review/add', {
        name,
        email,
        rating,
        review,
      });

      if (response.data.success) {
        navigate('/');
        closeModal(); // Close modal after success
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center">
      <div className="bg-black border-2 border-gray-700 p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="" disabled>Select Rating</option>
            <option value="1">⭐ - 1</option>
            <option value="2">⭐⭐ - 2</option>
            <option value="3">⭐⭐⭐ - 3</option>
            <option value="4">⭐⭐⭐⭐ - 4</option>
            <option value="5">⭐⭐⭐⭐⭐ - 5</option>
          </select>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
            rows="4"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Submit Review
          </button>
        </form>

        <button
          className="mt-4 text-red-500 font-bold py-2 px-4 hover:text-red-600 transition duration-300"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ReviewModal;