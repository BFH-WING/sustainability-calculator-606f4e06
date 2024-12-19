import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface QuizOption {
  id: number;
  option_text: string;
  value: number;
  order_index: number;
}

export interface Question {
  id: number;
  question_text: string;
  description: string | null;
  weight: number;
  source_url: string | null;
  options: QuizOption[];
}

export interface Subcategory {
  id: number;
  title: string;
  description: string | null;
  questions: Question[];
}

export interface Section {
  id: number;
  title: string;
  description: string | null;
  subcategories: Subcategory[];
}

const fetchQuizData = async () => {
  console.log("Fetching quiz data from Supabase...");
  
  // Fetch sections with their relationships
  const { data: sections, error: sectionsError } = await supabase
    .from("sections")
    .select(`
      id,
      title,
      description,
      order_index,
      subcategories (
        id,
        title,
        description,
        order_index,
        questions (
          id,
          question_text,
          description,
          weight,
          source_url,
          order_index,
          options (
            id,
            option_text,
            value,
            order_index
          )
        )
      )
    `)
    .order("order_index");

  if (sectionsError) {
    console.error("Error fetching sections:", sectionsError);
    throw sectionsError;
  }

  // Sort subcategories and their questions by order_index
  const sortedSections = sections?.map(section => ({
    ...section,
    subcategories: section.subcategories
      .sort((a, b) => a.order_index - b.order_index)
      .map(subcategory => ({
        ...subcategory,
        questions: subcategory.questions
          .sort((a, b) => a.order_index - b.order_index)
          .map(question => ({
            ...question,
            options: question.options.sort((a, b) => a.order_index - b.order_index)
          }))
      }))
  }));

  console.log("Quiz data fetched successfully:", sortedSections);
  return sortedSections;
};

export const useQuizData = () => {
  return useQuery({
    queryKey: ["quiz-data"],
    queryFn: fetchQuizData,
  });
};