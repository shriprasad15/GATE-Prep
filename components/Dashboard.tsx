import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { StudyPhase } from '../types';
import { Target, Trophy, Clock, CheckCircle } from 'lucide-react';

interface DashboardProps {
  phases: StudyPhase[];
}

const Dashboard: React.FC<DashboardProps> = ({ phases }) => {
  // Calculate stats
  const totalTasks = phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const completedTasks = phases.reduce((acc, phase) => acc + phase.tasks.filter(t => t.completed).length, 0);
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  // Mock data for the charts based on the phases
  const data = phases.map(p => ({
    name: p.name.split(':')[0],
    total: p.tasks.length,
    completed: p.tasks.filter(t => t.completed).length
  }));

  const mockScoreData = [
    { name: 'Mock 1', score: 42 },
    { name: 'Mock 2', score: 55 },
    { name: 'Mock 3', score: 68 }, // Projected
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gate-card border border-neutral-800 p-4 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-gate-accent/20 rounded-lg text-gate-accent">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-gate-muted text-sm font-mono">TARGET RANK</p>
            <h3 className="text-2xl font-bold text-white">&lt; 100</h3>
          </div>
        </div>
        
        <div className="bg-gate-card border border-neutral-800 p-4 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-blue-500/20 rounded-lg text-blue-500">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-gate-muted text-sm font-mono">SYLLABUS</p>
            <h3 className="text-2xl font-bold text-white">{progressPercentage}%</h3>
          </div>
        </div>

        <div className="bg-gate-card border border-neutral-800 p-4 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-purple-500/20 rounded-lg text-purple-500">
            <Target size={24} />
          </div>
          <div>
            <p className="text-gate-muted text-sm font-mono">GO TESTS</p>
            <h3 className="text-2xl font-bold text-white">40+</h3>
          </div>
        </div>

        <div className="bg-gate-card border border-neutral-800 p-4 rounded-xl flex items-center space-x-4">
          <div className="p-3 bg-orange-500/20 rounded-lg text-orange-500">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-gate-muted text-sm font-mono">DAYS LEFT</p>
            <h3 className="text-2xl font-bold text-white">~35</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gate-card border border-neutral-800 p-6 rounded-xl">
          <h3 className="text-lg font-bold mb-4 font-mono text-gate-accent">SYLLABUS VELOCITY</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#737373" fontSize={12} tickLine={false} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Bar dataKey="completed" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="total" stackId="a" fill="#333" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gate-card border border-neutral-800 p-6 rounded-xl">
           <h3 className="text-lg font-bold mb-4 font-mono text-blue-400">MOCK PERFORMANCE</h3>
           <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockScoreData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#737373" fontSize={10} tickLine={false} />
                <YAxis stroke="#737373" fontSize={10} tickLine={false} domain={[0, 100]} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#171717', borderColor: '#333', color: '#fff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
           </div>
           <p className="text-xs text-gate-muted mt-2 text-center">Don't panic if scores start low (40-50). GO Classes is harder than GATE.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;