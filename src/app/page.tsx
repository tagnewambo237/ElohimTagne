'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import BentoSkills from "@/components/home/BentoSkills";
import ExperienceStack from "@/components/home/ExperienceStack";
import HorizontalGallery from "@/components/home/HorizontalGallery";
import HorizontalGalleryMobile from "@/components/home/HorizontalGalleryMobile";
import FeatureSticky from "@/components/home/FeatureSticky";
import Preloader from "@/components/ui/Preloader";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-background text-foreground">
      <Preloader />
      <Header />
      <Hero />
      <FeatureSticky />        {/* Philosophy & Approach */}

      {/* Works Gallery */}
      <div className="hidden md:block">
        <HorizontalGallery />
      </div>
      <HorizontalGalleryMobile />

      <BentoSkills />          {/* Technical Toolbox */}
      <ExperienceStack />      {/* History & Credibility */}
      <About />                {/* Personal Connection */}
      <Footer />
    </main>
  );
}
