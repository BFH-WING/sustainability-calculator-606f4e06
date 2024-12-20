import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from "date-fns";
import TopNav from "@/components/TopNav";
import { toast } from "sonner";
import { QuizAttempt } from "@/types/dashboard";
import { Button } from "@/components/ui/button";
import { PlayIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RadarChart from "@/components/RadarChart";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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

  const chartData = attempts.map(attempt => ({
    date: format(new Date(attempt.created_at), 'MMM d, yyyy'),
    score: attempt.total_score
  }));

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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
      <TopNav />
      <div className="max-w-6xl mx-auto pt-24 px-6">
        <div className="flex justify-between items-center mb-8">
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
          <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Score Timeline</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date"
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                    />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#4CAF50" 
                      strokeWidth={2}
                      dot={{ fill: '#4CAF50' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {attempts.map((attempt) => {
                const radarData = Object.entries(attempt.section_scores).map(([, data]) => ({
                  subject: data.label,
                  value: data.percentage
                }));

                return (
                  <div 
                    key={attempt.id} 
                    className="bg-white rounded-lg shadow-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {format(new Date(attempt.created_at), 'MMMM d, yyyy')}
                        </p>
                        <HoverCard>
                          <HoverCardTrigger>
                            <div className="flex items-center gap-2 cursor-help">
                              <span className="text-2xl font-bold text-eco-primary">
                                {Math.round(attempt.total_score * 20)}%
                              </span>
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="space-y-3">
                              {Object.entries(attempt.section_scores).map(([key, data]) => (
                                <div key={key} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{data.label}</span>
                                    <span className="font-medium">{data.percentage}%</span>
                                  </div>
                                  <div 
                                    className="h-1.5 bg-gray-100 rounded-full overflow-hidden"
                                    style={{
                                      background: `linear-gradient(to right, #4CAF50 ${data.percentage}%, #e5e7eb 0%)`
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(attempt.id)}
                        disabled={isDeletingId === attempt.id}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="h-[200px]">
                      <RadarChart data={radarData} color="#4CAF50" />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;