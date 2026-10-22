import Link from "next/link";

export default function Partners() {
  return (
    <div className="grid-3">
      <div className="partner">
        <span className="mark">Sorbet</span>
        <span className="meta"><span className="label">Partner</span><span>Cross-border payments</span></span>
      </div>
      <Link className="partner partner-open" href="/contact?topic=Partnership">
        <span className="plus" aria-hidden="true"></span>
        <span className="mark">Your company</span>
        <span className="meta"><span className="label">Open</span><span>Event, podcast and community partnerships</span></span>
      </Link>
      <Link className="partner partner-open" href="/contact?topic=Partnership">
        <span className="plus" aria-hidden="true"></span>
        <span className="mark">Your bank</span>
        <span className="meta"><span className="label">Open</span><span>Meet the fintechs you&apos;ll partner with</span></span>
      </Link>
    </div>
  );
}
