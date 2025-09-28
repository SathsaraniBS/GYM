import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Course() {

    const classes = [
    { title: "Weightlifting", category: "Strength", image: "g2.jpg" },
    { title: "Indoor Cycling", category: "Cardio", image: "" },
    { title: "Kettlebell Power", category: "Strength", image: "" },
    { title: "Boxing", category: "Cardio", image: "" },
  ];

  return (
    <div className="bg-gray-100">
        <Navbar />
        <section className="min-h-screen relative bg-[url('/p2.jpg')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">

        </section>
        <div className="bg-gray-900 text-white min-h-screen">
          <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">OUR CLASSES</h1>
        <h2 className="text-3xl font-bold text-center mb-10">WHAT WE CAN OFFER</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((classItem, index) => (
            <div key={index} className="relative">
              <img src={classItem.image} alt={classItem.title} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div>
                  <p className="text-orange-500 text-lg font-semibold">{classItem.category}</p>
                  <h3 className="text-xl font-bold">{classItem.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>

            <Footer />

    </div>
  )
}

export default Course
