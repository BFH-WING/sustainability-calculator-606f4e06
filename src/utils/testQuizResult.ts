import { supabase } from "@/integrations/supabase/client";

export const insertTestQuizResult = async () => {
  console.log('Attempting to insert test quiz result...');
  
  const testResult = {
    total_score: 75,
    section_scores: {
      design: {
        score: 80,
        maxScore: 100,
        percentage: 80,
        label: "Circular Design"
      },
      materials: {
        score: 70,
        maxScore: 100,
        percentage: 70,
        label: "Material Sourcing"
      }
    }
  };

  try {
    const { data, error } = await supabase
      .from('quiz_results')
      .insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
        total_score: testResult.total_score,
        section_scores: testResult.section_scores
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting test result:', error);
      throw error;
    }

    console.log('Successfully inserted test result:', data);
    return data;
  } catch (error) {
    console.error('Failed to insert test result:', error);
    throw error;
  }
};