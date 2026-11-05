import type { Faq } from "@/lib/content";

export default function Faqs({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="post-faqs" aria-labelledby="faq-title">
      <h2 id="faq-title">Questions</h2>
      <div className="faq">
        {faqs.map((f) => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
      </div>
    </section>
  );
}
