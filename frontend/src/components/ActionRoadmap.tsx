import React, { useState } from 'react';
import { FadeIn, FloatUp } from './MotionWrappers';
import { TaskGroup } from './TaskGroup';
import { QuietProgress } from './QuietProgress';
import { Calendar, HelpCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Task } from '../types';
import { Card } from './ui/Card';
import { EmptyState } from './EmptyState';

interface ActionRoadmapProps {
  showToast: (message: string) => void;
}

export const ActionRoadmap: React.FC<ActionRoadmapProps> = ({ showToast }) => {
  const [tasks, setTasks] = useState<Task[]>([
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

  const toggleTask = (id: string) => {
    let completedState = false;
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        completedState = !task.completed;
        return { ...task, completed: completedState };
      }
      return task;
    });
    setTasks(updatedTasks);
    if (showToast && completedState) {
      showToast("Task completed. Administrative relief.");
    }
  };

  const percentComplete = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);
  const allTasksCompleted = tasks.every(t => t.completed);

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <FadeIn delay={0.1} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border-light pb-8">
        <div>
          <div className="flex items-center gap-2 text-accent-warm mb-2">
            <Calendar className="w-5 h-5 fill-accent-warm/10" />
            <span className="text-xs uppercase tracking-widest font-semibold font-sans">Action Roadmap</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary">Your Administrative Path</h1>
          <p className="text-sm text-text-muted font-light font-sans max-w-lg mt-1">
            We have structured these tasks chronologically. Take them step-by-step, only when you feel ready.
          </p>
        </div>
        <div className="w-full md:w-64 bg-surface p-5 rounded-2xl border border-border-light shadow-antigravity self-start select-none">
          <QuietProgress percent={percentComplete} />
        </div>
      </FadeIn>

      {/* Main Roadmap Timeline Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Columns: Timeline Roadmap */}
        <div className="lg:col-span-2 flex flex-col gap-10 relative">
          
          {/* Vertical Microscopic Connector Line */}
          <div className="absolute left-3.5 top-6 bottom-6 w-[1px] bg-border-light pointer-events-none" />

          {allTasksCompleted ? (
            <FloatUp delay={0.2} className="py-6">
              <EmptyState
                icon={CheckCircle2}
                title="All actions cleared"
                description="Take a deep breath of relief. You have handled all outstanding administrative tasks for this period. Rest your mind, you are doing wonderfully."
              />
            </FloatUp>
          ) : (
            <>
              {/* Section 1: Immediate Attention */}
              <div className="relative pl-10 flex flex-col gap-6">
                {/* Connector Node */}
                <div className="absolute left-2 top-2 w-3.5 h-3.5 rounded-full bg-accent-warm ring-4 ring-accent-warm/15" />
                
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
                <div className="absolute left-2.5 top-2.5 w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                
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
            </>
          )}

        </div>

        {/* Right Column: Empathy / Help Cards */}
        <FloatUp delay={0.45} className="flex flex-col gap-6 self-start">
          <Card className="flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-full bg-accent-warm/10 text-accent-warm w-fit">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-text-primary mb-2">Need a Moment?</h3>
                <p className="text-xs text-text-muted font-light leading-relaxed">
                  These tasks are here for reference. You do not have to complete them today. If you need family members to help, we can share access to this workspace.
                </p>
              </div>
            </div>
            
            <button className="flex items-center justify-between text-left p-3.5 rounded-2xl bg-background dark:bg-background/25 hover:bg-accent-warm/5 border border-border-light hover:border-accent-warm/20 transition-all duration-300 group cursor-pointer focus:outline-none focus-ring">
              <span className="text-xs font-medium text-text-primary font-sans">Share access with family</span>
              <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-accent-warm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>
          </Card>
        </FloatUp>

      </div>
    </div>
  );
};
