import type { ReactNode } from "react";
import { HeroMark } from "./Mark";

type Props = { id: string; eyebrow: string; title: ReactNode; lede?: ReactNode; children?: ReactNode; aside?: ReactNode; mark?: "full" | "ghost" };

export default function PageHero({ id, eyebrow, title, lede, children, aside, mark = "ghost" }: Props) {
  return (
    <section className="hero page-hero band" aria-labelledby={id}>
      <div className="wrap hero-inner">
        <div>
          <span className="label eyebrow">{eyebrow}</span>
          <h1 id={id}>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
          {children}
        </div>
        {aside ?? <HeroMark variant={mark} />}
      </div>
    </section>
  );
}
