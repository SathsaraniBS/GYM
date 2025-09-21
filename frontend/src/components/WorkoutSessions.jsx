import React from 'react';

function WorkoutSessions() {
  return (
    <section className="min-h-screen bg-black flex max-w-[1500px] mx-auto pt-[100px] pb-[50px] gap-[75px] max-[1520px]:min-w-full max-[1520px]:p-5 max-[1520px]:gap-6 max-[1200px]:flex-col">
      <div className="flex-1 flex flex-col gap-5">
        <h1 className="text-[2.2rem] text-gray-700 max-[1200px]:text-[1.6rem]">TOP WORKOUT SESSION</h1>
        <p className="text-xl text-gray-500 max-[1200px]:text-[20px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.
        </p>
        <img src="/img5.jpg" alt="workout" /> {/* FIXED: Ensure /img5.jpg exists in public/ */}
      </div>

      <div className="flex-1 flex flex-col gap-5">
        <h1 className="text-[2.2rem] text-gray-700 max-[1200px]:text-[1.6rem]">FEATURED BOOTCAMPS</h1>
        <p className="text-xl text-gray-500 max-[1200px]:text-[20px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.
        </p>
        
        <div className="text-[1.7rem] flex flex-col gap-8">
          <div className="group border border-gray-500 rounded-md p-5 px-[10px] transition duration-300 flex flex-col gap-3 hover:bg-red-900">
            <h4 className="group-hover:text-blue-500 max-[1200px]:text-[20px]">BOOTCAMP 1</h4>
            <p className="group-hover:text-gray-100 max-[1200px]:text-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.
            </p>
          </div>
          <div className="group border border-gray-500 rounded-md p-5 px-[10px] transition duration-300 flex flex-col gap-3 hover:bg-red-900">
            <h4 className="group-hover:text-blue-500 max-[1200px]:text-[20px]">BOOTCAMP 2</h4>
            <p className="group-hover:text-gray-100 max-[1200px]:text-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.
            </p>
          </div>
          <div className="group border border-gray-500 rounded-md p-5 px-[10px] transition duration-300 flex flex-col gap-3 hover:bg-red-900">
            <h4 className="group-hover:text-blue-500 max-[1200px]:text-[20px]">BOOTCAMP 3</h4>
            <p className="group-hover:text-gray-100 max-[1200px]:text-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.
            </p>
          </div>
          <div className="group border border-gray-500 rounded-md p-5 px-[10px] transition duration-300 flex flex-col gap-3 hover:bg-red-900">
            <h4 className="group-hover:text-blue-500 max-[1200px]:text-[20px]">BOOTCAMP 4</h4>
            <p className="group-hover:text-gray-100 max-[1200px]:text-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.
            </p>
          </div>
          <div className="group border border-gray-500 rounded-md p-5 px-[10px] transition duration-300 flex flex-col gap-3 hover:bg-red-900">
            <h4 className="group-hover:text-blue-500 max-[1200px]:text-[20px]">BOOTCAMP 5</h4>
            <p className="group-hover:text-gray-100 max-[1200px]:text-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkoutSessions;