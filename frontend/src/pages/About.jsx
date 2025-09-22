import React from 'react'
import Navbar from '../components/Navbar'

function About() {
  return (
    <div className='bg-gray-100 min-h-screen'>
       <Navbar /> 
        {/* <section className="h-screen relative bg-[url('/a1.jpg')] bg-black/75  bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8"></section> */}

        <section className="min-h-screen relative bg-[url('/a3.jpg')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8">

         <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
        <div className="title mb-6 font-bold">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
            ABOUT US
          </h1>
          
          
          <h3 className="text-xl  lg:text-3xl mt-4 text-gray-200">
            Forging stronger bodies and sharper minds since 2010. We are more than a gym.
          </h3>
          <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-200">
            We are a community dedicated to empowering individuals to achieve their fitness goals.
          </h2>
          
        </div>
        
        
          
      </div>
        </section>
         <div className="bg-gray-900 text-white h-screen flex flex-col items-center justify-center p-6">
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
            
    </div>
  )
}

export default About
