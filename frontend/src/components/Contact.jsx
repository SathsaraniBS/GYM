import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ContactPage() {
  // Handle form submission (example)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form data (e.g., send to an API)
    console.log('Form submitted');
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <section className="min-h-screen relative bg-[url('/a3.jpg')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="title mb-6 font-bold">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
              CONTACT US
            </h1>
          </div>
          {/* Form inside the section for better structure */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-md mx-auto mt-8"
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                rows="5"
                className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
          <div className="text-center mt-8">
            <p className="text-gray-200 mb-4">
              Or reach us directly at:
            </p>
            <p className="text-gray-100 font-semibold">Email: info@yourgym.com</p>
            <p className="text-gray-100 font-semibold">Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ContactPage;