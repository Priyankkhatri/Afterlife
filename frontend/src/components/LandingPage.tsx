import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Map, 
  Users, 
  ArrowRight, 
  Clock, 
  ChevronRight, 
  Play, 
  TrendingUp
} from 'lucide-react';
import { Card } from './ui/Card';
import { FloatUp } from './MotionWrappers';

type Props = {
  onEnterApp: () => void;
};

export const LandingPage = ({ onEnterApp }: Props) => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      title: "Secure Document Vault",
      desc: "Encrypt and organize death certificates, wills, bills, and insurance policies in one secure drawer."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      title: "AI Claims Recognition",
      desc: "Our neural model scans uploaded policies to extract unclaimed assets, pensions, and insurance benefits."
    },
    {
      icon: <Map className="w-5 h-5 text-primary" />,
      title: "Step-by-Step Roadmap",
      desc: "A personalized, chronological guide through vital records, probate courts, and utility notifications."
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      title: "Family Co-Execution",
      desc: "Share tasks, sync timelines, and securely collaborate with legal nominees or family members."
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
    <div className="min-h-screen bg-[#FAF9F6] text-text-primary selection:bg-primary/10 overflow-x-hidden font-sans">
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#FAF9F6]/85 backdrop-blur-md z-40 border-b border-border-light/40 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/25">
            <Heart className="w-5 h-5 text-primary fill-primary/10 animate-pulse" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-text-primary">Afterlife</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-text-muted">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#demo" className="hover:text-primary transition-colors">How it works</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQs</a>
        </nav>

        <button 
          onClick={onEnterApp}
          className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-semibold shadow-md hover:bg-primary-hover transition-colors flex items-center gap-1.5 active:scale-95 duration-200"
        >
          <span>Launch Copilot</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-10" />

        <FloatUp delay={0.1} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-bold tracking-wide uppercase mb-8">
          <Sparkles className="w-3.5 h-3.5 fill-primary/10" />
          <span>Empathetic AI Estate Administration</span>
        </FloatUp>

        <FloatUp delay={0.2} className="max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-text-primary tracking-tight leading-[1.1] mb-6">
            Plan with calm.<br />AI handles the paperwork.
          </h1>
        </FloatUp>

        <FloatUp delay={0.3} className="max-w-2xl">
          <p className="text-sm lg:text-base text-text-muted font-light leading-relaxed mb-10">
            Afterlife is your supportive digital assistant for loss administration. We securely organize folders, scan policies to detect unclaimed benefits, and draft notifications—helping families heal while we organize the chores.
          </p>
        </FloatUp>

        <FloatUp delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center w-full">
          <button 
            onClick={onEnterApp}
            className="px-8 py-4 rounded-full bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Get Started for Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a 
            href="#demo"
            className="px-8 py-4 rounded-full bg-white border border-border-light text-text-primary text-sm font-semibold shadow-sm hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
          >
            <Play className="w-4 h-4 text-primary fill-primary/10" />
            <span>See How it Works</span>
          </a>
        </FloatUp>
      </section>

      {/* Main App Layout Preview Frame */}
      <section id="demo" className="px-6 lg:px-12 pb-28 max-w-6xl mx-auto">
        <FloatUp delay={0.5}>
          <div className="bg-white rounded-3xl p-4 shadow-xl border border-border-light/60 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
            <div className="bg-[#FAF9F6]/50 rounded-2xl p-6 border border-border-light flex flex-col gap-6">
              
              {/* Fake dashboard preview row */}
              <div className="flex justify-between items-center pb-4 border-b border-border-light/60">
                <div>
                  <h3 className="font-serif text-lg font-bold text-text-primary">Estate Dashboard</h3>
                  <p className="text-xs text-text-muted font-light mt-0.5">Executor Hub Overview</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  33% Complete
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Column 1: Scanned policy */}
                <Card className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-primary tracking-wide uppercase">AI Scan</span>
                    <Clock className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                  <h4 className="font-serif text-sm font-bold">certified_death_certificate.pdf</h4>
                  <div className="h-2 w-full bg-border-light rounded-full overflow-hidden mt-1">
                    <div className="h-full w-3/4 bg-primary rounded-full" />
                  </div>
                  <span className="text-[10px] text-text-muted">Extracted 4 major deadlines</span>
                </Card>

                {/* Column 2: Claims */}
                <Card className="flex flex-col gap-3 border border-primary/25 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-primary tracking-wide uppercase">Detected Claim</span>
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h4 className="font-serif text-sm font-bold">MetLife Life Insurance</h4>
                  <p className="text-xs font-serif text-primary font-bold">$35,000 Estimated Value</p>
                  <span className="text-[10px] text-text-muted">Draft letter template prepared</span>
                </Card>

                {/* Column 3: Copilot */}
                <Card className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-text-muted tracking-wide uppercase">AI Copilot</span>
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-[11px] text-text-muted font-light italic leading-relaxed">
                    "I have drafted the Social Security Administration notification form. Ready to review?"
                  </p>
                  <button 
                    onClick={onEnterApp}
                    className="w-full py-2 bg-primary text-white text-[11px] font-bold rounded-lg mt-1"
                  >
                    Open Copilot
                  </button>
                </Card>

              </div>
            </div>
          </div>
        </FloatUp>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="bg-[#FFFFFF] border-y border-border-light py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6">
              Empathetic coordination tools
            </h2>
            <p className="text-sm text-text-muted font-light leading-relaxed">
              We know estate paperwork is stressful. Afterlife provides calm, structured coordinates to settle tasks at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, index) => (
              <FloatUp key={index} delay={0.1 * index}>
                <Card className="h-full flex flex-col gap-4 p-8 border border-[#F0F0F0] animateHover bg-[#FAF9F6]/20">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                    {feat.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-text-primary">{feat.title}</h3>
                  <p className="text-xs text-text-muted font-light leading-relaxed">{feat.desc}</p>
                </Card>
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
            className="px-8 py-4 rounded-full bg-white text-primary text-sm font-semibold shadow-lg hover:bg-[#F5FBF6] transition-colors inline-flex items-center gap-1.5 active:scale-95 duration-200"
          >
            <span>Launch Copilot App</span>
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
