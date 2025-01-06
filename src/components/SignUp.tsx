import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

const SignUp = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] flex flex-col">
      <TopNav />
      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-eco-dark">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Sign up to save your assessment results and track your progress over time.
          </p>
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#4CAF50',
                    brandAccent: '#388E3C',
                  },
                },
              },
            }}
            view="sign_up"
            providers={[]}
            redirectTo={`${window.location.origin}/dashboard`}
          />
        </div>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;