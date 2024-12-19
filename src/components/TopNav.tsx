import { CircleArrowUp, Leaf } from "lucide-react";
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
          <CircleArrowUp className="h-8 w-8 text-eco-primary" />
          <span className="text-xl font-bold text-eco-primary">BFH Circularity</span>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-eco-primary">About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[400px]">
                  <h3 className="text-lg font-medium mb-2 text-eco-primary">About BFH Circularity</h3>
                  <p className="text-gray-600">
                    Discover your organization's position in the circularity journey through our diagnostic tool.
                  </p>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-eco-primary">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="p-4 w-[400px]">
                  <h3 className="text-lg font-medium mb-2 text-eco-primary">Circularity Resources</h3>
                  <p className="text-gray-600">
                    Access guides and educational materials about circular economy practices.
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