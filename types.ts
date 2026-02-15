
export interface User {
  uid: string;
  name: string;
  email: string;
  subscriptionStatus: boolean;
  xp: number;
  totalScore: number;
  rank: number;
  referralCode: string;
  referralCount: number;
  coins: number;
}

export enum ExamCategory {
  UPSC = 'UPSC',
  PSU = 'PSU',
  IBPS = 'IBPS / Banking',
  SSC = 'SSC',
  RRB = 'RRB'
}

export interface Question {
  id: string;
  category: ExamCategory;
  type: 'basic' | 'advanced';
  year?: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizSession {
  questions: Question[];
  currentIndex: number;
  userAnswers: (number | null)[];
  timeRemaining: number;
  isCompleted: boolean;
  category: ExamCategory;
}

export interface LeaderboardEntry {
  name: string;
  totalScore: number;
  xp: number;
  rank: number;
  isCurrentUser: boolean;
}
