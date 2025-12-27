
import React, { useState } from 'react';
import { UserProfile, CharacterId } from '../types';
import { CHARACTERS } from '../constants';

interface Props {
  profile: UserProfile;
  onSave: (p: UserProfile) => void;
  onClose: () => void;
}

export const ProfileSettings: React.FC<Props> = ({ profile, onSave, onClose }) => {
  const [nickname, setNickname] = useState(profile.nickname);
  const [preferredId, setPreferredId] = useState<CharacterId | null>(profile.preferredCharacterId);

  const handleSave = () => {
    onSave({ ...profile, nickname, preferredCharacterId: preferredId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass w-full max-w-md rounded-3xl p-8 animate-in slide-in-from-bottom-4 duration-300">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <i className="fas fa-user-circle text-emerald-400"></i> プロフィール設定
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">あなたの名前</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
              placeholder="ニックネーム"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">いつものガイド</label>
            <div className="grid grid-cols-2 gap-3">
              {CHARACTERS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setPreferredId(c.id)}
                  className={`p-3 rounded-xl border transition-all text-xs flex flex-col items-center gap-2 ${
                    preferredId === c.id ? 'bg-emerald-600/20 border-emerald-500' : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <i className={`fas ${c.icon} text-lg`}></i>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm">
            キャンセル
          </button>
          <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all font-bold text-sm">
            保存する
          </button>
        </div>
      </div>
    </div>
  );
};
