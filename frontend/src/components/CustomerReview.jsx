import React from 'react'

function CustomerReview() {

    const reviews = [
  {
    name: 'Amila Prabhath',
    stars: 4,
    text: "Fitness is a huge thing in everybody's life. and everyone has to stay healthy. if you are looking to stay fit and healthy, this is the right place for you. I hit this gym daily at 5 in the morning and the trainer and instruments are just great. you can actually see your body coming into shape. And the trainer can help you get any kind of body you want."
  },
  {
    name: 'Dinith Athukorala',
    stars: 5,
    text: "Amazing staff and support. Very good crowd. Superb environment. Open almost 24*7"
  },
  {
    name: 'Chithmi Ranawaka',
    stars: 5,
    text: "One of the best fitness place I have ever been. Best place with amazing trainers.. Surportive, Friendly and knowledgeable guides ... Hoping to workout more with you all❤️ 💪"
  },
  {
    name: 'Esala Sumanasena',
    stars: 5,
    text: "Best place to go if you consider your fitness. The owner is well certified gym instructor. Custom made fitness schedule will be given for each member. Diet tips also given in order to achieve your fitness goal. Very friendly support instructors available including a lady fitness instructor. They will guide you and show you how to do technically correct work outs. There are lot of gym machines available. Car park also available in the rear. Fitness centre is open for 24 hrs (week days) as well."
  },
  {
    name: 'Shafraz Asnavi',
    stars: 5,
    text: "A fitness club with a vision, as I would like to call it. Maduranga, Fitness Chief, ensures that his clients are well trimmed and ready to lead a healthy life. Got a cheerful and helpful team to support on all aspects of fitness with thorough knowledge on the subject. Wanna look good, this is the place to be! Lets power up!"
  },
  {
    name: 'K Chinthaka',
    stars: 4,
    text: "Used this gym on a day membership (500 Rupees). staff are great. Helped me figuring out the treadmill. Even gave directions to the gym from my home. Gym has A/C and a good vibe. The only minor issue is that treadmills have a time limit of 20 minutes. Although, I can understand the need for it, especially during peak times."
  }
];

   

  return (
    <section className="customer-reviews">
      <h1>CUSTOMER REVIEWS</h1>
      <div className="review-container">
        
            {
                reviews.map((review, index) => (
                    <div key={index} className="review-book">
                        <h3>{review.name}</h3>
                        <p>{review.message}</p>
                    </div>
                ))
            }
        </div>
      
      
    </section>
  )
}

export default CustomerReview
