import { Link } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

const TopNav = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-eco-primary">
          Circularity Assessment
        </Link>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-eco-primary transition-colors"
              >
                Dashboard
              </Link>
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