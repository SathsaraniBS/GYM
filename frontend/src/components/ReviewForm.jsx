import React, { useState } from 'react';

function ReviewForm({ onClose }) {
  
  const [name, setName] = useState('');  
  const [stars, setStars] = useState(0);  
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can later send this to a backend or add it to the review list
    console.log('New Review:', { name, stars, text });
    onClose(); // Close the form after submission using prop
  };

  return (
    <div className="overlay">
      <div className="review-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2 className="modal-title">Write A Review</h2>
        <form className="review-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select value={stars} onChange={(e) => setStars(Number(e.target.value))} required>
            <option value={0}>Select rating</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>

            <div className="stars-display">
              {Array.from({ length: stars }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
            
          <textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="submit-btn">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
