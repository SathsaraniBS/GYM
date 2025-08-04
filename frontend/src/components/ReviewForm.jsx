import React from 'react'

function ReviewForm({onClose}) {
  return (
    <div className="overlay">
      <div className="review-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2 className="modal-title">Write A Review</h2>
        <div className="stars">★★★★★</div>
        <form className="review-form">
          <input type="text" placeholder="NAME" required />
          <input type="email" placeholder="EMAIL" required />
          <textarea placeholder="REVIEW" rows="8" required></textarea>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
      
    
  )
}

export default ReviewForm
