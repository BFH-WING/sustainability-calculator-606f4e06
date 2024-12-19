export type QuizSection = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

export type Question = {
  id: string;
  text: string;
  options: QuizOption[];
};

export type QuizOption = {
  id: string;
  text: string;
  value: number;
};

export type QuizResults = {
  [sectionId: string]: number;
  total: number;
};