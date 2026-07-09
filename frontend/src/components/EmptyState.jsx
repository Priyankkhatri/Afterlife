import React from 'react';
import { motion } from 'framer-motion';

export const EmptyState = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-[#F0F0F0] shadow-antigravity max-w-md mx-auto"
    >
      {/* Soft glowing circular icon container */}
      <div className="w-16 h-16 rounded-full bg-secondary/5 flex items-center justify-center text-secondary-hover mb-6 relative">
        <div className="absolute inset-0 rounded-full bg-secondary/5 animate-ping opacity-30" style={{ animationDuration: '4s' }} />
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>

      <h3 className="font-serif text-2xl text-text-primary mb-2.5">{title}</h3>
      <p className="font-sans text-xs text-text-muted font-light leading-relaxed max-w-xs">
        {description}
      </p>
    </motion.div>
  );
};
