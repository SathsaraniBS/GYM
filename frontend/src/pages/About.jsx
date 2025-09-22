import React from 'react';
import Navbar from '../components/Navbar';

function About() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      {/* Add pt-20 to account for fixed navbar height
      <section className="min-h-screen relative bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"> */}

      <section className="min-h-screen relative bg-[url('/a3.jpg')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="title mb-6 font-bold">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
              ABOUT US
            </h1>
            <h3 className="text-xl lg:text-3xl mt-4 text-gray-200">
              Forging stronger bodies and sharper minds since 2010. We are more than a gym.
            </h3>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-200">
              We are a community dedicated to empowering individuals to achieve their fitness goals.
            </h2>
          </div>
        </div>
      </section>
      <div className="bg-gray-900 text-white min-h-[600px] flex flex-col items-center justify-center p-6">
        <div className="flex flex-col md:flex-row gap-12 w-full max-w-4xl">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300">
              At FitTrack, our mission is to empower individuals to achieve their fitness goals through personalized training, cutting-edge facilities, and a supportive community. We believe in fostering a culture of health and wellness, where every member feels motivated and inspired to reach their full potential.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-300">
              We are committed to excellence in every aspect of our services. Our core values include integrity, respect, innovation, and continuous improvement. We strive to create a positive and inclusive environment where members can thrive and achieve their fitness aspirations.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black text-white min-h-[600px] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-6xl text-center">
          <h2 className="text-sm text-orange-500 uppercase mb-2">Why Choose Us?</h2>
          <h1 className="text-3xl font-bold mb-8">Push Your Limits Forward</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 text-2xl">🏋️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Modern equipment</h3>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore facilis.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 text-2xl">🍎</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Healthy nutrition plan</h3>
              <p className="text-gray-400 text-sm">
                Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 text-2xl">💪</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional training plan</h3>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut dolore facilis.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-orange-500 text-2xl">❤️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Unique to your needs</h3>
              <p className="text-gray-400 text-sm">
                Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;