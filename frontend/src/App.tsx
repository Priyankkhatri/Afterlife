import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { FloatingDock } from './components/FloatingDock';
import { Dashboard } from './components/Dashboard';
import { ActionRoadmap } from './components/ActionRoadmap';
import { ReviewDrawer } from './components/ReviewDrawer';
import { SanctuaryModal } from './components/SanctuaryModal';
import { Toast, ToastType } from './components/Toast';
import { FloatUp } from './components/MotionWrappers';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SplashScreen } from './components/SplashScreen';
import { Mail, Phone } from 'lucide-react';
import { Card } from './components/ui/Card';
import { UrgentTask } from './types';

// Placeholder mock component for Vault to prevent compilation errors
import { Vault } from './components/Vault';
import { LandingPage } from './components/LandingPage';

function App() {
  const [appLoading, setAppLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [activeReviewTask, setActiveReviewTask] = useState<UrgentTask | null>(null);
  const [sanctuaryActive, setSanctuaryActive] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<ToastType>('success');

  const showToast = (message: string, type: ToastType = 'success') => {
    setToastMessage(null); // Clear previous
    setToastType(type);
    setTimeout(() => {
      setToastMessage(message);
    }, 100);
  };

  const handleApprove = (_taskId: string, _text: string) => {
    // Prefix parameters with '_' to resolve eslint unused parameter warnings
    showToast("Email draft approved and sent successfully.", 'success');
    setActiveReviewTask(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Dashboard 
            onReviewAction={(task: UrgentTask) => setActiveReviewTask(task)} 
          />
        );
      case 'tasks':
        return (
          <ActionRoadmap 
            showToast={(msg) => showToast(msg, 'success')}
          />
        );
      case 'vault':
        return (
          <Vault 
            showToast={(msg) => showToast(msg, 'success')}
          />
        );
      case 'profile':
        return (
          <div className="flex flex-col gap-10 max-w-2xl">
            <FloatUp delay={0.1} className="border-b border-border-light pb-8">
              <h1 className="text-4xl font-serif text-text-primary">Personal Guidance Settings</h1>
              <p className="text-sm text-text-muted font-light mt-1">
                Customize your administrative copilot's tone, contact lists, and estate details.
              </p>
            </FloatUp>

            <div className="flex flex-col gap-6">
              {/* Card 1 */}
              <FloatUp delay={0.2}>
                <Card className="flex flex-col gap-4 animateHover">
                  <h3 className="font-serif text-xl text-text-primary">Estate Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="text-text-muted font-light block">Representative</span>
                      <span className="text-text-primary font-medium mt-0.5 block">Priyank Khatri</span>
                    </div>
                    <div>
                      <span className="text-text-muted font-light block">Estate Status</span>
                      <span className="text-text-primary font-medium mt-0.5 block">Executor (Probate Pending)</span>
                    </div>
                  </div>
                </Card>
              </FloatUp>

              {/* Card 2 */}
              <FloatUp delay={0.3}>
                <Card className="flex flex-col gap-4 animateHover">
                  <h3 className="font-serif text-xl text-text-primary">Empathetic Communication Tone</h3>
                  <p className="text-xs text-text-muted font-light leading-relaxed">
                    We adapt our assistant's responses to your preference. You can change this at any time.
                  </p>
                  <div className="flex gap-3 mt-2">
                    <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium cursor-pointer">
                      Gentle & Calm (Default)
                    </span>
                    <span className="px-4 py-2 rounded-full border border-border-light text-text-muted text-xs hover:border-secondary transition-colors cursor-pointer">
                      Direct & Task-Focused
                    </span>
                  </div>
                </Card>
              </FloatUp>

              {/* Card 3 */}
              <FloatUp delay={0.4}>
                <Card className="flex flex-col gap-4 animateHover">
                  <h3 className="font-serif text-xl text-text-primary">Support Contacts</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-background dark:bg-background/25 border border-border-light text-xs">
                      <Mail className="w-4 h-4 text-text-muted" />
                      <span className="text-text-primary font-medium">support@afterlife.co</span>
                    </div>
                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-background dark:bg-background/25 border border-border-light text-xs">
                      <Phone className="w-4 h-4 text-text-muted" />
                      <span className="text-text-primary font-medium">+1 (800) 555-0199 (Grief Counselor Line)</span>
                    </div>
                  </div>
                </Card>
              </FloatUp>
            </div>
          </div>
        );
      default:
        return (
          <Dashboard 
            onReviewAction={(task: UrgentTask) => setActiveReviewTask(task)} 
          />
        );
    }
  };

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {appLoading ? (
          <SplashScreen key="splash" onComplete={() => setAppLoading(false)} />
        ) : showLanding ? (
          <LandingPage key="landing" onEnterApp={() => setShowLanding(false)} />
        ) : (
          <motion.div
            key="app-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Page Layout */}
            <Layout 
              onSanctuaryClick={() => setSanctuaryActive(true)} 
              isSanctuaryActive={sanctuaryActive}
            >
              <div className="pb-28">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Layout>

            {/* Floating Navigation Dock */}
            <FloatingDock activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Global Slide-out Drawer */}
            <ReviewDrawer 
              task={activeReviewTask} 
              onClose={() => setActiveReviewTask(null)} 
              onApprove={handleApprove} 
            />

            {/* Sanctuary Modal */}
            <SanctuaryModal 
              isOpen={sanctuaryActive} 
              onClose={() => setSanctuaryActive(false)} 
            />

            {/* Global Bubble Toast Notification */}
            <Toast 
              message={toastMessage} 
              type={toastType}
              onClose={() => setToastMessage(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;
