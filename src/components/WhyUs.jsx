"use client"
import { motion } from "framer-motion";
import React from "react";

const WhyUs = () => {
  return (
    <section id='whyus' className="bg-hero-gradient text-white pb-20 flex items-center justify-center py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-spartan font-bold text-4xl sm:text-5xl md:text-6xl tracking-tighter py-10 sm:py-16">
          Why <span className="text-[#FF0000]">Scriptly?</span>
        </h2>
        <div className="flex flex-col items-center justify-center sm:flex-row">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-8 max-w-4xl w-full">
          {/* Left Card */}
          <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
          <div className="bg-white text-black p-8 rounded-lg flex-1 flex flex-col justify-between h-auto w-[340px] sm:h-[330px] sm:mt-[100px]">
            <div>
              <h3 className="text-xl sm:text-2xl font-spartan text-center font-bold mb-6">
                Other Script Generators
              </h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>Limited customization options for script tone</li>
                <li>Limited support for languages beyond English</li>
                <li>No insights into viral content</li>
                <li>No guidance for monetizing content</li>
                <li>No real-time analytics</li>
              </ul>
            </div>
          </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="bg-transparent border border-white/30 p-8 sm:p-10 text-white rounded-lg flex-[1.2] flex flex-col justify-between h-auto sm:h-[600px]"
            >
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl text-center text-[#FF0000] tracking-tighter font-spartan font-extrabold mb-6 sm:mb-14">
                Scriptly.
              </h3>
              <ul className="space-y-4 sm:space-y-8 md:space-y-6 text-md sm:text-base">
                <li>Advanced AI-powered personalization to match channel's voice</li>
                <li>Multilingual script generation for global usage</li>
                <li>AI-driven trending topic suggestions</li>
                <li>Offers built-in monetization tips and ideas to maximize revenue</li>
                <li>Provides real-time analytics and AI-powered feedback on potential drop-off points</li>
                <li>Repurposes scripts for multiple platforms such as TikTok, Instagram Reels, and podcasts, maximizing content reach</li>
              </ul>
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
