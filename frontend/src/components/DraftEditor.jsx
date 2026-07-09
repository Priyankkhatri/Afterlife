import React from 'react';

export const DraftEditor = ({ draftText, setDraftText, variables }) => {
  return (
    <div className="flex flex-col gap-5 flex-1 min-h-[350px]">
      {/* Variable pills bar showing AI Extracted parameters */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#F0F0F0] text-xs font-sans">
        <span className="text-text-muted font-light mr-1">AI Verified:</span>
        {variables.map((variable) => (
          <span 
            key={variable.key} 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary-hover font-medium select-none"
            title={`${variable.label}: ${variable.value}`}
          >
            <span className="w-1 h-1 rounded-full bg-secondary" />
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
          className="w-full flex-1 bg-transparent text-text-primary text-sm font-sans font-light leading-relaxed focus:outline-none resize-none min-h-[260px]"
          placeholder="Start writing..."
          style={{ caretColor: '#8CA596' }}
        />
      </div>
    </div>
  );
};
