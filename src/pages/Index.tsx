import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Welcome to Your App</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Start building your application here!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;