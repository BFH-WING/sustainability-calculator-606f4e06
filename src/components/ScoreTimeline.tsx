import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from "date-fns";
import { QuizAttempt } from "@/types/dashboard";

interface ScoreTimelineProps {
  attempts: QuizAttempt[];
}

const ScoreTimeline = ({ attempts }: ScoreTimelineProps) => {
  const chartData = attempts.map(attempt => ({
    date: format(new Date(attempt.created_at), 'MMM d, yyyy'),
    score: attempt.total_score
  }));

  return (
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
  );
};

export default ScoreTimeline;