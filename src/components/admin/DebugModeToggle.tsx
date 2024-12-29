import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
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
      console.log('Attempting to toggle debug mode to:', newValue);
      
      try {
        // Using a fixed document ID for the debug mode setting
        const docId = 'debug-mode-setting';
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTIONS.GLOBAL_SETTINGS,
          docId,
          {
            key: 'debug_mode',
            value: newValue ? 'true' : 'false'
          }
        );
        console.log('Debug mode updated successfully');
      } catch (error: any) {
        if (error?.code === 404) {
          console.log('Document not found, creating new one');
          await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.GLOBAL_SETTINGS,
            'debug-mode-setting',
            {
              key: 'debug_mode',
              value: newValue ? 'true' : 'false'
            }
          );
        } else {
          throw error;
        }
      }
      
      setDebugMode(newValue);
      onDebugModeChange(newValue);
      toast.success(`Debug mode has been ${newValue ? "enabled" : "disabled"}`);
    } catch (error) {
      console.error("Error updating debug mode:", error);
      toast.error("Failed to update debug mode. Please ensure the collection exists.");
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