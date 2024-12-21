import { useState, useEffect } from "react";
import { QuizSection } from "@/types/quiz";
import { calculateResults } from "@/utils/quizCalculations";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useQuizState = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [completed, setCompleted] = useState(false);
  const [questionErrors, setQuestionErrors] = useState<{ [key: string]: boolean }>({});
  const session = useSession();

  const STORAGE_KEY = 'circularity-quiz-answers';

  useEffect(() => {
    const savedAnswers = localStorage.getItem(STORAGE_KEY);
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setAnswers(parsedAnswers);
      console.log('Loaded answers from storage:', parsedAnswers);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      console.log('Saved answers to storage:', answers);
    }
  }, [answers]);

  const handleReset = () => {
    setCompleted(false);
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuestionErrors({});
    localStorage.removeItem(STORAGE_KEY);
    toast.success('Assessment reset successfully');
  };

  const storeResults = async (sections: QuizSection[]) => {
    if (!session) return;
    
    const results = calculateResults(sections, answers);
    const roundedTotalScore = Number(results.total.toFixed(2));

    try {
      console.log('Storing quiz results for user:', session.user.id);
      const { error } = await supabase.from("quiz_results").insert({
        user_id: session.user.id,
        total_score: roundedTotalScore,
        section_scores: results.sectionScores,
      });

      if (error) throw error;
      toast.success("Results saved automatically!");
      console.log('Results stored successfully');
    } catch (error: any) {
      console.error("Error saving results:", error);
      toast.error("Failed to save results automatically. You can try saving them manually.");
    }
  };

  const handleComplete = (sections: QuizSection[]) => {
    setCompleted(true);
    if (session) {
      storeResults(sections);
    }
  };

  const handleNext = (sections: QuizSection[]) => {
    if (currentQuestionIndex < sections[currentSectionIndex].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      handleComplete(sections);
    }
  };

  const handlePrevious = (sections: QuizSection[]) => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      const prevSection = sections[currentSectionIndex - 1];
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  return {
    currentSectionIndex,
    currentQuestionIndex,
    answers,
    completed,
    questionErrors,
    setAnswers,
    setQuestionErrors,
    handleReset,
    handleNext,
    handlePrevious,
    handleQuestionSelect: (sectionIndex: number, questionIndex: number) => {
      setCurrentSectionIndex(sectionIndex);
      setCurrentQuestionIndex(questionIndex);
    },
  };
};