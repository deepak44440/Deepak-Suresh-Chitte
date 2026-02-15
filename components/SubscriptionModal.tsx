
import React, { useState } from 'react';
import { X, Check, Crown, Zap, Shield, HelpCircle } from 'lucide-react';

interface SubscriptionModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    setLoading(true);
    // Simulate payment gateway interaction
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-fade-in">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Crown className="text-white" size={32} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-blue-200">Gov Battle Pro</p>
              <h2 className="text-2xl font-bold leading-none">Advanced Access</h2>
            </div>
          </div>
          
          <div className="flex items-baseline gap-1 mt-6">
            <span className="text-4xl font-black">₹199</span>
            <span className="text-blue-100 font-medium">/ month</span>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            {[
              { icon: <Zap size={18} className="text-orange-500" />, text: "1995-2025 Previous Questions" },
              { icon: <Shield size={18} className="text-green-500" />, text: "Daily Battle Arena Access" },
              { icon: <HelpCircle size={18} className="text-blue-500" />, text: "AI-Powered Mock Interviews" },
              { icon: <Check size={18} className="text-purple-500" />, text: "No Advertisements" },
              { icon: <Check size={18} className="text-purple-500" />, text: "Verified All India Rank" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="shrink-0">{f.icon}</div>
                <p className="text-sm font-medium text-slate-700">{f.text}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 transition-all ${
              loading ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white hover:scale-[1.02] active:scale-95'
            }`}
          >
            {loading ? 'Processing Payment...' : 'Unlock Now'}
          </button>

          <p className="text-[10px] text-center text-slate-400 font-medium leading-relaxed">
            By subscribing, you agree to our Terms of Service. Manage your subscription via App Store settings. 
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="block text-blue-600 mt-1">Billing Documentation</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
