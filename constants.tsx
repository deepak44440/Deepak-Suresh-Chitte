
import React from 'react';
import { 
  BookOpen, 
  Trophy, 
  User as UserIcon, 
  Home as HomeIcon, 
  Zap, 
  ShieldCheck, 
  Briefcase, 
  Landmark, 
  TrainFront,
  Flame
} from 'lucide-react';
import { ExamCategory } from './types';

export const CATEGORIES = [
  { id: ExamCategory.UPSC, name: 'UPSC', icon: <ShieldCheck className="w-8 h-8 text-blue-600" />, color: 'bg-blue-50' },
  { id: ExamCategory.PSU, name: 'PSU', icon: <Briefcase className="w-8 h-8 text-orange-600" />, color: 'bg-orange-50' },
  { id: ExamCategory.IBPS, name: 'Banking', icon: <Landmark className="w-8 h-8 text-green-600" />, color: 'bg-green-50' },
  { id: ExamCategory.SSC, name: 'SSC', icon: <BookOpen className="w-8 h-8 text-purple-600" />, color: 'bg-purple-50' },
  { id: ExamCategory.RRB, name: 'RRB', icon: <TrainFront className="w-8 h-8 text-red-600" />, color: 'bg-red-50' },
];

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
  { id: 'battle', label: 'Daily Battle', icon: <Flame className="w-6 h-6" /> },
  { id: 'leaderboard', label: 'Rankings', icon: <Trophy className="w-6 h-6" /> },
  { id: 'profile', label: 'Profile', icon: <UserIcon className="w-6 h-6" /> },
];

export const MOCK_QUESTIONS: Record<string, any[]> = {
  [ExamCategory.UPSC]: [
    {
      id: 'q1',
      category: ExamCategory.UPSC,
      type: 'basic',
      year: 2023,
      question: "Which article of the Indian Constitution deals with the 'Right to Education'?",
      options: ["Article 21A", "Article 19", "Article 25", "Article 32"],
      correctAnswer: 0
    },
    {
      id: 'q2',
      category: ExamCategory.UPSC,
      type: 'advanced',
      year: 2022,
      question: "The 'Triple Talaq' judgment of the Supreme Court was delivered in which year?",
      options: ["2015", "2017", "2019", "2021"],
      correctAnswer: 1
    }
  ],
  // Other categories would follow same pattern
};
