import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

function Pricing() {
  const pricing = [
    {
      imgUrl: "/pricing.jpg",
      title: "QUARTERLY",
      price: 18000,
      lenth: 3 // Note: typo in 'length', keeping as is for consistency
    },
    {
      imgUrl: "/pricing.jpg",
      title: "HALF_YEARLY",
      price: 34000,
      lenth: 6
    },
    {
      imgUrl: "/pricing.jpg",
      title: "YEARLY",
      price: 67000,
      lenth: 12
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        BLACK TIGER FITNESS PLANS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {pricing.map((element) => (
          <div
            key={element.title}
            className="bg-white border border-gray-300 rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition duration-300"
          >
            <img
              src={element.imgUrl}
              alt={element.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{element.title}</h1>
              <h1 className="text-xl font-semibold text-gray-800">PACKAGE</h1>
              <h3 className="text-lg font-bold text-blue-500">Rs {element.price}</h3>
              <p className="text-gray-600">For {element.lenth} Months</p>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <p className="flex items-center gap-2 text-gray-600">
                <Check className="h-5 w-5 text-blue-500" /> Equipment
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Check className="h-5 w-5 text-blue-500" /> All Day Free Training
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Check className="h-5 w-5 text-blue-500" /> Free Restroom
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Check className="h-5 w-5 text-blue-500" /> 24/7 Skilled Support
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Check className="h-5 w-5 text-blue-500" /> 20 Days Freezing Option
              </p>
            </div>
            <Link
              to="/"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Join Now
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;