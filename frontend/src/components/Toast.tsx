import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string | null;
  type?: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%', transition: { duration: 0.4 } }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="fixed bottom-24 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-surface border border-border-light shadow-antigravity select-none focus-ring"
          role="alert"
          aria-live="polite"
        >
          {/* Delicate variant icon */}
          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
            type === 'success' ? 'bg-primary/10 text-primary' :
            type === 'error' ? 'bg-red-500/10 text-red-500' :
            'bg-secondary/10 text-secondary-hover'
          }`}>
            {type === 'error' ? (
              <AlertTriangle className="w-3 h-3.5" />
            ) : (
              <Check className="w-3 h-3 stroke-[2.5]" />
            )}
          </div>
          <span className="font-sans text-xs text-text-primary font-medium tracking-wide">
            {message}
          </span>
          <button
            onClick={onClose}
            className="ml-2 text-text-muted hover:text-text-primary p-0.5 rounded-full hover:bg-background/50 transition-colors focus:outline-none cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
