import { useState } from 'react';
import { Layout } from './components/Layout';
import { FloatUp } from './components/MotionWrappers';
import { 
  Heart, 
  Clock, 
  ArrowRight,
  Plus
} from 'lucide-react';

function App() {
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

  return (
    <Layout>
      <div className="flex flex-col gap-12">
        {/* Header Section */}
        <FloatUp delay={0.1} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F0F0F0] pb-8">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Heart className="w-5 h-5 fill-primary/10" />
              <span className="text-xs uppercase tracking-widest font-semibold font-sans">Empathetic Copilot</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif text-text-primary mb-3">Afterlife</h1>
            <p className="text-lg font-sans text-text-muted font-light leading-relaxed max-w-xl">
              We are here to help you gently navigate the administrative path after a loss. Take your time.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-sans">
            <span className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary-hover font-medium">Estate: Priya's Family</span>
            <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">3 of 4 Completed</span>
          </div>
        </FloatUp>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Work Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <FloatUp delay={0.2} className="flex items-center justify-between">
              <h2 className="text-2xl font-serif text-text-primary">Important Deadlines</h2>
              <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200">
                <Plus className="w-4 h-4" /> Add custom task
              </button>
            </FloatUp>

            <div className="flex flex-col gap-4">
              {tasks.map((task, index) => (
                <FloatUp 
                  key={task.id} 
                  delay={0.2 + (index * 0.08)} 
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
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-secondary/80 px-2 py-0.5 rounded bg-secondary/5">
                          {task.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </FloatUp>
              ))}
            </div>
          </div>

          {/* Sidebar / Copilot Chat */}
          <FloatUp delay={0.4} className="flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-3xl flex flex-col gap-6 relative overflow-hidden">
              {/* Sage Decorative Radial */}
              <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />

              <div>
                <h3 className="font-serif text-2xl text-text-primary mb-2">Need Guidance?</h3>
                <p className="text-sm text-text-muted font-light leading-relaxed">
                  Our administrative assistant is ready to help draft notification letters, clarify legal terms, or make calls on your behalf.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-between text-left p-4 rounded-xl hover:bg-primary/5 transition-colors group">
                  <span className="text-xs font-medium text-text-primary">Draft a bank closure letter</span>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
                <button className="flex items-center justify-between text-left p-4 rounded-xl hover:bg-primary/5 transition-colors group">
                  <span className="text-xs font-medium text-text-primary">Understand "Letters of Administration"</span>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </button>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask a question..."
                  className="w-full bg-background border border-[#F0F0F0] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-primary/50 text-text-primary"
                />
              </div>
            </div>
          </FloatUp>
        </div>
      </div>
    </Layout>
  );
}

export default App;
