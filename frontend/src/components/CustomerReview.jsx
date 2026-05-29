// src/components/CustomerReview.jsx
import React, { useState, useEffect } from 'react';
import { Star, Plus, ChevronRight, Zap, Quote, RefreshCw } from 'lucide-react';
import api from '../api/axios';
import ReviewForm from './ReviewForm';

// ─────────────────────────────────────────────
// HELPER — Star rating display
// ─────────────────────────────────────────────
const StarRating = ({ stars, size = 14 }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700 fill-gray-700'}
      />
    ))}
  </div>
);

// ─────────────────────────────────────────────
// HELPER — Format date
// ─────────────────────────────────────────────
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

// ─────────────────────────────────────────────
// COMPONENT — Single review card
// ─────────────────────────────────────────────
const ReviewCard = ({ review }) => (
  <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6
    hover:border-red-600/40 transition-all duration-300 group flex flex-col">

    {/* Top — Quote icon */}
    <div className="flex items-start justify-between mb-4">
      <div className="w-9 h-9 rounded-xl bg-red-600/10 border border-red-600/20
        flex items-center justify-center flex-shrink-0">
        <Quote size={14} className="text-red-500" />
      </div>
      <StarRating stars={review.stars} />
    </div>

    {/* Review text */}
    <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5 group-hover:text-gray-300 transition-colors">
      "{review.text}"
    </p>

    {/* Bottom — name + date */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-600/30
          flex items-center justify-center text-red-400 font-black text-sm flex-shrink-0">
          {review.name?.charAt(0)?.toUpperCase()}
        </div>
        <p className="text-white font-bold text-sm">{review.name}</p>
      </div>
      <p className="text-gray-700 text-xs">{formatDate(review.date)}</p>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const CustomerReview = () => {
  const [reviews,     setReviews]     = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll,     setShowAll]     = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/reviews');
      setReviews(res.data);
    } catch (err) {
      // Demo data fallback
      setReviews([
        { _id:'1', name:'Ayesh Ranasinghe', stars:5, text:'FitTrack completely transformed my fitness journey. The trainers are world-class and the facilities are top-notch. Best gym in Colombo!', date: new Date(Date.now()-86400000*2).toISOString() },
        { _id:'2', name:'Chamari Silva',    stars:5, text:'I have been a member for 6 months and the results speak for themselves. The boxing classes with Ayesh are incredible. Highly recommend!', date: new Date(Date.now()-86400000*5).toISOString() },
        { _id:'3', name:'Ruwan Perera',     stars:4, text:'Amazing environment and professional staff. The equipment is always clean and well-maintained. Love the early morning sessions.', date: new Date(Date.now()-86400000*8).toISOString() },
        { _id:'4', name:'Dilshan Fernando', stars:5, text:'Joined as a student member and it was the best decision. Affordable plans and amazing coaches who actually care about your progress.', date: new Date(Date.now()-86400000*12).toISOString() },
        { _id:'5', name:'Priya Kumari',     stars:5, text:'The yoga and pilates classes are fantastic. Dulshan is an exceptional trainer. My flexibility and strength have improved massively.', date: new Date(Date.now()-86400000*15).toISOString() },
        { _id:'6', name:'Kasun Bandara',    stars:4, text:'Three branches nearby makes it super convenient. The Colombo 7 branch is my favorite — great atmosphere and community vibe.', date: new Date(Date.now()-86400000*20).toISOString() },
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleReviewSubmitted = () => {
    fetchReviews();
    setIsModalOpen(false);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1)
    : '5.0';

  const displayedReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <section id="reviews" className="bg-black py-28 px-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
        bg-red-600/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={12} className="text-red-500 fill-red-500" />
              <span className="text-red-500 text-[10px] font-bold uppercase tracking-[0.35em]">
                Testimonials
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-none mb-3">
              What Our<br />
              <span className="text-transparent" style={{ WebkitTextStroke:'2px #dc2626' }}>
                Members Say
              </span>
            </h2>
            <div className="w-12 h-0.5 bg-red-600" />
          </div>

          {/* Rating summary + buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">

            

            {/* Write review button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white
                font-bold px-6 py-4 rounded-xl text-sm uppercase tracking-wider
                transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-red-900/30"
            >
              <Plus size={16} /> Write a Review
            </button>
          </div>
        </div>

        {/* ── Reviews grid ── */}
        {loading ? (
          <div className="py-24 flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 text-xs uppercase tracking-widest">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-24 text-center">
            <Quote size={40} className="text-gray-800 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-semibold mb-2">No reviews yet</p>
            <p className="text-gray-700 text-sm mb-8">Be the first to share your experience!</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white
                font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider
                transition-all mx-auto"
            >
              <Plus size={14} /> Write First Review
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedReviews.map(review => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>

            {/* See all / Show less */}
            {reviews.length > 6 && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-2 border border-gray-700 hover:border-red-600/50
                    hover:bg-red-600/5 text-gray-400 hover:text-white font-bold px-8 py-4
                    rounded-xl text-sm uppercase tracking-wider transition-all duration-300"
                >
                  {showAll ? 'Show Less' : `See All ${reviews.length} Reviews`}
                  <ChevronRight size={14} className={`transition-transform ${showAll ? 'rotate-90' : ''}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Review Form Modal ── */}
      {isModalOpen && (
        <ReviewForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleReviewSubmitted}
        />
      )}
    </section>
  );
};

export default CustomerReview;