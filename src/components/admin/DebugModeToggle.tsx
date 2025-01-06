import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface DebugModeToggleProps {
  initialDebugMode: boolean;
  onDebugModeChange: (value: boolean) => void;
}

const DebugModeToggle = ({ initialDebugMode, onDebugModeChange }: DebugModeToggleProps) => {
  const [debugMode, setDebugMode] = useState(initialDebugMode);

  const handleToggle = async () => {
    const newValue = !debugMode;
    console.log('Attempting to toggle debug mode to:', newValue);
    
    try {
      const { error } = await supabase
        .from('global_settings')
        .upsert(
          { 
            key: 'debug_mode',
            value: newValue
          },
          { 
            onConflict: 'key'
          }
        );

      if (error) throw error;
      
      console.log('Debug mode updated successfully');
      setDebugMode(newValue);
      onDebugModeChange(newValue);
      toast.success(`Debug mode has been ${newValue ? "enabled" : "disabled"}`);
    } catch (error) {
      console.error("Error updating debug mode:", error);
      toast.error("Failed to update debug mode");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium">Debug Mode</label>
      <input
        type="checkbox"
        checked={debugMode}
        onChange={handleToggle}
        className="toggle"
      />
    </div>
  );
};

export default DebugModeToggle;