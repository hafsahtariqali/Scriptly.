import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center p-4 text-white text-sm font-spartan border-t bg-black backdrop-blur-xl">
       &copy; {new Date().getFullYear()} Scriptly. All rights reserved.
    </footer>
  );
};

export default Footer;