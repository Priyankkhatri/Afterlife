import React from 'react';
import { Variable } from '../types';

interface DraftEditorProps {
  draftText: string;
  setDraftText: (text: string) => void;
  variables: Variable[];
}

export const DraftEditor: React.FC<DraftEditorProps> = ({ draftText, setDraftText, variables }) => {
  return (
    <div className="flex flex-col gap-5 flex-1 min-h-[350px]">
      {/* Variable pills bar showing AI Extracted parameters */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border-light text-xs font-sans select-none">
        <span className="text-text-muted font-light mr-1">AI Verified:</span>
        {variables.map((variable) => (
          <span 
            key={variable.key} 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary-hover dark:text-text-primary font-medium"
            title={`${variable.label}: ${variable.value}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="opacity-75">{variable.label}:</span>
            <span className="font-semibold">{variable.value}</span>
          </span>
        ))}
      </div>

      {/* Main Text Editor Pad */}
      <div className="flex-1 flex flex-col">
        <textarea
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          className="w-full flex-1 bg-transparent text-text-primary text-sm font-sans font-light leading-relaxed focus:outline-none resize-none min-h-[260px] focus-ring rounded-xl p-2"
          placeholder="Start writing..."
          style={{ caretColor: '#8CA596' }}
        />
      </div>
    </div>
  );
};
