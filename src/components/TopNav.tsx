import { CircleArrowUp } from "lucide-react";

const TopNav = () => (
  <div className="w-full bg-white/80 backdrop-blur-sm border-b border-eco-light fixed top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-16 flex items-center">
        <div className="flex items-center space-x-2">
          <CircleArrowUp className="h-8 w-8 text-eco-primary animate-spin-slow" />
          <span className="text-xl font-bold text-eco-primary">BFH Circularity Assessment</span>
        </div>
      </div>
    </div>
  </div>
);

export default TopNav;