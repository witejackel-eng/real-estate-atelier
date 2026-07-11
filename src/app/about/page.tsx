import { AboutClient } from "@/components/about/AboutClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "A deliberate real-estate practice. Fewer listings, more attention, clear advice.",
};

export default function AboutPage() {
  return <AboutClient />;
}