import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RadarChart from "./RadarChart";
import { QuizResults as QuizResultsType } from "@/types/quiz";
import { circularityQuestions } from "@/data/circularityQuestions";
import CircularityLevel from "./CircularityLevel";
import Auth from "./Auth";
import { supabase } from "@/integrations/supabase/client";

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

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        checkAndSaveResults(session);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        checkAndSaveResults(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAndSaveResults = async (currentSession: any) => {
    if (!currentSession || resultsStored || isStoringResults) return;

    try {
      setIsStoringResults(true);
      
      // Check if results for this session already exist
      const { data: existingResults } = await supabase
        .from("quiz_results")
        .select("id")
        .eq("user_id", currentSession.user.id)
        .eq("total_score", results.total)
        .maybeSingle();

      if (existingResults) {
        console.log("Results already stored for this session");
        setResultsStored(true);
        return;
      }

      // Save new results
      const { error } = await supabase.from("quiz_results").insert({
        user_id: currentSession.user.id,
        total_score: Math.round(results.total),
        section_scores: sectionScores,
      });

      if (error) throw error;
      
      setResultsStored(true);
      toast.success("Results saved successfully!");
    } catch (error: any) {
      console.error("Error saving results:", error);
      toast.error("Failed to save results. Please try again.");
    } finally {
      setIsStoringResults(false);
    }
  };

  // Calculate scores per section
  const sectionScores = circularityQuestions.reduce((acc, section) => {
    let totalScore = 0;
    let answeredQuestions = 0;

    section.questions.forEach(question => {
      const answer = results[question.id];
      if (answer !== undefined) {
        totalScore += (answer * question.weight);
        answeredQuestions += question.weight;
      }
    });

    const percentage = answeredQuestions > 0 ? (totalScore / answeredQuestions) : 0;
    
    acc[section.id] = {
      score: Math.round(totalScore * 10) / 10,
      maxScore: answeredQuestions * 100,
      percentage: Math.round(percentage),
      label: section.title
    };
    return acc;
  }, {} as { [key: string]: { score: number; maxScore: number; percentage: number; label: string } });

  const radarData = Object.entries(sectionScores).map(([id, data]) => ({
    subject: data.label,
    value: data.percentage,
  }));

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
      <h1 className="text-3xl font-bold text-center mb-8 text-eco-dark">
        Your Circularity Assessment Results
      </h1>

      <CircularityLevel score={results.total} />
      
      <div className="mb-12">
        <div className="h-[400px]">
          <RadarChart 
            data={radarData} 
            color="#4CAF50"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-eco-dark">Detailed Scores by Section</h2>
        {Object.entries(sectionScores).map(([id, data]) => (
          <div key={id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex-1 font-medium">{data.label}</span>
              <span className="text-gray-500">
                Score: {data.score}/{data.maxScore} ({data.percentage}%)
              </span>
            </div>
            <div 
              className="h-2 bg-gray-100 rounded-full overflow-hidden"
              style={{
                background: `linear-gradient(to right, #4CAF50 ${data.percentage}%, #e5e7eb 0%)`
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8 mb-8">
        <button
          onClick={onRestart}
          className="bg-white text-eco-primary border-2 border-eco-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-eco-primary hover:text-white transition-colors"
        >
          Retake Assessment
        </button>
        {!session && !resultsStored && (
          <button
            onClick={handleSaveResults}
            className="bg-eco-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-eco-dark transition-colors"
          >
            Save Results
          </button>
        )}
        <button
          onClick={handleGoToDashboard}
          className="bg-eco-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-eco-dark transition-colors"
        >
          {session ? 'Go to Dashboard' : 'Sign in to Save Results'}
        </button>
      </div>
    </div>
  );
};

export default QuizResults;