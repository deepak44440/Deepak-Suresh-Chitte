
import React, { useState } from 'react';
import { User, LeaderboardEntry } from '../types';
import { Trophy, Medal, Search } from 'lucide-react';

interface LeaderboardViewProps {
  currentUser: User;
}

const LeaderboardView: React.FC<LeaderboardViewProps> = ({ currentUser }) => {
  const [filter, setFilter] = useState('Global');
  
  const MOCK_DATA: LeaderboardEntry[] = [
    { name: 'Aditya Singh', totalScore: 982, xp: 4910, rank: 1, isCurrentUser: false },
    { name: 'Priya Verma', totalScore: 945, xp: 4725, rank: 2, isCurrentUser: false },
    { name: 'Rahul K.', totalScore: 890, xp: 4450, rank: 3, isCurrentUser: false },
    { name: 'Sneha Rao', totalScore: 812, xp: 4060, rank: 4, isCurrentUser: false },
    { name: currentUser.name, totalScore: currentUser.totalScore, xp: currentUser.xp, rank: 42, isCurrentUser: true },
    { name: 'Vikram J.', totalScore: 750, xp: 3750, rank: 43, isCurrentUser: false },
  ].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="flex flex-col h-full bg-slate-50 animate-fade-in">
      <div className="bg-blue-600 p-6 pt-10 rounded-b-[40px] text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Trophy size={28} /> All India Ranking
        </h2>
        
        <div className="flex justify-around items-end gap-2 mb-4 h-40">
          {/* Rank 2 */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[80px]">
            <div className="relative">
              <div className="w-14 h-14 bg-slate-200/20 rounded-full border-2 border-white/50 overflow-hidden flex items-center justify-center text-xl font-bold">P</div>
              <div className="absolute -bottom-1 -right-1 bg-slate-200 text-slate-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-blue-600">2</div>
            </div>
            <p className="text-[10px] font-bold truncate w-full text-center">Priya V.</p>
            <div className="bg-white/10 w-full h-20 rounded-t-xl border-x border-t border-white/20"></div>
          </div>
          {/* Rank 1 */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[100px]">
             <div className="relative">
              <div className="w-20 h-20 bg-amber-400/20 rounded-full border-4 border-amber-400 overflow-hidden flex items-center justify-center text-3xl font-bold">A</div>
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-900 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-blue-600">1</div>
            </div>
            <p className="text-xs font-bold truncate w-full text-center">Aditya S.</p>
            <div className="bg-white/20 w-full h-28 rounded-t-xl border-x border-t border-white/30"></div>
          </div>
          {/* Rank 3 */}
          <div className="flex flex-col items-center gap-2 flex-1 max-w-[80px]">
            <div className="relative">
              <div className="w-14 h-14 bg-orange-200/20 rounded-full border-2 border-orange-200/50 overflow-hidden flex items-center justify-center text-xl font-bold">R</div>
              <div className="absolute -bottom-1 -right-1 bg-orange-300 text-orange-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-blue-600">3</div>
            </div>
            <p className="text-[10px] font-bold truncate w-full text-center">Rahul K.</p>
            <div className="bg-white/10 w-full h-16 rounded-t-xl border-x border-t border-white/20"></div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-sm border p-1 flex gap-1 mb-4">
          {['Global', 'Category', 'Weekly'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${
                filter === t ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white mx-4 rounded-t-2xl shadow-sm overflow-y-auto px-4 divide-y">
        {MOCK_DATA.map((entry, i) => (
          <div 
            key={i} 
            className={`py-4 flex items-center gap-4 ${entry.isCurrentUser ? 'bg-blue-50/50 -mx-4 px-4' : ''}`}
          >
            <div className="w-8 text-center font-black text-slate-400">
              {entry.rank <= 3 ? (
                <Medal className={entry.rank === 1 ? 'text-amber-500' : entry.rank === 2 ? 'text-slate-400' : 'text-orange-400'} size={24} />
              ) : (
                entry.rank
              )}
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
              {entry.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className={`font-bold text-sm ${entry.isCurrentUser ? 'text-blue-700' : 'text-slate-800'}`}>
                {entry.name} {entry.isCurrentUser && '(You)'}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{entry.xp} XP • {entry.totalScore} Points</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardView;
