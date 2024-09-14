'use client'
import React, { useState } from 'react';

const MultiInput = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  // Handles input field changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handles Enter key to add a new tag
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault(); // Prevents form submission when Enter is pressed
      const trimmedValue = inputValue.trim();

      // Add new tag if it's not already present
      if (!value.includes(trimmedValue)) {
        onChange([...value, trimmedValue]);
      }

      setInputValue(''); // Reset input field
    }
  };

  // Handles removal of tags
  const handleTagRemove = (tagToRemove) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {value.map((tag) => (
          <span
            key={tag}
            className="bg-red-600 text-white px-3 py-1 rounded-full flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => handleTagRemove(tag)}
              className="ml-2 text-white"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Press Enter to add a format"
        className="bg-black border border-white rounded py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
        required
      />
    </div>
  );
};

export default MultiInput;
