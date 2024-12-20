import { Json } from "@/integrations/supabase/types";

export interface SectionScore {
  score: number;
  maxScore: number;
  percentage: number;
  label: string;
}

export interface QuizAttempt {
  id: string;
  created_at: string;
  total_score: number;
  user_id: string;
  section_scores: Record<string, SectionScore>;
}