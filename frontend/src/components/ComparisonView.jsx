import React from 'react';
import { DraftEditor } from './DraftEditor';
import { FileText } from 'lucide-react';

export const ComparisonView = ({ draftText, setDraftText, variables, documentName }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Faded Context Document Preview */}
      <div className="flex flex-col gap-4 bg-background/50 rounded-2xl p-6 border border-[#F0F0F0] select-none h-fit">
        <div className="flex items-center gap-2 text-xs font-sans text-text-muted">
          <FileText className="w-4 h-4 text-secondary-hover" />
          <span>Source Context Document</span>
        </div>

        {/* Soft simulated mockup of the document */}
        <div className="bg-white rounded-xl p-6 border border-[#F0F0F0] shadow-sm flex flex-col gap-4 opacity-50">
          <div className="flex justify-between border-b border-[#F0F0F0] pb-3">
            <span className="font-serif text-sm text-text-primary uppercase tracking-wide">Official Records</span>
            <span className="text-[10px] text-text-muted font-light">FILE: {documentName}</span>
          </div>
          <div className="flex flex-col gap-3 font-sans text-[11px] text-text-muted leading-relaxed">
            <div>
              <span className="font-medium text-text-primary block">Deceased Individual</span>
              <span>Khatri, Ramesh Chandra</span>
            </div>
            <div>
              <span className="font-medium text-text-primary block">Date of Passing</span>
              <span>June 28, 2026</span>
            </div>
            <div>
              <span className="font-medium text-text-primary block">Primary Executor Contact</span>
              <span>Priyank Khatri (Representative)</span>
            </div>
            <div>
              <span className="font-medium text-text-primary block">Account Reference Identifiers</span>
              <span>Chase Savings Ref: #98221-A</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-text-muted font-light font-sans leading-relaxed">
          The AI drafted this communication by parsing details from the document above.
        </p>
      </div>

      {/* Right Column: Draft Editor */}
      <div className="lg:border-l lg:border-[#F0F0F0] lg:pl-8 flex flex-col">
        <DraftEditor
          draftText={draftText}
          setDraftText={setDraftText}
          variables={variables}
        />
      </div>
    </div>
  );
};
