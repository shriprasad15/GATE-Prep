import React, { useState, useEffect } from 'react';
import { Clock, Play, CheckSquare, AlertTriangle, BookOpen, Brain, Terminal, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { MASTER_SCHEDULE } from '../constants';
import { DaySchedule } from '../types';

const DailyDrill: React.FC = () => {
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Persist drill progress by date key
  const [checklists, setChecklists] = useState<Record<string, {
    session1: boolean;
    session2: boolean;
    session3: boolean;
  }>>({});

  const displayedPlan = MASTER_SCHEDULE[currentIndex];
  const currentChecklist = displayedPlan ? (checklists[displayedPlan.date] || { session1: false, session2: false, session3: false }) : { session1: false, session2: false, session3: false };

  const toggleCheck = (sessionKey: 'session1' | 'session2' | 'session3') => {
    if (!displayedPlan) return;
    setChecklists(prev => ({
      ...prev,
      [displayedPlan.date]: {
        ...(prev[displayedPlan.date] || { session1: false, session2: false, session3: false }),
        [sessionKey]: !currentChecklist[sessionKey]
      }
    }));
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
    
    // Find today's index
    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'short' });
    const currentDay = today.getDate().toString().padStart(2, '0');
    const formattedToday = `${currentMonth} ${currentDay}`;
    
    const index = MASTER_SCHEDULE.findIndex(s => s.date === formattedToday);
    
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      // Demo fallback: Default to Jan 14 (War Mode Start) for display
      const demoIndex = MASTER_SCHEDULE.findIndex(s => s.date === 'Jan 14');
      setCurrentIndex(demoIndex !== -1 ? demoIndex : 0);
    }
  }, []);

  const isToday = () => {
     if (!displayedPlan) return false;
     const today = new Date();
     const currentMonth = today.toLocaleString('default', { month: 'short' });
     const currentDay = today.getDate().toString().padStart(2, '0');
     const formattedToday = `${currentMonth} ${currentDay}`;
     return displayedPlan.date === formattedToday;
  };

  if (!displayedPlan) return <div>Loading protocol...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Navigation Controls */}
      <div className="flex justify-between items-center bg-neutral-900/50 p-2 rounded-xl border border-neutral-800">
        <button 
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="p-2 hover:bg-neutral-800 rounded-lg text-gate-muted hover:text-white disabled:opacity-30 transition-colors flex items-center gap-2 group"
        >
          <ChevronLeft size={20} />
          <span className="text-sm font-mono hidden sm:block group-hover:text-white">PREV DAY</span>
        </button>

        <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <h2 className="text-white font-bold font-mono text-lg">{displayedPlan.date}</h2>
              {isToday() && <span className="bg-gate-accent text-neutral-900 text-[10px] font-bold px-1.5 py-0.5 rounded">TODAY</span>}
            </div>
            <p className="text-xs text-gate-muted uppercase tracking-wider">{displayedPlan.day}</p>
        </div>

        <button 
          onClick={() => setCurrentIndex(prev => Math.min(MASTER_SCHEDULE.length - 1, prev + 1))}
          disabled={currentIndex === MASTER_SCHEDULE.length - 1}
          className="p-2 hover:bg-neutral-800 rounded-lg text-gate-muted hover:text-white disabled:opacity-30 transition-colors flex items-center gap-2 group"
        >
          <span className="text-sm font-mono hidden sm:block group-hover:text-white">NEXT DAY</span>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="bg-gradient-to-r from-gate-card to-neutral-900 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gate-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                 displayedPlan.phase === 'War Mode' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
              }`}>
                PHASE: {displayedPlan.phase.toUpperCase()}
              </span>
              <span className="text-xs text-gate-muted font-mono">{displayedPlan.date} • {displayedPlan.day}</span>
            </div>
            <h2 className="text-3xl font-mono font-bold text-white mb-2 uppercase">{displayedPlan.topic}</h2>
            <p className="text-gate-muted max-w-xl">
              Focus: <span className="text-gray-300">{displayedPlan.session1.title}</span> and <span className="text-gray-300">{displayedPlan.session2.title}</span>.
            </p>
          </div>
          
          <div className="text-right hidden sm:block">
             <div className="text-4xl font-bold text-gate-accent/20 font-mono">
               {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </div>
          </div>
        </div>

        {isToday() && activeSlot ? (
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
            <span className="font-mono text-sm">
              {isToday() ? 'OUTSIDE SCHEDULED HOURS' : 'SCHEDULE PREVIEW'}
            </span>
          </div>
        )}
      </div>

      {/* Slot 1 */}
      <div className={`relative transition-all duration-300 ${isToday() && activeSlot === 1 ? 'scale-[1.02] opacity-100 ring-2 ring-gate-accent/50' : 'opacity-80 hover:opacity-100'}`}>
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
              <input type="checkbox" checked={currentChecklist.session1} onChange={() => toggleCheck('session1')} className="mt-1 w-5 h-5 rounded border-neutral-600 bg-neutral-900 text-gate-accent focus:ring-gate-accent" />
              <div className="flex-1">
                <span className={`font-bold text-lg block mb-1 ${currentChecklist.session1 ? 'text-gate-muted line-through' : 'text-gray-200'}`}>
                  {displayedPlan.session1.title}
                </span>
                <p className="text-sm text-gate-muted leading-relaxed">
                  {displayedPlan.session1.desc}
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400">180m</span>
            </label>
          </div>
        </div>
      </div>

       {/* Slot 2 */}
      <div className={`relative transition-all duration-300 ${isToday() && activeSlot === 2 ? 'scale-[1.02] opacity-100 ring-2 ring-yellow-500/50' : 'opacity-80 hover:opacity-100'}`}>
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
              <input type="checkbox" checked={currentChecklist.session2} onChange={() => toggleCheck('session2')} className="mt-1 w-5 h-5 rounded border-neutral-600 bg-neutral-900 text-gate-accent focus:ring-gate-accent" />
              <div className="flex-1">
                <span className={`font-bold text-lg block mb-1 ${currentChecklist.session2 ? 'text-gate-muted line-through' : 'text-gray-200'}`}>
                  {displayedPlan.session2.title}
                </span>
                <p className="text-sm text-gate-muted leading-relaxed">
                  {displayedPlan.session2.desc}
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400">180m</span>
            </label>
          </div>
        </div>
      </div>

       {/* Slot 3 */}
      <div className={`relative transition-all duration-300 ${isToday() && activeSlot === 3 ? 'scale-[1.02] opacity-100 ring-2 ring-purple-500/50' : 'opacity-80 hover:opacity-100'}`}>
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
              <input type="checkbox" checked={currentChecklist.session3} onChange={() => toggleCheck('session3')} className="mt-1 w-5 h-5 rounded border-neutral-600 bg-neutral-900 text-gate-accent focus:ring-gate-accent" />
              <div className="flex-1">
                <span className={`font-bold text-lg block mb-1 ${currentChecklist.session3 ? 'text-gate-muted line-through' : 'text-gray-200'}`}>
                  {displayedPlan.session3.title}
                </span>
                <p className="text-sm text-gate-muted leading-relaxed">
                  {displayedPlan.session3.desc}
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