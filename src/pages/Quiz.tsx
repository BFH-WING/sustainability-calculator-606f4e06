import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuizData } from "@/hooks/useQuizData";
import QuizLayout from "@/components/QuizLayout";
import QuizQuestion from "@/components/QuizQuestion";

const Quiz = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { data: sections, isLoading } = useQuizData();
  const [debugMode, setDebugMode] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [questionErrors, setQuestionErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchDebugMode = async () => {
      try {
        const { data, error } = await supabase
          .from("global_settings")
          .select("value")
          .eq("key", "debug_mode")
          .single();

        if (error) throw error;
        setDebugMode(data.value === true);
      } catch (error) {
        console.error("Error fetching debug mode:", error);
      }
    };

    fetchDebugMode();
  }, []);

  const handleQuestionSelect = (sectionIndex: number, questionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentQuestionIndex(questionIndex);
  };

  const canNavigateToSection = (sectionIndex: number) => {
    return sectionIndex <= currentSectionIndex;
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(sections![currentSectionIndex - 1].questions.length - 1);
    }
  };

  const handleNext = () => {
    const currentSection = sections![currentSectionIndex];
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < sections!.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handleAnswer = (value: number) => {
    const currentQuestion = sections![currentSectionIndex].questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  if (isLoading || !sections) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-eco-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const currentQuestion = sections[currentSectionIndex].questions[currentQuestionIndex];
  const canGoNext = answers[currentQuestion.id] !== undefined;

  return (
    <QuizLayout
      sections={sections}
      currentSectionIndex={currentSectionIndex}
      currentQuestionIndex={currentQuestionIndex}
      answers={answers}
      onQuestionSelect={handleQuestionSelect}
      canNavigateToSection={canNavigateToSection}
      onPrevious={handlePrevious}
      onNext={handleNext}
      canGoNext={canGoNext}
      questionErrors={questionErrors}
    >
      <QuizQuestion
        question={currentQuestion}
        onAnswer={handleAnswer}
        selectedValue={answers[currentQuestion.id]}
        onError={(hasError) => {
          setQuestionErrors(prev => ({
            ...prev,
            [currentQuestion.id]: hasError
          }));
        }}
      />
    </QuizLayout>
  );
};

export default Quiz;