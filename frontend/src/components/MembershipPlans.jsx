import React from 'react'

function MembershipPlans() {
    const plans = [
    {
      title: '2 Year Membership - Couples',
      signupFee: '₨1,000.00 Signup Fee',
      fullCost: '₨230,000.00',
      highlight: true,
    },
    {
      title: 'Annual Membership',
      description: 'Access hours for Colombo.\n4 x per month access at Kandy location',
      signupFee: '₨1,000.00 Signup Fee',
      fullCost: '₨250,000.00',
      highlight: false,
    },
    {
      title: '6 Month Membership',
      description: 'Access hours for Colombo.\n4 x per month access at Kandy location',
      signupFee: '₨1,000.00 Signup Fee',
      fullCost: '₨150,000.00',
      highlight: false,
    },
    {
      title: 'Annual Membership - Couples',
      signupFee: '₨1,000.00 Signup Fee',
      fullCost: '₨144,000.00',
      highlight: true,
    },
  ];
  return (
    
    <div>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
          Choose a Membership
        </h1>
    </div>
    </div>
  )

}

export default MembershipPlans
