import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  {
    title: "Features",
    url: "/#features",
  },
  {
    title: "Manual",
    url: "/#manual",
  },
  {
    title: "Why Us",
    url: "/#whyus",
  },
  {
    title: "Contact",
    url: "/#contact",
  },
  {
    title: "Log In",
    url: "/sign-in",
  },
];

const MobileMenu = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleLinkClick = () => {
    setNavOpen(false); // Close the menu when a nav link is clicked
  };

  return (
    <div className="block md:hidden">
      {!navOpen ? (
        <button onClick={() => setNavOpen(true)} className="flex justify-center">
          <Menu size={29} color="#f7a8a8" />
        </button>
      ) : (
        <>
          <button onClick={() => setNavOpen(false)} className="flex justify-center">
            <X size={29} color="#f7a8a8" />
          </button>
          <div className="fixed top-20 left-0 w-full bg-transparent backdrop-blur-lg border-b border-t z-50 max-h-screen overflow-y-auto">
            <ul className="flex flex-col items-center py-8 space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    onClick={handleLinkClick} // Trigger the menu close on click
                    className="block text-[#f7a8a8] hover:text-gray-400 p-4"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileMenu;
