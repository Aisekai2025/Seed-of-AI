
import React, { useState, useRef, useEffect } from 'react';
import { Character, Message, Conversation } from '../types';
import { getGeminiResponse } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { getLocalFallback } from '../services/responseGenerator';

interface Props {
  character: Character;
  onBack: () => void;
  onGrowth: () => void;
}

export const ChatInterface: React.FC<Props> = ({ character, onBack, onGrowth }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (messages.length > 0) {
      const conv: Conversation = {
        id: sessionId,
        characterId: character.id,
        messages,
        startTime: messages[0].timestamp
      };
      storageService.saveConversation(conv);
    }
  }, [messages, character.id, sessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    storageService.addSeed();
    onGrowth();

    try {
      const reply = await getGeminiResponse(character, input, messages);
      const assistantMsg: Message = { role: 'assistant', content: reply, timestamp: Date.now() };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      // Use Local Fallback if Gemini fails
      const fallbackReply = getLocalFallback(character, input);
      const errorMsg: Message = { 
        role: 'assistant', 
        content: fallbackReply, 
        timestamp: Date.now() 
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] w-full max-w-3xl mx-auto glass rounded-3xl overflow-hidden shadow-2xl relative">
      <div className={`p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r ${character.color}`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div>
            <h2 className="font-bold text-lg">{character.name}</h2>
            <p className="text-xs opacity-70">{character.title}</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <i className={`fas ${character.icon} text-lg`}></i>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 opacity-60">
            <i className={`fas ${character.icon} text-5xl mb-4`}></i>
            <p>今の気持ちを「たね」として、<br />そっと言葉にしてみませんか？</p>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
            <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-emerald-700/40 text-emerald-50 rounded-br-none border border-emerald-500/20' 
                  : 'bg-white/5 text-slate-100 rounded-bl-none border border-white/5'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 px-5 py-3 rounded-2xl flex gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-black/20 border-t border-white/10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="たねを植える..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 pr-14 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-slate-500 text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-50 shadow-emerald-500/20 disabled:bg-slate-700 disabled:opacity-50 text-white transition-all flex items-center justify-center"
          >
            <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-sm`}></i>
          </button>
        </div>
      </form>
    </div>
  );
};
