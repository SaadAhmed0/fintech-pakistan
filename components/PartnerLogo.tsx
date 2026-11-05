import Image from "next/image";
import type { Partner } from "@/lib/content";

// Partner logos sit on a dark tile so white wordmarks stay legible.
export default function PartnerLogo({ partner, size = "card", priority = false }: { partner: Partner; size?: "card" | "hero"; priority?: boolean }) {
  const { logo, name, showName } = partner;
  return (
    <span className={`plogo plogo-${size}${showName ? " plogo-icon" : ""}`}>
      <Image src={logo.src} width={logo.width} height={logo.height} alt={showName ? "" : `${name} logo`} priority={priority} />
      {showName && <span className="plogo-name">{name}</span>}
    </span>
  );
}
