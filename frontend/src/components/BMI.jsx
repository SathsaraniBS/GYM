import React from 'react';

function BMI() {
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [bmi, setBmi] = React.useState(null);

  const calculateBMI = () => {
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    // Validate inputs
    if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) {
      setBmi('Invalid input');
      return;
    }

    const heightInMeters = heightValue / 100;
    const bmiValue = weightValue / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
  };

  return (
    <div className="bg-gray-100">
      <section className="min-h-screen relative bg-[url('https://via.placeholder.com/1920x1080')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="title mb-6 font-bold">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl leading-tight">
              BMI CALCULATOR
            </h1>
            <nav className="text-sm text-gray-400 mb-6">
              <a href="#" className="hover:text-orange-500">Home</a> &gt; 
              <a href="#" className="hover:text-orange-500">Pages</a> &gt; 
              <span className="text-orange-500">BMI Calculator</span>
            </nav>
          </div>
        </div>
      </section>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto p-4">
        <div className="w-full md:w-1/2">
          <h2 className="text-orange-500 text-lg font-bold mb-4">CHECK YOUR BODY</h2>
          <h1 className="text-3xl font-bold mb-6">BMI CALCULATOR CHART</h1>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2 border-b border-gray-700">BMI</th>
                <th className="p-2 border-b border-gray-700">WEIGHT STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-900">
                <td className="p-2 border-b border-gray-700">Below 18.5</td>
                <td className="p-2 border-b border-gray-700">Underweight</td>
              </tr>
              <tr className="hover:bg-gray-900">
                <td className="p-2 border-b border-gray-700">18.5 - 24.9</td>
                <td className="p-2 border-b border-gray-700">Healthy</td>
              </tr>
              <tr className="hover:bg-gray-900">
                <td className="p-2 border-b border-gray-700">25.0 - 29.9</td>
                <td className="p-2 border-b border-gray-700">Overweight</td>
              </tr>
              <tr className="hover:bg-gray-900">
                <td className="p-2 border-b border-gray-700">30.0 and Above</td>
                <td className="p-2 border-b border-gray-700">Obese</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-orange-500 text-lg font-bold mb-4">CHECK YOUR BODY</h2>
          <h1 className="text-3xl font-bold mb-6">CALCULATE YOUR BMI</h1>
          <p className="text-gray-400 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacinia vel facilisis.
          </p>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Height / cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="number"
              placeholder="Weight / kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <button
              onClick={calculateBMI}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded"
            >
              CALCULATE
            </button>
            {bmi && (
              <p className="text-center mt-4">Your BMI is: <span className="font-bold">{bmi}</span></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BMI;


