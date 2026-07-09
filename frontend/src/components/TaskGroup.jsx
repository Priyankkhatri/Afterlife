import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Folder } from 'lucide-react';
import { TaskRow } from './TaskRow';

export const TaskGroup = ({ group, tasks, onToggle }) => {
  const [isOpen, setIsOpen] = useState(group.defaultOpen || false);

  return (
    <div className="flex flex-col gap-4">
      {/* Group Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 rounded-2xl bg-white hover:bg-background/40 border border-[#F0F0F0] shadow-sm transition-all focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3.5 text-left">
          <div className="p-2.5 rounded-xl bg-secondary/5 text-secondary-hover">
            <Folder className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans font-semibold text-text-primary text-sm">
              {group.name}
            </h3>
            <p className="font-sans text-[11px] text-text-muted font-light mt-0.5">
              {tasks.filter(t => t.completed).length} of {tasks.length} actions complete
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-text-muted hover:text-text-primary"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      {/* Accordion Content with Height Slide */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            {/* Visual Timeline Connector Line linking items */}
            <div className="relative pl-6 ml-6 border-l border-[#F0F0F0] flex flex-col gap-3.5 py-1">
              {tasks.map((task) => (
                <TaskRow 
                  key={task.id} 
                  task={task} 
                  onToggle={onToggle} 
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
