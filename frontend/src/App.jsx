import { useState } from 'react';
import { Layout } from './components/Layout';
import { FloatingDock } from './components/FloatingDock';
import { Dashboard } from './components/Dashboard';
import { FloatUp } from './components/MotionWrappers';
import { 
  Clock, 
  Plus, 
  Upload, 
  Search, 
  Mail, 
  Phone 
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Tasks state
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Request Certified Copies of Death Certificate', category: 'Legal & Certificates', dueDate: 'Due in 3 days', completed: false },
    { id: '2', title: 'Notify Social Security Administration', category: 'Government & Benefits', dueDate: 'Due in 7 days', completed: false },
    { id: '3', title: 'Close Credit Card & Subscription Accounts', category: 'Financial Services', dueDate: 'Completed', completed: true },
    { id: '4', title: 'Initiate Probate & Estate Process', category: 'Estate Planning', dueDate: 'Due in 30 days', completed: false },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'tasks':
        return (
          <div className="flex flex-col gap-10">
            <FloatUp delay={0.1} className="border-b border-[#F0F0F0] pb-8">
              <h1 className="text-4xl font-serif text-text-primary">Administrative Tasks</h1>
              <p className="text-sm text-text-muted font-light mt-1">
                A complete list of duties required to settle your family's estate. Work at your own pace.
              </p>
            </FloatUp>

            <div className="flex flex-col gap-6 max-w-3xl">
              <FloatUp delay={0.2} className="flex items-center justify-between">
                <h2 className="text-xl font-serif text-text-primary">All Tasks ({tasks.length})</h2>
                <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                  <Plus className="w-4 h-4" /> Add custom task
                </button>
              </FloatUp>

              <div className="flex flex-col gap-4">
                {tasks.map((task, index) => (
                  <FloatUp 
                    key={task.id} 
                    delay={0.2 + (index * 0.05)} 
                    className={`glass-panel p-6 rounded-2xl transition-all duration-300 ${task.completed ? 'opacity-60' : 'hover:-translate-y-0.5 hover:shadow-antigravity-hover'}`}
                  >
                    <div className="flex items-start gap-4">
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className={`mt-1 w-5 h-5 rounded-full border transition-colors flex items-center justify-center ${
                          task.completed 
                            ? 'bg-primary border-primary text-white' 
                            : 'border-secondary/40 hover:border-primary'
                        }`}
                      >
                        {task.completed && <span className="text-[10px]">✓</span>}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <h3 className={`font-sans font-medium text-base text-text-primary ${task.completed ? 'line-through text-text-muted/60' : ''}`}>
                            {task.title}
                          </h3>
                          <span className="text-xs text-text-muted flex items-center gap-1 shrink-0 font-light">
                            <Clock className="w-3.5 h-3.5" />
                            {task.dueDate}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary/80 px-2 py-0.5 rounded bg-secondary/5 w-fit block mt-1">
                          {task.category}
                        </span>
                      </div>
                    </div>
                  </FloatUp>
                ))}
              </div>
            </div>
          </div>
        );
      case 'vault':
        return (
          <div className="flex flex-col gap-10">
            <FloatUp delay={0.1} className="border-b border-[#F0F0F0] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl font-serif text-text-primary">Document Vault</h1>
                <p className="text-sm text-text-muted font-light mt-1">
                  Secure storage for certificates, policies, and letters. Fully encrypted and private.
                </p>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-primary hover:bg-primary-hover rounded-full transition-colors w-fit">
                <Upload className="w-4 h-4" /> Upload Document
              </button>
            </FloatUp>

            <FloatUp delay={0.2} className="relative max-w-md">
              <input 
                type="text" 
                placeholder="Search documents..." 
                className="w-full bg-white border border-[#F0F0F0] rounded-full pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-primary/50 text-text-primary shadow-sm"
              />
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
            </FloatUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <FloatUp delay={0.3} className="bg-white p-6 rounded-3xl border border-[#F0F0F0] shadow-antigravity flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-medium text-text-primary">Certified Death Certificate.pdf</h3>
                  <p className="text-xs text-text-muted font-light mt-1">1.2 MB • Yesterday</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded text-primary bg-primary/10">Verified</span>
              </FloatUp>
              <FloatUp delay={0.35} className="bg-white p-6 rounded-3xl border border-[#F0F0F0] shadow-antigravity flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-medium text-text-primary">MetLife Insurance Policy.pdf</h3>
                  <p className="text-xs text-text-muted font-light mt-1">3.4 MB • 2 days ago</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded text-secondary bg-secondary/10">Processing</span>
              </FloatUp>
              <FloatUp delay={0.4} className="bg-white p-6 rounded-3xl border border-[#F0F0F0] shadow-antigravity flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-medium text-text-primary">Final Will & Testament.pdf</h3>
                  <p className="text-xs text-text-muted font-light mt-1">4.8 MB • 3 days ago</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded text-primary bg-primary/10">Verified</span>
              </FloatUp>
              <FloatUp delay={0.45} className="bg-white p-6 rounded-3xl border border-[#F0F0F0] shadow-antigravity flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-medium text-text-primary">Comcast Account Closure Notice.pdf</h3>
                  <p className="text-xs text-text-muted font-light mt-1">720 KB • 5 days ago</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded text-primary bg-primary/10">Verified</span>
              </FloatUp>
            </div>
          </div>
        );
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
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      <div className="pb-28">
        {renderContent()}
      </div>
      <FloatingDock activeTab={activeTab} setActiveTab={setActiveTab} />
    </Layout>
  );
}

export default App;
