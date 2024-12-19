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
  weight?: number;
  source_url?: string;
  subcategory?: string;
};

export type QuizSection = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

export type QuizResults = {
  [sectionId: string]: number;
  total: number;
};