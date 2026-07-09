import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const SoundscapePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<{ osc: OscillatorNode; oscGain: GainNode }[]>([]);

  useEffect(() => {
    return () => {
      // Clean stop on unmount without triggering state sets on unmounted component
      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        oscillatorsRef.current.forEach(({ osc }) => {
          try {
            osc.stop();
          } catch {
            // Quiet catch
          }
        });
        if (ctx.state !== 'closed') {
          ctx.close();
        }
      }
    };
  }, []);

  const startSound = async () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3.0); // 3 seconds attack
      masterGainRef.current = masterGain;

      // Soothing C-Major 9 chord frequencies (C3, G3, B3, D4, E4)
      const frequencies = [130.81, 196.00, 246.94, 293.66, 329.63];
      const oscillators: { osc: OscillatorNode; oscGain: GainNode }[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime((idx % 2 === 0 ? -6 : 6), ctx.currentTime);

        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.2, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        oscillators.push({ osc, oscGain });

        const modulate = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const cycleTime = 6 + idx * 2.5; 
          const targetVol = 0.08 + Math.random() * 0.15;
          try {
            oscGain.gain.linearRampToValueAtTime(targetVol, audioCtxRef.current.currentTime + cycleTime);
          } catch {
            // Resolved warning: omitted unused err parameter
          }
          setTimeout(modulate, cycleTime * 1000);
        };
        modulate();
      });

      oscillatorsRef.current = oscillators;
      setIsPlaying(true);
    } catch (e) {
      console.error("Web Audio failed to start:", e);
    }
  };

  const stopSound = () => {
    if (!audioCtxRef.current) return;
    
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;

    if (masterGain && ctx) {
      try {
        masterGain.gain.cancelScheduledValues(ctx.currentTime);
        masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.0); // 2 seconds release
      } catch {
        // Resolved warning: omitted unused err parameter
      }
    }

    setTimeout(() => {
      oscillatorsRef.current.forEach(({ osc }) => {
        try {
          osc.stop();
        } catch {
          // Resolved warning: omitted unused err parameter
        }
      });
      oscillatorsRef.current = [];

      if (ctx && ctx.state !== 'closed') {
        ctx.close();
      }
      audioCtxRef.current = null;
      masterGainRef.current = null;
      setIsPlaying(false);
    }, 2100);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/50 dark:border-white/10 px-3.5 py-1.5 rounded-full shadow-sm select-none">
      <div className="flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span className="text-[10px] uppercase tracking-widest font-semibold text-text-muted">Soundscape</span>
      </div>

      {/* Visualizer bars */}
      <div className="flex items-end gap-0.5 h-3.5 px-1">
        {[1, 2, 3, 4, 5].map((bar) => (
          <motion.div
            key={bar}
            animate={{
              height: isPlaying ? [4, 14, 6, 12, 4] : 4
            }}
            transition={{
              duration: 1.5 + bar * 0.3,
              repeat: isPlaying ? Infinity : 0,
              ease: 'easeInOut'
            }}
            className="w-0.5 bg-primary/60 rounded-full"
          />
        ))}
      </div>

      <button
        onClick={toggleSound}
        className="w-6 h-6 rounded-full bg-surface hover:bg-primary/5 flex items-center justify-center border border-border-light text-text-primary hover:text-primary transition-all duration-300 cursor-pointer focus:outline-none focus-ring"
        aria-label={isPlaying ? "Pause soothing background soundscape" : "Play soothing background soundscape"}
      >
        {isPlaying ? (
          <Pause className="w-2.5 h-2.5 fill-current" />
        ) : (
          <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
        )}
      </button>
    </div>
  );
};
