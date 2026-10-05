import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SOCIAL = {
  instagram: "https://www.instagram.com/theindianploggersarmy/",
  facebook: "https://www.facebook.com/Ploggersarmy/",
};

const NAV = [
  { label: "About", to: "/", hash: "about" },
  { label: "What We Do", to: "/", hash: "what-we-do" },
  { label: "Our Impact", to: "/", hash: "impact" },
  { label: "Stories", to: "/", hash: "stories" },
  { label: "Get Involved", to: "/join" },
  { label: "Partner With Us", to: "/partner" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="The Indian Ploggers Army home">
      <span className="grid h-9 w-9 place-items-center bg-accent font-display text-sm font-extrabold text-accent-foreground">
        TIPA
      </span>
      <span
        className={`hidden font-display text-sm font-bold leading-tight sm:block ${light ? "text-ink-foreground" : "text-foreground"}`}
      >
        The Indian
        <br />
        Ploggers Army
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = scrolled || open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? "bg-ink/95 backdrop-blur" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo light />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={"hash" in n ? n.hash : undefined}
              className="text-sm font-semibold text-ink-foreground/85 transition-colors hover:text-accent"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="movement" size="sm" className="hidden h-10 px-5 sm:inline-flex">
            <Link to="/join">Join the Movement</Link>
          </Button>
          <button
            className="text-ink-foreground lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-ink-foreground/10 px-5 pb-8 lg:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={"hash" in n ? n.hash : undefined}
              onClick={() => setOpen(false)}
              className="block border-b border-ink-foreground/10 py-4 font-display text-2xl font-bold text-ink-foreground"
            >
              {n.label}
            </Link>
          ))}
          <Button asChild variant="movement" size="xl" className="mt-6 w-full">
            <Link to="/join" onClick={() => setOpen(false)}>
              Join the Movement
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-ink-foreground/70">
            We connect green dots — everyday people turning their run, walk or workout into cleaner,
            healthier neighbourhoods across India.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={SOCIAL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center border border-ink-foreground/20 hover:bg-accent hover:text-accent-foreground">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SOCIAL.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center border border-ink-foreground/20 hover:bg-accent hover:text-accent-foreground">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Link to="/" hash="about" className="hover:text-accent">About</Link>
          <Link to="/" hash="what-we-do" className="hover:text-accent">What We Do</Link>
          <Link to="/join" className="hover:text-accent">Join Us</Link>
          <Link to="/partner" className="hover:text-accent">Partner With Us</Link>
          <Link to="/" hash="stories" className="hover:text-accent">Stories</Link>
          <Link to="/contact" className="hover:text-accent">Contact</Link>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLFormElement).reset();
            import("sonner").then(({ toast }) => toast.success("You're on the list. See you on the trail!"));
          }}
        >
          <p className="font-display text-lg font-bold">Get drive updates</p>
          <div className="mt-4 flex">
            <label htmlFor="nl" className="sr-only">Email</label>
            <input id="nl" type="email" required placeholder="you@email.com" className="h-12 min-w-0 flex-1 border border-ink-foreground/20 bg-transparent px-4 text-sm placeholder:text-ink-foreground/40 focus:border-accent focus:outline-none" />
            <Button type="submit" variant="movement" className="h-12 rounded-none px-5">Join</Button>
          </div>
        </form>
      </div>
      <div className="border-t border-ink-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-xs text-ink-foreground/50 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} The Indian Ploggers Army. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-accent" : "text-primary"}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image: string }) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
      <div className="bg-hero-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 lg:px-8">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] text-ink-foreground md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-xl text-lg text-ink-foreground/80">{intro}</p>
      </div>
    </section>
  );
}
