import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');
      setReviews(res.data);
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${id}`);
      setReviews(reviews.filter(review => review._id !== id));
    } catch (err) {
      setError('Failed to delete review');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !text) {
      setError('Name and review text are required');
      return;
    }
    try {
      const newReview = { name, stars, text };
      const res = await axios.post('http://localhost:5000/api/reviews', newReview);
      setReviews([...reviews, res.data.review]);
      setName('');
      setStars(5);
      setText('');
      setError('');
    } catch (err) {
      setError('Failed to add review');
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Reviews</h1>

      {/* Add Review Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Review</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-red-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stars (1-5)</label>
            <input
              type="number"
              value={stars}
              onChange={(e) => setStars(Math.max(1, Math.min(5, e.target.value)))}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-red-500"
              min="1"
              max="5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Review Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-red-500"
              placeholder="Enter review text"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Add Review
          </button>
        </form>
      </div>

      {/* Reviews Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Review List</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Stars</th>
                  <th className="p-3 border-b">Text</th>
                  <th className="p-3 border-b">Date</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id} className="border-b">
                    <td className="p-3">{review.name}</td>
                    <td className="p-3">{Array.from({ length: review.stars }, (_, i) => <span key={i} className="text-yellow-500">⭐</span>)}</td>
                    <td className="p-3">{review.text}</td>
                    <td className="p-3">{new Date(review.date).toLocaleDateString()}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;