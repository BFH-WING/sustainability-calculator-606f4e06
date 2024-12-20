import { Link } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { CircleFadingArrowUp, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const TopNav = () => {
  const session = useSession();
  const supabaseClient = useSupabaseClient();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        setIsAdmin(profile?.role === "admin");
      }
    };

    checkAdminStatus();
  }, [session]);

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
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
                className="text-gray-600 hover:text-eco-primary transition-colors"
              >
                Dashboard
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