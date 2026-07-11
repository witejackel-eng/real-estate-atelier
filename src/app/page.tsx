import { Hero } from '@/components/home/Hero';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { ValueProposition } from '@/components/home/ValueProposition';
import { SelectedLocations } from '@/components/home/SelectedLocations';
import { SellingCTA } from '@/components/home/SellingCTA';
import { TrustSection } from '@/components/home/TrustSection';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <ValueProposition />
      <SelectedLocations />
      <SellingCTA />
      <TrustSection />
      <FinalCTA />
    </>
  );
}