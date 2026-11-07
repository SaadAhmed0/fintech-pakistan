"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import WhatsAppButton from "./WhatsAppButton";

type Content = {
  label: string;
  title: string;
  intro: string;
  items: readonly { title: string; channel: string; text: string }[];
  note: string;
  buttonLabel: string;
  secondaryLabel: string;
};

// Any link marked data-join opens this instead of navigating. The links still
// point at /community, so they work before hydration and when opened in a new tab.
// The text is edited in the admin under Site settings, Join popup.
export default function JoinDialog({ content: c, whatsappInvite }: { content: Content; whatsappInvite: string }) {
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
        {c.label && <span className="label">{c.label}</span>}
        <h2 id="join-title">{c.title}</h2>
        {c.intro && <p className="join-intro">{c.intro}</p>}
        <ul className="join-list">
          {c.items.map((i) => (
            <li key={i.title}>
              <b>{i.title}</b>
              <span className="join-channel">{i.channel}</span>
              <p>{i.text}</p>
            </li>
          ))}
        </ul>
        {c.note && <p className="join-note">{c.note}</p>}
        <div className="ctas" onClick={close}>
          <WhatsAppButton invite={whatsappInvite} label={c.buttonLabel || undefined} />
          {c.secondaryLabel && <Link className="btn btn-ghost" href="/community">{c.secondaryLabel}</Link>}
        </div>
      </div>
    </dialog>
  );
}
