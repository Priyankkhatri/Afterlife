import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { ComparisonView } from './ComparisonView';
import { ApprovalControls } from './ApprovalControls';

export const ReviewDrawer = ({ task, onClose, onApprove }) => {
  const [draftText, setDraftText] = useState('');

  // Update draft whenever task changes
  useEffect(() => {
    if (task) {
      setDraftText(
        task.defaultDraft || 
        `Subject: Request for Account Closure - Ramesh Chandra Khatri\n\nDear Support Team,\n\nI am writing as the legal representative of the estate of Ramesh Chandra Khatri to request the closure of the savings account holding reference #98221-A. We request that all remaining balances be liquidated and disbursed to the estate.\n\nThank you for your assistance during this transition.\n\nSincerely,\nPriyank Khatri\nExecutor`
      );
    }
  }, [task]);

  // Esc key binding to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!task) return null;

  const variables = task.variables || [
    { key: 'account', label: 'Account Number', value: 'Savings #98221-A' },
    { key: 'deceased', label: 'Deceased Name', value: 'Ramesh Chandra Khatri' },
    { key: 'executor', label: 'Executor', value: 'Priyank Khatri' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-text-primary/10 backdrop-blur-sm"
        />

        {/* Slide-out Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          className="relative w-full max-w-4xl h-full bg-white shadow-2xl flex flex-col justify-between p-8 md:p-10 z-10 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F0F0F0] pb-6 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-full bg-primary/10 text-primary">
                <Sparkles className="w-5 h-5 fill-primary/10" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold font-sans text-primary">AI Action Assistant</span>
                <h2 className="font-serif text-2xl text-text-primary mt-0.5">Review Communication</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-background text-text-muted hover:text-text-primary transition-all cursor-pointer focus:outline-none"
              aria-label="Close review panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Comparison View Grid */}
          <div className="flex-1">
            <ComparisonView
              draftText={draftText}
              setDraftText={setDraftText}
              variables={variables}
              documentName={task.documentName || 'Death_Certificate.pdf'}
            />
          </div>

          {/* Bottom Actions */}
          <ApprovalControls
            onApprove={() => {
              onApprove(task.id, draftText);
              onClose();
            }}
            onRegenerate={() => {
              setDraftText(task.defaultDraft || draftText);
              alert('Draft regenerated back to original AI template.');
            }}
            onCancel={onClose}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
