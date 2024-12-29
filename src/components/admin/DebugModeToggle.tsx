import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { databases, DATABASE_ID, COLLECTIONS } from "@/integrations/appwrite/client";
import { useState } from "react";
import { Query } from "appwrite";

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
        // First, try to get the existing document
        const documents = await databases.listDocuments(
          DATABASE_ID,
          COLLECTIONS.GLOBAL_SETTINGS,
          [Query.equal('key', 'debug_mode')]
        );
        console.log('Found documents:', documents);

        if (documents.documents.length > 0) {
          // Update existing document
          const docId = documents.documents[0].$id;
          console.log('Updating existing document with ID:', docId);
          await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.GLOBAL_SETTINGS,
            docId,
            {
              value: newValue ? 'true' : 'false'
            }
          );
        } else {
          console.log('No existing document found, creating new one');
          // Create new document if it doesn't exist
          await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.GLOBAL_SETTINGS,
            'unique()',
            {
              key: 'debug_mode',
              value: newValue ? 'true' : 'false'
            }
          );
        }
      } catch (error: any) {
        console.error('Detailed error:', error);
        if (error?.code === 404) {
          console.log('Collection not found, might need to be created first');
        }
        throw error; // Re-throw to be caught by outer try-catch
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