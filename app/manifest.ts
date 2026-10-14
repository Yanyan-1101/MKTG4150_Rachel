import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ScholarReady",
    short_name: "ScholarReady",
    description: "A private workspace for thoughtful scholarship applications.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f6f8f5",
    theme_color: "#17675b",
    icons: [{ src: "/brand-mark.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
