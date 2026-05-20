import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useRef } from "react";
import { Package2, AlertTriangle, MessageSquare, Upload, Pencil, Trash2, Plus, CheckCircle2 } from "lucide-react";
import { PARTS, CATEGORIES, CONDITIONS, type Part } from "@/data/parts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ConditionBadge } from "@/components/condition-badge";
import { ENQUIRIES } from "@/data/enquiries";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — AeroParts" }] }),
  component: Admin,
});

function Admin() {
  const [parts, setParts] = useState<Part[]>(PARTS);
  const lowStock = useMemo(() => parts.filter((p) => p.quantity <= 3).length, [parts]);
  const dragRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-accent">Operations</div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Admin Dashboard</h1>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <SummaryCard icon={Package2} label="Total parts" value={parts.length.toString()} tone="navy" />
        <SummaryCard icon={AlertTriangle} label="Low stock alerts" value={lowStock.toString()} tone="amber" />
        <SummaryCard icon={MessageSquare} label="Total enquiries" value={ENQUIRIES.length.toString()} tone="orange" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Add new part */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="font-display text-xl font-semibold">Add new part</h2>
              <p className="text-sm text-muted-foreground">All fields required for inventory listing.</p>
            </div>
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const partNumber = String(fd.get("partNumber") || "").trim();
                const name = String(fd.get("name") || "").trim();
                if (!partNumber || !name) {
                  toast.error("Part number and name are required.");
                  return;
                }
                const next: Part = {
                  id: `new-${Date.now()}`,
                  partNumber,
                  name,
                  description: String(fd.get("description") || ""),
                  category: String(fd.get("category") || "Engine"),
                  manufacturer: String(fd.get("manufacturer") || ""),
                  condition: (String(fd.get("condition") || "New")) as Part["condition"],
                  quantity: Number(fd.get("quantity") || 0),
                  price: Number(fd.get("price") || 0),
                  compatibility: [],
                  image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=600&q=70",
                };
                setParts((p) => [next, ...p]);
                (e.currentTarget as HTMLFormElement).reset();
                toast.success(`Part ${partNumber} added to inventory.`);
              }}
            >
              <Field name="partNumber" label="Part number" placeholder="e.g. CFM56-7B-FB-2204" required />
              <Field name="name" label="Name" placeholder="Part name" required />
              <div className="sm:col-span-2 grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={3} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue="Engine">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Field name="manufacturer" label="Manufacturer" />
              <div className="grid gap-2">
                <Label htmlFor="condition">Condition</Label>
                <Select name="condition" defaultValue="New">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CONDITIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Field name="quantity" type="number" label="Quantity" defaultValue="1" />
              <Field name="price" type="number" label="Price (USD)" defaultValue="0" />
              <div className="sm:col-span-2 flex justify-end">
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Plus className="mr-1.5 h-4 w-4" /> Add part
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* CSV Upload */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="font-display text-xl font-semibold">Bulk CSV upload</h2>
              <p className="text-sm text-muted-foreground">
                Upload a .csv with columns: part_number, name, category, condition, quantity, price.
              </p>
            </div>
            <div
              ref={dragRef}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0];
                if (file) toast.success(`Uploaded ${file.name} (${(file.size / 1024).toFixed(1)} KB).`);
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
                dragOver ? "border-accent bg-accent/5" : "border-border bg-secondary/30"
              )}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-accent">
                <Upload className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Drag &amp; drop your CSV here</div>
                <div className="text-sm text-muted-foreground">or click below to browse</div>
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) toast.success(`Uploaded ${file.name}.`);
                  }}
                />
                <span className="inline-flex h-10 items-center rounded-md bg-navy px-4 text-sm font-medium text-navy-foreground hover:bg-navy/90">
                  Choose file
                </span>
              </label>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Max 10MB · UTF-8 encoded
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parts table */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-semibold">Manage parts</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="font-mono text-xs uppercase">Part #</TableHead>
                <TableHead className="font-mono text-xs uppercase">Name</TableHead>
                <TableHead className="font-mono text-xs uppercase">Condition</TableHead>
                <TableHead className="text-right font-mono text-xs uppercase">Qty</TableHead>
                <TableHead className="text-right font-mono text-xs uppercase">Price</TableHead>
                <TableHead className="text-right" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {parts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-sm">{p.partNumber}</TableCell>
                  <TableCell>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.category}</div>
                  </TableCell>
                  <TableCell><ConditionBadge condition={p.condition} /></TableCell>
                  <TableCell className={cn("text-right font-mono text-sm", p.quantity <= 3 && "text-amber-600 font-semibold")}>
                    {p.quantity}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">${p.price.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => toast.info(`Edit ${p.partNumber} (demo)`)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setParts((arr) => arr.filter((x) => x.id !== p.id));
                          toast.success(`Removed ${p.partNumber}`);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon, label, value, tone,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; tone: "navy" | "amber" | "orange" }) {
  const toneClass = {
    navy: "bg-navy text-accent",
    amber: "bg-amber-500/15 text-amber-600",
    orange: "bg-accent/15 text-accent",
  }[tone];
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", toneClass)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="font-display text-3xl font-bold">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({
  name, label, type = "text", placeholder, required, defaultValue,
}: { name: string; label: string; type?: string; placeholder?: string; required?: boolean; defaultValue?: string }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} required={required} defaultValue={defaultValue} />
    </div>
  );
}
