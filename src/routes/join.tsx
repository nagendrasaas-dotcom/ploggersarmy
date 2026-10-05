import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Site";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import team from "@/assets/team.jpg";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join the Movement — The Indian Ploggers Army" },
      { name: "description", content: "Become a plogger or organise a clean-up drive in your neighbourhood with TIPA." },
      { property: "og:title", content: "Join the Movement — The Indian Ploggers Army" },
      { property: "og:description", content: "Sign up to plog with TIPA or start a drive in your community." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Join,
});

function Join() {
  return (
    <>
      <PageHero eyebrow="Get involved" title="Lace up. Glove up. Show up." intro="Tell us where you are and how you'd like to help — we'll connect you with the next drive." image={team} />
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <div>
          <h2 className="text-4xl font-extrabold leading-[0.95]">All you need is the inclination.</h2>
          <p className="mt-5 text-muted-foreground">No experience, no kit, no membership fee. Just the wish for a healthier, cleaner, greener neighbourhood — wherever you are.</p>
        </div>
        <EnquiryForm
          submitLabel="Count me in"
          successMessage="Welcome to the Army! We'll be in touch about the next drive."
          fields={[
            { name: "name", label: "Full name", required: true, half: true },
            { name: "email", label: "Email", type: "email", required: true, half: true },
            { name: "phone", label: "Phone", type: "tel", half: true },
            { name: "city", label: "City", required: true, half: true },
            { name: "interest", label: "I want to", type: "select", options: ["Join a drive", "Organise a drive", "Volunteer as a coordinator", "Bring my school / college"], required: true },
            { name: "message", label: "Anything else?", type: "textarea" },
          ]}
        />
      </section>
    </>
  );
}
