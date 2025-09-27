import React from 'react'

const Gallery = () => {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Fitness Gallery</h1>
      <div className="flex space-x-4">
        <img src="gallery1.png" alt="Workout 1" className="w-1/3 rounded-lg shadow-lg" />
        <img src="gallery2.png" alt="Workout 2" className="w-1/3 rounded-lg shadow-lg" />
        <img src="gallery3.png" alt="Workout 3" className="w-1/3 rounded-lg shadow-lg" />
        <img src="gallery4.png" alt="workout 4" className="w-1/3 rounded-lg shadow-lg" />
        <img src="gallery5.png" alt="workout 5" className="w-1/3 rounded-lg shadow-lg" />
        <img src="gallery6.png" alt="workout 6" className="w-1/3 rounded-lg shadow-lg" />
      </div>
    </div>

  )
}

export default Gallery
