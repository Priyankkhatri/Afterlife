import React from 'react';
import { DocumentCard } from './DocumentCard';
import { FloatUp } from './MotionWrappers';
import { Document } from '../types';

interface DocumentGridProps {
  documents: Document[];
  onView: (doc: Document) => void;
  onArchive: (doc: Document) => void;
}

export const DocumentGrid: React.FC<DocumentGridProps> = ({ documents, onView, onArchive }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {documents.map((doc, index) => (
        <FloatUp key={doc.id} delay={0.1 + index * 0.06}>
          <DocumentCard 
            doc={doc} 
            onView={onView} 
            onArchive={onArchive} 
          />
        </FloatUp>
      ))}
    </div>
  );
};
