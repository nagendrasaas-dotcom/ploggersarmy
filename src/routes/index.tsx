import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Reveal, Eyebrow } from "@/components/site/Site";
import hero from "@/assets/hero.jpg";
import plog from "@/assets/plog.jpg";
import kids from "@/assets/kids.jpg";
import corporate from "@/assets/corporate.jpg";
import community from "@/assets/community.jpg";
import team from "@/assets/team.jpg";
import sorting from "@/assets/sorting.jpg";
import street from "@/assets/street.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Indian Ploggers Army — We Pick It Up" },
      { name: "description", content: "Join TIPA, India's citizen plogging movement turning everyday runs and walks into cleaner, healthier neighbourhoods." },
      { property: "og:title", content: "The Indian Ploggers Army — We Pick It Up" },
      { property: "og:description", content: "A movement you can join: plogging drives, community clean-ups and corporate volunteering across India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* Placeholder figures: replace `value` with verified TIPA numbers. */
const STATS = [
  { value: null, suffix: "+", label: "People mobilised" },
  { value: null, suffix: "+", label: "Clean-up drives" },
  { value: null, suffix: "+", label: "Cities reached" },
  { value: null, suffix: " kg", label: "Waste collected" },
] as { value: number | null; suffix: string; label: string }[];

const PROGRAMS = [
  { title: "Plogging & Clean-up Drives", text: "Mobilising citizens to jog, walk and clean public spaces together.", img: hero },
  { title: "Community Action", text: "Local groups taking ownership of their lanes, parks and lakes.", img: community },
  { title: "Environmental Awareness", text: "Turning awareness into everyday habits, one bag at a time.", img: sorting },
  { title: "Corporate Volunteering", text: "Meaningful, hands-on environmental action for teams.", img: corporate },
  { title: "Youth & Schools", text: "Building responsibility in the next generation of ploggers.", img: kids },
  { title: "Campaigns & Challenges", text: "Large-scale public moments that get whole cities moving.", img: street },
];

const APPROACH = [
  { k: "Mobilise", t: "Rally neighbours, runners, students and teams around a shared route." },
  { k: "Act", t: "Plog together — squat, pick, bag. Fitness and cleanliness in one move." },
  { k: "Educate", t: "Segregate what we collect and talk about where it comes from." },
  { k: "Measure", t: "Weigh, count and share every drive so impact is visible." },
  { k: "Multiply", t: "Every plogger inspires the next. Post it. #Plogging." },
];

const GALLERY = [
  { src: hero, alt: "Ploggers jogging and collecting litter at sunrise", tall: false },
  { src: plog, alt: "A plogger picking up a bottle in the park", tall: true },
  { src: kids, alt: "School children cleaning a lake shore", tall: false },
  { src: community, alt: "Residents cleaning their lane together", tall: true },
  { src: corporate, alt: "Corporate team beach clean-up", tall: false },
  { src: sorting, alt: "Sorting collected plastic", tall: false },
  { src: team, alt: "Volunteers celebrating with collected bags", tall: false },
  { src: street, alt: "A long line of volunteers cleaning a road divider", tall: false },
];

function Counter({ value, suffix }: { value: number | null; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (value == null || !ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1600, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {value == null ? "XX,XXX" : n.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

function Index() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
        <img src={hero} alt="Volunteers plogging along a city road at sunrise" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1088} fetchPriority="high" />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 lg:px-8">
          <Eyebrow light>A movement, not a meeting</Eyebrow>
          <h1 className="max-w-5xl text-[13vw] font-extrabold leading-[0.88] text-ink-foreground sm:text-7xl lg:text-[7.5rem]">
            We don't just talk about change. <span className="text-accent">We pick it up.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-foreground/85">
            The Indian Ploggers Army brings people together to clean communities, protect our environment and turn everyday citizens into changemakers.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="movement" size="xl">
              <Link to="/join">Join the Movement <ArrowRight /></Link>
            </Button>
            <Button asChild variant="ghostLight" size="xl">
              <Link to="/partner">Partner With Us</Link>
            </Button>
          </div>
        </div>
        <a href="#impact" aria-label="Scroll down" className="absolute bottom-8 right-8 hidden h-12 w-7 justify-center rounded-full border-2 border-ink-foreground/60 pt-2 md:flex">
          <span className="animate-scroll-dot h-2 w-1 rounded-full bg-ink-foreground" />
        </a>
      </section>

      {/* NUMBERS */}
      <section id="impact" className="scroll-mt-16 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className="border-l border-primary-foreground/20 pl-5">
                <p className="font-display text-4xl font-extrabold text-accent md:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-primary-foreground/75">{s.label}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-12 text-xs text-primary-foreground/50">Figures shown as XX are placeholders until verified numbers are added.</p>
        </div>
      </section>

      {/* WHAT IS PLOGGING */}
      <section id="about" className="scroll-mt-16 mx-auto grid max-w-7xl items-center gap-14 px-5 py-28 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <img src={plog} alt="A plogger squats to pick up a bottle mid-run" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
        </Reveal>
        <Reveal delay={120}>
          <Eyebrow>What is plogging?</Eyebrow>
          <h2 className="text-4xl font-extrabold leading-[0.95] md:text-6xl">What if your workout could clean your neighbourhood?</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Plogging combines jogging or walking with picking up litter along the way. Every squat to pick up a wrapper works your hips, legs and ankles — and leaves the street a little better than you found it.
          </p>
          <ol className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
            {["Move", "Pick", "Clean", "Impact"].map((w, i) => (
              <li key={w} className="bg-background p-5">
                <span className="text-xs font-bold text-highlight">0{i + 1}</span>
                <p className="font-display text-2xl font-extrabold">{w}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-10 space-y-3 text-sm text-muted-foreground">
            <li><b className="text-foreground">Plog in a group</b> — it's more fun with others.</li>
            <li><b className="text-foreground">Make it a workout</b> — squat or lunge to pick up.</li>
            <li><b className="text-foreground">Add competition</b> — teams race to collect the most, then take it to recycling.</li>
            <li><b className="text-foreground">Share it</b> — post your session with #Plogging to inspire others.</li>
          </ul>
        </Reveal>
      </section>

      {/* WHAT WE DO */}
      <section id="what-we-do" className="scroll-mt-16 bg-ink py-28 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow light>What we do</Eyebrow>
              <h2 className="max-w-2xl text-4xl font-extrabold leading-[0.95] md:text-6xl">Six ways the movement shows up.</h2>
            </div>
          </div>
          <div className="mt-16 grid gap-px bg-ink-foreground/10 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 100} className="bg-ink">
                <Link to="/join" className="group block">
                  <div className="overflow-hidden">
                    <img src={p.img} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-7">
                    <span className="text-xs font-bold text-highlight">0{i + 1}</span>
                    <h3 className="mt-2 text-2xl font-extrabold">{p.title}</h3>
                    <p className="mt-3 text-ink-foreground/65">{p.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
                      Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <Eyebrow>Our approach</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extrabold leading-[0.95] md:text-6xl">From one pair of gloves to a city that cares.</h2>
        <div className="mt-16 grid gap-10 md:grid-cols-5 md:gap-0">
          {APPROACH.map((a, i) => (
            <Reveal key={a.k} delay={i * 90} className="relative md:border-l md:border-border md:px-6">
              <span className="font-display text-7xl font-extrabold text-secondary">{i + 1}</span>
              <h3 className="-mt-6 text-2xl font-extrabold text-primary">{a.k}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{a.t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* IMPACT STORY */}
      <section id="stories" className="scroll-mt-16 bg-secondary">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.2fr_1fr]">
          <img src={team} alt="Volunteers celebrating beside filled waste bags" loading="lazy" className="h-full min-h-[420px] w-full object-cover" />
          <Reveal className="px-5 py-16 lg:px-14 lg:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Featured story · [Location] · [Date]</p>
            <h2 className="mt-5 text-4xl font-extrabold leading-[0.95] md:text-5xl">One street. Hundreds of hands. A completely different morning.</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              [Placeholder] Share a real TIPA drive here — where it happened, who turned up and what the street looked like when everyone went home.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {["Ploggers", "Kg collected", "Km covered"].map((l) => (
                <div key={l}>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{l}</dt>
                  <dd className="font-display text-3xl font-extrabold text-primary">XX</dd>
                </div>
              ))}
            </dl>
            <Button asChild variant="ink" size="xl" className="mt-10">
              <Link to="/contact">Share your story <ArrowRight /></Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <Eyebrow>The movement in motion</Eyebrow>
        <h2 className="max-w-3xl text-4xl font-extrabold leading-[0.95] md:text-6xl">You'd want to be there.</h2>
        <div className="mt-14 columns-2 gap-4 md:columns-3">
          {GALLERY.map((g, i) => (
            <button key={i} onClick={() => setLightbox(i)} className="group mb-4 block w-full overflow-hidden break-inside-avoid" aria-label={`Open photo: ${g.alt}`}>
              <img src={g.src} alt={g.alt} loading="lazy" className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-110 ${g.tall ? "aspect-[4/5]" : "aspect-[4/3]"}`} />
            </button>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Illustrative photos — swap in TIPA's own drive photography.</p>
        <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
          <DialogContent className="max-w-5xl border-0 bg-ink p-0 [&>button]:hidden">
            <DialogTitle className="sr-only">{lightbox !== null ? GALLERY[lightbox]!.alt : "Photo"}</DialogTitle>
            {lightbox !== null && (
              <div className="relative">
                <img src={GALLERY[lightbox]!.src} alt={GALLERY[lightbox]!.alt} className="max-h-[85vh] w-full object-contain" />
                <button onClick={() => setLightbox(null)} aria-label="Close" className="absolute right-3 top-3 grid h-10 w-10 place-items-center bg-ink text-ink-foreground">
                  <X className="h-5 w-5" />
                </button>
                <div className="flex justify-between p-3 text-ink-foreground">
                  <button onClick={() => setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length)} className="text-sm font-bold uppercase hover:text-accent">← Prev</button>
                  <button onClick={() => setLightbox((lightbox + 1) % GALLERY.length)} className="text-sm font-bold uppercase hover:text-accent">Next →</button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* JOIN */}
      <section className="bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
          <h2 className="max-w-4xl text-5xl font-extrabold leading-[0.9] md:text-7xl">Ready to pick up more than just a pace?</h2>
          <div className="mt-16 grid gap-px bg-accent-foreground/20 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Become a Plogger", d: "Join upcoming activities near you.", to: "/join" },
              { t: "Organise a Drive", d: "Start a clean-up in your community.", to: "/join" },
              { t: "Bring Your Organisation", d: "Create employee volunteering experiences.", to: "/partner" },
              { t: "Support the Movement", d: "Partner, sponsor or contribute.", to: "/partner" },
            ].map((o) => (
              <Link key={o.t} to={o.to} className="group bg-accent p-8 transition-colors hover:bg-ink hover:text-ink-foreground">
                <h3 className="text-2xl font-extrabold">{o.t}</h3>
                <p className="mt-3 opacity-75">{o.d}</p>
                <ArrowUpRight className="mt-8 h-7 w-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CSR */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-28 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <Eyebrow>For companies & CSR teams</Eyebrow>
          <h2 className="text-4xl font-extrabold leading-[0.95] md:text-5xl">Turn employee volunteering into visible environmental impact.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We design hands-on drives your teams will actually talk about — with on-ground coordination, safety kits, waste segregation and post-drive reporting for your ESG story.
          </p>
          <Button asChild variant="ink" size="xl" className="mt-10">
            <Link to="/partner">Partner With TIPA <ArrowRight /></Link>
          </Button>
        </Reveal>
        <Reveal delay={120}>
          <ul className="divide-y divide-border border-y border-border">
            {["Employee volunteering", "Corporate clean-up drives", "Sustainability campaigns", "ESG initiatives", "Environmental awareness programmes", "City & community interventions"].map((f, i) => (
              <li key={f} className="flex items-center justify-between py-5">
                <span className="font-display text-xl font-bold">{f}</span>
                <span className="text-xs font-bold text-highlight">0{i + 1}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* COMMUNITY */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-28 lg:grid-cols-[1fr_1.1fr] lg:px-8">
          <Reveal>
            <Eyebrow light>Our community</Eyebrow>
            <h2 className="text-5xl font-extrabold leading-[0.9] md:text-7xl">The movement is made of people.</h2>
            <p className="mt-6 max-w-md text-ink-foreground/70">
              Runners and grandmothers. Students and CEOs. Families, organisers and neighbours — anyone with the inclination toward a healthier, cleaner, greener neighbourhood.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            <img src={community} alt="Neighbours of all ages cleaning a lane" loading="lazy" className="row-span-2 h-full w-full object-cover" />
            <img src={kids} alt="Students cleaning near a lake" loading="lazy" className="aspect-square w-full object-cover" />
            <img src={plog} alt="A plogger in the park" loading="lazy" className="aspect-square w-full object-cover" />
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="mx-auto max-w-7xl px-5 py-24 text-center lg:px-8">
        <Eyebrow>Partners</Eyebrow>
        <h2 className="text-3xl font-extrabold md:text-5xl">Building cleaner communities together.</h2>
        <div className="mt-12 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid h-28 place-items-center bg-background text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
              Partner logo
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">Logo slots reserved for confirmed partners.</p>
      </section>

      {/* STORIES / KNOWLEDGE */}
      <section className="bg-secondary py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Eyebrow>Stories & knowledge</Eyebrow>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-[0.95] md:text-6xl">Field notes from the movement.</h2>
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <article className="group">
              <div className="overflow-hidden"><img src={street} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">Plogging guide</p>
              <h3 className="mt-2 text-3xl font-extrabold">Your first plog: what to carry, how to pick, where it goes.</h3>
            </article>
            <div className="grid gap-8">
              {[
                { tag: "Community story", t: "[Coming soon] The lane that cleaned itself.", img: community },
                { tag: "Environmental insight", t: "[Coming soon] Why segregation matters after the drive.", img: sorting },
              ].map((a) => (
                <article key={a.t} className="group grid grid-cols-[140px_1fr] gap-5">
                  <div className="overflow-hidden"><img src={a.img} alt="" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{a.tag}</p>
                    <h3 className="mt-2 text-xl font-extrabold">{a.t}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-ink">
        <img src={street} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-36 text-center lg:px-8">
          <h2 className="mx-auto max-w-5xl text-5xl font-extrabold leading-[0.9] text-ink-foreground md:text-7xl">
            A cleaner India doesn't start somewhere else. <span className="text-accent">It starts with us.</span>
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild variant="movement" size="xl"><Link to="/join">Join the Movement</Link></Button>
            <Button asChild variant="ghostLight" size="xl"><Link to="/partner">Partner With Us</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
