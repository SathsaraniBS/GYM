import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaDumbbell, FaAppleAlt, FaClipboardList, FaHeart } from 'react-icons/fa';

function About() {
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
      <section className="min-h-screen relative bg-[url('/a3.jpg')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
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
            <button className="mt-8 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
              Appointment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;