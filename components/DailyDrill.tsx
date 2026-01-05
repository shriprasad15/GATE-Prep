import React, { useState, useEffect } from 'react';
import { Clock, Play, CheckSquare, AlertTriangle, BookOpen, Brain, Terminal, Calendar } from 'lucide-react';
import { MASTER_SCHEDULE } from '../constants';
import { DaySchedule } from '../types';

const DailyDrill: React.FC = () => {
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [todayPlan, setTodayPlan] = useState<DaySchedule | null>(null);
  
  // Persist drill progress (in a real app this would be tied to date)
  const [checklist, setChecklist] = useState({
    session1: false,
    session2: false,
    session3: false
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getCurrentTimeSlot = () => {
    const hour = new Date().getHours();
    if (hour >= 9 && hour < 12) return 1;
    if (hour >= 13 && hour < 17) return 2;
    if (hour >= 17 && hour < 20) return 3;
    return null;
  };

  useEffect(() => {
    setActiveSlot(getCurrentTimeSlot());
    
    // Find today's plan
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'short' });
    const currentDay = today.getDate().toString().padStart(2, '0');
    const formattedToday = `${currentMonth} ${currentDay}`;
    
    const plan = MASTER_SCHEDULE.find(s => s.date === formattedToday);
    
    if (plan) {
      setTodayPlan(plan);
    } else {
      // Demo fallback: If today isn't in schedule, default to Jan 14 (War Mode Start) for display
      const demoPlan = MASTER_SCHEDULE.find(s => s.date === 'Jan 14');
      setTodayPlan(demoPlan || MASTER_SCHEDULE[0]);
    }
  }, []);

  if (!todayPlan) return <div>Loading protocol...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-gradient-to-r from-gate-card to-neutral-900 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gate-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                 todayPlan.phase === 'War Mode' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
              }`}>
                PHASE: {todayPlan.phase.toUpperCase()}
              </span>
              <span className="text-xs text-gate-muted font-mono">{todayPlan.date} • {todayPlan.day}</span>
            </div>
            <h2 className="text-3xl font-mono font-bold text-white mb-2 uppercase">{todayPlan.topic}</h2>
            <p className="text-gate-muted max-w-xl">
              Focus: <span className="text-gray-300">{todayPlan.session1.title}</span> and <span className="text-gray-300">{todayPlan.session2.title}</span>.
            </p>
          </div>
          
          <div className="text-right hidden sm:block">
             <div className="text-4xl font-bold text-gate-accent/20 font-mono">
               {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </div>
          </div>
        </div>

        {activeSlot ? (
          <div className="mt-6 flex items-center space-x-3 text-emerald-400 bg-emerald-400/10 w-fit px-4 py-2 rounded-full border border-emerald-400/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-sm font-bold">LIVE: SESSION {activeSlot} IN PROGRESS</span>
          </div>
        ) : (
           <div className="mt-6 flex items-center space-x-3 text-neutral-500 bg-neutral-800/50 w-fit px-4 py-2 rounded-full border border-neutral-700">
            <Clock size={16} />
            <span className="font-mono text-sm">OUTSIDE SCHEDULED HOURS</span>
          </div>
        )}
      </div>

      {/* Slot 1 */}
      <div className={`relative transition-all duration-300 ${activeSlot === 1 ? 'scale-[1.02] opacity-100 ring-2 ring-gate-accent/50' : 'opacity-80 hover:opacity-100'}`}>
        <div className="bg-gate-card border border-neutral-800 rounded-xl overflow-hidden">
          <div className="bg-neutral-900/50 p-4 border-b border-neutral-800 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg"><Terminal size={20} /></div>
              <div>
                <h3 className="font-bold text-lg text-white">09:00 - 12:00</h3>
                <p className="text-xs text-gate-muted font-mono">SESSION 1: SOLVING MODE</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <label className="flex items-start space-x-4 p-4 bg-neutral-900/30 rounded-lg cursor-pointer transition-colors hover:bg-neutral-900 group">
              <input type="checkbox" checked={checklist.session1} onChange={() => toggleCheck('session1')} className="mt-1 w-5 h-5 rounded border-neutral-600 bg-neutral-900 text-gate-accent focus:ring-gate-accent" />
              <div className="flex-1">
                <span className={`font-bold text-lg block mb-1 ${checklist.session1 ? 'text-gate-muted line-through' : 'text-gray-200'}`}>
                  {todayPlan.session1.title}
                </span>
                <p className="text-sm text-gate-muted leading-relaxed">
                  {todayPlan.session1.desc}
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400">180m</span>
            </label>
          </div>
        </div>
      </div>

       {/* Slot 2 */}
      <div className={`relative transition-all duration-300 ${activeSlot === 2 ? 'scale-[1.02] opacity-100 ring-2 ring-yellow-500/50' : 'opacity-80 hover:opacity-100'}`}>
        <div className="bg-gate-card border border-neutral-800 rounded-xl overflow-hidden">
          <div className="bg-neutral-900/50 p-4 border-b border-neutral-800 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500/20 text-yellow-500 rounded-lg"><Brain size={20} /></div>
              <div>
                <h3 className="font-bold text-lg text-white">13:30 - 16:30</h3>
                <p className="text-xs text-gate-muted font-mono">SESSION 2: ANALYSIS & REPAIR</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <label className="flex items-start space-x-4 p-4 bg-neutral-900/30 rounded-lg cursor-pointer transition-colors hover:bg-neutral-900 group">
              <input type="checkbox" checked={checklist.session2} onChange={() => toggleCheck('session2')} className="mt-1 w-5 h-5 rounded border-neutral-600 bg-neutral-900 text-gate-accent focus:ring-gate-accent" />
              <div className="flex-1">
                <span className={`font-bold text-lg block mb-1 ${checklist.session2 ? 'text-gate-muted line-through' : 'text-gray-200'}`}>
                  {todayPlan.session2.title}
                </span>
                <p className="text-sm text-gate-muted leading-relaxed">
                  {todayPlan.session2.desc}
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400">180m</span>
            </label>
          </div>
        </div>
      </div>

       {/* Slot 3 */}
      <div className={`relative transition-all duration-300 ${activeSlot === 3 ? 'scale-[1.02] opacity-100 ring-2 ring-purple-500/50' : 'opacity-80 hover:opacity-100'}`}>
        <div className="bg-gate-card border border-neutral-800 rounded-xl overflow-hidden">
          <div className="bg-neutral-900/50 p-4 border-b border-neutral-800 flex justify-between items-center">
             <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 text-purple-500 rounded-lg"><BookOpen size={20} /></div>
              <div>
                <h3 className="font-bold text-lg text-white">17:00 - 20:00</h3>
                <p className="text-xs text-gate-muted font-mono">SESSION 3: DRILL / MOCK</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <label className="flex items-start space-x-4 p-4 bg-neutral-900/30 rounded-lg cursor-pointer transition-colors hover:bg-neutral-900 group">
              <input type="checkbox" checked={checklist.session3} onChange={() => toggleCheck('session3')} className="mt-1 w-5 h-5 rounded border-neutral-600 bg-neutral-900 text-gate-accent focus:ring-gate-accent" />
              <div className="flex-1">
                <span className={`font-bold text-lg block mb-1 ${checklist.session3 ? 'text-gate-muted line-through' : 'text-gray-200'}`}>
                  {todayPlan.session3.title}
                </span>
                <p className="text-sm text-gate-muted leading-relaxed">
                  {todayPlan.session3.desc}
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400">180m</span>
            </label>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DailyDrill;