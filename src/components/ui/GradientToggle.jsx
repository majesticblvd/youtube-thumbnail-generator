import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GradientRadioButtons = function GradientRadioButtons({ isGradientSelected, setIsGradientSelected }) {
  const [selectedOption, setSelectedOption] = useState(isGradientSelected ? 'active' : 'off');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsGradientSelected(option === 'active');
  };

  return (
    <motion.div layout className="flex items-center space-x-4">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          value="active"
          checked={selectedOption === 'active'}
          onChange={() => handleOptionChange('active')}
          className="hidden"
        />
        <motion.span
          layout
          className={`h-6 w-6 rounded-full border-2 ${
            selectedOption === 'active' ? 'border-green-500 bg-green-500' : 'border-gray-300'
          } flex items-center justify-center transition-colors duration-300 ease-in-out`}
        >
          {selectedOption === 'active' && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="h-3 w-3 rounded-full bg-white"
            />
          )}
        </motion.span>
        <span className="ml-2 text-sm font-medium">Active</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          value="off"
          checked={selectedOption === 'off'}
          onChange={() => handleOptionChange('off')}
          className="hidden"
        />
        <motion.span
          layout
          className={`h-6 w-6 rounded-full border-2 ${
            selectedOption === 'off' ? 'border-slate-500 bg-slate-500' : 'border-gray-300'
          } flex items-center justify-center transition-colors duration-300 ease-in-out`}
        >
          {selectedOption === 'off' && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="h-3 w-3 rounded-full bg-white"
            />
          )}
        </motion.span>
        <span className="ml-2 text-sm font-medium">Off</span>
      </label>
    </motion.div>
  );
};

export default GradientRadioButtons;