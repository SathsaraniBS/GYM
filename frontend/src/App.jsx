import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Hero />
        <Gallery />
        <Pricing />
        
      </Router>
      
    </div>
  )
}

export default App
