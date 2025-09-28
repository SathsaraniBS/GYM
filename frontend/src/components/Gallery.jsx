import React from 'react';

function Gallery() {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl">
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery1.png" 
            alt="Person doing bicep curls" 
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Bicep Curls</h3>
          </div>
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery2.png" 
            alt="Person doing deadlifts" 
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Deadlifts</h3>
          </div>
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery3.png" 
            alt="Person on elliptical machine" 
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Elliptical Machine</h3>
          </div>
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery4.png" 
            alt="Person doing squats"
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Squats</h3>
          </div>
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery5.png" 
            alt="Person doing bench press"
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Bench Press</h3>
          </div>
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery6.png" 
            alt="Person doing yoga"
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Yoga</h3>
          </div>
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g3.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Push Ups</h3>
          </div>
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g4.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Pull Ups</h3>
          </div>
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g5.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Lunges</h3>
          </div>
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g6.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">Plank</h3>
          </div>
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g7.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          {/* <div className="p-4">
            <h3 className="text-xl font-bold">Crunches</h3>
          </div> */}
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g8.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          {/* <div className="p-4">
            <h3 className="text-xl font-bold">Jumping Jacks</h3>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Gallery;