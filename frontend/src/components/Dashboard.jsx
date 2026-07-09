import React from 'react';
import { FadeIn, FloatUp } from './MotionWrappers';
import { ImmediateFocus } from './ImmediateFocus';
import { DocumentVaultSnapshot } from './DocumentVaultSnapshot';
import { QuietProgress } from './QuietProgress';
import { Heart } from 'lucide-react';
import { BreathingCard } from './BreathingCard';

export const Dashboard = ({ onReviewAction }) => {
  return (
    <div className="flex flex-col gap-10">
      {/* Ethereal Greeting Header */}
      <FadeIn delay={0.1} className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-accent-warm">
          <Heart className="w-4 h-4 fill-accent-warm/10" />
          <span className="text-[10px] uppercase tracking-widest font-semibold font-sans">Empathetic Companion</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-text-primary mt-1">
          Good afternoon, Priyank. There is no rush today.
        </h1>
        <p className="text-sm text-text-muted font-light font-sans max-w-lg mt-1">
          We have organized your estate paperwork. Take a look at your focus items whenever you feel ready.
        </p>
      </FadeIn>

      {/* Weightless Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Bento Cell A: Immediate Focus */}
        <FloatUp delay={0.25} className="lg:col-span-2">
          <ImmediateFocus onAction={onReviewAction} />
        </FloatUp>

        {/* Bento Cell B: Interactive Box Breathing & Affirmations Card */}
        <FloatUp delay={0.35}>
          <BreathingCard />
        </FloatUp>

        {/* Bento Cell C: Document Vault Snapshot */}
        <FloatUp delay={0.45} className="lg:col-span-2">
          <DocumentVaultSnapshot />
        </FloatUp>

        {/* Bento Cell D: Quiet Progress */}
        <FloatUp delay={0.55} className="bg-white rounded-3xl p-8 shadow-antigravity border border-[#F0F0F0] flex flex-col justify-center gap-2">
          <h4 className="font-serif text-lg text-text-primary mb-1">Administrative Path</h4>
          <QuietProgress percent={33} />
        </FloatUp>

      </div>
    </div>
  );
};
