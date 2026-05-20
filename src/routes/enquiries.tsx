import { createFileRoute } from "@tanstack/react-router";
import { ENQUIRIES, type EnquiryStatus } from "@/data/enquiries";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/enquiries")({
  head: () => ({ meta: [{ title: "Enquiries — AeroParts Admin" }] }),
  component: EnquiriesPage,
});

function StatusBadge({ status }: { status: EnquiryStatus }) {
  const map: Record<EnquiryStatus, string> = {
    New: "bg-accent/15 text-accent border-accent/30",
    "In Progress": "bg-sky-500/10 text-sky-700 border-sky-500/30 dark:text-sky-300",
    Quoted: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
    Closed: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider", map[status])}>
      {status}
    </span>
  );
}

function EnquiriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-accent">Sales Pipeline</div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Enquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">{ENQUIRIES.length} submitted enquiries</p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
              <TableHead className="font-mono text-xs uppercase">Part #</TableHead>
              <TableHead className="font-mono text-xs uppercase">Customer</TableHead>
              <TableHead className="font-mono text-xs uppercase">Email</TableHead>
              <TableHead className="font-mono text-xs uppercase">Date</TableHead>
              <TableHead className="font-mono text-xs uppercase">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ENQUIRIES.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-mono text-sm">{e.partNumber}</TableCell>
                <TableCell>
                  <div className="font-medium">{e.customerName}</div>
                  <div className="text-xs text-muted-foreground">{e.company}</div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{e.email}</TableCell>
                <TableCell className="font-mono text-sm">{e.date}</TableCell>
                <TableCell><StatusBadge status={e.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
