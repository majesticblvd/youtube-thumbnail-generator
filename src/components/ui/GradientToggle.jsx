import { useState } from 'react';
import { motion } from 'framer-motion';

const GradientCheckbox = function GradientCheckbox({ isGradientSelected, setIsGradientSelected }) {
  const handleCheckboxChange = () => {
    setIsGradientSelected(!isGradientSelected);
  };

  return (
    <motion.label
      layout
      className="flex items-center cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <input
        type="checkbox"
        checked={isGradientSelected}
        onChange={handleCheckboxChange}
        className="hidden"
      />
      <motion.span
        layout
        className={`h-6 w-6 rounded-md border-2 ${
          isGradientSelected ? 'border-green-500 bg-green-500' : 'border-gray-300'
        } flex items-center justify-center transition-colors duration-300 ease-in-out`}
      >
        {isGradientSelected && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </motion.svg>
        )}
      </motion.span>
      <span className="ml-2 text-sm font-medium">
        {isGradientSelected ? 'Active' : 'Off'}
      </span>
    </motion.label>
  );
};

export default GradientCheckbox;