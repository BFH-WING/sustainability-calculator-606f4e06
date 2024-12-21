import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { QuizResults as QuizResultsType } from "@/types/quiz";
import { circularityQuestions } from "@/data/circularityQuestions";
import Auth from "./Auth";
import { supabase } from "@/integrations/supabase/client";
import ResultsHeader from "./results/ResultsHeader";
import ResultsChart from "./results/ResultsChart";
import DetailedScores from "./results/DetailedScores";
import ResultsActions from "./results/ResultsActions";

interface QuizResultsProps {
  results: QuizResultsType;
  onRestart: () => void;
}

const QuizResults = ({ results, onRestart }: QuizResultsProps) => {
  const [session, setSession] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isStoringResults, setIsStoringResults] = useState(false);
  const [resultsStored, setResultsStored] = useState(false);
  const navigate = useNavigate();

  // Round the total score to 2 decimal places
  const roundedTotalScore = Math.round(results.total);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session ? 'Logged in' : 'Not logged in');
      setSession(session);
      if (session) {
        checkAndSaveResults(session);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', _event, session ? 'Logged in' : 'Not logged in');
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sectionScores = circularityQuestions.reduce((acc, section) => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    section.questions.forEach(question => {
      const answer = results[question.id];
      if (answer !== undefined) {
        totalScore += (answer * question.weight);
        // Calculate max possible score (100% * weight for each answered question)
        maxPossibleScore += (100 * question.weight);
      }
    });

    // Calculate percentage based on max possible score
    const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
    
    acc[section.id] = {
      score: Math.round(totalScore * 10) / 10,
      maxScore: maxPossibleScore,
      percentage: percentage,
      label: section.title
    };
    return acc;
  }, {} as { [key: string]: { score: number; maxScore: number; percentage: number; label: string } });

  const radarData = Object.entries(sectionScores).map(([_, data]) => ({
    subject: data.label,
    value: data.percentage,
  }));

  const checkAndSaveResults = async (currentSession: any) => {
    if (!currentSession || resultsStored || isStoringResults) {
      console.log('Skipping save results:', { 
        hasSession: !!currentSession, 
        resultsStored, 
        isStoringResults 
      });
      return;
    }

    try {
      setIsStoringResults(true);
      console.log('Checking for existing results...');
      
      const { data: existingResults, error: checkError } = await supabase
        .from("quiz_results")
        .select("id")
        .eq("user_id", currentSession.user.id)
        .eq("total_score", roundedTotalScore)
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing results:", checkError);
        throw checkError;
      }

      if (existingResults) {
        console.log("Results already stored for this session");
        setResultsStored(true);
        return;
      }

      console.log('Storing new results...', {
        user_id: currentSession.user.id,
        total_score: roundedTotalScore,
        section_scores: sectionScores,
      });

      const { error: insertError } = await supabase
        .from("quiz_results")
        .insert({
          user_id: currentSession.user.id,
          total_score: roundedTotalScore,
          section_scores: sectionScores,
        });

      if (insertError) {
        console.error("Error inserting results:", insertError);
        throw insertError;
      }
      
      setResultsStored(true);
      toast.success("Results saved successfully!");
      console.log('Results stored successfully');
    } catch (error: any) {
      console.error("Error saving results:", error);
      toast.error("Failed to save results. Please try again.");
    } finally {
      setIsStoringResults(false);
    }
  };

  const handleSaveResults = () => {
    if (session) {
      checkAndSaveResults(session);
    } else {
      setShowAuth(true);
    }
  };

  const handleGoToDashboard = () => {
    if (session) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
      toast.info('Please sign in to view your dashboard');
    }
  };

  if (showAuth) {
    return (
      <div className="max-w-4xl mx-auto">
        <Auth />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto overflow-y-auto max-h-[calc(100vh-16rem)] pr-4">
      <ResultsHeader totalScore={roundedTotalScore} />
      <ResultsChart radarData={radarData} />
      <DetailedScores sectionScores={sectionScores} />
      <ResultsActions
        onRestart={onRestart}
        onSaveResults={handleSaveResults}
        onGoToDashboard={handleGoToDashboard}
        showSaveButton={!session && !resultsStored}
        isLoggedIn={!!session}
      />
    </div>
  );
};

export default QuizResults;