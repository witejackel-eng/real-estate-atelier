import { PropertiesClient } from "@/components/properties/PropertiesClient";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Properties",
  description: "Browse our curated collection of premium residential properties across India.",
};
export default function PropertiesPage() {
  return <PropertiesClient />;
}