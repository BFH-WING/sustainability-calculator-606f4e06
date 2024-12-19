import { useState, useEffect } from "react";
import { useQuizData } from "@/hooks/useQuizData";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import QuizLayout from "@/components/QuizLayout";
import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = 'circularity-quiz-answers';

const Quiz = () => {
  const { data: sections, isLoading } = useQuizData();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [completed, setCompleted] = useState(false);
  const [questionErrors, setQuestionErrors] = useState<{ [key: string]: boolean }>({});

  // Load answers from local storage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem(STORAGE_KEY);
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setAnswers(parsedAnswers);
      console.log('Loaded answers from storage:', parsedAnswers);
    }
  }, []);

  // Save answers to local storage whenever they change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      console.log('Saved answers to storage:', answers);
    }
  }, [answers]);

  const handleRestart = () => {
    setCompleted(false);
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuestionErrors({});
    localStorage.removeItem(STORAGE_KEY);
    toast.success('Assessment reset successfully');
  };

  const handleReset = () => {
    handleRestart();
  };

  if (isLoading || !sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin-slow">
          <div className="w-16 h-16 border-4 border-eco-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] pt-24 px-6">
        <TopNav />
        <QuizResults results={answers} onRestart={handleRestart} />
      </div>
    );
  }

  const currentSection = sections[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];

  const handleAnswer = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleError = (hasError: boolean) => {
    setQuestionErrors(prev => ({
      ...prev,
      [currentQuestion.id]: hasError
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      const prevSection = sections[currentSectionIndex - 1];
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setCompleted(true);
    }
  };

  const handleQuestionSelect = (sectionIndex: number, questionIndex: number) => {
    if (canNavigateToSection(sectionIndex)) {
      setCurrentSectionIndex(sectionIndex);
      setCurrentQuestionIndex(questionIndex);
    }
  };

  const canNavigateToSection = (sectionIndex: number) => {
    if (sectionIndex === 0) return true;
    if (sectionIndex > currentSectionIndex + 1) return false;
    
    for (let i = 0; i < sectionIndex; i++) {
      const sectionQuestions = sections[i].questions;
      const allQuestionsAnswered = sectionQuestions.every(
        (question) => answers[question.id] !== undefined
      );
      if (!allQuestionsAnswered) return false;
    }
    return true;
  };

  return (
    <>
      <TopNav />
      <QuizLayout
        sections={sections}
        currentSectionIndex={currentSectionIndex}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        onQuestionSelect={handleQuestionSelect}
        canNavigateToSection={canNavigateToSection}
        onPrevious={handlePrevious}
        onNext={handleNext}
        canGoNext={answers[currentQuestion.id] !== undefined}
        questionErrors={questionErrors}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-eco-dark">
            {currentSection.title}
          </h2>
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            selectedValue={answers[currentQuestion.id]}
            onError={handleError}
          />
          <div className="fixed bottom-4 left-4 p-4">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Reset Assessment
            </Button>
          </div>
        </div>
      </QuizLayout>
    </>
  );
};

export default Quiz;