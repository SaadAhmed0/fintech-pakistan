import type { ReactNode } from "react";

type Props = { id: string; eyebrow?: string; title: ReactNode; lede?: ReactNode; children?: ReactNode; aside?: ReactNode };

export default function PageHero({ id, eyebrow, title, lede, children, aside }: Props) {
  return (
    <section className={`page-hero band${aside ? " has-aside" : ""}`} aria-labelledby={id}>
      <div className="wrap hero-inner">
        <div>
          {eyebrow && <span className="label eyebrow">{eyebrow}</span>}
          <h1 id={id}>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
