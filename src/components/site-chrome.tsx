import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Plane, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/inventory", label: "Inventory" },
  { to: "/admin", label: "Admin" },
  { to: "/enquiries", label: "Enquiries" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-navy text-navy-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Plane className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight">AeroParts</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-silver/70">
              Global Aviation Supply
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-accent"
                    : "text-silver hover:bg-white/5 hover:text-white"
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 text-silver hover:bg-white/5 md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {nav.map((n) => {
              const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm font-medium",
                    active ? "bg-white/10 text-accent" : "text-silver"
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-navy text-silver">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-white">
            <Plane className="h-5 w-5 text-accent" />
            <span className="font-display text-lg font-bold">AeroParts</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-silver/70">
            Trusted source for certified aircraft parts. FAA &amp; EASA traceable inventory, shipped globally.
          </p>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent">Contact</div>
          <ul className="mt-3 space-y-1 text-sm text-silver/80">
            <li>2200 Aviation Way, Suite 400</li>
            <li>Dallas, TX 75201, USA</li>
            <li>+1 (214) 555-0140</li>
            <li>sales@aeroparts.com</li>
          </ul>
        </div>
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent">Certifications</div>
          <ul className="mt-3 space-y-1 text-sm text-silver/80">
            <li>FAA AC 00-56B Accredited</li>
            <li>ASA-100 / AS9120B</li>
            <li>EASA Form One Traceable</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-silver/60">
        © {new Date().getFullYear()} AeroParts Global Supply. All rights reserved.
      </div>
    </footer>
  );
}
