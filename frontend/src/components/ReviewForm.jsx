import axios from 'axios';
import React, { useState } from 'react';

function ReviewForm({ onClose }) {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false); // Optional: for better UX

  const handleSubmit = async (e) => {  // Added async here
    e.preventDefault();
    
    if (!name || !stars || !text) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/reviews', {
        name: name.trim(),
        stars:Number(stars),
        text: text.trim(),
        date: new Date().toISOString(),

      });

        setName('');
        setStars(0);
        setText('');

        if (onSuccess) onSuccess();

        onClose();
      

      console.log(response);
      alert('Thank you! Your review has been submitted.');
      onClose(); // Close modal on success

    } catch (error) {
      console.log(error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500 text-2xl transition duration-300"
        >
          X
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Write a Review</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border-2 border-red-500 rounded-lg p-3 bg-black text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <select
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            required
            className="border-2 border-red-500 rounded-lg p-3 bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value={0} disabled>Select rating</option>
            {[1, 2, 3, 4, 5].map(n => (
              <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
            ))}
          </select>

          <div className="flex gap-1 text-yellow-400 text-2xl justify-center">
            {Array.from({ length: stars }, (_, i) => (
              <span key={i}>Star</span>
            ))}
          </div>

          <textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={5}
            className="border-2 border-red-500 rounded-lg p-3 bg-black text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`block font-bold py-3 px-4 rounded-md transition duration-300 mt-4 ${
              loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;