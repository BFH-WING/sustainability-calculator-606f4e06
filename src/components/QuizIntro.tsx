import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizSection } from "@/types/quiz";

interface QuizIntroProps {
  sections: QuizSection[];
  onStart: () => void;
}

const QuizIntro = ({ sections, onStart }: QuizIntroProps) => {
  return (
    <div className="pt-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-8">
        <div className="flex justify-center mb-6">
          <Leaf className="h-16 w-16 text-eco-primary animate-bounce" />
        </div>
        <h1 className="text-4xl font-bold text-eco-dark mb-4">
          BFH Circularity Diagnostics Tool
        </h1>
        <p className="text-sm text-gray-600 mb-2">
          Developed by: Dr. Maria A. Franco / Bern University of Applied Sciences
        </p>
        <p className="text-lg text-gray-700 mb-4">
          This tool will help your organization get a first glimpse on where they stand in their circularity journey.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-600 italic">
            Disclaimer: The results of this diagnostic tool are not intended to provide a measure of environmental sustainability impact derived from the degree of circularity attained by th organization.
          </p>
        </div>
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