import Link from "next/link";

export type CardData = { label: string; title: string; text: string; href: string; linkText: string };

const gridFor = (n: number) => (n === 2 ? "grid-2" : n === 4 ? "grid-4" : "grid-3");

// Cards edited in the admin. A card with a link becomes one big link.
export default function Cards({ cards }: { cards: readonly CardData[] }) {
  if (cards.length === 0) return null;
  return (
    <div className={gridFor(cards.length)}>
      {cards.map((c) => {
        const inner = (
          <>
            {c.label && <span className="label">{c.label}</span>}
            <h3>{c.title}</h3>
            {c.text && <p>{c.text}</p>}
            {c.href && c.linkText && <span className="go">{c.linkText}</span>}
          </>
        );
        return c.href ? <Link key={c.title} className="card" href={c.href}>{inner}</Link> : <div key={c.title} className="card">{inner}</div>;
      })}
    </div>
  );
}

// A section heading, optional intro and its cards.
export function CardSection({ id, section, band = "white" }: { id: string; section: { heading: string; intro: string; cards: readonly CardData[] }; band?: "white" | "paper" }) {
  if (!section.heading && section.cards.length === 0) return null;
  return (
    <section className={`block band ${band}`} aria-labelledby={id}>
      <div className="wrap">
        <div className="head">
          <h2 id={id}>{section.heading}</h2>
          {section.intro && <p>{section.intro}</p>}
        </div>
        <Cards cards={section.cards} />
      </div>
    </section>
  );
}
