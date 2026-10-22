"use client";

import { useEffect, useRef } from "react";

// The brand pattern, with random blocks lighting up green and one lime block roaming.
export default function HeroGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const S = 36;
    let cols = 0, rows = 0, life = new Float32Array(0), lime = -1, limeLife = 0;
    let raf = 0, running = false, last = 0, spawn = 0, visible = true;

    function cell(i: number, color: string, alpha: number) {
      const x = (i % cols) * S + 2, y = Math.floor(i / cols) * S + 2;
      ctx!.globalAlpha = alpha; ctx!.fillStyle = color;
      ctx!.beginPath();
      if ("roundRect" in ctx!) ctx!.roundRect(x, y, 32, 32, 4); else ctx!.rect(x, y, 32, 32);
      ctx!.fill();
    }
    function draw() {
      ctx!.globalAlpha = 1;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < life.length; i++) {
        cell(i, "#101C16", 1);
        if (life[i] > 0.01) cell(i, "#0E7A4D", life[i] * 0.55);
      }
      if (lime >= 0) cell(lime, "#C6F24E", Math.min(1, limeLife) * 0.85);
      ctx!.globalAlpha = 1;
    }
    function size() {
      const r = canvas!.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.max(1, Math.round(r.width * dpr));
      canvas!.height = Math.max(1, Math.round(r.height * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(r.width / S); rows = Math.ceil(r.height / S);
      life = new Float32Array(cols * rows);
      lime = Math.floor(Math.random() * cols * rows); limeLife = 1;
      draw();
    }
    function tick(now: number) {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      if (now - last < 33) return;
      const dt = Math.min(100, now - last); last = now;
      spawn += dt;
      if (spawn > 90) { spawn = 0; life[Math.floor(Math.random() * life.length)] = 1; }
      for (let i = 0; i < life.length; i++) if (life[i] > 0) life[i] *= 0.975;
      limeLife -= dt / 4200;
      if (limeLife <= 0) { lime = Math.floor(Math.random() * life.length); limeLife = 1.4; }
      draw();
    }
    function sync() {
      const should = !reduced && visible && !document.hidden;
      if (should && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(tick); }
      if (!should && running) { running = false; cancelAnimationFrame(raf); }
    }
    size();
    const io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; sync(); });
    io.observe(canvas);
    window.addEventListener("resize", size);
    document.addEventListener("visibilitychange", sync);
    return () => {
      running = false; cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener("resize", size);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
