import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';

interface SanctuaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SanctuaryModal: React.FC<SanctuaryModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-background/90 dark:bg-black/90 backdrop-blur-xl p-8 text-center select-none"
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
              className="absolute w-56 h-56 rounded-full bg-[#E29A76]"
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
              className="absolute w-44 h-44 rounded-full bg-[#E29A76]"
            />
            
            {/* Innermost soft node */}
            <div className="w-24 h-24 rounded-full bg-surface shadow-antigravity flex items-center justify-center z-10 border border-border-light">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-accent-warm font-sans">Breathe</span>
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
          <Button
            onClick={onClose}
            variant="outline"
            className="z-10 px-8 py-3"
          >
            I'm ready to return
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
