import React from 'react'
import React, { useState } from 'react'
import { toast } from 'react-toastify';


function BMICalculater() {

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState("");

  const calculateBMI = (e) => {
    const heightInMeters = height / 100;
    const bmiVlue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiVlue);

    if (bmiVlue < 18.5) {
      toast.warning("Underweight");
    } else if (bmiVlue >= 18.5 && bmiVlue < 24.9) {
      toast.success("Healthy");
    } else if (bmiVlue >= 25 && bmiVlue < 29.9) {
      toast.warning("Overweight");
    } else {
      toast.error("Obese");
    }
  };
  return (
    <div>
      
    </div>
  )
}

export default BMICalculater
