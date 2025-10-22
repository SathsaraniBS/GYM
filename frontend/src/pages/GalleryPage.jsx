import React from 'react'
import Gallery from '../components/Gallery'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function GalleryPage() {
  return (
    <div>
      <Navbar />
        <section className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">

        <Gallery />
      </section>
      <Footer />
    </div>
  )
}

export default GalleryPage
