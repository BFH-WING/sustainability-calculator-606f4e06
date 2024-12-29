import { Button } from "@/components/ui/button";
import { insertTestQuizResult } from "@/utils/testQuizResult";
import { toast } from "sonner";

export default function Home() {
  const handleTestInsert = async () => {
    try {
      await insertTestQuizResult();
      toast.success("Test quiz result inserted successfully to Appwrite!");
    } catch (error) {
      toast.error("Failed to insert test result to Appwrite. Make sure you're logged in!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Sustainability Calculator</h1>
      <Button 
        onClick={handleTestInsert}
        className="bg-green-600 hover:bg-green-700"
      >
        Insert Test Quiz Result (Appwrite)
      </Button>
    </div>
  );
}