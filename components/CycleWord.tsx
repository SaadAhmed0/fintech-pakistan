"use client";

import { useEffect, useState } from "react";

const WORDS = ["pays", "saves", "sends"];

export default function CycleWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { if (!document.hidden) setI((n) => (n + 1) % WORDS.length); }, 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <p className="cycle-line">
      <span className="sr-only">Built for how Pakistan pays, saves and sends.</span>
      <span aria-hidden="true">Built for how Pakistan <span className="cycle"><span key={i} className={i ? "swap" : undefined}>{WORDS[i]}</span></span>.</span>
    </p>
  );
}
