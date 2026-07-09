import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types';

interface TaskRowProps {
  task: Task;
  onToggle: (id: string) => void;
}

export const TaskRow: React.FC<TaskRowProps> = ({ task, onToggle }) => {
  // SVG checkmark path animation config
  const checkmarkVariants = {
    checked: { pathLength: 1, opacity: 1 },
    unchecked: { pathLength: 0, opacity: 0 }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onToggle(task.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      animate={{ opacity: task.completed ? 0.6 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="bg-surface rounded-2xl p-5 border border-border-light flex items-center justify-between gap-4 shadow-sm hover:shadow-antigravity-hover select-none cursor-pointer transition-shadow focus-ring"
      onClick={() => onToggle(task.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="checkbox"
      aria-checked={task.completed}
      aria-label={task.title}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Animated Custom Checkbox */}
        <div className="relative flex items-center justify-center shrink-0">
          <motion.div
            animate={{
              backgroundColor: task.completed ? '#E29A76' : 'transparent',
              borderColor: task.completed ? '#E29A76' : 'rgba(166, 180, 196, 0.4)'
            }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 rounded-full border flex items-center justify-center"
          >
            <svg 
              className="w-3.5 h-3.5 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="3.5"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                variants={checkmarkVariants}
                animate={task.completed ? 'checked' : 'unchecked'}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Task Details */}
        <div className="flex-1">
          <motion.h4
            animate={{ 
              color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
              textDecoration: task.completed ? 'line-through' : 'none'
            }}
            transition={{ duration: 0.3 }}
            className="font-sans font-medium text-sm text-text-primary"
          >
            {task.title}
          </motion.h4>
          {task.description && (
            <p className="font-sans text-xs text-text-muted font-light mt-0.5">
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Timepill Badge */}
      <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary/80 px-2.5 py-1 rounded-full bg-secondary/5 shrink-0">
        {task.duration}
      </span>
    </motion.div>
  );
};
