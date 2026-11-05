import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";

export default function Closing() {
  return (
    <section className="closing band" aria-labelledby="closing-title">
      <span className="roam" aria-hidden="true"></span>
      <div className="wrap">
        <div>
          <h2 id="closing-title">The room is open. <span className="soft">Pull up a chair.</span></h2>
          <p>Free to join for anyone building money in Pakistan.</p>
        </div>
        <div className="ctas">
          <WhatsAppButton label="Join the community" />
          <Link className="btn btn-ghost" href="/contact">Talk to us</Link>
        </div>
      </div>
    </section>
  );
}
