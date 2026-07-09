import React, { useState } from 'react';
import { FadeIn, FloatUp } from './MotionWrappers';
import { TaskGroup } from './TaskGroup';
import { QuietProgress } from './QuietProgress';
import { Calendar, HelpCircle, ArrowUpRight } from 'lucide-react';

export const ActionRoadmap = () => {
  const [tasks, setTasks] = useState([
    // Immediate Attention (Urgent tasks)
    { id: '1', title: 'Request Certified Copies of Death Certificate', description: 'Needed for bank accounts, insurance, and court', category: 'certificates', duration: 'Takes 15 mins', completed: false, group: 'certificates' },
    { id: '2', title: 'Notify Life Insurance Provider', description: 'MetLife Policy #98221-A', category: 'financial', duration: 'Takes 30 mins', completed: false, group: 'financial' },
    
    // This Week
    { id: '3', title: 'Notify Social Security Administration', description: 'Report the passing to SSA to stop benefits and set up survivors claims', category: 'government', duration: 'Takes 20 mins', completed: false, group: 'government' },
    { id: '4', title: 'Close Credit Card & Subscription Accounts', description: 'Prevent unwanted monthly billing charges', category: 'financial', duration: 'Completed', completed: true, group: 'subscriptions' },
    { id: '5', title: 'Cancel Driver License & Voter Registration', description: 'Notify DMV to prevent identity theft', category: 'government', duration: 'Takes 10 mins', completed: false, group: 'government' },
    
    // When You're Ready
    { id: '6', title: 'Initiate Probate & Estate Process', description: 'File paperwork with local county probate clerk', category: 'legal', duration: 'Takes 45 mins', completed: false, group: 'legal' },
    { id: '7', title: 'Distribute Personal Belongings', description: 'Begin sorting items when emotionally prepared', category: 'personal', duration: 'Self-paced', completed: false, group: 'personal' }
  ]);

  const groups = {
    immediate: [
      { id: 'certificates', name: 'Legal & Certificates', defaultOpen: true },
      { id: 'financial', name: 'Financial Providers', defaultOpen: true }
    ],
    thisWeek: [
      { id: 'government', name: 'Government & Benefits', defaultOpen: true },
      { id: 'subscriptions', name: 'Subscriptions & Memberships', defaultOpen: false }
    ],
    whenReady: [
      { id: 'legal', name: 'Estate & Probate Court', defaultOpen: true },
      { id: 'personal', name: 'Personal & Family Affairs', defaultOpen: false }
    ]
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const percentComplete = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <FadeIn delay={0.1} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F0F0F0] pb-8">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <Calendar className="w-5 h-5 fill-primary/10" />
            <span className="text-xs uppercase tracking-widest font-semibold font-sans">Action Roadmap</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary">Your Administrative Path</h1>
          <p className="text-sm text-text-muted font-light font-sans max-w-lg mt-1">
            We have structured these tasks chronologically. Take them step-by-step, only when you feel ready.
          </p>
        </div>
        <div className="w-full md:w-64 bg-white p-5 rounded-2xl border border-[#F0F0F0] shadow-antigravity self-start">
          <QuietProgress percent={percentComplete} />
        </div>
      </FadeIn>

      {/* Main Roadmap Timeline Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Columns: Timeline Roadmap */}
        <div className="lg:col-span-2 flex flex-col gap-10 relative">
          
          {/* Vertical Microscopic Connector Line */}
          <div className="absolute left-3.5 top-6 bottom-6 w-[1px] bg-[#F0F0F0] pointer-events-none" />

          {/* Section 1: Immediate Attention */}
          <div className="relative pl-10 flex flex-col gap-6">
            {/* Connector Node */}
            <div className="absolute left-2 top-2 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/15" />
            
            <FloatUp delay={0.2}>
              <h2 className="text-xl font-serif text-text-primary font-medium tracking-wide">Immediate Attention</h2>
              <p className="text-xs text-text-muted font-light font-sans mt-0.5">Critical first steps to complete within the first week.</p>
            </FloatUp>

            <div className="flex flex-col gap-4">
              {groups.immediate.map(group => (
                <TaskGroup
                  key={group.id}
                  group={group}
                  tasks={tasks.filter(t => t.group === group.id)}
                  onToggle={toggleTask}
                />
              ))}
            </div>
          </div>

          {/* Section 2: This Week */}
          <div className="relative pl-10 flex flex-col gap-6">
            {/* Connector Node */}
            <div className="absolute left-2.5 top-2.5 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-secondary/20" />
            
            <FloatUp delay={0.3}>
              <h2 className="text-xl font-serif text-text-primary font-medium tracking-wide">This Week</h2>
              <p className="text-xs text-text-muted font-light font-sans mt-0.5">Secondary tasks to gently address in the coming days.</p>
            </FloatUp>

            <div className="flex flex-col gap-4">
              {groups.thisWeek.map(group => (
                <TaskGroup
                  key={group.id}
                  group={group}
                  tasks={tasks.filter(t => t.group === group.id)}
                  onToggle={toggleTask}
                />
              ))}
            </div>
          </div>

          {/* Section 3: When You're Ready */}
          <div className="relative pl-10 flex flex-col gap-6">
            {/* Connector Node */}
            <div className="absolute left-2.5 top-2.5 w-2.5 h-2.5 rounded-full bg-gray-200" />
            
            <FloatUp delay={0.4}>
              <h2 className="text-xl font-serif text-text-primary font-medium tracking-wide">When You're Ready</h2>
              <p className="text-xs text-text-muted font-light font-sans mt-0.5">Self-paced tasks with no strict timeline or urgency.</p>
            </FloatUp>

            <div className="flex flex-col gap-4">
              {groups.whenReady.map(group => (
                <TaskGroup
                  key={group.id}
                  group={group}
                  tasks={tasks.filter(t => t.group === group.id)}
                  onToggle={toggleTask}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Empathy / Help Cards */}
        <FloatUp delay={0.45} className="flex flex-col gap-6 self-start">
          <div className="bg-white rounded-3xl p-8 shadow-antigravity border border-[#F0F0F0] flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-full bg-secondary/10 text-secondary-hover w-fit">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-text-primary mb-2">Need a Moment?</h3>
                <p className="text-xs text-text-muted font-light leading-relaxed">
                  These tasks are here for reference. You do not have to complete them today. If you need family members to help, we can share access to this workspace.
                </p>
              </div>
            </div>
            
            <button className="flex items-center justify-between text-left p-3.5 rounded-2xl bg-background hover:bg-primary/5 border border-[#F0F0F0] hover:border-primary/20 transition-all duration-300 group cursor-pointer">
              <span className="text-xs font-medium text-text-primary font-sans">Share access with family</span>
              <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>
          </div>
        </FloatUp>

      </div>
    </div>
  );
};
