import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%', transition: { duration: 0.4 } }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-24 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-[#F0F0F0] shadow-antigravity select-none"
        >
          {/* Delicate Sage check icon */}
          <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="font-sans text-xs text-text-primary font-medium tracking-wide">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
