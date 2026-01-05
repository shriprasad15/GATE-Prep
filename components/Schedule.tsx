import React from 'react';
import { ExternalLink, CheckCircle2, Circle, ArrowUpRight, Calendar as CalendarIcon } from 'lucide-react';
import { MASTER_SCHEDULE } from '../constants';

const Schedule: React.FC = () => {
  // Helper to determine status based on date (mock logic for demo)
  const getStatus = (dateStr: string) => {
    const today = new Date();
    // Simple string match for demo "Jan 08"
    const currentMonth = today.toLocaleString('default', { month: 'short' });
    const currentDay = today.getDate().toString().padStart(2, '0');
    const formattedToday = `${currentMonth} ${currentDay}`;
    
    if (dateStr === formattedToday) return 'active';
    // This is a rough approximation for demo purposes
    if (dateStr < formattedToday && dateStr.startsWith('Jan')) return 'done';
    return 'upcoming';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex justify-between items-end mb-6">
        <div>
           <h2 className="text-xl font-bold text-white font-mono">MASTER SCHEDULE</h2>
           <p className="text-gate-muted text-sm">Strategic Roadmap: Jan 05 - Feb 14</p>
        </div>
        <div className="flex space-x-2">
           <button className="text-xs bg-neutral-800 text-gate-muted px-3 py-1.5 rounded border border-neutral-700 font-mono">
            SYNC CALENDAR
          </button>
          <button className="text-xs bg-gate-accent/10 text-gate-accent px-3 py-1.5 rounded border border-gate-accent/20 hover:bg-gate-accent/20 transition-colors font-mono">
            EXPORT CSV
          </button>
        </div>
      </div>

      <div className="bg-gate-card border border-neutral-800 rounded-xl overflow-hidden overflow-x-auto shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-neutral-900 border-b border-neutral-800 text-xs uppercase tracking-wider text-gate-muted font-mono">
              <th className="p-4 w-24">Date</th>
              <th className="p-4 w-32">Topic</th>
              <th className="p-4 w-[22%]">09:00 - 12:00 (Session 1)</th>
              <th className="p-4 w-[22%]">13:30 - 16:30 (Session 2)</th>
              <th className="p-4 w-[22%]">17:00 - 20:00 (Session 3)</th>
              <th className="p-4 w-24">Resource</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {MASTER_SCHEDULE.map((row, idx) => {
              const status = getStatus(row.date);
              const isActive = status === 'active';
              
              return (
                <tr 
                  key={idx} 
                  className={`border-b border-neutral-800 transition-colors hover:bg-neutral-800/50 ${
                    isActive ? 'bg-gate-accent/5' : ''
                  }`}
                >
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className={`font-bold ${isActive ? 'text-gate-accent' : 'text-white'}`}>
                        {row.date}
                      </span>
                      <span className="text-xs text-gate-muted font-mono">{row.day}</span>
                      {isActive && <span className="text-[10px] bg-gate-accent text-black px-1 rounded w-fit mt-1 font-bold">TODAY</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-gray-200">{row.topic}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border w-fit font-mono ${
                        row.phase === 'War Mode' ? 'border-red-900 text-red-500 bg-red-900/10' :
                        row.phase === 'Topic Mastery' ? 'border-blue-900 text-blue-500 bg-blue-900/10' :
                        'border-neutral-700 text-neutral-500'
                      }`}>
                        {row.phase.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  
                  {/* Session 1 */}
                  <td className="p-4 align-top">
                    <div className="space-y-1">
                      <div className="font-medium text-blue-400 text-xs font-mono mb-1">SOLVING</div>
                      <p className="text-gray-300 font-medium">{row.session1.title}</p>
                      <p className="text-xs text-gate-muted">{row.session1.desc}</p>
                    </div>
                  </td>

                  {/* Session 2 */}
                  <td className="p-4 align-top">
                    <div className="space-y-1">
                      <div className="font-medium text-yellow-500 text-xs font-mono mb-1">ANALYSIS/FIX</div>
                      <p className="text-gray-300 font-medium">{row.session2.title}</p>
                      <p className="text-xs text-gate-muted">{row.session2.desc}</p>
                    </div>
                  </td>

                  {/* Session 3 */}
                  <td className="p-4 align-top">
                    <div className="space-y-1">
                      <div className="font-medium text-purple-500 text-xs font-mono mb-1">DRILL</div>
                      <p className="text-gray-300 font-medium">{row.session3.title}</p>
                      <p className="text-xs text-gate-muted">{row.session3.desc}</p>
                    </div>
                  </td>

                  <td className="p-4">
                    <a 
                      href={row.resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-gate-muted hover:text-white transition-colors text-xs font-mono group border border-neutral-800 p-2 rounded hover:bg-neutral-800"
                    >
                      <span>{row.resource.name}</span>
                      <ArrowUpRight size={10} className="opacity-50 group-hover:opacity-100" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-lg text-center font-mono text-xs text-gate-muted">
         <p>Total Scheduled Days: {MASTER_SCHEDULE.length} • Consistency is the only hack.</p>
      </div>
    </div>
  );
};

export default Schedule;