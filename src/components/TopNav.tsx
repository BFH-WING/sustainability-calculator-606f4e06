import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { CircleFadingArrowUp, UserCog, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { account } from "@/integrations/appwrite/client";

const TopNav = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentSession = await account.getSession('current');
        console.log('Session check:', currentSession ? 'Active session found' : 'No active session');
        setSession(currentSession);
        // You would need to implement admin check logic here
        // For now, we'll set it to false
        setIsAdmin(false);
      } catch (error) {
        console.log('No active session');
        setSession(null);
      }
    };

    checkSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await account.deleteSession('current');
      setSession(null);
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-eco-primary">
          <CircleFadingArrowUp className="h-6 w-6" />
          <span>Circularity Assessment</span>
        </Link>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link 
                to="/dashboard" 
                className="flex items-center gap-1.5 text-gray-600 hover:text-eco-primary transition-colors"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="flex items-center gap-1 text-gray-600 hover:text-eco-primary transition-colors"
                >
                  <UserCog className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}
              <Button 
                variant="ghost" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" className="bg-eco-primary hover:bg-eco-dark">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;