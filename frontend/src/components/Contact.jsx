import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contactpage() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get in touch with our team for any inquiries, support, or to book an appointment.
          </p>
          <form className="flex flex-col gap-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contactpage;