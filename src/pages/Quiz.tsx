import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuizData } from "@/hooks/useQuizData";
import QuizLayout from "@/components/QuizLayout";
import { SchemaSetup } from "@/utils/appwriteSchema";

const Quiz = () => {
  const navigate = useNavigate();
  const session = useSession();
  const { data: sections, isLoading } = useQuizData();
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const fetchDebugMode = async () => {
      try {
        const { data, error } = await supabase
          .from("global_settings")
          .select("value")
          .eq("key", "debug_mode")
          .single();

        if (error) throw error;
        setDebugMode(data.value === true);
      } catch (error) {
        console.error("Error fetching debug mode:", error);
      }
    };

    fetchDebugMode();
  }, []);

  if (isLoading || !sections) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-eco-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      {debugMode && (
        <div className="fixed bottom-4 right-4 z-50">
          <SchemaSetup />
        </div>
      )}
      <QuizLayout sections={sections} />
    </>
  );
};

export default Quiz;