import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AeroParts" },
      { name: "description", content: "Get in touch with the AeroParts sales team. 24/7 AOG support, global shipping." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-accent">Get in touch</div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Contact our sales team</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          AOG support 24/7. For standard enquiries, expect a quote within one business hour.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <ContactCard icon={MapPin} label="Headquarters" lines={["2200 Aviation Way, Suite 400", "Dallas, TX 75201, USA"]} />
          <ContactCard icon={Phone} label="Phone" lines={["+1 (214) 555-0140", "AOG hotline: +1 (214) 555-0199"]} />
          <ContactCard icon={Mail} label="Email" lines={["sales@aeroparts.com", "aog@aeroparts.com"]} />
          <ContactCard icon={Clock} label="Hours" lines={["Mon–Fri: 07:00 – 19:00 CT", "AOG: 24 / 7 / 365"]} />
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We respond within one business hour.</p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                if (!String(fd.get("name") || "").trim() || !String(fd.get("email") || "").trim()) {
                  toast.error("Name and email are required.");
                  return;
                }
                setSubmitting(true);
                setTimeout(() => {
                  setSubmitting(false);
                  (e.currentTarget as HTMLFormElement).reset();
                  toast.success("Message sent. We'll be in touch shortly.");
                }, 600);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="c-name">Full name</Label>
                  <Input id="c-name" name="name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="c-email">Work email</Label>
                  <Input id="c-email" name="email" type="email" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="c-company">Company</Label>
                <Input id="c-company" name="company" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="c-msg">Message</Label>
                <Textarea id="c-msg" name="message" rows={5} placeholder="Tell us about the parts you need…" />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={submitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  {submitting ? "Sending…" : "Send message"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ContactCard({
  icon: Icon, label, lines,
}: { icon: React.ComponentType<{ className?: string }>; label: string; lines: string[] }) {
  return (
    <Card>
      <CardContent className="flex items-start gap-4 p-5">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-navy text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="mt-1 space-y-0.5">
            {lines.map((l) => <div key={l} className="text-sm font-medium text-foreground">{l}</div>)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
