// src/components/PersonalInfoForm.jsx
import React, { useState } from 'react';

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    country: '',
    height: '',
    weight: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    // Simulate API call
    setTimeout(() => {
      console.log('Saved profile data:', formData);
      setIsSaving(false);
      setSaveMessage('Profile updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Personal Information</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* First Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 py-3 px-1 focus:outline-none focus:border-red-600 text-lg"
            required
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 py-3 px-1 focus:outline-none focus:border-red-600 text-lg"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 bg-white focus:outline-none focus:border-red-600 text-lg"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 py-3 px-1 focus:outline-none focus:border-red-600 text-lg"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 bg-white focus:outline-none focus:border-red-600 text-lg"
            required
          >
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        {/* Height & Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-2 border-red-600 rounded-lg p-4">
            <label className="block text-gray-700 font-medium mb-2 text-center">Height (CM)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="0"
              className="w-full text-center text-2xl font-semibold outline-none bg-transparent"
              min="100"
              max="250"
            />
          </div>

          <div className="border-2 border-red-600 rounded-lg p-4">
            <label className="block text-gray-700 font-medium mb-2 text-center">Weight (KG)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="0"
              className="w-full text-center text-2xl font-semibold outline-none bg-transparent"
              min="30"
              max="300"
              step="0.1"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center mt-10">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold text-xl py-4 px-16 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            {isSaving ? 'Saving...' : 'SAVE'}
          </button>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="text-center mt-6 text-green-600 font-semibold text-xl">
            {saveMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;