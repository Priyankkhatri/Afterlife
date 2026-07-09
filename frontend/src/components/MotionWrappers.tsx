import React from 'react';
import { motion } from 'framer-motion';

interface MotionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FadeIn: React.FC<MotionWrapperProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FloatUp: React.FC<MotionWrapperProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20, // High damping for a smooth, low-bounce, feather-like float
        mass: 1,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
