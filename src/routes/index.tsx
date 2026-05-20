import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck, Globe2, Clock, ArrowRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AeroParts — Trusted Aircraft Parts Marketplace" },
      { name: "description", content: "Search certified aircraft parts by part number. FAA & EASA traceable inventory shipped globally." },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=2000&q=70')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0,transparent_calc(50%-1px),rgba(255,255,255,0.04)_50%,transparent_calc(50%+1px))] bg-[length:48px_48px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-silver/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            18,400+ parts in live inventory
          </div>

          <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Trusted Aircraft Parts
            <span className="block text-accent">Marketplace.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-silver/80 sm:text-lg">
            Certified, traceable components for airlines, MROs and operators worldwide.
            Search our inventory by part number and get an instant quote.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/inventory", search: { q } as never });
            }}
            className="mt-8 flex max-w-2xl flex-col gap-3 rounded-xl border border-white/15 bg-white/5 p-2 backdrop-blur sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver/60" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by part number, e.g. CFM56-7B-FB-2204"
                className="h-12 border-0 bg-transparent pl-10 font-mono text-sm text-white placeholder:text-silver/50 focus-visible:ring-0"
              />
            </div>
            <Button type="submit" className="h-12 bg-accent text-accent-foreground hover:bg-accent/90">
              Search inventory
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="outline" className="border-silver/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link to="/inventory">
                Browse inventory <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-silver hover:bg-white/5 hover:text-white">
              <Link to="/contact">Request a quote</Link>
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              ["18,400+", "Parts in stock"],
              ["620+", "Operators served"],
              ["32", "Countries shipped"],
              ["< 1h", "Quote response"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-bold text-white sm:text-3xl">{v}</dt>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-widest text-silver/60">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 lg:px-8">
          {[
            { icon: ShieldCheck, t: "FAA & EASA Traceable", d: "Full 8130-3 and EASA Form One documentation on every part." },
            { icon: Globe2, t: "Global AOG Support", d: "24/7 aircraft-on-ground response with charter shipping options." },
            { icon: Clock, t: "Same-Day Quotes", d: "Most enquiries are quoted within one business hour." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-navy text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display font-semibold text-foreground">{t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-accent">Categories</div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">Browse by system</h2>
          </div>
          <Link to="/inventory" className="hidden text-sm font-medium text-foreground underline-offset-4 hover:underline sm:block">
            View full catalogue →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Engines & APU", img: "photo-1569629743817-70d8db6c323b" },
            { name: "Avionics", img: "photo-1583573636289-c9f6f5f4ae12" },
            { name: "Landing Gear", img: "photo-1474302770737-173ee21bab63" },
            { name: "Airframe & Cabin", img: "photo-1436491865332-7a61a109cc05" },
          ].map((c) => (
            <Link
              key={c.name}
              to="/inventory"
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card"
            >
              <img
                src={`https://images.unsplash.com/${c.img}?auto=format&fit=crop&w=600&q=70`}
                alt={c.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="font-display text-lg font-semibold text-white">{c.name}</div>
                <div className="mt-1 flex items-center gap-1 text-xs text-accent">
                  Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-navy p-8 text-navy-foreground sm:p-12">
          <Plane className="absolute -right-8 -top-8 h-48 w-48 text-white/[0.03]" strokeWidth={1} />
          <div className="relative max-w-2xl">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">AOG support, around the clock.</h3>
            <p className="mt-3 text-silver/80">
              Submit your requirements list and our team will source, certify and ship — wherever your aircraft is.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/contact">Contact sales</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-silver/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/inventory">Browse inventory</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
