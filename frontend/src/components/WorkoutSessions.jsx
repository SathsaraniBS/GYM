// src/components/workoutsessions.jsx (verified and fixed)
import React from 'react';

function WorkoutSessions() {
  return (
    <section className="workout_session">
      <div className="wrapper">
        <h1>TOP WORKOUT SESSION</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.</p>
        <img src="/img5.jpg" alt="workout" /> {/* FIXED: Ensure /img5.jpg exists in public/ */}
      </div>

      <div className="wrapper">
        <h1>FEATURED BOOTCAMPS</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.</p>
        
        <div className="bootcamps">
          <div>
            <h4>BOOTCAMP 1</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.</p>
          </div>
          <div>
            <h4>BOOTCAMP 2</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.</p>
          </div>
          <div>
            <h4>BOOTCAMP 3</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.</p>
          </div>
          <div>
            <h4>BOOTCAMP 4</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.</p>
          </div>
          <div>
            <h4>BOOTCAMP 5</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, doloremque.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkoutSessions;