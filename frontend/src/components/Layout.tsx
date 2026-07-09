import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sun, Moon } from 'lucide-react';
import { SoundscapePlayer } from './SoundscapePlayer';

interface LayoutProps {
  children: React.ReactNode;
  onSanctuaryClick: () => void;
  isSanctuaryActive: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, onSanctuaryClick, isSanctuaryActive }) => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from system preference or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-text-muted overflow-hidden flex flex-col font-sans antialiased transition-colors duration-300">
      {/* Dynamic Ambient Atmospheric Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Sage Green glow top-left - slow breathing float */}
        <motion.div 
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-[0.03] dark:opacity-[0.02]"
          style={{ backgroundColor: '#8CA596' }}
        />
        {/* Soft Apricot sunset glow middle-right - detuned float */}
        <motion.div 
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.93, 1.07, 1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] -right-[15%] w-[45vw] h-[45vw] rounded-full blur-[160px] opacity-[0.04] dark:opacity-[0.03]"
          style={{ backgroundColor: '#E29A76' }}
        />
        {/* Dusty Blue glow bottom-right - detuned float */}
        <motion.div 
          animate={{
            x: [0, 20, -30, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.04, 0.96, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-[0.03] dark:opacity-[0.02]"
          style={{ backgroundColor: '#A6B4C4' }}
        />
      </div>

      {/* Main App Container with Sanctuary scaling */}
      <motion.div
        animate={{
          scale: isSanctuaryActive ? 0.98 : 1,
          filter: isSanctuaryActive ? 'blur(6px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="relative z-10 flex-1 flex flex-col w-full max-w-6xl mx-auto px-6 py-6 md:py-8"
      >
        {/* Top Header Row with brand logo, soundscape player, dark mode toggle, and Take a Break sanctuary toggle */}
        <header className="flex items-center justify-between w-full mb-8 font-sans border-b border-border-light pb-4 select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-accent-warm/10 text-accent-warm flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 fill-accent-warm/10" />
            </div>
            <span className="font-serif text-lg text-text-primary font-medium tracking-wide">Afterlife</span>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <SoundscapePlayer />
            
            {/* Dark mode manual switcher toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full bg-surface border border-border-light hover:border-primary/20 flex items-center justify-center text-text-muted hover:text-text-primary transition-all duration-300 shadow-sm cursor-pointer focus:outline-none focus-ring"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-accent-warm" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onSanctuaryClick}
              className="px-4 py-2 bg-surface hover:bg-primary/5 text-[10px] uppercase tracking-widest font-semibold text-text-muted hover:text-text-primary border border-border-light hover:border-primary/20 rounded-full transition-all duration-300 shadow-sm cursor-pointer focus:outline-none focus-ring"
            >
              Take a Break
            </button>
          </div>
        </header>

        {children}
      </motion.div>
    </div>
  );
};
