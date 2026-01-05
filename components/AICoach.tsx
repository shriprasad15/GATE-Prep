import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "I am your GATE DA Strategy Coach. I'm calibrated for a Rank < 100 target. I prioritize GO Classes for depth and GATE Overflow for accuracy. How is your prep going?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await sendMessageToGemini(input, history);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-gate-card border border-neutral-800 rounded-xl overflow-hidden animate-in fade-in duration-500">
      <div className="bg-neutral-900/50 p-4 border-b border-neutral-800 flex items-center space-x-3">
        <div className="p-2 bg-gate-accent/20 rounded-lg text-gate-accent">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="font-bold text-white">Strategy Mainframe</h3>
          <p className="text-xs text-gate-muted font-mono">Gemini 3 Flash Preview • Context: Rank &lt; 100</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-gate-accent text-neutral-900 rounded-tr-sm' 
                : 'bg-neutral-800 text-gray-200 rounded-tl-sm border border-neutral-700'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-neutral-800 rounded-2xl p-4 rounded-tl-sm border border-neutral-700 flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin text-gate-accent" />
                <span className="text-xs text-gate-muted">Analyzing resources...</span>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-neutral-900/50 border-t border-neutral-800">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your strategy, specific topics, or resource advice..."
            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gate-accent text-white placeholder-neutral-600 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="p-3 bg-gate-accent text-neutral-900 rounded-xl hover:bg-gate-glow disabled:opacity-50 transition-colors font-bold"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICoach;