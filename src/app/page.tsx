import { Hero } from '@/components/home/Hero';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { PropertyIndex } from '@/components/home/PropertyIndex';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { EditorialStory } from '@/components/home/EditorialStory';
import { NeighborhoodPreview } from '@/components/home/NeighborhoodPreview';
import { SellingCTA } from '@/components/home/SellingCTA';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <PropertyIndex />
      <ServicesGrid />
      <EditorialStory />
      <NeighborhoodPreview />
      <SellingCTA />
      <Testimonials />
      <FinalCTA />
    </>
  );
}