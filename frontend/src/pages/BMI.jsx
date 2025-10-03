import React from 'react'

function BMI() {
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [bmi, setBmi] = React.useState(null);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
    };

  return (
     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6 text-orange-500">BMI CALCULATOR</h1>
        <nav className="text-sm text-gray-400 mb-6">
          <a href="#" className="hover:text-orange-500">Home</a> &gt; 
          <a href="#" className="hover:text-orange-500">Pages</a> &gt; 
          <span className="text-orange-500">BMI Calculator</span>
        </nav>
        <div className="flex justify-center mb-6">
          <img src="https://via.placeholder.com/300x100" alt="Workout Image" className="opacity-50" />
        </div>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-2 bg-gray-700 rounded text-white"
          />
          <button
            onClick={calculateBMI}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded"
          >
            Calculate BMI
          </button>
          {bmi && (
            <p className="text-center mt-4">Your BMI is: <span className="font-bold">{bmi}</span></p>
          )}
        </div>
      </div>
    </div>

      
    
  )
}

export default BMI
