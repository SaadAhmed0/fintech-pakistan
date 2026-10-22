"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const TOPICS = [
  { value: "Partnership", title: "Partnership", desc: "Events, podcast, community or a launch" },
  { value: "Podcast guest", title: "Podcast guest", desc: "Suggest yourself or someone you know" },
  { value: "Speaking at FP Live", title: "Speaking", desc: "Talks and panels at FP Live and the Rails Summit" },
  { value: "Press", title: "Press", desc: "Interviews, quotes and media requests" },
  { value: "Community question", title: "Community", desc: "Joining, channels or house rules" },
  { value: "Share an event", title: "Share an event", desc: "A fintech event the community should know about" },
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

// Drafts an email for the visitor to send from their own inbox. Nothing is
// posted to a server, so there is no backend to run or secure.
export default function ContactForm() {
  const [topic, setTopic] = useState("Partnership");
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);
  const [status, setStatus] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const draftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && TOPICS.some((x) => x.value === t)) setTopic(t);
  }, []);

  useEffect(() => {
    if (draft) draftRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [draft]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) || "").trim();
    const name = v("name"), email = v("email"), company = v("company"), role = v("role"), msg = v("message");
    const errs: Errors = {};
    if (!name) errs.name = "Add your name so we know who to reply to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter an email address like name@company.com.";
    if (msg.length < 10) errs.message = "Tell us a little more, at least a sentence.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }
    const subject = `${topic}: ${name}${company ? ", " + company : ""}`;
    const sign = name + (role || company ? "\n" + [role, company].filter(Boolean).join(", ") : "") + "\n" + email;
    setDraft({ subject, body: `Hi Fintech Pakistan team,\n\n${msg}\n\n${sign}` });
    setStatus("");
  }

  function copy(text: string, ok: string) {
    navigator.clipboard?.writeText(text).then(() => setStatus(ok), () => setStatus("Select the text and press Ctrl+C or Cmd+C to copy."));
  }

  return (
    <div className="wrap split top">
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div className="prose">
          <span className="label" style={{ color: "var(--slate)" }}>Step one</span>
          <h2 id="contact-form-title" style={{ marginTop: 20, fontSize: "clamp(36px,4.5vw,56px)" }}>What&apos;s it about?</h2>
        </div>
        <div className="topic-list">
          {TOPICS.map((t) => (
            <button key={t.value} type="button" className="topic" aria-pressed={topic === t.value}
              onClick={() => { setTopic(t.value); nameRef.current?.focus(); }}>
              <b>{t.title}</b><span>{t.desc}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <form className="form-card" noValidate onSubmit={submit}>
          <span className="label" style={{ color: "var(--slate)" }}>Step two</span>
          <div className="field">
            <label htmlFor="c-topic">Topic</label>
            <select id="c-topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
              {TOPICS.map((t) => <option key={t.value}>{t.value}</option>)}
            </select>
          </div>
          <div className="row-2">
            <div className={`field${errors.name ? " invalid" : ""}`}><label htmlFor="c-name">Your name</label><input ref={nameRef} id="c-name" name="name" autoComplete="name" required /><span className="err" aria-live="polite">{errors.name}</span></div>
            <div className={`field${errors.email ? " invalid" : ""}`}><label htmlFor="c-email">Email</label><input id="c-email" name="email" type="email" autoComplete="email" required /><span className="err" aria-live="polite">{errors.email}</span></div>
          </div>
          <div className="row-2">
            <div className="field"><label htmlFor="c-company">Company</label><input id="c-company" name="company" autoComplete="organization" /></div>
            <div className="field"><label htmlFor="c-role">Role</label><input id="c-role" name="role" autoComplete="organization-title" /></div>
          </div>
          <div className={`field${errors.message ? " invalid" : ""}`}><label htmlFor="c-message">Message</label><textarea id="c-message" name="message" required /><span className="err" aria-live="polite">{errors.message}</span></div>
          <button className="btn btn-ink" type="submit" style={{ alignSelf: "flex-start" }}>Draft my email <span className="arrow">→</span></button>
          <p className="form-note">Nothing is sent from this page. We&apos;ll prepare the email so you can send it from your own inbox.</p>
        </form>
        {draft && (
          <div className="draft" ref={draftRef}>
            <span className="label">Ready to send</span>
            <h3>Your email is drafted.</h3>
            <p>{site.contactEmail ? "Open it in your email app, or copy it." : "Copy it into your email app and send it to us."}</p>
            {site.contactEmail && <div className="draft-row"><span>TO</span><span>{site.contactEmail}</span></div>}
            <div className="draft-row"><span>SUBJECT</span><span>{draft.subject}</span></div>
            <pre>{draft.body}</pre>
            <div className="ctas">
              {site.contactEmail && (
                <a className="btn btn-signal" href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}>Open in email app</a>
              )}
              <button className="btn btn-ghost" type="button" onClick={() => copy(`Subject: ${draft.subject}\n\n${draft.body}`, "Copied. Paste it into a new email to us.")}>Copy subject and message</button>
            </div>
            <span className="status-line" role="status">{status}</span>
          </div>
        )}
      </div>
    </div>
  );
}
