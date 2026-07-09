import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ArrowRight, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff
} from 'lucide-react';

type Props = {
  onSuccess: () => void;
  onBack: () => void;
};

export const AuthPage = ({ onSuccess, onBack }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Password strength meter calculation
  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: 'Empty', color: 'bg-border-light' };
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 1: return { score: 25, label: 'Weak', color: 'bg-danger' };
      case 2: return { score: 50, label: 'Fair', color: 'bg-warning' };
      case 3: return { score: 75, label: 'Good', color: 'bg-[#FFB74D]' };
      case 4: return { score: 100, label: 'Strong & Secure', color: 'bg-primary' };
      default: return { score: 10, label: 'Too Short', color: 'bg-danger' };
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API authorization response
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-text-primary flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Decorative Halo Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none -z-10" />

      {/* Main Glassmorphic Container Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl bg-white/70 backdrop-blur-lg border border-border-light rounded-3xl overflow-hidden shadow-2xl min-h-[580px] grid grid-cols-1 md:grid-cols-12 items-stretch"
      >
        
        {/* Left Panel: Empathetic Brand Messaging (5 Columns) */}
        <div className="md:col-span-5 bg-primary p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary-hover via-primary to-transparent opacity-60 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <button 
              onClick={onBack}
              className="self-start text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              ← Back to Main
            </button>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/25">
                <Heart className="w-4 h-4 text-white fill-white/10" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">Afterlife</span>
            </div>
          </div>

          <div className="relative z-10 my-8">
            <h2 className="text-3xl font-serif font-bold leading-tight mb-4">
              Settle details with absolute calm.
            </h2>
            <p className="text-[11px] text-[#E8F5E9] leading-relaxed font-light">
              Your data is encrypted using standard AES-256 bank-level security before processing any estate checklist documents.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-3 border-t border-white/20 pt-6">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-[#81C784]" />
              <span className="font-light text-[#E8F5E9]">AI Copilot Sandbox Ready</span>
            </div>
            <span className="text-[10px] text-white/50 font-mono">Build v1.0.4 • Sandbox Active</span>
          </div>

        </div>

        {/* Right Panel: Interactive Form with Slide Animation (7 Columns) */}
        <div className="md:col-span-7 p-8 lg:p-12 flex flex-col justify-center bg-white relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: isLogin ? 25 : -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? -25 : 25 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              
              {/* Form Title */}
              <div>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-text-primary">
                  {isLogin ? 'Sign in to Sanctuary' : 'Create Sandbox Account'}
                </h3>
                <p className="text-xs text-text-muted font-light mt-1">
                  {isLogin ? 'Access your estate roadmaps and benefits vault' : 'Start organizing your copilot roadmap in seconds'}
                </p>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                
                {/* Name field (Only on signup) */}
                {!isLogin && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Nominee Name</label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-text-muted absolute left-3.5" />
                      <input 
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Jenkins"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light text-xs focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* Email address field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Email Address</label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-text-muted absolute left-3.5" />
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@estate.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light text-xs focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-muted uppercase tracking-wide">Account Password</label>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-text-muted absolute left-3.5" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-border-light text-xs focus:border-primary focus:outline-none transition-colors"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-text-muted hover:text-text-primary cursor-pointer focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator (Only on signup) */}
                  {!isLogin && password && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex flex-col gap-1.5 mt-1.5 overflow-hidden"
                    >
                      <div className="h-1 w-full bg-border-light rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: `${passwordStrength.score}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-medium text-text-muted flex justify-between">
                        <span>Security: {passwordStrength.label}</span>
                        <span>{passwordStrength.score}%</span>
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Terms Acceptance checkbox (Only on signup) */}
                {!isLogin && (
                  <div className="flex items-start gap-2.5 mt-1">
                    <input 
                      type="checkbox" 
                      required 
                      className="mt-0.5 border-border-light rounded text-primary focus:ring-primary"
                    />
                    <span className="text-[10px] text-text-muted font-light leading-relaxed">
                      I consent to secure processing of test estate data. I understand this sandbox does not store actual records.
                    </span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover shadow-md transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{isLogin ? 'Sign In & Launch App' : 'Create Sandbox Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Form Toggles */}
              <div className="flex flex-col gap-3 text-center border-t border-border-light pt-6 mt-2 text-xs">
                <span className="text-text-muted font-light">
                  {isLogin ? "New to Afterlife?" : "Already have a sandbox account?"}{' '}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setPassword('');
                    }}
                    className="text-primary font-semibold hover:underline focus:outline-none cursor-pointer"
                  >
                    {isLogin ? 'Create Account' : 'Sign In'}
                  </button>
                </span>

                {isLogin && (
                  <button 
                    onClick={onSuccess}
                    className="text-[11px] text-text-muted hover:text-text-primary underline cursor-pointer"
                  >
                    Continue as Sandbox Guest
                  </button>
                )}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </motion.div>

    </div>
  );
};
