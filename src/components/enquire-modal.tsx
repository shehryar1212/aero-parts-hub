import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { Part } from "@/data/parts";

export function EnquireModal({
  part,
  open,
  onOpenChange,
}: {
  part: Part | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Enquire about a part</DialogTitle>
          <DialogDescription>
            Our sales team responds to enquiries within one business hour.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const name = String(form.get("name") || "").trim();
            const email = String(form.get("email") || "").trim();
            if (!name || !email) {
              toast.error("Name and email are required.");
              return;
            }
            setSubmitting(true);
            setTimeout(() => {
              setSubmitting(false);
              toast.success("Enquiry submitted. We'll be in touch shortly.");
              onOpenChange(false);
            }, 600);
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="enquire-pn">Part number</Label>
            <Input
              id="enquire-pn"
              name="partNumber"
              defaultValue={part?.partNumber ?? ""}
              readOnly
              className="font-mono"
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="enquire-name">Full name</Label>
              <Input id="enquire-name" name="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="enquire-email">Work email</Label>
              <Input id="enquire-email" name="email" type="email" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="enquire-company">Company</Label>
            <Input id="enquire-company" name="company" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="enquire-message">Message</Label>
            <Textarea
              id="enquire-message"
              name="message"
              rows={4}
              defaultValue={part ? `Requesting availability and lead time for ${part.partNumber} (${part.name}).` : ""}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={submitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {submitting ? "Sending…" : "Send enquiry"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
