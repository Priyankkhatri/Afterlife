import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  animateHover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  animateHover = false,
  ...props
}) => {
  return (
    <motion.div
      whileHover={animateHover ? { y: -2, scale: 1.005 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`bg-surface rounded-3xl p-8 border border-border-light shadow-antigravity transition-shadow duration-300 ${
        animateHover ? 'hover:shadow-antigravity-hover' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
