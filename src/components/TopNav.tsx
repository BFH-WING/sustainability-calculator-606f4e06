import { Leaf } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const TopNav = () => (
  <div className="w-full bg-white/80 backdrop-blur-sm border-b border-eco-light fixed top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-eco-primary" />
          <span className="text-xl font-bold text-eco-primary">EcoMetrics</span>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-eco-primary">About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[400px]">
                  <h3 className="text-lg font-medium mb-2 text-eco-primary">About EcoMetrics</h3>
                  <p className="text-gray-600">
                    Discover your environmental impact and get personalized recommendations
                    to reduce your carbon footprint.
                  </p>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-eco-primary">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[400px]">
                  <h3 className="text-lg font-medium mb-2 text-eco-primary">Sustainability Resources</h3>
                  <p className="text-gray-600">
                    Access guides, tips, and educational materials about sustainable living.
                  </p>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  </div>
);

export default TopNav;