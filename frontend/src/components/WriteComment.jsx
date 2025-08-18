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
      const response = await axios.post('//localhost:5000/api/review/add', {
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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded w-96">
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full p-2 border rounded mb-4"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="w-full p-2 border rounded mb-4"
            required
          />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          >
            <option value="">Select Rating</option>
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
            className="w-full p-2 border rounded mb-4"
            rows="4"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Submit Review
          </button>
        </form>

        <button
          className="mt-4 text-red-500 font-bold py-2 px-4"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ReviewModal;
