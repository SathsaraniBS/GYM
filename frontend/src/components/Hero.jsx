function Hero() {
  return (
     <section className='hero bg-[url("/img3.jpg")] bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center'>

      <div className="content text-left text-white p-5 ">
        <div className="title mb-4  font-bold">
          <div className="font-size  font-bold mb-4">
          <h1>LET'S</h1>
          <h1>GET</h1>
          <h1>MOVING</h1>
          </div>
          <div className="text-2xl font-normal">
          <h2>Getting in shape isn't hard when you're in a supportive </h2>
          <h2>environment. Lifetime Fitness is more than just a gym - it's</h2>
          <h2>a caring family that's there to help you achieve your goals</h2>
          </div>

        </div>
        <div className="sub-title mb-8">
          <p className="mb-2">Your journey to fitness starts here</p>
          <p className="mb-2">BSS Creation</p>
        </div>

        <div className='mb-4 buttons flex justify-center gap-4 '>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"> Start Your Journey</button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Discover Your Plan</button>

        </div>

        

      </div>
      
    </section>
      
    
  )
}

export default Hero
