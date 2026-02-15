
import React from 'react';
import { Flame, Users, Timer, Trophy, Lock } from 'lucide-react';
import { ExamCategory } from '../types';

interface DailyBattleViewProps {
  onStartQuiz: (category: ExamCategory, questions: any[]) => void;
  isSubscribed: boolean;
}

const DailyBattleView: React.FC<DailyBattleViewProps> = ({ onStartQuiz, isSubscribed }) => {
  const MOCK_BATTLE_QUESTIONS = [
    { question: "Current Chief of Defence Staff?", options: ["Gen. Anil Chauhan", "Gen. Manoj Pande", "Adm. R Hari Kumar", "ACM VR Chaudhari"], correctAnswer: 0, type: 'advanced' },
    // Add more...
  ];

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <div className="bg-red-500/20 text-red-500 w-fit px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 mb-4 uppercase">
            <Flame size={12} /> Live Now
          </div>
          <h2 className="text-2xl font-bold mb-2">Mega Daily Battle</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-[200px]">10 Questions. 5 Minutes. Only 1 attempt per day.</p>
          
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <Users size={16} className="text-blue-400 mb-1" />
              <p className="text-[10px] text-slate-500 uppercase">Players</p>
              <p className="font-bold">12,408</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <Timer size={16} className="text-orange-400 mb-1" />
              <p className="text-[10px] text-slate-500 uppercase">Ends In</p>
              <p className="font-bold">04:22:15</p>
            </div>
          </div>

          <button 
            disabled={!isSubscribed}
            onClick={() => onStartQuiz(ExamCategory.UPSC, MOCK_BATTLE_QUESTIONS)}
            className="w-full bg-blue-600 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 group"
          >
            {!isSubscribed && <Lock size={18} />}
            {isSubscribed ? 'Join The Battle' : 'Unlock Daily Battle'}
          </button>
        </div>
        
        <Trophy size={140} className="absolute -right-10 -bottom-4 text-white/5 rotate-12" />
      </div>

      <section>
        <h3 className="font-bold text-slate-800 mb-4">Battle Rewards</h3>
        <div className="space-y-3">
          {[
            { rank: 'Top 10', prize: '500 XP + 50 Coins', color: 'text-amber-500' },
            { rank: 'Top 100', prize: '100 XP + 10 Coins', color: 'text-slate-400' },
            { rank: 'Top 500', prize: '50 XP', color: 'text-amber-700' },
          ].map((r, i) => (
            <div key={i} className="bg-white border p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy size={20} className={r.color} />
                <p className="font-bold text-slate-700">{r.rank}</p>
              </div>
              <p className="text-sm font-medium text-slate-500">{r.prize}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DailyBattleView;
