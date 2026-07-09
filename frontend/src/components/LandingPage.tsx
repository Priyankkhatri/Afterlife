import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Map, 
  Users, 
  ArrowRight, 
  ChevronRight, 
  FileText, 
  UploadCloud
} from 'lucide-react';
import { Card } from './ui/Card';
import { FloatUp } from './MotionWrappers';

type Props = {
  onEnterApp: () => void;
};

const chatPrompts = [
  {
    label: "What is my immediate task?",
    response: "Your most urgent step is ordering 5-10 certified copies of the Death Certificate. You will need these to notify banks, insurance providers, and credit bureaus."
  },
  {
    label: "Draft insurance claim letter",
    response: "I've compiled the policy data from MetLife. Here is the draft: 'Subject: Policy Claim Inquiry - Robert Jenkins. Dear Claims Dept, I am writing as the nominated beneficiary...'"
  },
  {
    label: "Explain Probate court",
    response: "Probate is the court-supervised process of authenticating a last will and testament, appointing an executor, and distributing assets to beneficiaries."
  }
];

// Mock documents for the interactive scanner demo
const sampleDocs = [
  {
    id: 'cert',
    name: 'Death_Certificate_Draft.pdf',
    type: 'Vital Record',
    status: 'Ready',
    size: '1.2 MB',
    extracted: [
      { key: 'Decedent', value: 'Robert Jenkins' },
      { key: 'Date of Passing', value: 'October 12, 2025' },
      { key: 'Place of Death', value: 'San Francisco, CA' },
      { key: 'Filing Deadline', value: 'January 10, 2026 (90 Days)' }
    ]
  },
  {
    id: 'insurance',
    name: 'MetLife_Policy_No_8892.pdf',
    type: 'Life Insurance',
    status: 'Ready',
    size: '3.4 MB',
    extracted: [
      { key: 'Provider', value: 'MetLife Financial Services' },
      { key: 'Policy Value', value: '$35,000' },
      { key: 'Beneficiary', value: 'Sarah Jenkins (Spouse)' },
      { key: 'Claim Requirements', value: 'Form FE-6, Certified Death Cert' }
    ]
  },
  {
    id: 'will',
    name: 'Last_Will_and_Testament.pdf',
    type: 'Legal Document',
    status: 'Ready',
    size: '2.1 MB',
    extracted: [
      { key: 'Executor Nominated', value: 'Sarah Jenkins' },
      { key: 'Estate Value', value: 'Real property & personal assets' },
      { key: 'Probate Required', value: 'Yes (County Court)' },
      { key: 'Witnesses', value: '2 Verified Signatures' }
    ]
  }
];

