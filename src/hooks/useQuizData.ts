import { useQuery } from "@tanstack/react-query";
import { QuizSection } from "@/types/quiz";
import { circularityQuestions } from "@/data/circularityQuestions";

const fetchQuizData = async (): Promise<QuizSection[]> => {
  console.log("Loading circularity questions data...");
  return circularityQuestions;
};

export const useQuizData = () => {
  return useQuery({
    queryKey: ["quiz-data"],
    queryFn: fetchQuizData,
  });
};