import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Package, Factory, CheckCircle2 } from "lucide-react";
import { PARTS } from "@/data/parts";
import { Button } from "@/components/ui/button";
import { ConditionBadge } from "@/components/condition-badge";
import { EnquireModal } from "@/components/enquire-modal";

export const Route = createFileRoute("/parts/$partId")({
  loader: ({ params }) => {
    const part = PARTS.find((p) => p.id === params.partId);
    if (!part) throw notFound();
    return { part };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.part.partNumber} — ${loaderData.part.name} | AeroParts` },
          { name: "description", content: loaderData.part.description },
          { property: "og:image", content: loaderData.part.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Part not found</h1>
      <p className="mt-2 text-muted-foreground">This part may have been sold or de-listed.</p>
      <Button asChild className="mt-6"><Link to="/inventory">Back to inventory</Link></Button>
    </div>
  ),
  component: PartDetail,
});

function PartDetail() {
  const { part } = Route.useLoaderData();
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <Link to="/inventory" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to inventory
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
          <img src={part.image} alt={part.name} className="aspect-[4/3] h-full w-full object-cover" />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <ConditionBadge condition={part.condition} />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{part.category}</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{part.name}</h1>
          <div className="mt-2 font-mono text-sm text-muted-foreground">{part.partNumber}</div>

          <p className="mt-6 text-base leading-relaxed text-foreground/90">{part.description}</p>

          <dl className="mt-8 grid grid-cols-2 gap-y-4 border-y border-border py-6">
            <Spec icon={Factory} label="Manufacturer" value={part.manufacturer} />
            <Spec icon={Package} label="Available" value={`${part.quantity} units`} />
            <div className="col-span-2">
              <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Compatibility</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {part.compatibility.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs">
                    <CheckCircle2 className="h-3 w-3 text-accent" /> {c}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Unit price</div>
              <div className="mt-1 font-display text-4xl font-bold">${part.price.toLocaleString()}</div>
            </div>
            <Button size="lg" onClick={() => setOpen(true)} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Enquire about this part
            </Button>
          </div>
        </div>
      </div>

      <EnquireModal part={part} open={open} onOpenChange={setOpen} />
    </div>
  );
}

function Spec({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-accent">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</dt>
        <dd className="font-medium text-foreground">{value}</dd>
      </div>
    </div>
  );
}
