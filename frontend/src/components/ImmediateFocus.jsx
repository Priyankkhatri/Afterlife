import React from 'react';
import { Sparkles } from 'lucide-react';

export const ImmediateFocus = ({ onAction }) => {
  const urgentTasks = [
    { id: '1', title: 'Notify Life Insurance Provider', description: 'MetLife Policy #98221-A', time: 'Due in 2 days' },
    { id: '2', title: 'Submit Funeral Leave Form', description: 'Request for HR Department', time: 'Due in 5 days' },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-antigravity border border-[#F0F0F0] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-text-primary">Immediate Focus</h3>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-primary px-2.5 py-1 rounded-full bg-primary/10">
          Priority
        </span>
      </div>

      <div className="flex flex-col gap-5">
        {urgentTasks.map((task) => (
          <div key={task.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl hover:bg-background/50 transition-colors duration-300">
            <div>
              <h4 className="font-sans font-medium text-text-primary text-base mb-1">{task.title}</h4>
              <p className="font-sans text-xs text-text-muted font-light">{task.description} • {task.time}</p>
            </div>
            <button
              onClick={() => onAction && onAction(task)}
              className="self-start md:self-auto flex items-center gap-2 px-4 py-2 text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 rounded-full border border-primary/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Review AI Draft
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
