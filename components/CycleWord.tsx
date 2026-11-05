"use client";

import { useEffect, useState } from "react";

const WORDS = ["pays", "receives", "sends", "saves"];

export default function CycleWord() {
  // A running count rather than a word index, so the slide also plays when the
  // list loops back to the first word. With reduced motion the CSS animation is
  // off and the word simply changes.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => { if (!document.hidden) setTick((n) => n + 1); }, 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <p className="cycle-line">
      <span className="sr-only">Built for how Pakistan pays, receives, sends and saves.</span>
      <span aria-hidden="true">Built for how Pakistan <span className="cycle"><span key={tick} className={tick ? "swap" : undefined}>{WORDS[tick % WORDS.length]}.</span></span></span>
    </p>
  );
}
