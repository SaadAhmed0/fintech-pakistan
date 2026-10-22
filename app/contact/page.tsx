import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Fintech Pakistan",
  description: "Get in touch about partnerships, podcast guests, speaking at FP Live, press requests or the Fintech Pakistan community.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Contact", path: "/contact" }])} />
      <PageHero id="contact-title" eyebrow="Contact" title={<>Talk <span className="soft">to us.</span></>}
        lede="Partnerships, podcast guests, speaking, press, or a question about the community. Pick a topic, add a few details, and we'll draft the email for you to send." />

      <section className="block band paper on-light" aria-labelledby="contact-form-title">
        <ContactForm />
      </section>

      <section className="block band white" aria-labelledby="contact-other">
        <div className="wrap">
          <div className="head">
            <span className="label">Other ways in</span>
            <h2 id="contact-other">Already know <span className="soft-accent">what you need?</span></h2>
          </div>
          <div className="grid-3">
            {site.contactEmail && (
              <div className="contact-box">
                <span className="label">Email</span>
                <a className="addr" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              </div>
            )}
            <Link className="card card-dark" href="/community"><span className="label">Community</span><h3>Join on WhatsApp</h3><p>Questions about the industry are best asked in Ask &amp; Help.</p><span className="go">JOIN FREE →</span></Link>
            <Link className="card card-dark" href="/partners"><span className="label">Partners</span><h3>See how we work</h3><p>Formats, audiences and how a partnership runs from first call to launch.</p><span className="go">PARTNERS →</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
