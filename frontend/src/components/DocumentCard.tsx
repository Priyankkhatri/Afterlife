import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Eye, Archive } from 'lucide-react';
import { Document } from '../types';

interface DocumentCardProps {
  doc: Document;
  onView: (doc: Document) => void;
  onArchive: (doc: Document) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ doc, onView, onArchive }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        // Prevent closing overlay if focus shifts to child actions
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setHovered(false);
        }
      }}
      tabIndex={0}
      className="relative bg-surface rounded-2xl p-6 shadow-antigravity border border-border-light flex flex-col justify-between min-h-[140px] hover:-translate-y-0.5 hover:shadow-antigravity-hover transition-all duration-300 overflow-hidden outline-none focus-ring"
      aria-label={`Document: ${doc.name}, status: ${doc.status}`}
    >
      <div className="flex items-start justify-between mb-4 pointer-events-none select-none">
        <div className="p-3 rounded-xl bg-secondary/5 text-secondary-hover">
          <FileText className="w-5 h-5 stroke-[1.5]" />
        </div>
        <span className={`text-[9px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full ${
          doc.status === 'Analyzed' || doc.status === 'Verified'
            ? 'text-accent-warm bg-accent-warm/10'
            : 'text-secondary bg-secondary/10'
        }`}>
          {doc.status}
        </span>
      </div>

      <div className="flex-1 pointer-events-none select-none">
        <h4 className="font-sans font-medium text-text-primary text-sm line-clamp-1 mb-1" title={doc.name}>
          {doc.name}
        </h4>
        <p className="font-sans text-[11px] text-text-muted font-light">{doc.size} • {doc.date}</p>
      </div>

      {/* Quick Actions Hover Menu */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute inset-0 bg-surface/95 backdrop-blur-sm flex items-center justify-center gap-3 px-6 z-10"
          >
            <button
              onClick={() => onView && onView(doc)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs text-text-primary hover:text-accent-warm hover:bg-accent-warm/5 rounded-full border border-border-light transition-colors focus:outline-none focus-ring cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </button>
            <button
              onClick={() => onArchive && onArchive(doc)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs text-text-muted hover:text-red-500 hover:bg-red-50/50 rounded-full border border-border-light transition-colors focus:outline-none focus-ring cursor-pointer"
            >
              <Archive className="w-3.5 h-3.5" />
              Archive
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
