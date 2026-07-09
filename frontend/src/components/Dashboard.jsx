import React from 'react';
import { FadeIn, FloatUp } from './MotionWrappers';
import { ImmediateFocus } from './ImmediateFocus';
import { DocumentVaultSnapshot } from './DocumentVaultSnapshot';
import { QuietProgress } from './QuietProgress';
import { Heart, HelpCircle, ArrowUpRight } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Ethereal Greeting Header */}
      <FadeIn delay={0.1} className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary">
          <Heart className="w-4 h-4 fill-primary/10" />
          <span className="text-[10px] uppercase tracking-widest font-semibold font-sans">Empathetic Companion</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-text-primary mt-1">
          Good afternoon, Priya. There is no rush today.
        </h1>
        <p className="text-sm text-text-muted font-light font-sans max-w-lg mt-1">
          We have organized your estate paperwork. Take a look at your focus items whenever you feel ready.
        </p>
      </FadeIn>

      {/* Weightless Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Bento Cell A: Immediate Focus */}
        <FloatUp delay={0.25} className="lg:col-span-2">
          <ImmediateFocus onAction={(task) => alert(`Reviewing AI draft for: ${task.title}`)} />
        </FloatUp>

        {/* Bento Cell B: Help Guidance Card */}
        <FloatUp delay={0.35} className="flex flex-col justify-between bg-white rounded-3xl p-8 shadow-antigravity border border-[#F0F0F0] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />
          <div className="flex flex-col gap-4">
            <div className="p-3 rounded-full bg-secondary/10 text-secondary-hover w-fit">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-text-primary mb-2">Gentle Guidance</h3>
              <p className="text-xs text-text-muted font-light leading-relaxed">
                Administrative tasks can feel overwhelming. If you need help drafting letters, contacting banks, or understanding legal terms, we are here.
              </p>
            </div>
          </div>
          
          <button className="mt-6 flex items-center justify-between text-left p-3.5 rounded-2xl bg-background hover:bg-primary/5 border border-[#F0F0F0] hover:border-primary/20 transition-all duration-300 group">
            <span className="text-xs font-medium text-text-primary">Draft bank notice letter</span>
            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
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
