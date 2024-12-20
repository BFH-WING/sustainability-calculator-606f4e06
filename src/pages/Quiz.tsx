import { useState, useEffect } from "react";
import { useQuizData } from "@/hooks/useQuizData";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import QuizLayout from "@/components/QuizLayout";
import { calculateResults } from "@/utils/quizCalculations";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

const STORAGE_KEY = 'circularity-quiz-answers';

const Quiz = () => {
  const { data: sections, isLoading } = useQuizData();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [completed, setCompleted] = useState(false);
  const [questionErrors, setQuestionErrors] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();

  // Reset state when navigating to quiz with reset flag
  useEffect(() => {
    if (location.state?.reset) {
      console.log("Resetting quiz state");
      handleReset();
    }
  }, [location.state]);

  // Load answers from local storage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem(STORAGE_KEY);
    if (savedAnswers && !location.state?.reset) {
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

  const handleReset = () => {
    setCompleted(false);
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuestionErrors({});
    localStorage.removeItem(STORAGE_KEY);
    toast.success('Assessment reset successfully');
  };

  const handleAnswer = (value: number) => {
    if (!sections) return;
    
    const currentQuestion = sections[currentSectionIndex].questions[currentQuestionIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    setQuestionErrors(prev => ({
      ...prev,
      [currentQuestion.id]: false
    }));
  };

  const handleError = (hasError: boolean) => {
    if (!sections) return;
    
    const currentQuestion = sections[currentSectionIndex].questions[currentQuestionIndex];
    setQuestionErrors(prev => ({
      ...prev,
      [currentQuestion.id]: hasError
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentSectionIndex > 0) {
      const prevSection = sections![currentSectionIndex - 1];
      setCurrentSectionIndex(currentSectionIndex - 1);
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const handleNext = () => {
    if (!sections) return;

    if (currentQuestionIndex < sections[currentSectionIndex].questions.length - 1) {
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
    if (!sections) return false;
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

  if (isLoading || !sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin-slow">
          <div className="w-16 h-16 border-4 border-eco-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  // Add Results section to sections array when completed
  const sectionsWithResults = completed 
    ? [...sections, { 
        id: 'results',
        title: 'Results',
        description: 'Your assessment results',
        questions: []
      }]
    : sections;

  if (completed) {
    return (
      <QuizLayout
        sections={sectionsWithResults}
        currentSectionIndex={sectionsWithResults.length - 1}
        currentQuestionIndex={0}
        answers={answers}
        onQuestionSelect={() => {}}
        canNavigateToSection={() => true}
        onPrevious={() => {
          setCompleted(false);
          setCurrentSectionIndex(sections.length - 1);
          setCurrentQuestionIndex(sections[sections.length - 1].questions.length - 1);
        }}
        onNext={() => {}}
        canGoNext={false}
      >
        <QuizResults 
          results={calculateResults(sections, answers)} 
          onRestart={handleReset}
        />
      </QuizLayout>
    );
  }

  const currentQuestion = sections[currentSectionIndex].questions[currentQuestionIndex];
  const canGoNext = answers[currentQuestion.id] !== undefined && !questionErrors[currentQuestion.id];

  return (
    <QuizLayout
      sections={sectionsWithResults}
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
        onError={handleError}
      />
    </QuizLayout>
  );
};

export default Quiz;