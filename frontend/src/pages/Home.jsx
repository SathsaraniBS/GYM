import React from 'react'
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import WorkoutSessions from './components/WorkoutSessions';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BMICalculater from './components/BMICalculater';
function Home() {
  return (
      <>
      <Hero />
      <WorkoutSessions />
      <Gallery />
      <Pricing />
      <Contact />
      <BMICalculater />
      <Footer />
    </>
  )
}

export default Home
