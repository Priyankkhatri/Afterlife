import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Layout = ({ children, onSanctuaryClick, isSanctuaryActive }) => {
  return (
    <div className="relative min-h-screen w-full bg-background text-text-muted overflow-hidden flex flex-col font-sans antialiased">
      {/* Ambient Atmospheric Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Sage Green glow top-left */}
        <div 
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.03]"
          style={{ backgroundColor: '#8CA596' }}
        />
        {/* Soft Apricot sunset glow middle-right */}
        <div 
          className="absolute top-[20%] -right-[15%] w-[45vw] h-[45vw] rounded-full blur-[140px] opacity-[0.03]"
          style={{ backgroundColor: '#E29A76' }}
        />
        {/* Dusty Blue glow bottom-right */}
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.03]"
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
        {/* Top Header Row with brand logo and Take a Break sanctuary toggle */}
        <header className="flex items-center justify-between w-full mb-8 font-sans border-b border-[#F0F0F0] pb-4 select-none">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 fill-primary/10" />
            </div>
            <span className="font-serif text-lg text-text-primary font-medium tracking-wide">Afterlife</span>
          </div>

          <button
            onClick={onSanctuaryClick}
            className="px-4 py-2 bg-white hover:bg-primary/5 text-[10px] uppercase tracking-widest font-semibold text-text-muted hover:text-text-primary border border-[#F0F0F0] hover:border-primary/20 rounded-full transition-all duration-300 shadow-sm cursor-pointer focus:outline-none"
          >
            Take a Break
          </button>
        </header>

        {children}
      </motion.div>
    </div>
  );
};
