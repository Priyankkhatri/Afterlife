import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('button') || 
        target.closest('a') || 
        window.getComputedStyle(target).cursor === 'pointer';
        
      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot - tracks mouse immediately */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#8CA596] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Outer Ring - tracks with a spring delay */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: hovered ? 44 : 28,
          height: hovered ? 44 : 28,
          borderWidth: hovered ? '0px' : '1px',
          borderColor: 'rgba(166, 180, 196, 0.5)',
          backgroundColor: hovered ? 'rgba(140, 165, 150, 0.08)' : 'transparent',
        }}
      />
    </>
  );
};
