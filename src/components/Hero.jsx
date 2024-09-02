import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-[100vh] flex items-center justify-center bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full bg-manual-gradient"></div>
      </div>
      <div className="relative z-10 text-center">
        <h1 className="text-center text-white font-spartan font-bold text-5xl sm:text-6xl tracking-tighter">
          Tired of YouTube Burnout?<br></br>Let <span className='text-[#FF0000]'>Scriptly</span> Do the Heavy Lifting.
        </h1>
        <div className="flex justify-center">
        <p className="text-gray-200 text-lg md:text-xl mb-8 font-poppins max-w-[800px] ml-8 mr-8 mt-8">
          Say goodbye to endless scriptwriting sessions and hello to <span className='text-[#f7a8a8]'>effortless YouTube automation.</span> Let Scriptly's AI generate <span className='text-[#f7a8a8]'>custom scripts</span> for your YouTube channel. Focus on creating engaging videos <span className='text-[#f7a8a8]'>while Scriptly handles the rest.</span>
        </p>
        </div>
        <div className="flex justify-center space-x-4 mt-5">
          <a href='/dashboard'>
          <button className="bg-[#FF0000] text-white px-6 py-3 rounded-md text-lg hover:bg-[#630404] font-spartan font-bold">
            Start Scripting Now
          </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
