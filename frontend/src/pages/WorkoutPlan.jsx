// src/pages/WorkoutPlan.jsx

import React, { useState } from 'react';
import { 
  Dumbbell, 
  Clock, 
  Flame, 
  ChevronRight, 
  Search, 
  Filter,
  PlayCircle,
  Trophy
} from "lucide-react";

const WorkoutPlan = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Strength", "Cardio", "Yoga", "HIIT", "Recovery"];

  const workouts = [
    {
      id: 1,
      title: "Full Body Power",
      category: "Strength",
      duration: "45 min",
      calories: "400 kcal",
      difficulty: "Intermediate",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Morning Flow",
      category: "Yoga",
      duration: "20 min",
      calories: "120 kcal",
      difficulty: "Beginner",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Extreme HIIT Blast",
      category: "HIIT",
      duration: "30 min",
      calories: "550 kcal",
      difficulty: "Advanced",
      image: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Core Crusher",
      category: "Strength",
      duration: "15 min",
      calories: "150 kcal",
      difficulty: "Beginner",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Endurance Run",
        category: "Cardio",
        duration: "60 min",
        calories: "700 kcal",
        difficulty: "Intermediate",
        image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=500&auto=format&fit=crop"
      }
  ];

  const filteredWorkouts = activeCategory === "All" 
    ? workouts 
    : workouts.filter(w => w.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-10 py-10">
      
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-wide text-white mb-2">FitTrack</h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-orange-500">Workout Plans</h2>
            <p className="text-gray-400 mt-2 text-lg">Choose a program that fits your goals.</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Search workouts..."
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>
        </div>
      </header>

      {/* Featured Workout Card */}
      <section className="mb-12">
        <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" 
            alt="Featured" 
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-2 text-orange-500 mb-2">
              <Trophy size={20} />
              <span className="uppercase font-bold tracking-widest text-sm">Workout of the Day</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold mb-4">Elite Athlete Conditioning</h3>
            <div className="flex flex-wrap gap-6 mb-6 text-gray-200">
              <span className="flex items-center gap-2"><Clock size={18} className="text-orange-500" /> 50 min</span>
              <span className="flex items-center gap-2"><Flame size={18} className="text-orange-500" /> 620 kcal</span>
              <span className="flex items-center gap-2"><Dumbbell size={18} className="text-orange-500" /> Advanced</span>
            </div>
            <button className="flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/20">
              <PlayCircle size={24} /> Start Training
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <nav className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border ${
              activeCategory === cat 
              ? "bg-orange-500 border-orange-500 text-white" 
              : "bg-gray-900 border-gray-700 text-gray-400 hover:border-orange-500/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Workout Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorkouts.map((workout) => (
          <div 
            key={workout.id} 
            className="bg-gray-900 border border-orange-500/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-orange-900/10"
          >
            {/* Card Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={workout.image} 
                alt={workout.title} 
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-orange-400 border border-orange-500/30">
                {workout.category}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h4 className="text-xl font-bold mb-4 group-hover:text-orange-500 transition-colors">
                {workout.title}
              </h4>
              
              <div className="flex items-center justify-between text-gray-400 text-sm mb-6">
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="text-orange-500" /> {workout.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame size={16} className="text-orange-500" /> {workout.calories}
                </span>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-800 hover:bg-orange-600 text-white font-bold rounded-xl transition duration-300 group/btn">
                View Details
                <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Decorative Element (Consistent with your theme) */}
      <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
};

export default WorkoutPlan;