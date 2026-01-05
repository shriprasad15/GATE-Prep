import React, { useState } from 'react';
import { INITIAL_SYLLABUS } from '../constants';
import { StudyPhase } from '../types';
import { Check, ChevronDown, ChevronRight, Circle } from 'lucide-react';

interface Props {
  phases: StudyPhase[];
  onToggle: (phaseIndex: number, taskId: string) => void;
}

const PlanChecklist: React.FC<Props> = ({ phases, onToggle }) => {
  const [expanded, setExpanded] = useState<number[]>([0, 1]); // Default expand first two

  const toggleExpand = (idx: number) => {
    setExpanded(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {phases.map((phase, pIdx) => (
        <div key={pIdx} className="bg-gate-card border border-neutral-800 rounded-xl overflow-hidden">
          <button 
            onClick={() => toggleExpand(pIdx)}
            className="w-full flex items-center justify-between p-4 bg-neutral-900/50 hover:bg-neutral-900 transition-colors"
          >
            <div className="flex items-center space-x-3">
               {expanded.includes(pIdx) ? <ChevronDown size={18} className="text-gate-muted" /> : <ChevronRight size={18} className="text-gate-muted" />}
               <h3 className="font-bold text-gray-200 text-left">{phase.name}</h3>
            </div>
            <div className="flex items-center space-x-2">
               <span className="text-xs font-mono text-gate-muted">
                 {phase.tasks.filter(t => t.completed).length} / {phase.tasks.length}
               </span>
               <div className="w-20 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-gate-accent transition-all duration-500"
                    style={{ width: `${(phase.tasks.filter(t => t.completed).length / phase.tasks.length) * 100}%` }}
                 ></div>
               </div>
            </div>
          </button>
          
          {expanded.includes(pIdx) && (
            <div className="p-2">
              {phase.tasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => onToggle(pIdx, task.id)}
                  className="flex items-center p-3 hover:bg-neutral-800/50 rounded-lg cursor-pointer group transition-colors"
                >
                  <div className={`p-0.5 rounded mr-4 border ${task.completed ? 'bg-gate-accent border-gate-accent text-black' : 'border-neutral-600 text-transparent group-hover:border-gate-accent'}`}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.completed ? 'text-gate-muted line-through' : 'text-gray-300'}`}>
                      {task.title}
                    </p>
                  </div>
                  <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${
                    task.category === 'core' ? 'border-blue-900 text-blue-500' :
                    task.category === 'mock' ? 'border-orange-900 text-orange-500' :
                    'border-purple-900 text-purple-500'
                  }`}>
                    {task.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlanChecklist;