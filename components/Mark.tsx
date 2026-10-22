// The pixel F, completed into a P by one lime block.
const PX: [number, number][] = [[23,16],[23,30],[23,44],[23,58],[23,72],[37,16],[51,16],[65,16],[37,44],[51,44],[65,44]];

export function MarkDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="F" viewBox="0 0 100 100">
          {PX.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="12" height="12" rx="1.5" />)}
        </symbol>
        <symbol id="Fsolid" viewBox="0 0 100 100">
          <rect x="23" y="16" width="12" height="68" rx="1.5" /><rect x="23" y="16" width="54" height="12" rx="1.5" /><rect x="23" y="44" width="54" height="12" rx="1.5" />
        </symbol>
      </defs>
    </svg>
  );
}

export function LogoIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" rx="24" fill="#0B6B43" />
      <use href="#Fsolid" fill="#F3F4EE" />
      <rect className="lk-block" x="65" y="30" width="12" height="12" rx="1.5" fill="#C6F24E" />
    </svg>
  );
}

export function HeroMark({ variant = "ghost" }: { variant?: "full" | "ghost" }) {
  const full = variant === "full";
  const fill = full ? "#F3F4EE" : "#1F3A2B";
  return (
    <div className="hero-mark assemble">
      <svg
        viewBox="0 0 100 100"
        {...(full
          ? { role: "img", "aria-label": "The Fintech Pakistan mark: a pixel F completed into a P by one lime block" }
          : { "aria-hidden": true })}
      >
        {full && <rect width="100" height="100" rx="24" fill="#0B6B43" />}
        {PX.map(([x, y], i) => (
          <rect key={i} className="px" style={{ ["--i" as string]: i }} x={x} y={y} width="12" height="12" rx="1.5" fill={fill} />
        ))}
        <rect className="click-block" x="65" y="30" width="12" height="12" rx="1.5" fill="#C6F24E" />
      </svg>
    </div>
  );
}

export function GhostF({ fill = "#13291E" }: { fill?: string }) {
  return (
    <svg className="ghost" viewBox="0 0 100 100" aria-hidden="true">
      <use href="#F" fill={fill} />
      <rect x="65" y="30" width="12" height="12" rx="1.5" fill="#C6F24E" />
    </svg>
  );
}

export function Equation() {
  return (
    <div className="equation" aria-hidden="true">
      <svg viewBox="0 0 100 100"><use href="#Fsolid" fill="#0B1510" /></svg>
      <span className="op">+</span>
      <svg viewBox="0 0 100 100"><rect className="eq-piece" x="34" y="34" width="32" height="32" rx="4" fill="#0B6B43" /></svg>
      <span className="op">=</span>
      <svg viewBox="0 0 100 100"><use href="#Fsolid" fill="#0B1510" /><rect className="eq-block" x="65" y="30" width="12" height="12" rx="1.5" fill="#0B6B43" /></svg>
    </div>
  );
}
