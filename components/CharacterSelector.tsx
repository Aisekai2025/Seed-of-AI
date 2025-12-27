
import React from 'react';
import { CHARACTERS } from '../constants';
import { Character } from '../types';

interface Props {
  onSelect: (character: Character) => void;
}

export const CharacterSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto p-4">
      {CHARACTERS.map((char) => (
        <button
          key={char.id}
          onClick={() => onSelect(char)}
          className={`group glass rounded-3xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-900/20 overflow-hidden relative`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${char.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          
          <div className="relative z-10 flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-colors`}>
              <i className={`fas ${char.icon} text-2xl text-white`}></i>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1 group-hover:text-white transition-colors">
                {char.name}
              </h3>
              <p className="text-sm font-medium text-emerald-300 mb-2">{char.title}</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {char.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
