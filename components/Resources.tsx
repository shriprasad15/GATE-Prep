import React from 'react';
import { RESOURCES } from '../constants';
import { ExternalLink, Github, Lock, Database } from 'lucide-react';

const Resources: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCES.map((resource, idx) => (
          <div key={idx} className="bg-gate-card group hover:border-gate-accent/50 transition-colors border border-neutral-800 rounded-xl p-6 flex flex-col h-full relative overflow-hidden">
             {/* Hover Glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-gate-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-gate-accent/10 transition-all"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${resource.type === 'paid' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                {resource.tags.includes('GitHub') ? <Github size={20} /> : resource.type === 'paid' ? <Lock size={20} /> : <Database size={20} />}
              </div>
              <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border ${resource.type === 'paid' ? 'border-orange-900 text-orange-500' : 'border-blue-900 text-blue-500'}`}>
                {resource.type}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{resource.name}</h3>
            <p className="text-gate-muted text-sm leading-relaxed flex-1 mb-6">
              {resource.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {resource.tags.map(tag => (
                <span key={tag} className="text-xs bg-neutral-900 text-neutral-400 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>

            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-gate-accent hover:text-neutral-900 text-gray-300 font-medium text-sm transition-all border border-neutral-800 hover:border-transparent group-hover:border-neutral-700"
            >
              Access Resource <ExternalLink size={14} className="ml-2" />
            </a>
          </div>
        ))}
      </div>

      <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 mt-8">
        <h3 className="font-mono font-bold text-lg text-white mb-4">RESOURCE STRATEGY NOTE</h3>
        <ul className="list-disc list-inside space-y-2 text-gate-muted text-sm">
          <li><strong className="text-gray-200">GO Classes:</strong> Use as your "Coach". Do not get demotivated by low scores (40/100 is normal initially).</li>
          <li><strong className="text-gray-200">GATE Overflow:</strong> Use as your "Library". Read comments for alternate approaches.</li>
          <li><strong className="text-gray-200">Open Source:</strong> Use specifically for finding edge cases in Machine Learning that standard coachings miss.</li>
          <li className="text-gate-accent pt-2">⚠️ Do not buy a second test series. Depth over breadth.</li>
        </ul>
      </div>
    </div>
  );
};

export default Resources;