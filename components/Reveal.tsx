"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SEL = ".head, .card, .partner, .stat, .steps li, .rules li, .faq, .event, .cover.small, .join-card, .corridor-wrap, .prose, .equation, .topic, .form-card, .contact-box, .article-body > *, .sources";

function countUp(el: HTMLElement) {
  if (el.dataset.done) return;
  el.dataset.done = "1";
  const to = parseFloat(el.dataset.to || "0"), dec = parseInt(el.dataset.dec || "0", 10);
  const start = performance.now(), dur = 1400;
  function step(now: number) {
    const t = Math.min(1, (now - start) / dur);
    el.textContent = (to * (1 - Math.pow(1 - t, 3))).toFixed(dec);
    if (t < 1) requestAnimationFrame(step); else el.textContent = to.toFixed(dec);
  }
  requestAnimationFrame(step);
}

// Scroll reveal and stat count-up. Content is fully visible without JS; this
// only adds motion once hydrated, so crawlers and no-JS readers see everything.
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const el = en.target as HTMLElement;
        el.classList.add("in");
        io.unobserve(el);
        el.querySelectorAll<HTMLElement>(".count").forEach(countUp);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    const seen = new Map<Element, number>();
    document.querySelectorAll<HTMLElement>(`main ${SEL.split(", ").join(", main ")}`).forEach((el) => {
      if (el.classList.contains("in")) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) return; // already on screen: leave it be
      el.classList.add("rv");
      const n = seen.get(el.parentElement!) || 0;
      el.style.setProperty("--d", Math.min(n, 6) * 80 + "ms");
      seen.set(el.parentElement!, n + 1);
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
