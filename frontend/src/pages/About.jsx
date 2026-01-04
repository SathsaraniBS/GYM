// src/pages/About.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaDumbbell, FaAppleAlt, FaClipboardList, FaHeart } from 'react-icons/fa';

function About() {
  const teamMembers = [
    { id: 1, image: "/img5.jpg", name: "Alex Rivera", role: "Head Trainer" },
    { id: 2, image: "/img6.jpg", name: "Samantha Lee", role: "Nutrition Specialist" },
    { id: 3, image: "/img7.jpg", name: "Marcus Chen", role: "Strength Coach" },
    { id: 4, image: "/img8.jpg", name: "Emma Watson", role: "Yoga Instructor" },
    { id: 5, image: "/img4.jpg", name: "Daniel Brooks", role: "Fitness Director" },
  ];

  return (
    <div className="bg-gray-100">
      <Navbar />

      {/* Hero Section - Darker overlay for better contrast */}
      <section className="min-h-screen relative bg-[url('/a3.jpg')] bg-black/70 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 saturate-30">
        <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            ABOUT US
          </h1>
          <h3 className="text-xl lg:text-3xl mt-4 text-gray-200">
            Forging stronger bodies and sharper minds since 2010. We are more than a gym.
          </h3>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-200">
            We are a community dedicated to empowering individuals to achieve their fitness goals.
          </h2>
        </div>
      </section>

      {/* Mission Section - Kept as is */}
      <div className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">Our Mission</h2>
          <p className="text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            At FitTrack, our mission is to empower individuals to achieve their fitness goals through personalized training, cutting-edge facilities, and a supportive community. We believe in fostering a culture of health and wellness, where every member feels motivated and inspired to reach their full potential.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section - Redesigned to match screenshot */}
      <section className="relative bg-[url('/gym-background.jpg')] bg-center bg-cover bg-no-repeat py-32 px-6 saturate-30">  {/* Replace with your dark gym image */}
        <div className="absolute inset-0 bg-black/80"></div>  {/* Heavy dark overlay */}
        <div className="relative max-w-6xl mx-auto text-center text-white">
          <h2 className="text-2xl font-bold text-red-500 uppercase mb-4">Why Choose Us?</h2>
          <h1 className="text-5xl lg:text-6xl font-bold mb-16">Push Your Limits Forward</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Card 1 */}
            <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
              <div className="text-red-500 text-5xl mb-6 flex justify-center">
                <FaDumbbell />
              </div>
              <h3 className="text-2xl font-bold mb-4">Modern Equipment</h3>
              <p className="text-gray-400 text-base">
                Our gym is equipped with the latest state-of-the-art fitness machines and technology, designed to deliver maximum performance and safety. Whether you’re strength training or doing cardio, our equipment supports every fitness level and goal.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
              <div className="text-red-500 text-5xl mb-6 flex justify-center">
                <FaAppleAlt />
              </div>
              <h3 className="text-2xl font-bold mb-4">Healthy Nutrition Plan</h3>
              <p className="text-gray-400 text-base">
                We go beyond the gym floor. With Fitness First meal plans, you’ll get nutritious, ready-to-follow food guidance that fuels performance and supports lasting health — because what you eat matters.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
              <div className="text-red-500 text-5xl mb-6 flex justify-center">
                <FaClipboardList />
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional Training Plan</h3>
              <p className="text-gray-400 text-base">
                Our certified trainers create structured, results-driven programs that help you train smarter, not harder. From strength and conditioning to fat loss and endurance, we’ve got the perfect plan for you.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
              <div className="text-red-500 text-5xl mb-6 flex justify-center">
                <FaHeart />
              </div>
              <h3 className="text-2xl font-bold mb-4">Unique to Your Needs</h3>
              <p className="text-gray-400 text-base">
                Your fitness journey is personal, and so is our approach. From training plans to meal programs, everything we offer is uniquely crafted to match your individual needs and help you reach your goals faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section - Kept unchanged */}
      {/* ... (existing code remains the same) ... */}

      <Footer />
    </div>
  );
}

export default About;