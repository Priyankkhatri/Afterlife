import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Eye, Archive } from 'lucide-react';

export const DocumentCard = ({ doc, onView, onArchive }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-white rounded-2xl p-6 shadow-antigravity border border-[#F0F0F0] flex flex-col justify-between min-h-[140px] hover:-translate-y-0.5 hover:shadow-antigravity-hover transition-all duration-300 overflow-hidden"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-secondary/5 text-secondary-hover">
          <FileText className="w-5 h-5 stroke-[1.5]" />
        </div>
        <span className={`text-[9px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full ${
          doc.status === 'Analyzed' || doc.status === 'Verified'
            ? 'text-primary bg-primary/10'
            : 'text-secondary bg-secondary/10'
        }`}>
          {doc.status}
        </span>
      </div>

      <div className="flex-1">
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
            className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center gap-3 px-6"
          >
            <button
              onClick={() => onView && onView(doc)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs text-text-primary hover:text-primary hover:bg-primary/5 rounded-full border border-[#F0F0F0] transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </button>
            <button
              onClick={() => onArchive && onArchive(doc)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs text-text-muted hover:text-red-500 hover:bg-red-50/50 rounded-full border border-[#F0F0F0] transition-colors"
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
