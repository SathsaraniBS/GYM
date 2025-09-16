import React from 'react';

function Hero() {
  return (
    <section className="min-h-screen relative bg-[url('/img3.jpg')] bg-black/75 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center pt-[150px] pb-[70px] pl-28 max-[1050px]:pl-10 max-[880px]:bg-center max-[600px]:bg-bottom max-[467px]:pl-4">
      <div className="flex flex-col gap-8 items-center">
        <div className="text-gray-100 text-6xl max-[1050px]:text-[2.75rem] max-[880px]:text-[2.45rem] max-[600px]:text-[2.2rem] text-center">
          <h1>LET'S</h1>
          <h1>GET</h1>
          <h1>MOVING</h1>
        </div>
        <div className="sub-title">
          <p className="font-normal text-gray-100 text-2xl leading-[45px] max-[1050px]:text-[1.3rem] max-[1050px]:leading-normal max-[1050px]:mb-1 max-[880px]:text-[1.2rem] max-[600px]:text-base text-center">
            Your journey to fitness starts here
          </p>
          <p className="font-normal text-blue-500 text-2xl leading-[45px] max-[1050px]:text-[1.3rem] max-[1050px]:leading-normal max-[1050px]:mb-1 max-[880px]:text-[1.2rem] max-[600px]:text-base text-center">
            BSS Creation
          </p>
        </div>
        <div className="flex items-center gap-6 max-[467px]:flex-col max-[467px]:gap-5 max-[467px]:items-start">
          <button className="px-8 py-4 text-lg text-blue-500 border border-blue-500 bg-transparent transition duration-300 hover:cursor-pointer hover:bg-blue-500 hover:text-gray-100 max-[600px]:text-base">
            Start Your Journey
          </button>
          <button className="px-8 py-4 text-lg text-blue-500 border border-blue-500 bg-transparent transition duration-300 hover:cursor-pointer hover:bg-blue-500 hover:text-gray-100 max-[600px]:text-base">
            Discover Your Plan
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;