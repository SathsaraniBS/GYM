import React, { useState } from 'react';

function ReviewForm({ onClose }) {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Review:', { name, stars, text });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative">
        <button
          className="absolute top-4 right-4 text-white hover:text-red-500 text-2xl transition duration-300"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Write A Review</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-2 border-red-500 rounded-lg p-3 bg-black text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            required
            className="border-2 border-red-500 rounded-lg p-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value={0} disabled>Select rating</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
          <div className="flex gap-1 text-yellow-400 text-2xl">
            {Array.from({ length: stars }, (_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          <textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="border-2 border-red-500 rounded-lg p-3 bg-black text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-red-500 h-32 resize-none"
          />
          <button
            type="submit"
            className="bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;