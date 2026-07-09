import React from 'react';
import { FadeIn } from './MotionWrappers';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-background text-text-muted overflow-hidden flex flex-col font-sans antialiased">
      {/* Ambient Atmospheric Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Sage Green glow top-left */}
        <div 
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.03]"
          style={{ backgroundColor: '#8CA596' }}
        />
        {/* Dusty Blue glow bottom-right */}
        <div 
          className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-[0.03]"
          style={{ backgroundColor: '#A6B4C4' }}
        />
      </div>

      {/* Main App Container */}
      <FadeIn className="relative z-10 flex-1 flex flex-col w-full max-w-6xl mx-auto px-6 py-8 md:py-12">
        {children}
      </FadeIn>
    </div>
  );
};
