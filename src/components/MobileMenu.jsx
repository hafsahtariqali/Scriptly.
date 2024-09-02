import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/nextjs';

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
    title: "Get Started",
    url: "/sign-in",
  },
];

const MobileMenu = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk(); 
  const [editable, setEditable] = useState(false)


  const handleLinkClick = () => {
    setNavOpen(false); // Close the menu when a nav link is clicked
  };

  // Fetch channel data when the user is signed in and update editable state
  useEffect(() => {
    const fetchChannelData = async () => {
      if (user?.email) {
        try {
          const channelData = await getChannelData(user.email);
          // Set editable to true if channelName is not empty, otherwise false
          setEditable(channelData?.channelName !== '');
        } catch (error) {
          console.error("Error fetching channel data:", error);
        }
      }
    };

    fetchChannelData();
  }, [user]);

  return (
    <div className="block md:hidden">
      <SignedOut>
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
      </SignedOut>
      <SignedIn>
              <div className="flex flex-row gap-5">
                <button className="text-white">
                  <a href="/setup">Setup</a>
                </button>
                {editable && (<button className="text-white">
                  <a href="/dashboard">Dashboard</a>
                </button>)}
                <UserButton />
              </div>
            </SignedIn>

    </div>
  );
};

export default MobileMenu;
