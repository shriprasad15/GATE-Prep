import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, Layers, MessageSquare, Menu, X, Table } from 'lucide-react';
import Dashboard from './components/Dashboard';
import DailyDrill from './components/DailyDrill';
import Resources from './components/Resources';
import AICoach from './components/AICoach';
import PlanChecklist from './components/PlanChecklist';
import Schedule from './components/Schedule';
import { ViewState, StudyPhase } from './types';
import { INITIAL_SYLLABUS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('workflow');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phases, setPhases] = useState<StudyPhase[]>(() => {
    const saved = localStorage.getItem('gate_da_syllabus');
    return saved ? JSON.parse(saved) : INITIAL_SYLLABUS;
  });

  useEffect(() => {
    localStorage.setItem('gate_da_syllabus', JSON.stringify(phases));
  }, [phases]);

  const handleTaskToggle = (phaseIndex: number, taskId: string) => {
    const newPhases = [...phases];
    const task = newPhases[phaseIndex].tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setPhases(newPhases);
    }
  };

  const NavItem = ({ id, label, icon: Icon }: { id: ViewState, label: string, icon: any }) => (
    <button
      onClick={() => { setView(id); setMobileMenuOpen(false); }}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${
        view === id 
          ? 'bg-gate-accent text-neutral-900 font-bold' 
          : 'text-gate-muted hover:text-white hover:bg-neutral-800'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gate-dark text-gate-text font-sans selection:bg-gate-accent selection:text-black">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-800 bg-gate-card">
         <span className="font-mono font-bold text-xl text-white">GATE<span className="text-gate-accent">DA</span></span>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
           {mobileMenuOpen ? <X /> : <Menu />}
         </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gate-dark border-r border-neutral-800 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6">
             <h1 className="font-mono font-bold text-2xl text-white tracking-tighter mb-1">GATE<span className="text-gate-accent">DA</span></h1>
             <p className="text-xs text-gate-muted font-mono">TARGET: RANK &lt; 100</p>
          </div>

          <nav className="px-4 space-y-2 mt-4">
            <NavItem id="dashboard" label="Mission Control" icon={LayoutDashboard} />
            <NavItem id="workflow" label="Daily Protocol" icon={Calendar} />
            <NavItem id="schedule" label="Master Schedule" icon={Table} />
            <NavItem id="resources" label="Resource Stack" icon={Layers} />
            <NavItem id="coach" label="AI Strategy Coach" icon={MessageSquare} />
          </nav>

          <div className="absolute bottom-0 w-full p-6 border-t border-neutral-800">
             <div className="flex items-center space-x-3">
               <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-gate-accent to-blue-500"></div>
               <div>
                 <p className="text-sm font-bold text-white">Future IITian</p>
                 <p className="text-xs text-gate-muted">BS Data Science</p>
               </div>
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                {view === 'dashboard' && 'Status Report'}
                {view === 'workflow' && 'Active Protocol'}
                {view === 'schedule' && '30-Day Battle Plan'}
                {view === 'resources' && 'Arsenal'}
                {view === 'coach' && 'Strategic Command'}
              </h2>
              <p className="text-gate-muted text-sm font-mono mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            {process.env.API_KEY ? null : (
              <div className="hidden md:block px-3 py-1 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-xs font-mono">
                API_KEY REQUIRED
              </div>
            )}
          </header>

          {view === 'dashboard' && (
            <div className="space-y-8">
              <Dashboard phases={phases} />
              <div>
                <h3 className="text-lg font-bold text-white mb-4">MASTER PLAN CHECKLIST</h3>
                <PlanChecklist phases={phases} onToggle={handleTaskToggle} />
              </div>
            </div>
          )}

          {view === 'workflow' && <DailyDrill />}
          {view === 'schedule' && <Schedule />}
          {view === 'resources' && <Resources />}
          {view === 'coach' && <AICoach />}

        </main>
      </div>
    </div>
  );
};

export default App;