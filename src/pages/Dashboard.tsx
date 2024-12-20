import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from "date-fns";
import TopNav from "@/components/TopNav";
import { toast } from "sonner";

interface QuizAttempt {
  id: string;
  total_score: number;
  section_scores: Record<string, any>;
  created_at: string;
}

const Dashboard = () => {
  const session = useSession();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const { data, error } = await supabase
          .from('quiz_results')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        setAttempts(data || []);
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

  const chartData = attempts.map(attempt => ({
    date: format(new Date(attempt.created_at), 'MMM d, yyyy'),
    score: attempt.total_score
  }));

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Assessment History</h1>
        
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
                      domain={[0, 5]}
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

            <div className="space-y-4">
              {attempts.map((attempt) => (
                <div 
                  key={attempt.id} 
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Assessment on {format(new Date(attempt.created_at), 'MMMM d, yyyy')}
                    </h3>
                    <span className="text-2xl font-bold text-eco-primary">
                      {attempt.total_score.toFixed(2)}
                    </span>
                  </div>
                  <div className="grid gap-4">
                    {Object.entries(attempt.section_scores).map(([key, data]: [string, any]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{data.label}</span>
                          <span className="font-medium">{data.percentage}%</span>
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
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;