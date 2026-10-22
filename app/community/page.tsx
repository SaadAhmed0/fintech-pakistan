import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import { breadcrumbLd, faqLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Join Pakistan's Free Fintech Community on WhatsApp",
  description: "A free WhatsApp community for founders, operators, regulators and banks building fintech in Pakistan. Four focused channels and monthly meetups.",
  path: "/community",
});

const FAQS = [
  { q: "Is it free?", a: "Yes. The community is free to join and free to stay in." },
  { q: "Who can join?", a: "Anyone working in or around fintech in Pakistan, including teams building for the Pakistani market from abroad." },
  { q: "Can I post about my company?", a: "Yes, in the right channel. Launches, hiring and news are welcome. Unsolicited sales messages are not." },
  { q: "Is there an in-person side?", a: "Yes. We run monthly meetups and larger events through FP Live. Members hear about them first." },
];

export default function Community() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Community", path: "/community" }]), faqLd(FAQS)]} />
      <PageHero id="community-title" eyebrow="FP Community · Free"
        title={<>Pakistan&apos;s fintech <span className="soft">finally has a room.</span></>}
        lede="A free WhatsApp community for everyone building money in Pakistan. Focused channels, monthly meetups, and people working on the same problems you are.">
        <div className="ctas"><WhatsAppButton /></div>
      </PageHero>

      <section className="block band paper" aria-labelledby="community-channels">
        <div className="wrap">
          <div className="head">
            <span className="label">Channels</span>
            <h2 id="community-channels">Four rooms, <span className="soft-accent">one community.</span></h2>
            <p>Join the community once, then follow the channels that matter to you.</p>
          </div>
          <div className="grid-4">
            <div className="card card-light"><span className="label">Channel</span><h3>General</h3><p>Introductions, conversation and what everyone is working on.</p></div>
            <div className="card card-light"><span className="label">Channel</span><h3>News &amp; Regulation</h3><p>Industry news and regulatory updates that affect how you build and operate.</p></div>
            <div className="card card-light"><span className="label">Channel</span><h3>Ask &amp; Help</h3><p>Bring a problem. Someone here may already have solved it.</p></div>
            <div className="card card-light"><span className="label">Channel</span><h3>Jobs &amp; Opportunities</h3><p>Roles, partnerships and openings across the ecosystem.</p></div>
          </div>
        </div>
      </section>

      <section className="block band white" aria-labelledby="community-who">
        <div className="wrap split top">
          <div className="prose">
            <span className="label" style={{ color: "var(--slate)" }}>Who it&apos;s for</span>
            <h2 id="community-who" style={{ marginTop: 20 }}>If you build, run or regulate money in Pakistan, <span className="soft-accent">you belong here.</span></h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="chips">
              {["Founders", "Operators", "Product & engineering", "Compliance & risk", "Regulators", "Banks & partners", "Investors", "Fintechs entering Pakistan"].map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
            <ol className="steps">
              <li><h3 className="h4">Join</h3><p>Tap the WhatsApp link and join the community.</p></li>
              <li><h3 className="h4">Introduce yourself</h3><p>Say who you are and what you&apos;re building in General.</p></li>
              <li><h3 className="h4">Pick your channels</h3><p>Follow the rooms you care about and mute the rest.</p></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="block band dark" aria-labelledby="community-rules">
        <div className="wrap">
          <div className="head">
            <span className="label">House rules</span>
            <h2 id="community-rules">Keep the room <span className="soft soft-accent">worth being in.</span></h2>
            <p>A few rules so the community stays useful as it grows.</p>
          </div>
          <ul className="rules">
            <li><b>No cold pitches</b><span>Share launches and news in the right channel. Don&apos;t send unsolicited sales DMs.</span></li>
            <li><b>Share your source</b><span>Post news with a link, so others can read it for themselves.</span></li>
            <li><b>Right room, right post</b><span>Jobs go in Jobs, questions go in Ask &amp; Help.</span></li>
            <li><b>What&apos;s said here stays here</b><span>Don&apos;t screenshot or forward members&apos; messages without asking.</span></li>
          </ul>
        </div>
      </section>

      <section className="block band paper" aria-labelledby="community-faq">
        <div className="wrap split top">
          <div className="prose">
            <span className="label" style={{ color: "var(--slate)" }}>Questions</span>
            <h2 id="community-faq" style={{ marginTop: 20 }}>Before you join.</h2>
          </div>
          <div className="faq">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
