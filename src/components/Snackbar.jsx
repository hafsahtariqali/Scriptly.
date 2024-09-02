// components/Snackbar.js
import React, { useEffect } from 'react';

const Snackbar = ({ message, open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Adjust duration as needed
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg flex items-center justify-between">
      <span>{message}</span>
      <button
        className="ml-4 text-xl focus:outline-none"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
