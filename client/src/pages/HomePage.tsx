import SEO from '@/components/common/SEO';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import WhySkyCinemaSection from '@/components/home/WhySkyCinemaSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyJBLSection from '@/components/home/WhyJBLSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InstagramSection from '@/components/home/InstagramSection';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Premium Home Theatre & Hi-Fi Audio"
        description="Experience cinema inside your home. SkyCinema offers premium home theatre, Hi-Fi audio, and smart home automation. Authorized JBL Dealer in Krishnagiri & Salem."
      />
      <HeroSection />
      <StatsSection />
      <WhySkyCinemaSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <ProjectsSection />
      <ServicesSection />
      <WhyJBLSection />
      <ExperienceSection />
      <TestimonialsSection />
      <InstagramSection />
    </>
  );
}
