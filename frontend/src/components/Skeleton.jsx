import React from 'react';
import { motion } from 'framer-motion';

export const Skeleton = ({ className = 'h-16 w-full' }) => {
  return (
    <motion.div
      animate={{
        opacity: [0.4, 0.8, 0.4],
        scale: [0.99, 1.01, 0.99]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={`bg-slate-100/60 rounded-2xl ${className}`}
    />
  );
};
