import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaDumbbell, FaAppleAlt, FaClipboardList, FaHeart } from 'react-icons/fa';

function Ourteam() {
  const cards = [
    { id: 1, image: "img5.jpg", title: "Card 1" },
    { id: 2, image: "img6.jpg", title: "Card 2" },
    { id: 3, image: "img7.jpg", title: "Card 3" },
    { id: 4, image: "img8.jpg", title: "Card 4" },
    { id: 5, image: "img4.jpg", title: "Card 5" },
  ];

  return (
    <div className="bg-gray-100">
      <Navbar />
      <section className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
         <div className="absolute inset-0 bg-black/10 mix-blend-multiply z-10"></div>
        <div className="relative z-20">
          {/* Add content here if needed */}
        </div>
      </section>
      
      <div className="bg-black text-white min-h-[600px] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-6xl text-center">
          <h2 className="text-xl font-bold text-orange-500 uppercase mb-2">Why Choose Us?</h2>
          <h1 className="text-3xl font-bold mb-8">Push Your Limits Forward</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4 hover:scale-110 hover:bg-red-500 transition-transform duration-300 group">
                <FaDumbbell className="text-orange-500 group-hover:text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Modern equipment</h3>
              <p className="text-gray-400 text-sm">
                Our gym is equipped with state-of-the-art fitness machines and tools, designed to optimize your workouts and help you achieve your goals efficiently.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4 hover:scale-110 hover:bg-red-500 transition-transform duration-300 group">
                <FaAppleAlt className="text-orange-500 group-hover:text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Healthy nutrition plan</h3>
              <p className="text-gray-400 text-sm">
                Our expert-guided nutrition plans are tailored to fuel your body, boost performance, and support your fitness journey with balanced, healthy meals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4 hover:scale-110 hover:bg-red-500 transition-transform duration-300 group">
                {/* <FaClipboardList className="text-orange-500 group-hover:text-orange-600 text-2xl" /> */}
                <FaClipboardList className="text-orange-500 group-hover:text-white text-2xl" />

              </div>
              <h3 className="text-lg font-semibold mb-2">Professional training plan</h3>
              <p className="text-gray-400 text-sm">
                Our certified trainers create personalized workout plans to maximize your strength, endurance, and progress, tailored to your unique fitness goals.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-4 hover:scale-110 hover:bg-red-500 transition-transform duration-300 group">
                <FaHeart className="text-orange-500 group-hover:text-white text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Unique to your needs</h3>
              <p className="text-gray-400 text-sm">
                We design customized fitness solutions that adapt to your lifestyle, preferences, and goals, ensuring a truly personalized gym experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-white min-h-[600px] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-red-500 uppercase mb-2">Our Team</h2>
          <h1 className="text-3xl font-bold mb-8">Train With Experts</h1>
          <div className="w-full max-w-4xl overflow-hidden">
            <div
              className="flex animate-scroll"
              style={{ animationDuration: "20s" }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
            >
              {cards.concat(cards).map((card, index) => (
                <div key={`${card.id}-${index}`} className="min-w-[300px] h-[200px] bg-gray-800 mx-4 rounded-lg overflow-hidden shadow-lg">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <button className="bg-red-500   mt-8 bg-red-600 text-white text-lg font-bold px-6 py-2 rounded hover:bg-red-600 transition duration-300">
              Appointment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Ourteam;