
import React from 'react';
import { UserProfile } from '../types';

interface Props {
  profile: UserProfile;
}

export const Garden: React.FC<Props> = ({ profile }) => {
  const seeds = profile.totalSeeds % 5;
  const level = profile.level;

  return (
    <div className="glass rounded-3xl p-6 mb-8 w-full max-w-lg mx-auto text-center border-emerald-500/30">
      <h3 className="text-emerald-300 font-bold mb-4 flex items-center justify-center gap-2">
        <i className="fas fa-seedling"></i> あなたの庭の成長
      </h3>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Full levels as flowers */}
        {Array.from({ length: level - 1 }).map((_, i) => (
          <div key={`flower-${i}`} className="flex flex-col items-center animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
            <i className="fas fa-certificate text-rose-400 text-3xl mb-1 shadow-rose-500/50 drop-shadow-lg"></i>
            <span className="text-[10px] text-rose-200 opacity-70">開花</span>
          </div>
        ))}
        {/* Progress within level as sprouts */}
        {Array.from({ length: seeds }).map((_, i) => (
          <div key={`sprout-${i}`} className="flex flex-col items-center animate-pulse">
            <i className="fas fa-leaf text-emerald-400 text-2xl mb-1"></i>
            <span className="text-[10px] text-emerald-200 opacity-70">芽吹</span>
          </div>
        ))}
        {/* Empty slots */}
        {Array.from({ length: 5 - seeds }).map((_, i) => (
          <div key={`empty-${i}`} className="flex flex-col items-center opacity-20">
            <i className="fas fa-circle text-white/50 text-xs mt-3"></i>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-300">
        これまで <span className="text-emerald-400 font-bold">{profile.totalSeeds}</span> 個の「たね」を育てました。<br/>
        <span className="text-xs opacity-60">あと {5 - seeds} 回の対話で、新しい花が咲きます。</span>
      </p>
    </div>
  );
};
