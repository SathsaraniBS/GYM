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

      {/* Hero Section */}
       <section className="min-h-screen relative bg-[url('/a3.jpg')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
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


      {/* Mission Section */}
      <div className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">Our Mission</h2>
          <p className="text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            At FitTrack, our mission is to empower individuals to achieve their fitness goals through personalized training, cutting-edge facilities, and a supportive community. We believe in fostering a culture of health and wellness, where every member feels motivated and inspired to reach their full potential.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl font-bold text-red-500 uppercase mb-2">Why Choose Us?</h2>
          <h1 className="text-4xl font-bold mb-12">Push Your Limits Forward</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Fixed: Icon inside container with consistent styling */}
            <div className="group">
              <div className="w-20 h-20 mx-auto bg-black rounded-full flex items-center justify-center mb-6 hover:scale-110 hover:bg-red-500 transition-all duration-300">
                <FaDumbbell className="text-red-500 group-hover:text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Modern Equipment</h3>
              <p className="text-gray-400 text-sm">
                {/* State-of-the-art fitness machines and tools designed to optimize your workouts. */}
                Our gym is equipped with the latest state-of-the-art fitness machines and technology, designed to deliver maximum performance and safety. Whether you’re strength training or doing cardio, our equipment supports every fitness level and goal.

              </p>
            </div>

            <div className="group">
              <div className="w-20 h-20 mx-auto bg-black rounded-full flex items-center justify-center mb-6 hover:scale-110 hover:bg-red-500 transition-all duration-300">
                <FaAppleAlt className="text-red-500 group-hover:text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Healthy Nutrition Plan</h3>
              <p className="text-gray-400 text-xl font-semibold">
                {/* Expert-guided nutrition plans tailored to fuel your body and support your fitness journey. */}
                We go beyond the gym floor. With Fitness First meal plans, you’ll get nutritious, ready-to-follow food guidance that fuels performance and supports lasting health — because what you eat matters.

              </p>
            </div>

            <div className="group">
              <div className="w-20 h-20 mx-auto bg-black rounded-full flex items-center justify-center mb-6 hover:scale-110 hover:bg-red-500 transition-all duration-300">
                <FaClipboardList className="text-red-500 group-hover:text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Professional Training Plan</h3>
              <p className="text-gray-400 text-xl font-semibold">
                {/* Personalized workout plans by certified trainers to maximize strength and progress. */}
                Our certified trainers create structured, results-driven programs that help you train smarter, not harder. From strength and conditioning to fat loss and endurance, we’ve got the perfect plan for you.

              </p>
            </div>

            <div className="group">
              <div className="w-20 h-20 mx-auto bg-black rounded-full flex items-center justify-center mb-6 hover:scale-110 hover:bg-red-500 transition-all duration-300">
                <FaHeart className="text-red-500 group-hover:text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Unique to Your Needs</h3>
              <p className="text-gray-400 text-xl ">
                {/* Customized fitness solutions that adapt to your lifestyle and personal goals. */}
                Your fitness journey is personal, and so is our approach. From training plans to meal programs, everything we offer is uniquely crafted to match your individual needs and help you reach your goals faster.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team - Auto Sliding Carousel */}
      <div className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-red-500 uppercase mb-2">Our Team</h2>
          <h1 className="text-4xl font-bold mb-12">Train With Experts</h1>

          {/* Inline CSS for infinite scroll (no separate file needed) */}
          <style jsx>{`
            @keyframes infiniteScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .carousel-track {
              display: flex;
              width: max-content;
              animation: infiniteScroll 40s linear infinite;
            }
            .carousel-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="overflow-hidden">
            <div className="carousel-track">
              {[...teamMembers, ...teamMembers].map((member, index) => (
                <div key={`${member.id}-${index}`} className="flex-shrink-0 w-80 mx-8">
                  <div className="bg-gray rounded-2xl overflow-hidden shadow-2xl hover:shadow-red-500/30 transition-shadow duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-8 text-center bg-transparent">
                      <h3 className="text-2xl font-bold">{member.name}</h3>
                      <p className="text-red-400 text-lg mt-2">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-12 bg-red-500 hover:bg-red-600 text-white font-bold px-12 py-4 rounded-full text-xl transition transform hover:scale-105">
            Book Appointment
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;