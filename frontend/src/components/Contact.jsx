import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submissionMessage, setSubmissionMessage] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      timeZoneName: 'short',
    });
    setSubmissionMessage(
      `Thank you, ${formData.name}! Your message has been received at ${currentTime}.`
    );
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  // Map configuration
  const mapContainerStyle = {
    height: '100%',
    width: '100%',
  };
  const center = {
    lat: 40.7128, // Latitude for New York, NY
    lng: -74.0060, // Longitude for New York, NY
  };
  const position = {
    lat: 40.7128,
    lng: -74.0060,
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <section className="min-h-screen relative bg-[url('/a3.jpg')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="title mb-6 font-bold">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
              CONTACT US
            </h1>
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-200 mb-4">Or reach us directly at:</p>
            <p className="text-gray-100 font-semibold">Email: info@yourgym.com</p>
            <p className="text-gray-100 font-semibold">Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </section>

      <div className="p-10">
        <div className="flex flex-col md:flex-row justify-between max-w-5xl mx-auto">
          {/* Left Section - Contact Form */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="mb-6">We're here to help! Reach out to us with any questions or feedback.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 h-32"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Send Message
              </button>
              {submissionMessage && <p className="mt-4 text-green-400">{submissionMessage}</p>}
            </form>
          </div>

          {/* Right Section - Location and Contact Info */}
          <div className="md:w-1/2 p-6 space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg h-64">
              <h2 className="text-2xl font-bold mb-2">Our Location</h2>
              <LoadScript googleMapsApiKey="YOUR_ACTUAL_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={10}
                  className="h-full w-full rounded-lg"
                >
                  <Marker position={position} />
                </GoogleMap>
              </LoadScript>
            </div>
            {/* Contact Information */}
            <div className="bg-gray-800 p-6 rounded-lg space-y-6">
              <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
              <p className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-red-500 mr-2" /> Address: 123 Fitness Lane, New York, NY 10001
              </p>
              <p className="flex items-center mb-2">
                <FaPhone className="text-red-500 mr-2" /> Phone: (555) 123-4567
              </p>
              <p className="flex items-center">
                <FaEnvelope className="text-red-500 mr-2" /> Email: info@fitnesspro.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactPage;