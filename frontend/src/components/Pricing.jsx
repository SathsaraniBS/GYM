import React from 'react'

function Pricing() {

    const Pricing = [
        {
            imgUrl: "public/images/pricing.jpg",
            title: 'QUARTERLY',
            Pricing: '10000',
            length: 3,
        },

        {
            imgUrl: "public/images/pricing.jpg",
            title: 'HALF YEARLY',
            Pricing: '20000',
            length: 6,
        },

        {
            imgUrl: "public/images/pricing.jpg",
            title: 'YEARLY',
            Pricing: '40000',
            length: 12,
        },


    ]
        
    
  return (
    <select className='pricing'>
        <h1>FitTrack Fithess Plan</h1>

        <div className='cards' key={element.title}>
            <img src={element.imgUrl} alt={element.title} />
            <div className='title'>
                <h1>{element.title}</h1>
                <h1>PACKAGES</h1>
                <h3>Rs.{element.Pricing}</h3>
                <p>For{element.length} Months</p>
            </div>

            <div className='description'>

                <p>
                    <check/> Equlpment
                    
                </p>

                <p>
                    <check/> All Day Free Training
                </p>

                <p>
                    <check/> Free Restroom
                </p>

                <p>
                    <check/> 24/7 Skilled Suport
                </p>

                <p>
                    <check/> 20 days Pricing Options
                </p>
            </div>
                
            

        </div>
    </select>
      
    
  )
}

export default Pricing
