import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Sparkles } from 'lucide-react';
import { Document } from '../types';

interface UploadZoneProps {
  onUploadComplete: (doc: Document) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onUploadComplete }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  const simulateUpload = (file: File) => {
    setUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            if (onUploadComplete) {
              onUploadComplete({
                id: Date.now().toString(),
                name: file.name,
                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                date: 'Just uploaded',
                status: 'Processing'
              });
            }
          }, 800);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      triggerFileInput();
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <motion.div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        onKeyDown={handleKeyDown}
        tabIndex={uploading ? -1 : 0}
        role="button"
        aria-label="Upload document area. Press Enter or Space to select a file."
        whileHover={{ scale: 1.01 }}
        animate={{
          borderColor: isDragActive ? '#E29A76' : 'var(--border-light)',
          backgroundColor: isDragActive ? 'rgba(226, 154, 118, 0.02)' : 'var(--surface)'
        }}
        transition={{ duration: 0.3 }}
        className="relative w-full rounded-3xl border-2 border-dashed p-10 md:p-14 flex flex-col items-center justify-center text-center cursor-pointer shadow-sm hover:shadow-antigravity focus-ring outline-none"
      >
        <input 
          type="file" 
          id="file-upload" 
          ref={fileInputRef}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer hidden" 
          onChange={handleChange}
          disabled={uploading}
        />
        
        <div className="flex flex-col items-center gap-4 max-w-md select-none pointer-events-none">
          <motion.div 
            animate={{ y: isDragActive ? -4 : 0 }}
            className="p-4 rounded-full bg-secondary/5 text-secondary-hover"
          >
            <UploadCloud className="w-8 h-8 stroke-[1.5]" />
          </motion.div>
          
          <div>
            <h3 className="font-serif text-2xl text-text-primary mb-2">Entrust your documents here.</h3>
            <p className="font-sans text-xs text-text-muted font-light leading-relaxed">
              Upload the death certificate, bills, or policies. We will organize them safely.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Fluid Upload Progress */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full flex flex-col gap-2 p-4 bg-surface rounded-2xl border border-border-light shadow-antigravity select-none"
          >
            <div className="flex items-center justify-between text-xs font-sans font-light text-text-muted">
              <span className="animate-pulse flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-warm animate-spin" style={{ animationDuration: '3s' }} />
                Securing and reading details...
              </span>
              <span className="font-medium text-text-primary">{progress}%</span>
            </div>
            
            <div className="w-full h-[2px] bg-border-light rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent-warm"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
