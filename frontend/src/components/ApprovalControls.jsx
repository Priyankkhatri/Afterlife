import React from 'react';
import { Send, RotateCcw } from 'lucide-react';

export const ApprovalControls = ({ onApprove, onRegenerate, onCancel }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#F0F0F0] pt-6 mt-6 bg-white">
      {/* Left: Secondary actions */}
      <div className="flex items-center gap-4 text-xs font-sans">
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Regenerate Draft
        </button>
        <span className="text-gray-200">|</span>
        <button
          onClick={onCancel}
          className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        >
          I'll do this later
        </button>
      </div>

      {/* Right: Primary Action */}
      <button
        onClick={onApprove}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8CA596] to-[#7A9384] hover:from-[#7A9384] hover:to-[#7A9384] text-white text-xs font-semibold rounded-full shadow-antigravity hover:shadow-antigravity-hover transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
        Approve & Send
      </button>
    </div>
  );
};
