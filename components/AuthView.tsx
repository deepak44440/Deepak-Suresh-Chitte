
import React, { useState } from 'react';
import { User } from '../types';
import { Mail, Lock, User as UserIcon, ArrowRight, Github } from 'lucide-react';

interface AuthViewProps {
  onLogin: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referral, setReferral] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful authentication
    const mockUser: User = {
      uid: 'u' + Math.random().toString(36).substr(2, 9),
      name: name || (isLogin ? 'Aditya Singh' : 'New User'),
      email: email || 'user@govbattle.com',
      subscriptionStatus: false,
      xp: 0,
      totalScore: 0,
      rank: 2500,
      referralCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
      referralCount: 0,
      coins: referral ? 50 : 0
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-6 max-w-md mx-auto animate-fade-in">
      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl shadow-xl shadow-blue-100 flex items-center justify-center text-white text-4xl font-black italic mx-auto mb-6">
            GB
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-500 font-medium">
            {isLogin ? 'Sign in to continue your progress' : 'Join the elite battle for ranks'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all font-medium"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all font-medium"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all font-medium"
            />
          </div>
          {!isLogin && (
            <div className="relative">
              <div className="bg-orange-50 px-4 py-1 rounded-full text-[10px] font-black text-orange-600 absolute right-4 top-1/2 -translate-y-1/2 uppercase">
                Optional
              </div>
              <input
                type="text"
                placeholder="Referral Code"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all font-medium"
              />
            </div>
          )}

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700">
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
            <span className="relative bg-slate-50 px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or Continue With</span>
          </div>

          <button className="w-full bg-white border border-slate-200 py-3 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
            <Github size={20} />
            GitHub
          </button>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-slate-500 font-medium">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthView;
