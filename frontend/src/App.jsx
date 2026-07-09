import { useState } from 'react';
import { Layout } from './components/Layout';
import { FloatingDock } from './components/FloatingDock';
import { Dashboard } from './components/Dashboard';
import { Vault } from './components/Vault';
import { ActionRoadmap } from './components/ActionRoadmap';
import { ReviewDrawer } from './components/ReviewDrawer';
import { FloatUp } from './components/MotionWrappers';
import { 
  Mail, 
  Phone 
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeReviewTask, setActiveReviewTask] = useState(null);

  const handleApprove = (taskId, text) => {
    alert(`Approved communication draft. The message has been secured and sent successfully.`);
    setActiveReviewTask(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onReviewAction={(task) => setActiveReviewTask(task)} />;
      case 'tasks':
        return <ActionRoadmap />;
      case 'vault':
        return <Vault />;
      case 'profile':
        return (
          <div className="flex flex-col gap-10 max-w-2xl">
            <FloatUp delay={0.1} className="border-b border-[#F0F0F0] pb-8">
              <h1 className="text-4xl font-serif text-text-primary">Personal Guidance Settings</h1>
              <p className="text-sm text-text-muted font-light mt-1">
                Customize your administrative copilot's tone, contact lists, and estate details.
              </p>
            </FloatUp>

            <div className="flex flex-col gap-6">
              {/* Card 1 */}
              <FloatUp delay={0.2} className="bg-white p-8 rounded-3xl border border-[#F0F0F0] shadow-antigravity flex flex-col gap-4">
                <h3 className="font-serif text-xl text-text-primary">Estate Information</h3>
                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-text-muted font-light block">Representative</span>
                    <span className="text-text-primary font-medium mt-0.5 block">Priya Khatri</span>
                  </div>
                  <div>
                    <span className="text-text-muted font-light block">Estate Status</span>
                    <span className="text-text-primary font-medium mt-0.5 block">Executor (Probate Pending)</span>
                  </div>
                </div>
              </FloatUp>

              {/* Card 2 */}
              <FloatUp delay={0.3} className="bg-white p-8 rounded-3xl border border-[#F0F0F0] shadow-antigravity flex flex-col gap-4">
                <h3 className="font-serif text-xl text-text-primary">Empathetic Communication Tone</h3>
                <p className="text-xs text-text-muted font-light leading-relaxed">
                  We adapt our assistant's responses to your preference. You can change this at any time.
                </p>
                <div className="flex gap-3 mt-2">
                  <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium cursor-pointer">
                    Gentle & Calm (Default)
                  </span>
                  <span className="px-4 py-2 rounded-full border border-[#F0F0F0] text-text-muted text-xs hover:border-secondary transition-colors cursor-pointer">
                    Direct & Task-Focused
                  </span>
                </div>
              </FloatUp>

              {/* Card 3 */}
              <FloatUp delay={0.4} className="bg-white p-8 rounded-3xl border border-[#F0F0F0] shadow-antigravity flex flex-col gap-4">
                <h3 className="font-serif text-xl text-text-primary">Support Contacts</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-background text-xs">
                    <Mail className="w-4 h-4 text-text-muted" />
                    <span className="text-text-primary font-medium">support@afterlife.co</span>
                  </div>
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-background text-xs">
                    <Phone className="w-4 h-4 text-text-muted" />
                    <span className="text-text-primary font-medium">+1 (800) 555-0199 (Grief Counselor Line)</span>
                  </div>
                </div>
              </FloatUp>
            </div>
          </div>
        );
      default:
        return <Dashboard onReviewAction={(task) => setActiveReviewTask(task)} />;
    }
  };

  return (
    <Layout>
      <div className="pb-28">
        {renderContent()}
      </div>
      <FloatingDock activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Global Slide-out Drawer */}
      <ReviewDrawer 
        task={activeReviewTask} 
        onClose={() => setActiveReviewTask(null)} 
        onApprove={handleApprove} 
      />
    </Layout>
  );
}

export default App;
