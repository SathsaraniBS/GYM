import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Course() {
  const classes = [
    { title: "STRENGTH", category: "WEIGHTLIFTING", image: "/class-1.jpg" },
    { title: "CARDIO", category: "INDOOR CYCLING", image: "/class-2.jpg" },
    { title: "STRENGTH", category: "KETTLEBELL POWER", image: "/class-3.jpg" },
    { title: "CARDIO", category: "INDOOR CYCLING", image: "/class-4.jpg" },
    { title: "TRAINING", category: "BOXING", image: "/class-5.jpg" },
  ];

  return (
    <div className="bg-gray-100">
      <Navbar />
      <section className="min-h-screen relative bg-[url('/p2.jpg')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        {/* Add content here if needed */}
      </section>
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto py-10">
          <h1 className="text-xl font-bold text-center text-orange-500 mb-6">OUR CLASSES</h1>
          <h2 className="text-2xl font-bold text-center mb-10">WHAT WE CAN OFFER</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto px-4">
            {classes.map((cls, index) => (
              <div
                key={index}
                className="bg-gray-800 shadow-lg overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-xl">
                <img
                  src={cls.image}
                  alt={`${cls.title} - ${cls.category} class`}
                  className="object-cover w-full h-64 transition-transform duration-300 hover:scale-110"
                />
                <div className="p-4 flex justify-between items-center">
                  <div>
                  <h3 className="text-xl font-bold text-orange-500">{cls.title}</h3>
                  <p className="text-gray-400">{cls.category}</p>
                  </div>
                   <button className="bg-gray-800 text-white p-2 rounded transition-colors duration-300 hover:bg-gray-700">&gt;</button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
        {/* Add content here if needed */}
      </div>
      <Footer />
    </div>
  );
}

export default Course;