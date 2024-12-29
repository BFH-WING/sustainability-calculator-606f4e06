import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases } from "@/integrations/appwrite/client";
import TopNav from "@/components/TopNav";
import { useToast } from "@/components/ui/use-toast";
import { Query } from "appwrite";
import Footer from "@/components/Footer";
import { checkIsAdmin } from "@/utils/adminUtils";
import DebugModeToggle from "@/components/admin/DebugModeToggle";
import LCARequestsTable from "@/components/admin/LCARequestsTable";

interface LCARequest {
  id: string;
  business_name: string;
  contact_name: string;
  contact_email: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState<LCARequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = await checkIsAdmin();
        if (!adminStatus) {
          navigate("/dashboard");
          return;
        }

        setIsAdmin(true);
        fetchRequests();
        fetchDebugMode();
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate("/signin");
      }
    };

    checkAdminStatus();
  }, [navigate]);

  const fetchRequests = async () => {
    try {
      const response = await databases.listDocuments(
        'sustainability_calculator',
        'lca_requests'
      );
      setRequests(response.documents as unknown as LCARequest[]);
    } catch (error) {
      console.error("Error fetching LCA requests:", error);
      toast({
        title: "Error",
        description: "Failed to load LCA requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDebugMode = async () => {
    try {
      const response = await databases.listDocuments(
        'sustainability_calculator',
        'global_settings',
        [Query.equal('key', 'debug_mode')]
      );

      if (response.documents.length > 0) {
        setDebugMode(response.documents[0].value === true);
      }
    } catch (error) {
      console.error("Error fetching debug mode:", error);
    }
  };

  if (!isAdmin || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB]">
        <TopNav />
        <div className="pt-24 px-6 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-eco-primary border-t-transparent rounded-full mx-auto"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2FCE2] to-[#F1F0FB] flex flex-col">
      <TopNav />
      <div className="container max-w-6xl mx-auto pt-24 px-6 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <DebugModeToggle 
          initialDebugMode={debugMode} 
          onDebugModeChange={setDebugMode} 
        />
        
        <LCARequestsTable requests={requests} />
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;