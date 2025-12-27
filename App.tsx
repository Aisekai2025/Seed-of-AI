
import React, { useState, useEffect, useCallback } from 'react';
import { CharacterSelector } from './components/CharacterSelector';
import { ChatInterface } from './components/ChatInterface';
import { Garden } from './components/Garden';
import { HistoryView } from './components/HistoryView';
import { ProfileSettings } from './components/ProfileSettings';
import { AboutModal } from './components/AboutModal';
import { Character, UserProfile, Conversation } from './types';
import { storageService } from './services/storageService';
import { CHARACTERS } from './constants';

const Particle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="seed-particle" style={style}>
    <i className="fas fa-leaf text-emerald-500/30 text-xs"></i>
  </div>
);

const App: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [profile, setProfile] = useState<UserProfile>(storageService.getProfile());
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [view, setView] = useState<'home' | 'history' | 'settings' | 'about'>('home');
  const [particles, setParticles] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  const refreshProfile = useCallback(() => {
    setProfile(storageService.getProfile());
  }, []);

  const refreshHistory = useCallback(() => {
    setConversations(storageService.getConversations());
  }, []);

  useEffect(() => {
    refreshHistory();
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`,
        fontSize: `${10 + Math.random() * 10}px`
      }
    }));
    setParticles(newParticles);

    // Auto-select preferred character if available and we are at home
    if (profile.preferredCharacterId && !selectedCharacter) {
      const char = CHARACTERS.find(c => c.id === profile.preferredCharacterId);
      if (char) setSelectedCharacter(char);
    }
  }, []);

  const handleProfileSave = (newProfile: UserProfile) => {
    storageService.saveProfile(newProfile);
    setProfile(newProfile);
  };

  return (
    <div className="min-h-screen forest-gradient flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} style={p.style} />
        ))}
      </div>

      {/* Persistent Navigation Bar */}
      <nav className="fixed top-6 right-6 z-40 flex gap-4">
        <button 
          onClick={() => setView('about')}
          className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all shadow-lg group"
          title="解説"
        >
          <i className="fas fa-info-circle text-emerald-300 group-hover:scale-110 transition-transform"></i>
        </button>
        <button 
          onClick={() => { refreshHistory(); setView('history'); }}
          className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all shadow-lg group"
          title="対話の記憶"
        >
          <i className="fas fa-book-open text-emerald-300 group-hover:scale-110 transition-transform"></i>
        </button>
        <button 
          onClick={() => setView('settings')}
          className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all shadow-lg group"
          title="設定"
        >
          <i className="fas fa-cog text-emerald-300 group-hover:scale-110 transition-transform"></i>
        </button>
      </nav>

      <main className="relative z-10 w-full flex flex-col items-center">
        {!selectedCharacter ? (
          <div className="animate-in fade-in duration-1000 slide-in-from-top-4 text-center max-w-4xl w-full">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-emerald-400">
                AIのたね
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                ようこそ、{profile.nickname}さん。言葉の森へ。<br />
                今のあなたに寄り添うガイドを一人選んでください。
              </p>
              
              <Garden profile={profile} />
            </div>
            
            <CharacterSelector onSelect={setSelectedCharacter} />
          </div>
        ) : (
          <ChatInterface 
            character={selectedCharacter} 
            onBack={() => setSelectedCharacter(null)} 
            onGrowth={refreshProfile}
          />
        )}
      </main>

      {/* Modals */}
      {view === 'history' && (
        <HistoryView conversations={conversations} onClose={() => setView('home')} />
      )}
      {view === 'settings' && (
        <ProfileSettings 
          profile={profile} 
          onSave={handleProfileSave} 
          onClose={() => setView('home')} 
        />
      )}
      {view === 'about' && (
        <AboutModal onClose={() => setView('home')} />
      )}

      <footer className="mt-12 text-slate-500 text-xs text-center relative z-10">
        <p>&copy; 2024 AIのたね — Your safe harbor for reflection.</p>
      </footer>
    </div>
  );
};

export default App;
