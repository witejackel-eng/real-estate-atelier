import { NeighborhoodsClient } from "@/components/neighborhoods/NeighborhoodsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neighbourhoods",
  description: "Explore curated neighborhoods across India. Each city has a distinct character and property market.",
};

export default function NeighborhoodsPage() {
  return <NeighborhoodsClient />;
}