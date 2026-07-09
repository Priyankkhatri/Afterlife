import React from 'react';
import { motion } from 'framer-motion';
import { Home, ListTodo, FolderHeart, User } from 'lucide-react';

export const FloatingDock = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: ListTodo },
    { id: 'vault', label: 'Vault', icon: FolderHeart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-antigravity">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center p-2 rounded-full cursor-pointer transition-colors focus:outline-none"
              aria-label={item.label}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-primary' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>

              {isActive && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
