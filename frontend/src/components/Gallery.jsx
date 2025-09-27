import React from 'react';

const Gallery = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row justify-around w-full max-w-6xl">
        <div className="mb-4 md:mb-0 md:mr-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img 
            src="gallery1.jpg" 
            alt="Person doing bicep curls" 
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Bicep Curls</h3>
          </div>
        </div>
        <div className="mb-4 md:mb-0 md:mr-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img 
            src="gallery2.jpg" 
            alt="Person doing deadlifts" 
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Deadlifts</h3>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img 
            src="gallery3.jpg" 
            alt="Person on elliptical machine" 
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Elliptical Machine</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;