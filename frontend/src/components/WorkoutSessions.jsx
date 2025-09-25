import React from 'react'

function WorkoutSessions() {
  return (
      <div className="bg-black text-white min-h-[600px] flex flex-col items-center justify-center p-6">
         <div className="flex flex-col md:flex-row justify-around w-full max-w-6xl px-4">
        <div className="mb-10 md:mb-0 md:mr-4 text-center">
          <h2 className="text-4xl font-bold mb-4">PERSONAL TRAINING</h2>
          <p className="mb-6">You'll look at graphs and charts in Task One, how to approach the task and the language needed for a successful answer.</p>
          <button className="bg-red-600 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            VIEW COURSES
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">GROUP TRAINING</h2>
          <p className="mb-6">You'll look at graphs and charts in Task One, how to approach the task and the language needed for a successful answer.</p>
          <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
            VIEW COURSES
          </button>
        </div>
      </div>
      <div className="mt-10 text-center">
        <h1 className="text-6xl font-bold text-outline">WHAT I OFFER</h1>
      </div>
    </div>
  )
}

export default WorkoutSessions
