import Link from "next/link";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Fintech Pakistan",
  description: "Get in touch about partnerships, press, speaking at FP Live or the Fintech Pakistan community. The quickest way to reach us is on LinkedIn.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Contact", path: "/contact" }])} />
      <PageHero id="contact-title" title="Contact"
        lede="For partnerships, press, speaking or anything else, the quickest way to reach us is on LinkedIn.">
        <div className="ctas">
          <a className="btn btn-signal" href={site.contactLinkedin} target="_blank" rel="noopener">Connect on LinkedIn</a>
        </div>
      </PageHero>

      <section className="block band white" aria-labelledby="contact-other">
        <div className="wrap">
          <div className="head">
            <h2 id="contact-other">Already know <span className="soft-accent">what you need?</span></h2>
          </div>
          <div className="grid-2">
            <Link className="card" href="/community"><span className="label">Community</span><h3>Join on WhatsApp</h3><p>Questions about the industry are best asked in Ask &amp; Help.</p><span className="go">Join free</span></Link>
            <Link className="card" href="/partners"><span className="label">Partners</span><h3>See how we work</h3><p>Formats, audiences and how a partnership runs from first call to launch.</p><span className="go">Partners</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
