export type QuizOption = {
  id: string;
  text: string;
  value: number;
};

export type Question = {
  id: string;
  text: string;
  options: QuizOption[];
  description?: string;
  weight: number;
  source_url?: string;
  subcategory?: string;
  type: 'percentage' | 'single_choice';
};

export type QuizSection = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

export type QuizResults = {
  [key: string]: number;
  total: number;
};