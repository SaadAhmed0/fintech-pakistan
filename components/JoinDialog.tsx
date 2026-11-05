"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import WhatsAppButton from "./WhatsAppButton";

const INSIDE = [
  { title: "Talk fintech", channel: "General", text: "Introductions, conversation and what everyone is working on." },
  { title: "Follow the news", channel: "News & Regulation", text: "Industry news and regulatory updates that affect how you build and operate." },
  { title: "Get unstuck", channel: "Ask & Help", text: "Bring a problem. Someone here may already have solved it." },
  { title: "Share jobs", channel: "Jobs & Opportunities", text: "Roles, partnerships and openings across the ecosystem." },
];

// Any link marked data-join opens this instead of navigating. The links still
// point at /community, so they work before hydration and when opened in a new tab.
export default function JoinDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!(e.target as Element).closest("[data-join]")) return;
      e.preventDefault();
      ref.current?.showModal();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog ref={ref} className="join-dialog" aria-labelledby="join-title" onClick={(e) => { if (e.target === ref.current) close(); }}>
      <div className="join-dialog-body">
        <button className="join-close" type="button" aria-label="Close" onClick={close}><span aria-hidden="true">×</span></button>
        <span className="label">FP Community · Free</span>
        <h2 id="join-title">What happens in the community</h2>
        <p className="join-intro">A free WhatsApp community where founders, operators, regulators and banks talk fintech, share jobs and help each other out.</p>
        <ul className="join-list">
          {INSIDE.map((i) => (
            <li key={i.title}>
              <b>{i.title}</b>
              <span className="join-channel">{i.channel}</span>
              <p>{i.text}</p>
            </li>
          ))}
        </ul>
        <p className="join-note">Plus monthly meetups, and members hear about FP Live events first.</p>
        <div className="ctas" onClick={close}>
          <WhatsAppButton />
          <Link className="btn btn-ghost" href="/community">See the house rules</Link>
        </div>
      </div>
    </dialog>
  );
}
