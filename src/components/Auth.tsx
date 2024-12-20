import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-eco-dark">
        Save Your Results
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Sign in or create an account to save your assessment results and track your progress over time.
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
        providers={["google", "github"]}
        redirectTo={window.location.origin}
      />
    </div>
  );
};

export default Auth;