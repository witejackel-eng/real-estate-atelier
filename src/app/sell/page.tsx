import { SellClient } from "@/components/sell/SellClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "Professional property presentation and qualified buyer matching. Honest pricing, no open-house pressure.",
};

export default function SellPage() {
  return <SellClient />;
}