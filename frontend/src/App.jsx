import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <Router>
        <H />
        <Hero />
        <WorkoutSessions/>
        <Gallery />
        <Pricing />
        <Contact />
        <BMICalculater />
        <CustomerReview />
        <ReviewForm />
        <Footer />
        
      </Router>
      
    </BrowserRouter>
  )
}

export default App
