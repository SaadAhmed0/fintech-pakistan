"use client";

import { useState } from "react";

export default function Share({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  return (
    <div className="share">
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener">LinkedIn</a>
      <a href={`https://x.com/intent/post?url=${u}&text=${t}`} target="_blank" rel="noopener">X</a>
      <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener">WhatsApp</a>
      <button type="button" onClick={() => navigator.clipboard?.writeText(url).then(() => setCopied(true), () => {})}>
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
