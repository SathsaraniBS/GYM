import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WorkoutSessions from "../components/WorkoutSessions";
import Gallery from "../components/Gallery";
import Pricing from "../components/Pricing";
import Contact from "../components/Contact";
import CustomerReview from "../components/CustomerReview";
import ReviewForm from "../components/ReviewForm ";
import BMICalculater from "../components/BMICalculater";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <Hero />
      <WorkoutSessions />
      <Gallery />
      <Pricing />
      <Contact />
      <CustomerReview />
      <ReviewForm />
      <BMICalculater />
      <Footer /> 

    </div>
  );
}

export default Home;
