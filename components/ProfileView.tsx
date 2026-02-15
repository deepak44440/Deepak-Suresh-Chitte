
import React from 'react';
import { User } from '../types';
import { LogOut, Settings, Award, Share2, Crown, ChevronRight, Bookmark } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
  onUpgrade: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout, onUpgrade }) => {
  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Gov Battle!',
        text: `Prepare for Govt exams with me on Gov Battle. Use my code ${user.referralCode} to get 50 XP!`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className="flex flex-col items-center py-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border-4 border-white flex items-center justify-center text-4xl font-bold text-blue-600">
            {user.name.charAt(0)}
          </div>
          {user.subscriptionStatus && (
            <div className="absolute -top-2 -right-2 bg-amber-400 p-1.5 rounded-xl shadow-lg border-2 border-white">
              <Crown size={20} className="text-amber-900" />
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
        <p className="text-slate-400 text-sm font-medium">{user.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
          <Award className="text-blue-600 mb-1" size={24} />
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Global Rank</p>
          <p className="text-xl font-black text-slate-800">#{user.rank}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center">
          <Share2 className="text-purple-600 mb-1" size={24} />
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Referrals</p>
          <p className="text-xl font-black text-slate-800">{user.referralCount}</p>
        </div>
      </div>

      {!user.subscriptionStatus && (
        <button 
          onClick={onUpgrade}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-600 p-4 rounded-2xl text-white flex items-center justify-between shadow-lg shadow-orange-100 group"
        >
          <div className="flex items-center gap-3">
            <Crown size={24} className="group-hover:rotate-12 transition-transform" />
            <div className="text-left">
              <p className="font-bold">Upgrade to Advanced</p>
              <p className="text-[10px] text-white/80">Get PYQs 1995-2025 & Mock Interviews</p>
            </div>
          </div>
          <ChevronRight />
        </button>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden divide-y">
        <button className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
          <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Bookmark size={20} /></div>
          <p className="flex-1 text-left font-bold text-slate-700">Saved Questions</p>
          <ChevronRight size={18} className="text-slate-300" />
        </button>
        <button onClick={shareReferral} className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left">
          <div className="bg-green-100 p-2 rounded-xl text-green-600"><Share2 size={20} /></div>
          <div className="flex-1">
            <p className="font-bold text-slate-700">Refer & Earn</p>
            <p className="text-xs text-slate-400">Code: <span className="text-blue-600 font-bold">{user.referralCode}</span></p>
          </div>
          <ChevronRight size={18} className="text-slate-300" />
        </button>
        <button className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
          <div className="bg-slate-100 p-2 rounded-xl text-slate-600"><Settings size={20} /></div>
          <p className="flex-1 text-left font-bold text-slate-700">Settings</p>
          <ChevronRight size={18} className="text-slate-300" />
        </button>
        <button onClick={onLogout} className="w-full p-4 flex items-center gap-4 hover:bg-red-50 transition-colors text-red-600">
          <div className="bg-red-100 p-2 rounded-xl"><LogOut size={20} /></div>
          <p className="flex-1 text-left font-bold">Logout</p>
        </button>
      </div>
      
      <p className="text-center text-[10px] text-slate-400 font-medium">Gov Battle v1.2.0 • Build 2024</p>
    </div>
  );
};

export default ProfileView;
