"use client";

import { useEffect, useRef } from "react";

export default function ReadingProgress({ target }: { target: string }) {
  const bar = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [target]);
  return <div className="progress" aria-hidden="true"><span ref={bar}></span></div>;
}
