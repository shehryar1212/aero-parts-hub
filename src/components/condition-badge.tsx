import { cn } from "@/lib/utils";
import type { Condition } from "@/data/parts";

export function ConditionBadge({ condition }: { condition: Condition }) {
  const styles: Record<Condition, string> = {
    New: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:text-emerald-300",
    Overhauled: "bg-sky-500/10 text-sky-700 border-sky-500/30 dark:text-sky-300",
    Serviceable: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-300",
  };
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider",
      styles[condition]
    )}>
      {condition}
    </span>
  );
}
