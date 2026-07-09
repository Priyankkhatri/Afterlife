import React, { useState } from 'react';
import { FadeIn, FloatUp } from './MotionWrappers';
import { UploadZone } from './UploadZone';
import { DocumentGrid } from './DocumentGrid';
import { QuietProgress } from './QuietProgress';
import { ShieldCheck, Search, Info } from 'lucide-react';

export const Vault = () => {
  const [documents, setDocuments] = useState([
    { id: '1', name: 'Certified Death Certificate.pdf', size: '1.2 MB', date: 'Uploaded yesterday', status: 'Analyzed' },
    { id: '2', name: 'MetLife Insurance Policy.pdf', size: '3.4 MB', date: 'Uploaded 2 days ago', status: 'Processing' },
    { id: '3', name: 'Final Will & Testament.pdf', size: '4.8 MB', date: 'Uploaded 3 days ago', status: 'Analyzed' },
    { id: '4', name: 'Comcast Account Closure Notice.pdf', size: '720 KB', date: 'Uploaded 5 days ago', status: 'Analyzed' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleUploadComplete = (newDoc) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleView = (doc) => {
    alert(`Viewing document: ${doc.name}`);
  };

  const handleArchive = (doc) => {
    if (confirm(`Are you sure you want to archive ${doc.name}?`)) {
      setDocuments((prev) => prev.filter((d) => d.id !== doc.id));
    }
  };

  const filteredDocs = documents.filter((doc) => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const percentAnalyzed = documents.length > 0 
    ? Math.round((documents.filter(d => d.status === 'Analyzed').length / documents.length) * 100) 
    : 0;

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <FadeIn delay={0.1} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F0F0F0] pb-8">
        <div>
          <div className="flex items-center gap-2 text-primary mb-2">
            <ShieldCheck className="w-5 h-5 fill-primary/10" />
            <span className="text-xs uppercase tracking-widest font-semibold font-sans">Secure Storage</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary">Document Vault</h1>
          <p className="text-sm text-text-muted font-light font-sans max-w-lg mt-1">
            Store, analyze, and retrieve transition paperwork in an encrypted environment.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-sans text-primary bg-primary/5 border border-primary/15 rounded-2xl px-4 py-3 max-w-xs">
          <Info className="w-4 h-4 shrink-0" />
          <span className="font-light leading-relaxed">All documents are stored with end-to-end encryption.</span>
        </div>
      </FadeIn>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side: Upload Zone & Security Progress */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <FloatUp delay={0.2} className="flex flex-col gap-6">
            <h2 className="text-2xl font-serif text-text-primary">Upload</h2>
            <UploadZone onUploadComplete={handleUploadComplete} />
          </FloatUp>

          <FloatUp delay={0.3} className="bg-white p-6 rounded-3xl border border-[#F0F0F0] shadow-antigravity flex flex-col gap-4">
            <h3 className="font-serif text-lg text-text-primary">Vault Integrity</h3>
            <QuietProgress percent={percentAnalyzed} />
          </FloatUp>
        </div>

        {/* Right Side: Explorer & Document Cards */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <FloatUp delay={0.25} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-serif text-text-primary">All Documents ({filteredDocs.length})</h2>
            
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search documents..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#F0F0F0] rounded-full pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary/50 text-text-primary shadow-sm"
              />
              <Search className="absolute left-3.5 top-3 w-3.5 h-3.5 text-text-muted" />
            </div>
          </FloatUp>

          {filteredDocs.length > 0 ? (
            <DocumentGrid 
              documents={filteredDocs} 
              onView={handleView} 
              onArchive={handleArchive} 
            />
          ) : (
            <FloatUp delay={0.3} className="text-center py-16 bg-white rounded-3xl border border-[#F0F0F0] shadow-antigravity">
              <p className="text-sm text-text-muted font-light font-sans">No documents found matching your search.</p>
            </FloatUp>
          )}
        </div>

      </div>
    </div>
  );
};
