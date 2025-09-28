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
          
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery2.png" 
            alt="Person doing deadlifts" 
            className="object-cover w-full h-64"
          />
          
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery3.png" 
            alt="Person on elliptical machine" 
            className="object-cover w-full h-64"
          />
          
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery4.png" 
            alt="Person doing squats"
            className="object-cover w-full h-64"
          />
          
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery5.png" 
            alt="Person doing bench press"
            className="object-cover w-full h-64"
          />
          
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="gallery6.png" 
            alt="Person doing yoga"
            className="object-cover w-full h-64"
          />
          
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g3.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g4.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g5.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g6.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
         
        </div>
        <div className="bg-gray-800  shadow-lg overflow-hidden">
          <img 
            src="g7.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          
        </div>
       
          <img 
            src="g8.jpg" 
            alt=""
            className="object-cover w-full h-64"
          />
          
      </div>
    </div>
    </div>
  );
}

export default Gallery;