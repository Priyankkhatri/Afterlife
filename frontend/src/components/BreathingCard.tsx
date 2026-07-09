import React, { useState, useEffect } from 'react';
import { Compass, X } from 'lucide-react';
import { motion as m, AnimatePresence as Ap } from 'framer-motion';
import { Card } from './ui/Card';

const quotes = [
  "Take all the time you need. There is no timeline for grief.",
  "You do not have to carry everything today. Step by step is enough.",
  "Your well-being is the only priority. The paperwork can wait.",
  "Breathing in, I calm my body. Breathing out, I release administrative strain."
];

type BreathPhase = 'Inhale' | 'Hold' | 'Exhale' | 'Rest';

export const BreathingCard: React.FC = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [isExercising, setIsExercising] = useState(false);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('Inhale');

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    if (!isExercising) return;
    
    let timer: any;
    const cycle = () => {
      setBreathPhase('Inhale');
      timer = setTimeout(() => {
        setBreathPhase('Hold');
        timer = setTimeout(() => {
          setBreathPhase('Exhale');
          timer = setTimeout(() => {
            setBreathPhase('Rest');
            timer = setTimeout(cycle, 4000);
          }, 4000);
        }, 4000);
      }, 4000);
    };

    cycle();

    return () => clearTimeout(timer);
  }, [isExercising]);

  return (
    <Card className="relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-shadow duration-300 select-none h-full">
      {/* Decorative Warm Ambient Backglow */}
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-accent-warm/5 blur-xl pointer-events-none" />

      <Ap mode="wait">
        {!isExercising ? (
          <m.div
            key="quote-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-between flex-1"
          >
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-full bg-accent-warm/10 text-accent-warm w-fit">
                <Compass className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="min-h-[70px]">
                <h3 className="font-serif text-lg text-text-primary italic mb-1.5 leading-snug">
                  "{quotes[quoteIdx]}"
                </h3>
                <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold font-sans">Empathetic Compass</p>
              </div>
            </div>

            <button
              onClick={() => setIsExercising(true)}
              className="mt-6 flex items-center justify-between text-left p-3.5 rounded-2xl bg-background hover:bg-accent-warm/5 border border-border-light hover:border-accent-warm/20 transition-all duration-300 group cursor-pointer focus:outline-none focus-ring"
            >
              <span className="text-xs font-semibold text-text-primary font-sans">Breathe with Me</span>
              <span className="text-[10px] text-accent-warm uppercase tracking-widest font-semibold group-hover:translate-x-0.5 transition-transform">Start Box Breathing →</span>
            </button>
          </m.div>
        ) : (
          <m.div
            key="breathing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center flex-1 py-2 text-center"
          >
            <button
              onClick={() => setIsExercising(false)}
              className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-text-primary rounded-full hover:bg-background transition-colors cursor-pointer focus:outline-none focus-ring"
              aria-label="Stop breathing exercise"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Breathing Bubble */}
            <div className="relative w-28 h-28 flex items-center justify-center mb-4">
              <m.div
                animate={{
                  scale: breathPhase === 'Inhale' || breathPhase === 'Hold' ? 1.4 : 1.0
                }}
                transition={{ duration: 4.0, ease: 'easeInOut' }}
                className="absolute w-20 h-20 rounded-full bg-accent-warm/15 border border-accent-warm/20"
              />
              <m.div
                animate={{
                  scale: breathPhase === 'Inhale' || breathPhase === 'Hold' ? 1.2 : 1.0
                }}
                transition={{ duration: 4.0, ease: 'easeInOut' }}
                className="absolute w-16 h-16 rounded-full bg-accent-warm/10"
              />
              
              <span className="text-xs font-semibold text-accent-warm font-sans z-10 drop-shadow-sm uppercase tracking-wider animate-pulse">
                {breathPhase}
              </span>
            </div>

            <p className="text-[11px] text-text-muted font-sans font-light">
              {breathPhase === 'Inhale' && 'Slowly take in air...'}
              {breathPhase === 'Hold' && 'Gently hold your breath...'}
              {breathPhase === 'Exhale' && 'Release the air slowly...'}
              {breathPhase === 'Rest' && 'Quietly pause and rest...'}
            </p>
          </m.div>
        )}
      </Ap>
    </Card>
  );
};
