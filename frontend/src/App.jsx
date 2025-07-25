import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import WorkoutSessions from './components/WorkoutSessions';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BMICalculater from './components/BMICalculater';
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Hero />
        <WorkoutSessions/>
        <Gallery />
        <Pricing />
        <Contact />
        <BMICalculater />
        <Footer />
        <ToastContainer theme='drak' position='top-center'/>
        
      </Router>
      
    </div>
  )
}

export default App
