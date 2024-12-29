import { databases } from "@/integrations/appwrite/client";
import { ID } from "appwrite";

export const insertTestQuizResult = async () => {
  console.log('Attempting to insert test quiz result to Appwrite...');
  
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
    const data = await databases.createDocument(
      'sustainability_calculator',  // database ID
      'quiz_results',              // collection ID
      ID.unique(),
      testResult
    );

    console.log('Successfully inserted test result to Appwrite:', data);
    return data;
  } catch (error) {
    console.error('Failed to insert test result to Appwrite:', error);
    throw error;
  }
};