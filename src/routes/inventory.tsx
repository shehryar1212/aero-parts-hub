import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, LayoutGrid, Table as TableIcon, ArrowRight } from "lucide-react";
import { PARTS, CATEGORIES, CONDITIONS, type Part } from "@/data/parts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ConditionBadge } from "@/components/condition-badge";
import { EnquireModal } from "@/components/enquire-modal";
import { cn } from "@/lib/utils";

type Search = { q?: string; category?: string; condition?: string; sort?: string; view?: string };

export const Route = createFileRoute("/inventory")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    condition: typeof s.condition === "string" ? s.condition : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
    view: typeof s.view === "string" ? s.view : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Inventory — AeroParts Catalogue" },
      { name: "description", content: "Search the full AeroParts inventory. Filter by category and condition." },
    ],
  }),
  component: Inventory,
});

function Inventory() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [category, setCategory] = useState(search.category ?? "all");
  const [condition, setCondition] = useState(search.condition ?? "all");
  const [sort, setSort] = useState(search.sort ?? "name");
  const [view, setView] = useState<"table" | "cards">((search.view as "table" | "cards") ?? "table");
  const [enquirePart, setEnquirePart] = useState<Part | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = PARTS.filter((p) => {
      if (term && !p.partNumber.toLowerCase().includes(term) && !p.name.toLowerCase().includes(term)) return false;
      if (category !== "all" && p.category !== category) return false;
      if (condition !== "all" && p.condition !== condition) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [q, category, condition, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent">Catalogue</div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Inventory</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} parts available</p>
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1">
          <button
            onClick={() => setView("table")}
            className={cn("flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium",
              view === "table" ? "bg-navy text-navy-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            <TableIcon className="h-3.5 w-3.5" /> Table
          </button>
          <button
            onClick={() => setView("cards")}
            className={cn("flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-medium",
              view === "cards" ? "bg-navy text-navy-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Cards
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_auto_auto_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search part number or name…"
            className="h-10 pl-9 font-mono text-sm"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-10 w-full md:w-44"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={condition} onValueChange={setCondition}>
          <SelectTrigger className="h-10 w-full md:w-40"><SelectValue placeholder="Condition" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All conditions</SelectItem>
            {CONDITIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-10 w-full md:w-44"><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort: Name</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <div className="font-display text-lg font-semibold">No parts match your filters</div>
          <p className="mt-1 text-sm text-muted-foreground">Try clearing the search term or category.</p>
        </div>
      ) : view === "table" ? (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="font-mono text-xs uppercase tracking-wider">Part Number</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider">Name</TableHead>
                <TableHead className="font-mono text-xs uppercase tracking-wider">Condition</TableHead>
                <TableHead className="text-right font-mono text-xs uppercase tracking-wider">Qty</TableHead>
                <TableHead className="text-right font-mono text-xs uppercase tracking-wider">Price</TableHead>
                <TableHead className="text-right" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Link to="/parts/$partId" params={{ partId: p.id }} className="font-mono text-sm font-medium text-foreground hover:text-accent">
                      {p.partNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.manufacturer} · {p.category}</div>
                  </TableCell>
                  <TableCell><ConditionBadge condition={p.condition} /></TableCell>
                  <TableCell className="text-right font-mono text-sm">{p.quantity}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-semibold">${p.price.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" onClick={() => setEnquirePart(p)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                      Enquire
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Card key={p.id} className="group overflow-hidden p-0 transition-shadow hover:shadow-lg">
              <Link to="/parts/$partId" params={{ partId: p.id }} className="block aspect-[16/10] overflow-hidden bg-secondary">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </Link>
              <CardContent className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-mono text-xs text-muted-foreground">{p.partNumber}</div>
                  <ConditionBadge condition={p.condition} />
                </div>
                <Link to="/parts/$partId" params={{ partId: p.id }} className="block font-display font-semibold text-foreground hover:text-accent">
                  {p.name}
                </Link>
                <div className="text-xs text-muted-foreground">{p.manufacturer} · {p.category}</div>
                <div className="flex items-end justify-between pt-2">
                  <div>
                    <div className="font-mono text-xs uppercase text-muted-foreground">Qty {p.quantity}</div>
                    <div className="font-display text-lg font-bold">${p.price.toLocaleString()}</div>
                  </div>
                  <Button size="sm" onClick={() => setEnquirePart(p)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Enquire <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <EnquireModal
        part={enquirePart}
        open={enquirePart !== null}
        onOpenChange={(o) => !o && setEnquirePart(null)}
      />
    </div>
  );
}
