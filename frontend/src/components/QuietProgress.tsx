import React from 'react';

interface QuietProgressProps {
  percent?: number;
}

export const QuietProgress: React.FC<QuietProgressProps> = ({ percent = 25 }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between text-xs text-text-muted font-sans font-light">
        <span>You are making steady progress.</span>
        <span className="font-medium text-text-primary">{percent}% Complete</span>
      </div>
      {/* 2px Progress Track */}
      <div className="w-full h-[2px] bg-border-light rounded-full overflow-hidden">
        {/* Progress Fill */}
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-out" 
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
