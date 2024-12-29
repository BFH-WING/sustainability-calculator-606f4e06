import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { databases } from "@/integrations/appwrite/client";
import { useState } from "react";

interface DebugModeToggleProps {
  initialDebugMode: boolean;
  onDebugModeChange: (newValue: boolean) => void;
}

const DebugModeToggle = ({ initialDebugMode, onDebugModeChange }: DebugModeToggleProps) => {
  const [debugMode, setDebugMode] = useState(initialDebugMode);

  const toggleDebugMode = async () => {
    try {
      const newValue = !debugMode;
      
      // Update the debug_mode document
      await databases.updateDocument(
        'sustainability_calculator',  // This is the correct database ID
        'global_settings',           // Collection ID
        'debug_mode',                // Document ID
        {
          key: 'debug_mode',
          value: newValue
        }
      );
      
      setDebugMode(newValue);
      onDebugModeChange(newValue);
      
      toast.success(`Debug mode has been ${newValue ? "enabled" : "disabled"}`);
    } catch (error) {
      console.error("Error updating debug mode:", error);
      toast.error("Failed to update debug mode");
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