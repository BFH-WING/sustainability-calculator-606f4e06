import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { databases } from "@/integrations/appwrite/client";
import { useState } from "react";
import { ID } from "appwrite";

interface DebugModeToggleProps {
  initialDebugMode: boolean;
  onDebugModeChange: (newValue: boolean) => void;
}

const DebugModeToggle = ({ initialDebugMode, onDebugModeChange }: DebugModeToggleProps) => {
  const { toast } = useToast();
  const [debugMode, setDebugMode] = useState(initialDebugMode);

  const toggleDebugMode = async () => {
    try {
      const newValue = !debugMode;
      
      // Update or create debug_mode setting
      await databases.createDocument(
        'sustainability_calculator',
        'global_settings',
        ID.unique(),
        {
          key: 'debug_mode',
          value: newValue
        }
      );
      
      setDebugMode(newValue);
      onDebugModeChange(newValue);
      
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

  return (
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
  );
};

export default DebugModeToggle;