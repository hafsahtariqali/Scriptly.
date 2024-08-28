"use client";

import React from 'react';
import { User, TvMinimalPlay, ScrollText  } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <User size={30} color="#000" />,
    title: "Create Your Account",
    description:
      "Sign up on the Scriptly website, fill in your details, and verify your account to get started with creating scripts for your channel.",
  },
  {
    icon: <TvMinimalPlay size={30} color="#000" />,
    title: "Set Up Your Channel",
    description:
      "Log in to your Scriptly dashboard, add your YouTube channel details, and customize your script preferences to fit your content style.",
  },
  {
    icon: <ScrollText  size={30} color="#000" />,
    title: "Generate and Manage Scripts",
    description:
      "Select a topic, customize your script, and manage your scripts efficiently. Save, edit, and organize your scripts for seamless content creation.",
  },
];

const Manual = () => {
  return (
    <section id='manual' className="bg-manual-gradient text-white pb-20 flex items-center justify-center py-5">
      <div className="container">
        <h2 className="text-center font-spartan font-bold text-5xl sm:text-6xl tracking-tighter py-[80px]">
          Manual
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {steps.map(({ icon, title, description }) => (
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
    </section>
  );
};

export default Manual;
