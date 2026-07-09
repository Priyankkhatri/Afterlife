import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SanctuaryModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl p-8 text-center select-none"
        >
          {/* Centered breathing circle animation */}
          <div className="relative flex items-center justify-center mb-10 w-64 h-64">
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.08, 0.16, 0.08],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-56 h-56 rounded-full bg-[#8CA596]"
            />
            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute w-44 h-44 rounded-full bg-[#8CA596]"
            />
            
            {/* Innermost soft node */}
            <div className="w-24 h-24 rounded-full bg-white shadow-antigravity flex items-center justify-center z-10 border border-[#F0F0F0]">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-primary font-sans">Breathe</span>
            </div>
          </div>

          {/* Empathic Serif Message */}
          <div className="max-w-md flex flex-col gap-4 mb-16 z-10">
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary leading-snug">
              Take all the time you need.
            </h2>
            <p className="font-sans text-xs text-text-muted font-light leading-relaxed">
              We have saved your progress safely. Administrative work can wait. Please take a moment to rest and step away.
            </p>
          </div>

          {/* Return Trigger */}
          <button
            onClick={onClose}
            className="z-10 px-8 py-3 bg-white hover:bg-primary/5 text-xs font-semibold text-text-primary border border-[#F0F0F0] hover:border-primary/20 rounded-full shadow-sm hover:shadow-antigravity transition-all duration-300 cursor-pointer focus:outline-none"
          >
            I'm ready to return
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
