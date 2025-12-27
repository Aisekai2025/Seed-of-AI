
import React from 'react';
import { Conversation, CharacterId } from '../types';
import { CHARACTERS } from '../constants';

interface Props {
  conversations: Conversation[];
  onClose: () => void;
}

export const HistoryView: React.FC<Props> = ({ conversations, onClose }) => {
  const getChar = (id: CharacterId) => CHARACTERS.find(c => c.id === id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass w-full max-w-2xl h-[80vh] rounded-3xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">過去の対話の記憶</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {conversations.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              まだ対話の記録がありません。
            </div>
          ) : (
            conversations.slice().reverse().map((conv) => {
              const char = getChar(conv.characterId);
              return (
                <div key={conv.id} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br ${char?.color}`}>
                      <i className={`fas ${char?.icon} text-xs text-white`}></i>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-200">{char?.name}との対話</span>
                      <p className="text-[10px] text-slate-500">{new Date(conv.startTime).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {conv.messages.slice(0, 2).map((m, idx) => (
                      <p key={idx} className={`text-xs ${m.role === 'user' ? 'text-slate-400' : 'text-emerald-200'} line-clamp-1`}>
                        {m.role === 'user' ? 'あなた: ' : `${char?.name}: `}{m.content}
                      </p>
                    ))}
                    {conv.messages.length > 2 && <p className="text-[10px] text-slate-600">...他 {conv.messages.length - 2} 件のメッセージ</p>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
