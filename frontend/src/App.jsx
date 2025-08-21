import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import WorkoutSessions from './components/WorkoutSessions';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BMICalculater from './components/BMICalculater';
import CustomerReview from './components/CustomerReview';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import './App.css'
import ReviewForm from './components/ReviewForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<CustomerReview />} />
        <Route path="/add-review" element={<ReviewForm />} />
        {/* Optional 404 */}
        <Route path="*" element={<div style={{ padding: 24 }}>Page not found</div>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
