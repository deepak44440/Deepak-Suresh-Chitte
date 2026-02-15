
import React from 'react';
import { CATEGORIES, MOCK_QUESTIONS } from '../constants';
import { ExamCategory } from '../types';
import { PlayCircle, Star, Info } from 'lucide-react';

interface HomeViewProps {
  onStartQuiz: (category: ExamCategory, questions: any[]) => void;
  isSubscribed: boolean;
}

const HomeView: React.FC<HomeViewProps> = ({ onStartQuiz, isSubscribed }) => {
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1">Target 2024 Exam?</h2>
          <p className="text-blue-100 text-sm mb-4">Start your preparation journey with daily goals.</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-50 transition-colors">
            Start Free Mock
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20">
          <PlayCircle size={120} />
        </div>
      </div>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800">Practice Categories</h3>
          <span className="text-xs text-blue-600 font-medium">View All</span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onStartQuiz(cat.id, MOCK_QUESTIONS[cat.id] || MOCK_QUESTIONS[ExamCategory.UPSC])}
              className={`${cat.color} p-4 rounded-xl flex items-center justify-between group hover:shadow-md transition-all border border-slate-100`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-800">{cat.name}</p>
                  <p className="text-xs text-slate-500">Practice Sets: 48</p>
                </div>
              </div>
              <div className="bg-white/50 px-2 py-1 rounded text-[10px] font-bold text-slate-600 uppercase">
                Explore
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Subscription Teaser (if not subscribed) */}
      {!isSubscribed && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3">
          <div className="bg-orange-100 p-2 rounded-lg h-fit">
            <Star className="text-orange-600" size={20} />
          </div>
          <div>
            <h4 className="font-bold text-orange-900 text-sm">Advanced Practice (1995-2025)</h4>
            <p className="text-xs text-orange-800 mb-2">Get access to previous year questions and all-India rankings.</p>
            <div className="text-orange-700 text-[10px] flex items-center gap-1">
              <Info size={12} />
              Unlock Premium Content
            </div>
          </div>
        </div>
      )}

      {/* Ad Simulator */}
      {!isSubscribed && (
        <div className="w-full h-24 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs uppercase tracking-widest border border-dashed border-slate-300">
          Advertisement - Go Pro to Remove
        </div>
      )}
    </div>
  );
};

export default HomeView;
