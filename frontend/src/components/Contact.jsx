import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// function ContactPage() {
//   // Handle form submission (example)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add logic to handle form data (e.g., send to an API)
//     console.log('Form submitted');
//   };

  const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submissionMessage, setSubmissionMessage] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionMessage(`Thank you, ${formData.name}! Your message has been received.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
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

      <div className="flex flex-col md:flex-row justify-between p-10 bg-gray-900 text-white min-h-screen">
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
          <button type="submit" className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300">Send Message</button>
          {submissionMessage && <p className="mt-4 text-green-400">{submissionMessage}</p>}
        </form>
      </div>

      {/* Right Section - Location and Contact Info */}
      <div className="md:w-1/2 p-6 space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Our Location</h2>
          <div className="bg-gray-700 h-64 rounded-lg overflow-hidden">
            {/* Placeholder for map image */}
            <img src="https://via.placeholder.com/400x200" alt="Map" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
          <p className="flex items-center mb-2"><span className="text-red-500 mr-2">📍</span> Address: 123 Fitness Lane, New York, NY 10001</p>
          <p className="flex items-center mb-2"><span className="text-red-500 mr-2">📞</span> Phone: (555) 123-4567</p>
          <p className="flex items-center"><span className="text-red-500 mr-2">📧</span> Email: info@fitnesspro.com</p>
        </div>
      </div>
    </div>
  
      <Footer />
    </div>
  );
}

export default ContactPage;