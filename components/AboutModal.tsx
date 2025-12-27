
import React from 'react';

interface Props {
  onClose: () => void;
}

export const AboutModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="glass w-full max-w-lg rounded-3xl p-8 animate-in zoom-in-95 duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 opacity-50"></div>
        
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <i className="fas fa-seedling text-emerald-400"></i>
            AIのたね とは
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <i className="fas fa-times text-slate-400"></i>
          </button>
        </div>

        <div className="space-y-6 text-slate-200 leading-relaxed">
          <section>
            <p className="text-lg text-emerald-100 font-medium mb-2">
              あなたの言葉が、小さな「たね」になります。
            </p>
            <p className="text-sm opacity-80">
              「AIのたね」は、日々の感情や考えをそっと言葉にすることで、自分自身を見つめ直すための静かな森のような場所です。
            </p>
          </section>

          <section className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <h3 className="text-sm font-bold text-emerald-300 mb-2 flex items-center gap-2">
              <i className="fas fa-star text-[10px]"></i> 成長の仕組み
            </h3>
            <ul className="text-xs space-y-2 opacity-80 list-disc list-inside">
              <li>対話をするたびに、あなたの庭に「たね」が植えられます。</li>
              <li>5つの「たね」が揃うと、それは美しい「花」として開花します。</li>
              <li>過去の対話はいつでも「記憶」として振り返ることができます。</li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-bold text-emerald-300 mb-2 flex items-center gap-2">
              <i className="fas fa-shield-alt text-[10px]"></i> 安心できる場所
            </h3>
            <p className="text-xs opacity-80">
              ここでは否定や評価はありません。4人のガイドが、あなたのペースに合わせて優しく寄り添います。
            </p>
          </section>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all font-bold text-white shadow-lg shadow-emerald-900/20"
        >
          森へ戻る
        </button>
      </div>
    </div>
  );
};
