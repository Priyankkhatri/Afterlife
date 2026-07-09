import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center p-12 bg-surface rounded-3xl border border-border-light shadow-antigravity max-w-md mx-auto"
    >
      {/* Soft glowing circular icon container */}
      <div className="w-16 h-16 rounded-full bg-secondary/5 flex items-center justify-center text-secondary-hover mb-6 relative">
        <div className="absolute inset-0 rounded-full bg-secondary/5 animate-ping opacity-30" style={{ animationDuration: '4s' }} />
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>

      <h3 className="font-serif text-2xl text-text-primary mb-2.5">{title}</h3>
      <p className="font-sans text-xs text-text-muted font-light leading-relaxed max-w-xs mb-6">
        {description}
      </p>

      {action && (
        <div className="w-full flex justify-center">
          {action}
        </div>
      )}
    </motion.div>
  );
};
