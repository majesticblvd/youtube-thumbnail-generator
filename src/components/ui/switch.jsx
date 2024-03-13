import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const Switch = function DevSwitch({setDevActive, devActive}) {
    const [isOn, setIsOn] = useState(false);
    return (
      <motion.div 
        layout
        className={`h-10 relative w-24 mt-4 ${devActive ? 'bg-green-500' : 'bg-slate-500'} rounded-full p-1 flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out`} 
        data-darkmode={isOn}
        onClick={() => {
          setIsOn(!isOn);
          setDevActive(!devActive);
        }}
        style={{ justifyContent: devActive ? 'flex-end' : 'flex-start' }}
      >
        <motion.div layout className="h-7 w-7 rounded-full grid items-center justify-items-center bg-white overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              className={` bg-white text-slate-950 ${devActive ? 'on' : 'off'}`}
              key={devActive ? 'moon' : 'sun'}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }} 
              transition={{ duration: .2 }}
            >
              {devActive ? '✓' : 'X'}
            </motion.span>
          </AnimatePresence>
        </motion.div>
        {/* words to describe switch inside of it */}
        <motion.div layout className="text-white absolute right-3 text-xs font-medium">
          {devActive ? '' : 'Adjust'}
        </motion.div>
      </motion.div>
    )
  }

export default Switch;