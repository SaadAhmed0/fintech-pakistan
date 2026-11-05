import Link from "next/link";

export default function Closing() {
  return (
    <section className="closing band" aria-labelledby="closing-title">
      <div className="wrap">
        <div>
          <h2 id="closing-title">Join the Fintech Pakistan community</h2>
          <p>A free WhatsApp group for people working in fintech in Pakistan.</p>
        </div>
        <Link className="btn btn-ink" href="/community" data-join>How to join</Link>
      </div>
    </section>
  );
}
