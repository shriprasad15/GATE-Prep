import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
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
          <p className="text-xs text-gate-muted font-mono">Gemini 3 Pro Preview • Context: Rank &lt; 100</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-gate-accent text-neutral-900 rounded-tr-sm' 
                : 'bg-neutral-800 text-gray-200 rounded-tl-sm border border-neutral-700'
            }`}>
              {msg.role === 'user' ? (
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              ) : (
                <ReactMarkdown
                  className="text-sm leading-relaxed"
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    // Style specific Markdown elements to match the GATE DA aesthetic
                    strong: ({node, ...props}) => <strong className="font-bold text-gate-accent" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-outside mb-3 ml-4 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-outside mb-3 ml-4 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                    h1: ({node, ...props}) => <h1 className="text-lg font-bold text-white mb-2 mt-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-base font-bold text-white mb-2 mt-3" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-sm font-bold text-gray-200 mb-1 mt-2" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-gate-accent pl-4 my-2 italic text-gray-400" {...props} />,
                    code: ({node, className, children, ...props}: any) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match && !String(children).includes('\n');
                      return isInline 
                        ? <code className="bg-neutral-900 border border-neutral-700 px-1 py-0.5 rounded font-mono text-xs text-gate-accent" {...props}>{children}</code>
                        : <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 my-2 overflow-x-auto"><code className="font-mono text-xs text-gray-300 block whitespace-pre" {...props}>{children}</code></div>
                    }
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-neutral-800 rounded-2xl p-4 rounded-tl-sm border border-neutral-700 flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin text-gate-accent" />
                <span className="text-xs text-gate-muted">Analyzing strategy...</span>
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