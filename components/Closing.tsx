import Link from "next/link";
import { has, settings } from "@/lib/cms";

export default function Closing() {
  const c = settings().closing;
  if (!has(c.title)) return null;
  return (
    <section className="closing band" aria-labelledby="closing-title">
      <div className="wrap">
        <div>
          <h2 id="closing-title">{c.title}</h2>
          {has(c.text) && <p>{c.text}</p>}
        </div>
        {has(c.buttonLabel) && <Link className="btn btn-ink" href="/community" data-join>{c.buttonLabel}</Link>}
      </div>
    </section>
  );
}
