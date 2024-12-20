import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardList } from "lucide-react";

const LCARequestDialog = () => {
  const session = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    contactEmail: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      toast.error("Please sign in to submit an LCA request");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("lca_requests").insert({
        user_id: session.user.id,
        business_name: formData.businessName,
        contact_name: formData.contactName,
        contact_email: formData.contactEmail,
      });

      if (error) throw error;

      toast.success("LCA request submitted successfully");
      setIsOpen(false);
      setFormData({
        businessName: "",
        contactName: "",
        contactEmail: "",
      });
    } catch (error: any) {
      console.error("Error submitting LCA request:", error);
      toast.error("Failed to submit LCA request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white hover:bg-gray-50">
          <ClipboardList className="mr-2 h-4 w-4" />
          Request LCA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Life Cycle Assessment</DialogTitle>
          <DialogDescription>
            Fill out this form to request a detailed Life Cycle Assessment for your business.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="businessName" className="text-sm font-medium">
              Business Name
            </label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, businessName: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contactName" className="text-sm font-medium">
              Contact Name
            </label>
            <Input
              id="contactName"
              value={formData.contactName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, contactName: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="contactEmail" className="text-sm font-medium">
              Contact Email
            </label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))
              }
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LCARequestDialog;