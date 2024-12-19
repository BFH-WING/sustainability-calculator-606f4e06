import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/hooks/useQuizData";

interface QuizIntroProps {
  sections: Section[];
  onStart: () => void;
}

const QuizIntro = ({ sections, onStart }: QuizIntroProps) => {
  return (
    <div className="pt-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex justify-center mb-6">
          <Leaf className="h-16 w-16 text-eco-primary animate-bounce" />
        </div>
        <h1 className="text-5xl font-bold text-eco-dark mb-6">
          Sustainability Calculator
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover your environmental impact through our comprehensive sustainability assessment.
          Answer questions across {sections.length} key areas to receive personalized insights.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section) => (
            <Card key={section.id} className="bg-white/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-eco-primary flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{section.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button 
          onClick={onStart}
          className="w-full max-w-md mx-auto bg-eco-primary hover:bg-eco-dark text-white py-6 text-lg flex items-center justify-center gap-2"
        >
          <Leaf className="h-5 w-5" />
          Start Assessment
        </Button>
      </div>
    </div>
  );
};

export default QuizIntro;