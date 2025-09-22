import React from 'react'
import Navbar from '../components/Navbar'

function About() {
  return (
    <div className='bg-gray-100 min-h-screen'>
       <Navbar /> 
        {/* <section className="h-screen relative bg-[url('/a1.jpg')] bg-black/75  bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8"></section> */}

        <section className="min-h-screen relative bg-[url('/a3.jpg')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8"></section>
    </div>
  )
}

export default About
