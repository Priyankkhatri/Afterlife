import React from 'react';
import { Send, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button';

interface ApprovalControlsProps {
  onApprove: () => void;
  onRegenerate: () => void;
  onCancel: () => void;
}

export const ApprovalControls: React.FC<ApprovalControlsProps> = ({ 
  onApprove, 
  onRegenerate, 
  onCancel 
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-light pt-6 mt-6 bg-surface">
      {/* Left: Secondary actions */}
      <div className="flex items-center gap-4 text-xs font-sans">
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors cursor-pointer focus:outline-none focus-ring rounded-full px-2 py-1"
          aria-label="Regenerate dynamic email template draft"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Regenerate Draft
        </button>
        <span className="text-gray-200 dark:text-gray-700">|</span>
        <button
          onClick={onCancel}
          className="text-text-muted hover:text-text-primary transition-colors cursor-pointer focus:outline-none focus-ring rounded-full px-2 py-1"
        >
          I'll do this later
        </button>
      </div>

      {/* Right: Primary Action */}
      <Button
        onClick={onApprove}
        variant="primary"
      >
        <Send className="w-3.5 h-3.5" />
        Approve & Send
      </Button>
    </div>
  );
};
