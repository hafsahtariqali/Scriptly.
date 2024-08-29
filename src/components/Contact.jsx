'use client';
import React from 'react';
import { Github } from 'lucide-react';

const Contact = () => {
  const handleEmailClick = () => {
    window.location.href = 'mailto:optigenai@gmail.com';
  };

  return (
    <section id="contact" className="bg-manual-gradient text-white pb-12 flex items-center justify-center py-6">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-center font-spartan font-bold text-5xl sm:text-6xl tracking-tighter py-[90px]">Are you tired of spending hours crafting scripts? Let <span className="text-[#FF0000]">Scriptly</span> do the work for you.</h3>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleEmailClick}
            className="bg-[#FF0000] text-white px-6 py-3 rounded-md text-lg hover:bg-[#630404] font-spartan font-bold"
          >
            Contact Us
          </button>
        </div>
        <div className="mt-16 flex items-center justify-center">
          <a
            href="https://github.com/hafsahtariqali/Scriptly..git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-2xl hover:text-gray-400 transition duration-300"
          >
            <Github size={20}/>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
