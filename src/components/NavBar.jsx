"use client";
import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from "@clerk/nextjs";
import { getChannelData } from "@/app/models/setupModel";

const NavBar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const [editable, setEditable] = useState(false);
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  // Update scrolled state based on scroll position
  useEffect(() => {
    return scrollY.onChange((currentScroll) => {
      setScrolled(currentScroll > 10);
    });
  }, [scrollY]);

  // Fetch channel data when the user is signed in and update editable state
  useEffect(() => {
    const fetchChannelData = async () => {
      if (userEmail) {
        try {
          console.log("Fetching channel data for:", userEmail);
          const channelData = await getChannelData(userEmail);
          console.log("Fetched channel data:", channelData);
          setEditable(channelData?.channelName !== '');
        } catch (error) {
          console.error("Error fetching channel data:", error);
        }
      } else {
        console.log("User email is not available.");
      }
    };

    fetchChannelData();
  }, [userEmail]); // Use `userEmail` to avoid unnecessary fetches when user state changes.

  // Classes for the navbar background styling
  const defaultClasses = "transition-all absolute inset-0 -z-1 backdrop-blur-lg";
  // Adding gradient when at the top and a transparent look when scrolled down
  let navBarClasses = scrolled
    ? `${defaultClasses} bg-transparent border-b border-white/10`
    : `${defaultClasses} bg-black`;

  return (
    <div className="sticky inset-x-0 top-0 w-full z-30">
      <div className={navBarClasses}></div>
      <div className="mx-auto w-full max-w-screen-xl px-3.5 lg:px-20 relative">
        <div className="flex items-center justify-between py-4">
          <div>
            <a href="/" className="text-2xl font-extrabold text-[#FFFF] font-poppins">
              scriptly.
            </a>
          </div>
          <nav className="hidden md:block">
            <SignedOut>
              <ul className="flex flex-row space-x-6 p-3 text-[#f7a8a8]">
                <li>
                  <a href="/#features" className="hover:text-gray-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/#manual" className="hover:text-gray-400">
                    Manual
                  </a>
                </li>
                <li>
                  <a href="/#whyus" className="hover:text-gray-400">
                    Why Us
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="hover:text-gray-400">
                    Contact
                  </a>
                </li>
              </ul>
            </SignedOut>
          </nav>
          <div className="hidden md:block">
            <SignedOut>
              <a href="/sign-in">
                <button className="font-spartan bg-[#FFFF] font-roboto px-4 py-2 rounded-md text-[#630404] cursor-pointer font-bold">
                  Get Started
                </button>
              </a>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-row gap-5">
                <button className="text-white">
                  <a href="/setup">Setup</a>
                </button>
                {editable && (
                  <button className="text-white">
                    <a href="/dashboard">Dashboard</a>
                  </button>
                )}
                <UserButton />
              </div>
            </SignedIn>
          </div>
          <MobileMenu />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
