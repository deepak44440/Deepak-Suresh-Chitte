
import React, { useEffect } from 'react';
import { QuizSession } from '../types';
import { Timer, X, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';

interface QuizViewProps {
  session: QuizSession;
  onUpdate: (session: QuizSession) => void;
  onFinish: (score: number, xp: number) => void;
  onCancel: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ session, onUpdate, onFinish, onCancel }) => {
  const { questions, currentIndex, userAnswers, timeRemaining, isCompleted } = session;
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (isCompleted) return;

    const timer = setInterval(() => {
      if (timeRemaining <= 1) {
        clearInterval(timer);
        finishQuiz();
      } else {
        onUpdate({ ...session, timeRemaining: timeRemaining - 1 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isCompleted]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = optionIndex;
    onUpdate({ ...session, userAnswers: newAnswers });
  };

  const finishQuiz = () => {
    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === null) return;
      if (answer === questions[index].correctAnswer) {
        score += 1;
      } else {
        score -= 0.66; // Negative marking
      }
    });

    onUpdate({ ...session, isCompleted: true });
    // Simulate slight delay before finishing
    setTimeout(() => {
      onFinish(Math.max(0, score), Math.floor(Math.max(0, score) * 5));
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 animate-fade-in text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold mb-2">Assessment Finished</h2>
        <p className="text-slate-500 mb-6">Calculating your results and updating All India Rank...</p>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-full animate-[progress_1.5s_linear]"></div>
        </div>
        <style>{`@keyframes progress { from { width: 0; } to { width: 100%; } }`}</style>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col h-full bg-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={onCancel} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
          <X size={24} />
        </button>
        <div className={`flex items-center gap-1.5 font-bold ${timeRemaining < 30 ? 'text-red-600 animate-pulse' : 'text-slate-700'}`}>
          <Timer size={18} />
          {formatTime(timeRemaining)}
        </div>
        <div className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-600">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-slate-100 rounded-full mb-8">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-300" 
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 overflow-y-auto space-y-6">
        <div className="flex gap-2 mb-2">
          <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">
            {currentQuestion.type}
          </span>
          {currentQuestion.year && (
            <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded uppercase">
              Year {currentQuestion.year}
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-slate-800 leading-snug">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between ${
                userAnswers[currentIndex] === idx 
                  ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-100' 
                  : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
              }`}
            >
              <span className="font-medium">{option}</span>
              {userAnswers[currentIndex] === idx && <CheckCircle2 size={18} className="text-blue-600 shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-6 border-t flex gap-3">
        <button
          onClick={() => onUpdate({ ...session, currentIndex: Math.max(0, currentIndex - 1) })}
          disabled={currentIndex === 0}
          className="px-6 py-3 rounded-xl border-2 border-slate-100 font-bold text-slate-500 disabled:opacity-30"
        >
          Prev
        </button>
        {currentIndex < questions.length - 1 ? (
          <button
            onClick={() => onUpdate({ ...session, currentIndex: currentIndex + 1 })}
            className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
          >
            Next <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={finishQuiz}
            className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200"
          >
            Submit Quiz
          </button>
        )}
      </div>

      {/* Penalty Warning */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
        <AlertCircle size={12} />
        Negative Marking: -0.66 for incorrect answers
      </div>
    </div>
  );
};

export default QuizView;
