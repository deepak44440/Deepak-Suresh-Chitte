
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue-600 text-white animate-fade-in">
      <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6">
        <span className="text-blue-600 text-5xl font-black italic">GB</span>
      </div>
      <h1 className="text-3xl font-bold mb-2 tracking-tight">Gov Battle</h1>
      <p className="text-blue-100 font-medium opacity-80">Compete. Practice. Rank Up.</p>
      
      <div className="absolute bottom-12">
        <div className="w-8 h-1 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white w-1/3 animate-[loading_1.5s_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
