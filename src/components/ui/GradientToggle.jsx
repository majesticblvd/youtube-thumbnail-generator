import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const GradientSwitch = function GradientToggle({isGradientSelected, setIsGradientSelected}) {
    const [isOn, setIsOn] = useState(false);
    return (
      <motion.div 
        layout
        className={`h-10 relative w-24 mt-0 ${isGradientSelected ? 'bg-green-500' : 'bg-slate-500'} rounded-full p-1 flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out`} 
        data-darkmode={isOn}
        onClick={() => {
          setIsOn(!isOn);
          setIsGradientSelected(!isGradientSelected);
        }}
        style={{ justifyContent: isGradientSelected ? 'flex-end' : 'flex-start' }}
      >
        <motion.div layout className="h-7 w-7 rounded-full grid items-center justify-items-center bg-white overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              className={` bg-white text-slate-950 ${isGradientSelected ? 'on' : 'off'}`}
              key={isGradientSelected ? 'moon' : 'sun'}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }} 
              transition={{ duration: .2 }}
            >
              {isGradientSelected ? '✓' : 'X'}
            </motion.span>
          </AnimatePresence>
        </motion.div>
        {/* words to describe switch inside of it */}
        <motion.div layout className={`text-white absolute ${isGradientSelected ? 'left-3 ': 'right-3'} text-xs font-medium`}>
          {isGradientSelected ? 'Active' : 'Off'}
        </motion.div>
      </motion.div>
    )
  }

export default GradientSwitch;