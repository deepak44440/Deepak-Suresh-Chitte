
import React, { useState, useEffect } from 'react';
import { User, ExamCategory, QuizSession, LeaderboardEntry } from './types';
import { CATEGORIES, NAV_ITEMS } from './constants';
import HomeView from './components/HomeView';
import AuthView from './components/AuthView';
import QuizView from './components/QuizView';
import LeaderboardView from './components/LeaderboardView';
import ProfileView from './components/ProfileView';
import DailyBattleView from './components/DailyBattleView';
import SplashScreen from './components/SplashScreen';
import SubscriptionModal from './components/SubscriptionModal';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [currentQuiz, setCurrentQuiz] = useState<QuizSession | null>(null);
  const [showSubscription, setShowSubscription] = useState(false);

  useEffect(() => {
    // Simulate initial loading/auth check
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('gb_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('gb_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gb_user');
    setActiveTab('home');
  };

  const updateUserInfo = (updates: Partial<User>) => {
    if (!user) return;
    const newUser = { ...user, ...updates };
    setUser(newUser);
    localStorage.setItem('gb_user', JSON.stringify(newUser));
  };

  const startQuiz = (category: ExamCategory, questions: any[]) => {
    if (!user?.subscriptionStatus && questions.some(q => q.type === 'advanced')) {
      setShowSubscription(true);
      return;
    }
    setCurrentQuiz({
      questions: questions.map((q, i) => ({ ...q, id: `q-${i}` })),
      currentIndex: 0,
      userAnswers: new Array(questions.length).fill(null),
      timeRemaining: questions.length * 60, // 1 min per question
      isCompleted: false,
      category
    });
  };

  if (loading) return <SplashScreen />;

  if (!user) return <AuthView onLogin={handleLogin} />;

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col bg-slate-50 relative shadow-xl overflow-hidden">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between border-b sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">GB</div>
          <h1 className="text-xl font-bold text-slate-800">Gov Battle</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
             <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
               <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
               {user.xp} XP
             </div>
             {!user.subscriptionStatus && (
               <button 
                 onClick={() => setShowSubscription(true)}
                 className="text-[10px] text-orange-600 font-bold underline uppercase tracking-wider"
               >
                 Go Pro
               </button>
             )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 overflow-y-auto">
        {currentQuiz ? (
          <QuizView 
            session={currentQuiz} 
            onUpdate={(s) => setCurrentQuiz(s)}
            onFinish={(score, xpGained) => {
              updateUserInfo({ 
                totalScore: user.totalScore + score,
                xp: user.xp + xpGained
              });
              setCurrentQuiz(null);
            }}
            onCancel={() => setCurrentQuiz(null)}
          />
        ) : (
          <>
            {activeTab === 'home' && <HomeView onStartQuiz={startQuiz} isSubscribed={user.subscriptionStatus} />}
            {activeTab === 'battle' && <DailyBattleView onStartQuiz={startQuiz} isSubscribed={user.subscriptionStatus} />}
            {activeTab === 'leaderboard' && <LeaderboardView currentUser={user} />}
            {activeTab === 'profile' && <ProfileView user={user} onLogout={handleLogout} onUpgrade={() => setShowSubscription(true)} />}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      {!currentQuiz && (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t flex justify-around py-2 z-50 shadow-2xl">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-1 transition-all duration-200 ${
                activeTab === item.id ? 'text-blue-600 scale-110' : 'text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      )}

      {showSubscription && (
        <SubscriptionModal 
          onClose={() => setShowSubscription(false)} 
          onSuccess={() => {
            updateUserInfo({ subscriptionStatus: true });
            setShowSubscription(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
