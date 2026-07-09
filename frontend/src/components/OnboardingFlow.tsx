import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ArrowRight, 
  Sparkles, 
  UploadCloud, 
  FileText, 
  Check, 
  Calendar
} from 'lucide-react';
import { Card } from './ui/Card';

type Props = {
  onComplete: (data: {
    decedentName: string;
    passingDate: string;
    relationship: string;
    tone: string;
  }) => void;
};

export const OnboardingFlow = ({ onComplete }: Props) => {
  const [step, setStep] = useState(1);
  const [decedentName, setDecedentName] = useState('');
  const [passingDate, setPassingDate] = useState('');
  const [relationship, setRelationship] = useState('Spouse');
  const [tone, setTone] = useState('Gentle');
  
  // OCR Scan states
  const [isScanning, setIsScanning] = useState(false);
  const [scannedDocName, setScannedDocName] = useState<string | null>(null);

  const simulateOCR = () => {
    setIsScanning(true);
    setScannedDocName('Death_Certificate_Scan.pdf');
    setTimeout(() => {
      setIsScanning(false);
      setDecedentName('Robert Jenkins');
      setPassingDate('2025-10-12');
      setRelationship('Spouse');
    }, 2200);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Step 4 is the generating loader, which finishes automatically
      setStep(4);
      setTimeout(() => {
        onComplete({ decedentName, passingDate, relationship, tone });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-text-primary flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Mesh decorative halos */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-[100px] pointer-events-none -z-10" />

      {/* Onboarding Wizard Card */}
      <Card className="w-full max-w-2xl bg-white border border-border-light shadow-2xl p-8 lg:p-12 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
        
        {/* Step Indicator Header */}
        {step <= 3 && (
          <div className="flex justify-between items-center pb-6 border-b border-border-light/60 select-none">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-3.5 h-3.5 text-primary fill-primary/10" />
              </div>
              <span className="font-serif text-sm font-bold text-text-primary">Afterlife Copilot Setup</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((num) => (
                <div 
                  key={num}
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${step === num ? 'bg-primary text-white' : step > num ? 'bg-[#E8F5E9] text-primary' : 'bg-[#FAF9F6] border border-border-light text-text-muted'}`}
                >
                  {step > num ? <Check className="w-3 h-3" /> : num}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Form Content */}
        <div className="my-8 flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            
            {/* Step 1: Initial Welcome & Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold">First, who are we planning for?</h3>
                  <p className="text-xs text-text-muted font-light mt-1">
                    Enter the basic details to help your copilot track claims and utility notification deadlines.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Decedent Name</label>
                    <input 
                      type="text"
                      placeholder="e.g. Robert Jenkins"
                      value={decedentName}
                      onChange={(e) => setDecedentName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-light text-xs focus:border-primary focus:outline-none bg-[#FAF9F6]/30"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Date of Passing</label>
                    <div className="relative flex items-center">
                      <Calendar className="w-4 h-4 text-text-muted absolute left-3.5 pointer-events-none" />
                      <input 
                        type="date"
                        value={passingDate}
                        onChange={(e) => setPassingDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light text-xs focus:border-primary focus:outline-none bg-[#FAF9F6]/30 text-text-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Your Representative Role</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Spouse', 'Child', 'Executor/Heir'].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setRelationship(role)}
                        className={`py-2.5 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${relationship === role ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-border-light text-text-muted hover:border-text-muted'}`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtext tips */}
                <div className="flex gap-2 p-3 bg-primary/5 border border-primary/10 rounded-xl mt-2">
                  <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-[10px] text-text-muted font-light leading-relaxed">
                    Have a death certificate? You can skip manual entries by clicking <strong>Simulate AI Scan</strong> in the next step to extract metadata automatically.
                  </span>
                </div>
              </motion.div>
            )}

            {/* Step 2: AI Document Scanner upload */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold">Empathetic AI Scan</h3>
                  <p className="text-xs text-text-muted font-light mt-1">
                    Upload certificates, wills, or insurance notices. Our neural network indices data to detect claims.
                  </p>
                </div>

                {/* Simulated scan upload box */}
                <div 
                  onClick={simulateOCR}
                  className="border-2 border-dashed border-border-light rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:border-primary/40 transition-colors bg-[#FAF9F6]/20 relative overflow-hidden"
                >
                  {isScanning && (
                    <motion.div 
                      initial={{ top: '0%' }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-0.5 bg-primary shadow-md z-10"
                    />
                  )}

                  <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                    <UploadCloud className="w-6 h-6 text-primary" />
                  </div>
                  
                  {scannedDocName ? (
                    <div>
                      <span className="text-xs font-semibold text-text-primary block">{scannedDocName}</span>
                      <span className="text-[10px] text-primary mt-1 font-bold block animate-pulse">
                        {isScanning ? 'Extracting details...' : 'Scan Complete!'}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-semibold text-text-primary block">Click here to Simulate AI Scan</span>
                      <span className="text-[10px] text-text-muted font-light mt-1 block">Simulate upload of Robert_Jenkins_DeathCert.pdf</span>
                    </div>
                  )}
                </div>

                {decedentName && (
                  <div className="p-3 bg-[#E8F5E9] border border-primary/20 rounded-xl flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-[10px] text-text-primary font-medium">
                      Extracted Name: <strong>{decedentName}</strong> • Date: <strong>{passingDate}</strong>
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Assistant Preferences */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold">Personalize your sanctuary</h3>
                  <p className="text-xs text-text-muted font-light mt-1">
                    Select communication preferences for your copilot assistant.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Communication Tone</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        onClick={() => setTone('Gentle')}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${tone === 'Gentle' ? 'bg-primary/5 border-primary' : 'bg-white border-border-light hover:border-text-muted'}`}
                      >
                        <span className="text-xs font-bold text-text-primary block">Gentle & Calm</span>
                        <span className="text-[10px] text-text-muted font-light mt-1 block">Empathetic, slow-paced, supporting message guides.</span>
                      </div>
                      <div 
                        onClick={() => setTone('Direct')}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${tone === 'Direct' ? 'bg-primary/5 border-primary' : 'bg-white border-border-light hover:border-text-muted'}`}
                      >
                        <span className="text-xs font-bold text-text-primary block">Direct & Task-Focused</span>
                        <span className="text-[10px] text-text-muted font-light mt-1 block">Minimal words, structured milestone checklists.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Loading Screen (Analyzing data) */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-5 py-8"
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-4 border-primary/10 border-t-primary rounded-full"
                  />
                  <Heart className="w-8 h-8 text-primary fill-primary/10 animate-pulse" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-xl font-bold">Compiling Estate Dashboard...</h3>
                  <div className="flex flex-col gap-1 text-[11px] text-text-muted font-light">
                    <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>Initializing document vault...</motion.span>
                    <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}>Calculating court probate deadlines...</motion.span>
                    <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}>Structuring family roadmaps...</motion.span>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Wizard Footer Controls */}
        {step <= 3 && (
          <div className="flex justify-between items-center border-t border-border-light/60 pt-6 select-none">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              disabled={step === 1}
              className="px-5 py-2.5 rounded-full border border-border-light text-text-muted text-xs font-semibold hover:border-text-muted transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={step === 1 && !decedentName}
              className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>{step === 3 ? 'Generate Workspace' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </Card>

    </div>
  );
};
