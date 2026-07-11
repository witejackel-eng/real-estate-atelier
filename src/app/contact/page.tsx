import { ContactClient } from "@/components/contact/ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a private conversation about your next home. We respond within 24 hours.",
};

export default function ContactPage() {
  return <ContactClient />;
}