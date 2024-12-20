import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import TopNav from "@/components/TopNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { formatDistanceToNow, format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import Footer from "@/components/Footer";

interface LCARequest {
  id: string;
  business_name: string;
  contact_name: string;
  contact_email: string;
  created_at: string;
}

const AdminDashboard = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState<LCARequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!session?.user) {
        navigate("/signin");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "admin") {
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
      fetchRequests();
      fetchDebugMode();
    };

    checkAdminStatus();
  }, [session, navigate]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("lca_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data);
    } catch (error) {
      console.error("Error fetching LCA requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDebugMode = async () => {
    try {
      const { data, error } = await supabase
        .from("global_settings")
        .select("value")
        .eq("key", "debug_mode")
        .single();

      if (error) throw error;
      setDebugMode(data.value === true);
    } catch (error) {
      console.error("Error fetching debug mode:", error);
    }
  };

  const toggleDebugMode = async () => {
    try {
      const newValue = !debugMode;
      const { error } = await supabase
        .from("global_settings")
        .update({ value: newValue })
        .eq("key", "debug_mode");

      if (error) throw error;
      
      setDebugMode(newValue);
      toast({
        title: "Debug Mode Updated",
        description: `Debug mode has been ${newValue ? "enabled" : "disabled"}.`,
      });
    } catch (error) {
      console.error("Error updating debug mode:", error);
      toast({
        title: "Error",
        description: "Failed to update debug mode.",
        variant: "destructive",
      });
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
      <div className="max-w-6xl mx-auto pt-24 px-6 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="debug-mode"
                checked={debugMode}
                onCheckedChange={toggleDebugMode}
              />
              <Label htmlFor="debug-mode">Debug Mode</Label>
            </div>
            <div className="text-sm text-gray-500">
              {debugMode ? "Enabled" : "Disabled"}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">LCA Requests</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Contact Name</TableHead>
                <TableHead>Contact Email</TableHead>
                <TableHead>Date Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.business_name}</TableCell>
                  <TableCell>{request.contact_name}</TableCell>
                  <TableCell>{request.contact_email}</TableCell>
                  <TableCell>
                    <span className="text-gray-600">
                      {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      ({format(new Date(request.created_at), "PPP")})
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;