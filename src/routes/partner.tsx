import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Site";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import corporate from "@/assets/corporate.jpg";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner With TIPA — Corporate & CSR Volunteering" },
      { name: "description", content: "Employee volunteering, clean-up drives and ESG campaigns with The Indian Ploggers Army." },
      { property: "og:title", content: "Partner With TIPA — Corporate & CSR Volunteering" },
      { property: "og:description", content: "Turn employee volunteering into visible environmental impact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Partner,
});

const FORMATS = [
  ["Employee volunteering", "Half-day or full-day plogs for teams of any size."],
  ["Corporate clean-up drives", "Beaches, lakes, parks and roads — planned end to end."],
  ["Sustainability campaigns", "Branded challenges that get whole offices moving."],
  ["ESG initiatives", "Ongoing programmes with reporting for your disclosures."],
  ["Awareness programmes", "Talks and workshops on waste and segregation."],
  ["City interventions", "Adopt a stretch, a lake or a neighbourhood."],
];

function Partner() {
  return (
    <>
      <PageHero eyebrow="For organisations" title="Turn employee volunteering into visible impact." intro="Meaningful environmental engagement your people will remember — and your sustainability report can show." image={corporate} />
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FORMATS.map(([t, d], i) => (
            <div key={t} className="bg-background p-8">
              <span className="text-xs font-bold text-highlight">0{i + 1}</span>
              <h3 className="mt-2 text-2xl font-extrabold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <h2 className="text-4xl font-extrabold leading-[0.95]">Start a partnership conversation.</h2>
          <EnquiryForm
            submitLabel="Send enquiry"
            successMessage="Thanks! Our partnerships team will reach out shortly."
            fields={[
              { name: "name", label: "Your name", required: true, half: true },
              { name: "company", label: "Organisation", required: true, half: true },
              { name: "email", label: "Work email", type: "email", required: true, half: true },
              { name: "phone", label: "Phone", type: "tel", half: true },
              { name: "format", label: "Interested in", type: "select", options: FORMATS.map((f) => f[0]!), required: true, half: true },
              { name: "size", label: "Team size", type: "select", options: ["Under 25", "25–100", "100–500", "500+"], half: true },
              { name: "message", label: "Tell us about your goals", type: "textarea" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
