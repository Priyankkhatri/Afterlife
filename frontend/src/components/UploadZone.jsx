import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Sparkles } from 'lucide-react';

export const UploadZone = ({ onUploadComplete }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  const simulateUpload = (file) => {
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

  return (
    <div className="w-full flex flex-col gap-6">
      <motion.div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        animate={{
          borderColor: isDragActive ? '#8CA596' : '#A6B4C4',
          backgroundColor: isDragActive ? 'rgba(140, 165, 150, 0.02)' : 'rgba(255, 255, 255, 0.4)'
        }}
        transition={{ duration: 0.3 }}
        className="relative w-full rounded-3xl border-2 border-dashed p-10 md:p-14 flex flex-col items-center justify-center text-center cursor-pointer bg-gradient-to-b from-white to-transparent shadow-sm hover:shadow-antigravity"
      >
        <input 
          type="file" 
          id="file-upload" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={handleChange}
          disabled={uploading}
        />
        
        <div className="flex flex-col items-center gap-4 max-w-md">
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
            className="w-full flex flex-col gap-2 p-4 bg-white rounded-2xl border border-[#F0F0F0] shadow-antigravity"
          >
            <div className="flex items-center justify-between text-xs font-sans font-light text-text-muted">
              <span className="animate-pulse flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '3s' }} />
                Securing and reading details...
              </span>
              <span className="font-medium text-text-primary">{progress}%</span>
            </div>
            
            <div className="w-full h-[2px] bg-[#F0F0F0] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
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
