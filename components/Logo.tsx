// The official horizontal lockup from the brand kit (public/brand). On light
// backgrounds use the on-light file, on Night Ink or green use on-dark.
export default function Logo({ on = "light" }: { on?: "light" | "dark" }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="logo" src={`/brand/fp-lockup-horizontal_on-${on}.svg`} alt="" width={204} height={32} />;
}
