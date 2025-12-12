'use client';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero2 from "@/components/home/Hero2";
import About from "@/components/home/About";
import BentoSkills2 from "@/components/home/BentoSkills2";
import ExperienceStack from "@/components/home/ExperienceStack";
import HorizontalGallery from "@/components/home/HorizontalGallery";
import HorizontalGalleryMobile from "@/components/home/HorizontalGalleryMobile";
import FeatureSticky from "@/components/home/FeatureSticky";
import Preloader from "@/components/ui/Preloader";
import Hero from "@/components/home/Hero";
export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-background text-foreground">
      <Preloader />
      <Header />
      {/* <Hero2 /> */}
      <Hero/>
      <FeatureSticky />        {/* Philosophy & Approach */}

      {/* Works Gallery */}
      <div className="hidden md:block">
        <HorizontalGallery />
      </div>
      <HorizontalGalleryMobile />

      <BentoSkills2 />          {/* Technical Toolbox */}
      <ExperienceStack />      {/* History & Credibility */}
      <About />                {/* Personal Connection */}
      <Footer />
    </main>
  );
}
