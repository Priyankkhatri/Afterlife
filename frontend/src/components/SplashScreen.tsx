import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-background select-none"
    >
      <div className="relative flex items-center justify-center w-64 h-64 mb-8">
        {/* Deep background glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.15, 0.95, 1.05],
            opacity: [0, 0.14, 0.08, 0.12],
          }}
          transition={{
            duration: 2.4,
            ease: "easeInOut",
          }}
          className="absolute w-56 h-56 rounded-full bg-accent-warm blur-2xl"
        />
        {/* Soft breathing ring */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: [0.6, 1.1, 0.98, 1],
            opacity: [0, 0.25, 0.15, 0.2],
          }}
          transition={{
            duration: 2.2,
            ease: "easeInOut",
            delay: 0.1,
          }}
          className="absolute w-44 h-44 rounded-full border border-accent-warm/30 bg-accent-warm/5"
        />
        {/* Inner core node */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 15,
            delay: 0.3,
          }}
          className="w-20 h-20 rounded-full bg-surface shadow-antigravity border border-border-light flex items-center justify-center z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-3.5 h-3.5 rounded-full bg-accent-warm"
          />
        </motion.div>
      </div>

      <div className="text-center max-w-sm flex flex-col gap-3 px-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl md:text-5xl text-text-primary tracking-wide"
        >
          Afterlife
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-sans text-xs text-text-muted font-light leading-relaxed tracking-wide"
        >
          Your gentle administrative copilot.
        </motion.p>
      </div>
    </motion.div>
  );
};
