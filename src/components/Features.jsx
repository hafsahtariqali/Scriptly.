"use client";

import React from 'react';
import {Wand, Paintbrush, Rocket} from 'lucide-react';
import { motion } from 'framer-motion';


const features = [
  {
    icon: <Wand size={30} color="#000" />,
    title: "AI Script Magic",
    description:
      "Tired of staring at a blank page? Let Scriptly's AI wizardry generate captivating scripts tailored to your channel's unique style and category. Say goodbye to writer's block and hello to effortless content creation.",
  },
  {
    icon: <Paintbrush size={30} color="#000" />,
    title: "Custom Templates",
    description:
      "Don't settle for generic scripts. With Scriptly's customizable templates, you can create content that perfectly reflects your brand's voice and tone. Easily tweak and refine your templates to ensure your scripts are always on point.",
  },
  {
    icon: <Rocket size={30} color="#000" />,
    title: "Time-Saving Automation",
    description:
      "Scriptly isn't just a script generator; it's your personal time-saving assistant. Automate repetitive tasks, schedule content releases, and streamline your workflow so you can focus on what matters most: growing your channel.",
  },
];

export const Features = () => {
  return (
    <div id='features' className="bg-hero-gradient text-white pb-20 flex items-center justify-center">
      <div className="container">
        <h2 className="text-center font-spartan font-bold text-5xl sm:text-6xl tracking-tighter py-[72px]">
          Features
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {features.map(({ icon, title, description }) => (
            <motion.div
              key={title}
              className="border border-[#f7a8a8] px-5 py-10 text-center rounded-xl sm:flex-1"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="inline-flex h-10 w-10 bg-[#f7a8a8] text-black justify-center items-center rounded-lg">
                {icon}
              </span>
              <h3 className="mt-6 font-bold text-lg">{title}</h3>
              <p className="mt-4 text-white/70">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};