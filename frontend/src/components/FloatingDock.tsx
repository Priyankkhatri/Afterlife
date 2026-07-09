import React from 'react';
import { motion } from 'framer-motion';
import { Home, ListTodo, FolderHeart, User, LucideIcon } from 'lucide-react';

interface FloatingDockProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ activeTab, setActiveTab }) => {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: ListTodo },
    { id: 'vault', label: 'Vault', icon: FolderHeart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-gradient-to-b from-surface/50 to-surface/25 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[inset_0_1.5px_0_rgba(255,255,255,0.7),_inset_0_-1px_0_rgba(0,0,0,0.04),_0_16px_36px_-6px_rgba(0,0,0,0.04),_0_1px_2px_rgba(0,0,0,0.02)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center p-2 rounded-full cursor-pointer transition-colors focus:outline-none focus-ring"
              aria-label={item.label}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-colors duration-200 ${
                  isActive ? 'text-accent-warm' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>

              {isActive && (
                <>
                  {/* Liquid Glass capsule sliding backdrop */}
                  <motion.div
                    layoutId="activeBackdrop"
                    className="absolute inset-0 bg-accent-warm/8 border border-accent-warm/15 rounded-full -z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                  />
                  {/* Sliding dot indicator */}
                  <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-accent-warm"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
