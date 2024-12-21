import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import TopNav from "@/components/TopNav";
import { toast } from "sonner";
import { QuizAttempt } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AssessmentCard from "@/components/AssessmentCard";
import ScoreTimeline from "@/components/ScoreTimeline";
import LCAInfoBox from "@/components/LCAInfoBox";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const session = useSession();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        const typedData = data.map(item => ({
          ...item,
          section_scores: item.section_scores as Record<string, {
            score: number;
            maxScore: number;
            percentage: number;
            label: string;
          }>
        }));

        setAttempts(typedData);
      } catch (error: any) {
        console.error('Error fetching attempts:', error);
        toast.error('Failed to load your previous attempts');
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchAttempts();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    try {
      setIsDeletingId(id);
      const { error } = await supabase
        .from('quiz_results')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAttempts(prev => prev.filter(attempt => attempt.id !== id));
      toast.success('Assessment deleted successfully');
    } catch (error: any) {
      console.error('Error deleting attempt:', error);
      toast.error('Failed to delete assessment');
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleStartNewAssessment = () => {
    navigate('/', { state: { reset: true } });
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
        <TopNav />
        <div className="pt-24 px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Please sign in to view your dashboard</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] flex flex-col">
      <TopNav />
      <div className="flex-1 pb-16">
        <div className="max-w-[1920px] mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pt-24">
            <h1 className="text-3xl font-bold text-gray-900">Your Assessment History</h1>
            <Button 
              onClick={handleStartNewAssessment}
              className="bg-eco-primary hover:bg-eco-dark"
            >
              <PlayIcon className="mr-2 h-4 w-4" />
              Start New Assessment
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin-slow">
                <div className="w-16 h-16 border-4 border-eco-primary border-t-transparent rounded-full" />
              </div>
            </div>
          ) : attempts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">You haven't taken any assessments yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg">
                <div className="grid md:grid-cols-2 gap-8 p-6">
                  <div className="border-r border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Score Timeline</h2>
                    <div className="h-[400px]">
                      <ScoreTimeline attempts={attempts} />
                    </div>
                  </div>
                  <div>
                    <LCAInfoBox />
                  </div>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {attempts.map((attempt) => (
                  <AssessmentCard
                    key={attempt.id}
                    attempt={attempt}
                    onDelete={handleDelete}
                    isDeletingId={isDeletingId}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;