export const LandingPage = ({ onEnterApp }: Props) => {
  const [selectedDocId, setSelectedDocId] = useState('cert');
  const [scanning, setScanning] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  // Chat simulator state
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [typingMessage, setTypingMessage] = useState('');

  // 3D Card Hover Handler
  const handle3DMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10;
    const angleY = (x - xc) / 10;
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = '0 25px 50px -12px rgba(226, 154, 118, 0.12)';
  };

  const handle3DLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = 'none';
  };

  // Handle document scan simulation
  const triggerScan = (id: string) => {
    setSelectedDocId(id);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 2000);
  };

  // Handle chat prompt simulation
  const handleChatPrompt = (index: number) => {
    setActiveMessageIndex(index);
    setTypingMessage('');
    const fullText = chatPrompts[index].response;
    let currentIdx = 0;
    
    const interval = setInterval(() => {
      if (currentIdx < fullText.length) {
        setTypingMessage((prev) => prev + fullText.charAt(currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 15);
  };

  useEffect(() => {
    // Run initial chat simulation
    handleChatPrompt(0);
  }, []);

  const activeDoc = sampleDocs.find(d => d.id === selectedDocId) || sampleDocs[0];

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      title: "Secure Encrypted Vault",
      desc: "Bank-grade AES-256 standard encryption protects death certificates, wills, accounts, and policies in a designated vault."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      title: "Intelligent OCR Benefits Scanning",
      desc: "Upload insurance policies and court documents. Our OCR engine parses values, requirements, and deadlines automatically."
    },
    {
      icon: <Map className="w-5 h-5 text-primary" />,
      title: "Personalized Estate Roadmap",
      desc: "Chronological milestone timeline guiding you through probate courts, tax filings, and utility transfers."
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      title: "Family Access & Nomination",
      desc: "Share tasks, coordinate milestones, and assign access levels to trusted family attorneys or heirs."
    }
  ];

  const faqs = [
    {
      q: "Is my personal data encrypted and secure?",
      a: "Yes. Afterlife encrypts all uploaded documents using bank-grade AES-256 standard encryption. We only index details required to compile your claims checklist."
    },
    {
      q: "How does the AI claims detection work?",
      a: "Our model reads legal documents (like MetLife or SSA filings) to identify policy values, beneficiary requirements, and filing deadlines, compiling them automatically."
    },
    {
      q: "Can I invite my family attorney or co-executors?",
      a: "Absolutely. You can invite other representatives via email with custom permission levels (viewer or editor) to help coordinate tasks."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-text-primary selection:bg-primary/10 overflow-x-hidden font-sans relative">
      
      {/* Dynamic Mesh Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-0 w-[400px] h-[400px] rounded-full bg-accent-warm/5 blur-[100px] pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#FAF9F6]/80 backdrop-blur-md z-40 border-b border-border-light/40 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <Heart className="w-5 h-5 text-primary fill-primary/10" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-text-primary">Afterlife</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-text-muted">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#interactive-demo" className="hover:text-primary transition-colors">Interactive Demo</a>
          <a href="#faq" className="hover:text-primary transition-colors">Common FAQs</a>
        </nav>

        <button 
          onClick={onEnterApp}
          className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-semibold shadow-sm hover:bg-primary-hover transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Enter Sanctuary App</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 lg:px-12 max-w-7xl mx-auto text-center relative">
        <FloatUp delay={0.1} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold tracking-wide uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5 fill-primary/10 animate-pulse" />
          <span>Interactive AI Death Administration Copilot</span>
        </FloatUp>

        <FloatUp delay={0.2} className="max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-text-primary tracking-tight leading-[1.1] mb-6">
            Calm, organized support when you need it most.
          </h1>
        </FloatUp>

        <FloatUp delay={0.3} className="max-w-2xl mx-auto">
          <p className="text-sm lg:text-base text-text-muted font-light leading-relaxed mb-8">
            Manage probate records, coordinate tasks, scan insurance documents to claim benefits, and coordinate executor duties. We handle the paperwork, letting families focus on remembrance and healing.
          </p>
        </FloatUp>

        <FloatUp delay={0.4} className="flex justify-center gap-4">
          <button 
            onClick={onEnterApp}
            className="px-8 py-4 rounded-full bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary-hover hover:shadow-xl transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Launch Sandbox Copilot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </FloatUp>
      </section>

      {/* Showcase Grid (Simulated Interactive UI Core) */}
      <section id="interactive-demo" className="px-6 lg:px-12 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Module 1: Interactive Document Scanner Simulator */}
        <FloatUp delay={0.5} className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-4 mb-6">
            <span className="text-[11px] font-bold text-primary tracking-wide uppercase">Sandbox Demo 01</span>
            <h2 className="text-3xl font-serif font-bold text-text-primary">Interactive Benefits OCR</h2>
            <p className="text-xs text-text-muted font-light leading-relaxed">
              Select one of the sample estate documents below to simulate our OCR scanning engine. Watch how Afterlife analyzes coordinates, indexes names, and builds claims automatically.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-border-light shadow-md flex-1 flex flex-col gap-6 relative">
            
            {/* Tabs Row */}
            <div className="flex gap-2 p-1 bg-[#FAF9F6] border border-border-light rounded-xl">
              {sampleDocs.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => triggerScan(doc.id)}
                  className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${selectedDocId === doc.id ? 'bg-white shadow-xs text-primary' : 'text-text-muted hover:text-text-primary'}`}
                >
                  {doc.type}
                </button>
              ))}
            </div>

            {/* Document Sandbox Visualizer */}
            <div className="bg-[#FAF9F6]/40 border border-border-light/60 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden min-h-[220px] justify-center">
              
              {scanning && (
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(226,154,118,0.8)] z-10"
                />
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-text-primary">{activeDoc.name}</h4>
                  <span className="text-[10px] text-text-muted font-light">{activeDoc.size} • {activeDoc.type}</span>
                </div>
              </div>

              <div className="border-t border-border-light pt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-text-muted uppercase tracking-wide">
                  <span>Extracted Metadata</span>
                  <span className="text-primary flex items-center gap-1">
                    {scanning ? 'OCR Indexing...' : 'Scan Complete'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-1">
                  {activeDoc.extracted.map((field, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-2 rounded-lg bg-white border border-[#F2F2F2] flex flex-col gap-0.5"
                    >
                      <span className="text-[9px] text-text-muted font-light">{field.key}</span>
                      <span className="text-[11px] font-bold text-text-primary truncate">{field.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

            <button 
              onClick={onEnterApp}
              className="w-full py-3 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Simulate Custom PDF Upload</span>
            </button>

          </div>
        </FloatUp>

        {/* Module 2: Interactive AI Chatbot Simulator */}
        <FloatUp delay={0.6} className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-4 mb-6">
            <span className="text-[11px] font-bold text-primary tracking-wide uppercase">Sandbox Demo 02</span>
            <h2 className="text-3xl font-serif font-bold text-text-primary">Empathetic AI Copilot</h2>
            <p className="text-xs text-text-muted font-light leading-relaxed">
              Ask the Afterlife Copilot common administrative or grief-coordination questions. Test the responsive conversation interface below to see how our assistant guides you.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-border-light shadow-md flex-1 flex flex-col justify-between gap-6">
            
            {/* Conversation Window */}
            <div className="flex-1 bg-[#FAF9F6]/40 border border-border-light/60 rounded-2xl p-5 flex flex-col gap-4 min-h-[220px]">
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-primary fill-primary/10" />
                </div>
                <div className="flex-1 p-3 rounded-2xl bg-white border border-[#F2F2F2]">
                  <span className="text-[10px] font-bold text-primary tracking-wide uppercase block mb-1">Afterlife Assistant</span>
                  <p className="text-xs text-text-primary leading-relaxed font-light">
                    Hello. I am here to assist with any document organization, notification drafting, or general estate questions.
                  </p>
                </div>
              </div>

              {/* Typed user response block */}
              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 p-3 rounded-2xl bg-primary text-white border border-primary-hover max-w-[80%]">
                  <span className="text-[9px] font-bold opacity-80 uppercase block mb-1">User Inquiry</span>
                  <p className="text-xs leading-relaxed font-semibold">
                    {chatPrompts[activeMessageIndex].label}
                  </p>
                </div>
              </div>

              {/* Bot typing block */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-primary fill-primary/10" />
                </div>
                <div className="flex-1 p-3 rounded-2xl bg-white border border-[#F2F2F2]">
                  <span className="text-[10px] font-bold text-primary tracking-wide uppercase block mb-1">Afterlife Assistant</span>
                  <p className="text-xs text-text-primary leading-relaxed font-light min-h-[40px] whitespace-pre-wrap">
                    {typingMessage || '...'}
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Actions Prompts */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Test Prompts</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {chatPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleChatPrompt(index)}
                    className={`py-2 px-3 text-[10px] rounded-lg border text-left font-medium transition-all cursor-pointer truncate ${activeMessageIndex === index ? 'bg-primary/5 border-primary text-primary' : 'bg-white border-border-light text-text-muted hover:border-text-muted hover:text-text-primary'}`}
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </FloatUp>

      </section>

      {/* Feature Grid with 3D Tilt Hover Effects */}
      <section id="features" className="bg-[#FFFFFF] border-y border-border-light py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6">
              Settle estate tasks securely
            </h2>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              We know estate paperwork is stressful. Afterlife provides calm, structured coordinates to manage tasks at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, index) => (
              <FloatUp key={index} delay={0.1 * index}>
                <div 
                  onMouseMove={handle3DMove}
                  onMouseLeave={handle3DLeave}
                  className="h-full flex flex-col gap-4 p-8 border border-[#F0F0F0] rounded-3xl bg-[#FAF9F6]/20 transition-all duration-200 ease-out cursor-default transform"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10" style={{ transform: 'translateZ(15px)' }}>
                    {feat.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-text-primary" style={{ transform: 'translateZ(20px)' }}>{feat.title}</h3>
                  <p className="text-xs text-text-muted font-light leading-relaxed" style={{ transform: 'translateZ(10px)' }}>{feat.desc}</p>
                </div>
              </FloatUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Grid Section */}
      <section id="faq" className="py-28 px-6 lg:px-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-center mb-16">
          Common Questions
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isSelected = selectedFaq === index;
            return (
              <Card 
                key={index}
                className="p-6 cursor-pointer border border-border-light hover:border-primary/20 transition-all duration-300"
              >
                <div 
                  onClick={() => setSelectedFaq(isSelected ? null : index)}
                  className="flex justify-between items-center gap-4"
                >
                  <h4 className="font-serif text-sm lg:text-base font-bold text-text-primary">{faq.q}</h4>
                  <div className={`w-6 h-6 rounded-full bg-[#FAF9F6] border border-border-light flex items-center justify-center transform transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`}>
                    <ChevronRight className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                </div>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-text-muted font-light leading-relaxed border-t border-border-light/60 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="bg-primary text-white py-24 px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary-hover via-primary to-transparent opacity-60 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6">
            Take your time. Let Afterlife help.
          </h2>
          <p className="text-xs lg:text-sm text-[#E8F5E9] font-light max-w-xl mx-auto leading-relaxed mb-10">
            Settle estate tasks securely with our empathetic administrative copilot. There is no timeline for grief. Settle folders at your own pace.
          </p>
          <button 
            onClick={onEnterApp}
            className="px-8 py-4 rounded-full bg-white text-primary text-sm font-semibold shadow-lg hover:bg-[#F5FBF6] transition-colors inline-flex items-center gap-1.5 active:scale-95 duration-200 cursor-pointer"
          >
            <span>Launch Sandbox Copilot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FAF9F6] border-t border-border-light/60 py-12 px-6 lg:px-12 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-text-muted">
          <span className="font-serif text-lg font-bold text-text-primary">Afterlife</span>
          <span>© 2026 Afterlife Technologies Inc. Settle with care.</span>
        </div>
      </footer>

    </div>
  );
};
