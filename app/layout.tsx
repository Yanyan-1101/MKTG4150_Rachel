import type { Metadata } from "next";
import "./globals.css";
import AppFrame from "@/components/app-frame";
import { AppProvider } from "@/components/app-provider";

export const metadata: Metadata = {
  title: { default: "ScholarReady — Your next opportunity, within reach.", template: "%s · ScholarReady" },
  description: "Find scholarships that fit, understand what you need, and get your application ready — all in one private workspace.",
  applicationName: "ScholarReady",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppProvider><AppFrame>{children}</AppFrame></AppProvider></body></html>;
}
