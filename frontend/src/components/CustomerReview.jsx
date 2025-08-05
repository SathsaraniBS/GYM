import React, { useState } from 'react';
import ReviewForm from './ReviewForm'; // Make sure the path is correct

function CustomerReview() {
  
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
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
    <section className="customer-reviews">
      <h1>CUSTOMER REVIEWS</h1>

      <div className="review-container">
        {reviews.map((review, index) => (
          <div key={index} className="review-book">
            <h3>{review.name}</h3>
            <div className="stars">{renderStars(review.stars)}</div>
            <p>{review.text}</p>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button 
          className="write-review"
          onClick={(handleClick) => setShowForm(true)} // Show the form
        >
          WRITE A REVIEW
        </button>

        {showForm && <ReviewForm/>}
        

        <button className="show-more">SHOW MORE REVIEWS</button>
      </div>
    </section>
  );
}

export default CustomerReview;
