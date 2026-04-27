import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full"
        />
        
        {/* Inner pulsing logo */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30"
        >
          <span className="text-primary-foreground font-medium text-3xl leading-none">E</span>
        </motion.div>
      </div>
      
      {/* Loading text */}
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="mt-8 text-foreground/80 font-light tracking-[0.2em] uppercase text-sm"
      >
        Loading EaseLearn
      </motion.p>
    </div>
  );
};

export default Loading;