import { useState, useEffect, useRef } from 'react';
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
  TrendingUp,
  Fingerprint,
  FileCheck
} from 'lucide-react';
import { Card } from './ui/Card';
import { FloatUp } from './MotionWrappers';

type Props = {
  onEnterApp: () => void;
};

// 2D Flow Canvas Particle Graphic Component
const FlowCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    // Colors matching our warm orange and sage palette
    const colors = ['rgba(226, 154, 118, 0.25)', 'rgba(140, 165, 150, 0.25)', 'rgba(166, 180, 196, 0.25)'];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(226, 154, 118, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none -z-10" />;
};

// Interactive Grief Breathing Tool (Empathetic Sanctuary Widget)
const BreathingWidget = () => {
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [timer, setTimer] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (breathPhase === 'in') {
            setBreathPhase('hold');
            return 4;
          } else if (breathPhase === 'hold') {
            setBreathPhase('out');
            return 4;
          } else {
            setBreathPhase('in');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [breathPhase]);

  const getInstructions = () => {
    switch (breathPhase) {
      case 'in': return 'Breathe In';
      case 'hold': return 'Hold & Rest';
      case 'out': return 'Breathe Out';
    }
  };

  const getScale = () => {
    switch (breathPhase) {
      case 'in': return 1.4;
      case 'hold': return 1.4;
      case 'out': return 1.0;
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center text-center p-8 bg-white border border-border-light relative overflow-hidden group min-h-[300px]">
      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wide">
        <Heart className="w-3 h-3 fill-primary/10" />
        <span>Grief Sanctuary</span>
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center mt-6">
        <motion.div
          animate={{ scale: getScale() }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-primary/5 border border-primary/20"
        />
        <motion.div
          animate={{ scale: getScale() * 0.85 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-4 rounded-full bg-primary/10"
        />
        <div className="relative z-10 flex flex-col items-center">
          <span className="font-serif text-sm font-semibold text-text-primary transition-all duration-500">
            {getInstructions()}
          </span>
          <span className="text-[10px] text-text-muted mt-1 font-mono">{timer}s</span>
        </div>
      </div>
      <p className="text-[11px] text-text-muted font-light leading-relaxed max-w-[200px] mt-6">
        Take a moment for yourself. Pause and align before coordination tasks.
      </p>
    </Card>
  );
};

export const LandingPage = ({ onEnterApp }: Props) => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

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
    <div className="min-h-screen bg-[#FAF9F6] text-text-primary selection:bg-primary/10 overflow-x-hidden font-sans relative">
      
      {/* 2D Floating Flow Graphic Background */}
      <FlowCanvas />

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#FAF9F6]/80 backdrop-blur-lg z-40 border-b border-border-light/40 px-6 lg:px-12 flex items-center justify-between">
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
          className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-semibold shadow-md hover:bg-primary-hover transition-all duration-300 flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <span>Launch Copilot</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-10 animate-pulse" />

        {/* Floating Interactive 2D Elements in Hero */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-10 top-40 hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-md border border-border-light text-xs font-medium"
        >
          <Fingerprint className="w-4 h-4 text-primary" />
          <span>Biometric Secure Vault</span>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute right-12 top-48 hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-md border border-border-light text-xs font-medium"
        >
          <FileCheck className="w-4 h-4 text-primary" />
          <span>Claims Checklist Extracted</span>
        </motion.div>

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
            className="px-8 py-4 rounded-full bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
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
          {/* 3D Interactive Tilt Card (App Preview Container) */}
          <div 
            onMouseMove={handle3DMove}
            onMouseLeave={handle3DLeave}
            className="bg-white rounded-3xl p-4 shadow-xl border border-border-light/60 overflow-hidden relative group transition-all duration-200 ease-out transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
            <div className="bg-[#FAF9F6]/50 rounded-2xl p-6 border border-border-light flex flex-col gap-6" style={{ transform: 'translateZ(20px)' }}>
              
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
                <Card className="flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-primary tracking-wide uppercase">AI Scan</span>
                    <Clock className="w-3.5 h-3.5 text-text-muted" />
                  </div>
                  <h4 className="font-serif text-sm font-bold">certified_death_certificate.pdf</h4>
                  <div className="h-2 w-full bg-border-light rounded-full overflow-hidden mt-1">
                    <motion.div 
                      animate={{ width: ['0%', '75%'] }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full" 
                    />
                  </div>
                  <span className="text-[10px] text-text-muted">Extracted 4 major deadlines</span>
                </Card>

                {/* Column 2: Claims */}
                <Card className="flex flex-col gap-3 border border-primary/25 bg-primary/5 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-primary tracking-wide uppercase">Detected Claim</span>
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <h4 className="font-serif text-sm font-bold">MetLife Life Insurance</h4>
                  <p className="text-xs font-serif text-primary font-bold">$35,000 Estimated Value</p>
                  <span className="text-[10px] text-text-muted">Draft letter template prepared</span>
                </Card>

                {/* Column 3: Copilot */}
                <Card className="flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-text-muted tracking-wide uppercase">AI Copilot</span>
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-[11px] text-text-muted font-light italic leading-relaxed">
                    "I have drafted the Social Security Administration notification form. Ready to review?"
                  </p>
                  <button 
                    onClick={onEnterApp}
                    className="w-full py-2 bg-primary text-white text-[11px] font-bold rounded-lg mt-1 cursor-pointer"
                  >
                    Open Copilot
                  </button>
                </Card>

              </div>
            </div>
          </div>
        </FloatUp>
      </section>

      {/* Grid displaying 3D tilt feature cards + Interactive Breathing Box */}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Features list (takes 2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:col-span-2">
              {features.map((feat, index) => (
                <FloatUp key={index} delay={0.1 * index}>
                  <div 
                    onMouseMove={handle3DMove}
                    onMouseLeave={handle3DLeave}
                    className="h-full flex flex-col gap-4 p-8 border border-[#F0F0F0] rounded-2xl bg-[#FAF9F6]/20 transition-all duration-200 ease-out cursor-default"
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

            {/* Breathing Sanctuary widget (takes 1 column) */}
            <FloatUp delay={0.3} className="h-full">
              <BreathingWidget />
            </FloatUp>

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
