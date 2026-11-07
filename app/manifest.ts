import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F3F4EE",
    theme_color: "#0B1510",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/fp-app-tile_green_256.png", sizes: "256x256", type: "image/png" },
      { src: "/brand/fp-app-tile_green_1024.png", sizes: "1024x1024", type: "image/png" },
    ],
  };
}
