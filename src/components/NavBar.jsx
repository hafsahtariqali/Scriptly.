"use client"
import { useState } from "react";
import React from "react";
import { useScroll } from "framer-motion";
import MobileMenu from './MobileMenu'

const NavBar =  () => {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false);
  const [user] = useState(null); 

  const defaultClasses = "transition-all absolute inset-0 -z-1";

  let navBarClasses = scrolled ? `${defaultClasses} border-b border-black/10 bg-black backdrop-blur-lg` : `${defaultClasses} bg-black`;

  return <div className="sticky inset-x-0 top-0 w-full z-30">
    <div className={navBarClasses}></div>
      <div className="mx-auto w-full max-w-screen-xl px-3.5 lg:px-20 relative">
      <div className="flex items-center justify-between py-4">
        <div>
          <a href="/" className="text-2xl font-extrabold text-[#FFFF] font-poppins"> 
            scriptly.
          </a>
        </div>
        <nav className="hidden md:block">
          <ul className="flex flex-row space-x-6 p-3 block text-[#FFFF]">
            <li>
              <a href="/#features" className="hover:text-gray-400">Features</a>
            </li>
            <li>
              <a href="/#manual" className="hover:text-gray-400">Manual</a>
            </li>
            <li>
              <a href="/#whyus" className="hover:text-gray-400">Why Us</a>
            </li>
            <li>
              <a href="/#contact" className="hover:text-gray-400">Contact</a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-gray-400">Dashboard</a>
            </li>
            <li>
              <a href="/setup" className="hover:text-gray-400">Setup</a>
            </li>
          </ul>
        </nav>
        <div className="hidden md:block">
            {user ? (
              <button
                className="font-spartan bg-[#FFFF] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer font-bold"
              >
                Log Out
              </button>
            ) : (
              <a
                href="/sign-in"
                className="font-spartan bg-[#FFFF] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer font-bold"
              >
                Log In
              </a>
            )}
          </div>
        <MobileMenu />
      </div>
      </div>
    </div>
}

export default NavBar;
