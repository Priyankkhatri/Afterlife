import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { Card } from './ui/Card';
import { Document } from '../types';

export const DocumentVaultSnapshot: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const documents: Document[] = [
    { id: '1', name: 'Certified Death Certificate', size: '1.2 MB', date: 'Uploaded yesterday', status: 'Verified' },
    { id: '2', name: 'MetLife Insurance Policy', size: '3.4 MB', date: 'Uploaded 2 days ago', status: 'Processing' },
    { id: '3', name: 'Final Will & Testament', size: '4.8 MB', date: 'Uploaded 3 days ago', status: 'Verified' },
  ];

  return (
    <Card className="flex flex-col gap-6" animateHover>
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-text-primary">Document Vault</h3>
        <span className="text-xs text-text-muted hover:text-primary transition-colors cursor-pointer font-light select-none">
          View all
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          // Upgraded Shimmery Skeletons
          [1, 2, 3].map((n) => (
            <div key={n} className="p-5 rounded-2xl bg-surface border border-border-light flex flex-col gap-4 shadow-sm">
              <Skeleton className="w-8 h-8 rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))
        ) : (
          // Masonry/Grid Preview
          documents.map((doc) => (
            <div 
              key={doc.id} 
              className="group relative p-5 rounded-2xl bg-background dark:bg-background/25 border border-transparent hover:border-border-light hover:bg-surface dark:hover:bg-surface transition-all duration-300 flex flex-col justify-between gap-4 shadow-sm hover:shadow-antigravity"
            >
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary-hover">
                  <FileText className="w-5 h-5" />
                </div>
                <span className={`text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                  doc.status === 'Verified' ? 'text-primary bg-primary/10' : 'text-secondary bg-secondary/10'
                }`}>
                  {doc.status}
                </span>
              </div>
              <div>
                <h4 className="font-sans font-medium text-text-primary text-sm truncate mb-0.5" title={doc.name}>
                  {doc.name}
                </h4>
                <p className="font-sans text-[11px] text-text-muted font-light">{doc.size} • {doc.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
