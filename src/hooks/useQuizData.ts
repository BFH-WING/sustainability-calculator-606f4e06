import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { QuizSection } from "@/types/quiz";

const fetchQuizData = async (): Promise<QuizSection[]> => {
  console.log("Fetching quiz data from Supabase...");
  
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

  // Transform the data to match our frontend types
  const transformedSections: QuizSection[] = sections?.map(section => ({
    id: section.id.toString(),
    title: section.title,
    description: section.description || "",
    questions: section.subcategories.flatMap(subcategory => 
      subcategory.questions.map(question => ({
        id: question.id.toString(),
        text: question.question_text,
        description: question.description || undefined,
        weight: question.weight || undefined,
        source_url: question.source_url || undefined,
        options: question.options
          .sort((a, b) => a.order_index - b.order_index)
          .map(option => ({
            id: option.id.toString(),
            text: option.option_text,
            value: Number(option.value)
          }))
      }))
    ).sort((a, b) => {
      const aId = parseInt(a.id);
      const bId = parseInt(b.id);
      return aId - bId;
    })
  })) || [];

  console.log("Transformed quiz data:", transformedSections);
  return transformedSections;
};

export const useQuizData = () => {
  return useQuery({
    queryKey: ["quiz-data"],
    queryFn: fetchQuizData,
  });
};