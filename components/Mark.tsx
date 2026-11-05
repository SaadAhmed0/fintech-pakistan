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
