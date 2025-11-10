// src/components/ReviewForm.jsx
import axios from 'axios';
import React, { useState } from 'react';

function ReviewForm({ onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !stars || !text.trim()) return;

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/reviews', {
        name: name.trim(),
        stars: Number(stars),
        text: text.trim(),
        date: new Date().toISOString(),
      });

      setName('');
      setStars(0);
      setText('');
      onSuccess();
      onClose();
    } catch (error) {
      alert('Failed to submit review. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-red-800">
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-gray-400 hover:text-red-500 text-4xl font-light"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Write Your Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-5 py-4 bg-black border-2 border-red-600 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />

           <select
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            required
            className="w-full px-5 py-4 border-2 border-red-500 rounded-lg p-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value={0} disabled className='bg-red-500'>Select rating</option>
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n} >{n} Star{n > 1 ? 's' : '' }</option>
            ))}
          </select>

          <div className="flex gap-1 text-yellow-400 text-2xl justify-center">
            {Array.from({ length: stars }, (_, i) => (
              <span key={i}>Star</span>
            ))}
          </div>

          <textarea
            placeholder="Share your experience..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={5}
            className="w-full px-5 py-4 bg-black border-2 border-red-600 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-5 rounded-xl transition transform hover:scale-105 disabled:opacity-70 shadow-xl"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;