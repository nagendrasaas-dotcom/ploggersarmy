import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SOCIAL } from "@/components/site/Site";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Indian Ploggers Army" },
      { name: "description", content: "Get in touch with The Indian Ploggers Army about drives, stories, media or partnerships." },
      { property: "og:title", content: "Contact — The Indian Ploggers Army" },
      { property: "og:description", content: "Say hello to TIPA — questions, stories and ideas welcome." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Say hello. Share a story." intro="Questions, ideas, media requests or photos from your own drive — we'd love to hear from you." image={community} />
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <div>
          <h2 className="text-4xl font-extrabold leading-[0.95]">Find us on the trail — and online.</h2>
          <ul className="mt-8 space-y-3 font-semibold">
            <li><a href={SOCIAL.instagram} target="_blank" rel="noreferrer" className="text-primary hover:underline">Instagram · @theindianploggersarmy</a></li>
            <li><a href={SOCIAL.facebook} target="_blank" rel="noreferrer" className="text-primary hover:underline">Facebook · Ploggersarmy</a></li>
          </ul>
        </div>
        <EnquiryForm
          submitLabel="Send message"
          successMessage="Message received — we'll get back to you soon."
          fields={[
            { name: "name", label: "Name", required: true, half: true },
            { name: "email", label: "Email", type: "email", required: true, half: true },
            { name: "subject", label: "Subject", type: "select", options: ["General", "Share a story", "Media", "Partnership"], required: true },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
        />
      </section>
    </>
  );
}
