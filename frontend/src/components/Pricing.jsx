import React from 'react'
import {Check} from 'lucide-react'
import { Link } from 'react-router-dom' 



function Pricing() {
    const pricing = [
        {
            imgUrl:"/pricing.jpg",
            title:"QUARTERLY",
            price: 18000,
            lenth: 3
        },
        {
            imgUrl:"/pricing.jpg",
            title:"HEAF_YEARLY",
            price: 34000,
            lenth: 6
        },
        {
            imgUrl:"/pricing.jpg",
            title:"YEARLY",
            price: 67000,
            lenth: 12
        },
    ]
  return (
    <section className='pricing'>
        <h1>BLACK TIGER FITNESS PLANS</h1>
        <div className="wrapper">
            {
                pricing.map(element=>{
                    return(
                        <div className="card" key={element.title}>
                            <img src={element.imgUrl} alt={element.title} />
                            <div className="title">
                                <h1>{element.title}</h1>
                                <h1>PACKAGE</h1>
                                <h3>Rs {element.price}</h3>
                                <p>For {element.lenth} Months</p>
                            </div>
                            <div className="description">
                                <p>
                                    <Check /> Equipment                         

                                </p>
                                <p>
                                    <Check /> All Day Free Training                        

                                </p>
                                <p>
                                    <Check /> Free Restroom                      

                                </p>
                                <p>
                                    <Check /> 24/7 Skilled Support                       

                                </p>

                                <p>
                                    <Check /> 20 Days Freezing Opetion                       

                                </p>
                                <Link to={"/"}>Join Now</Link>
                            </div>

                        </div>
                    )

                })

            }
        </div>
      
    </section>
  )
}

export default Pricing;