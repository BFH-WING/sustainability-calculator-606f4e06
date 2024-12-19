import { useState, useEffect } from "react";
import { useQuizData } from "@/hooks/useQuizData";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResults from "@/components/QuizResults";
import QuizLayout from "@/components/QuizLayout";
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

  const handleAnswer = (value: number) => {
    if (!sections) return;
    
    const currentQuestion = sections[currentSectionIndex].questions[currentQuestionIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));

    // Clear any error state for this question
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

  // Calculate total score when quiz is completed
  const calculateResults = () => {
    let totalScore = 0;
    let totalWeight = 0;

    sections.forEach(section => {
      section.questions.forEach(question => {
        const answer = answers[question.id];
        if (answer !== undefined) {
          totalScore += answer * question.weight;
          totalWeight += question.weight;
        }
      });
    });

    // Calculate the weighted average as the total score
    const total = totalWeight > 0 ? Math.round((totalScore / totalWeight)) : 0;

    return {
      ...answers,
      total
    };
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] pt-24 px-6">
        <QuizResults results={calculateResults()} onRestart={handleRestart} />
      </div>
    );
  }

  const currentQuestion = sections[currentSectionIndex].questions[currentQuestionIndex];
  const canGoNext = answers[currentQuestion.id] !== undefined && !questionErrors[currentQuestion.id];

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
        onError={handleError}
      />
    </QuizLayout>
  );
};

export default Quiz;