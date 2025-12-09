import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import Process from "@/components/home/Process";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Process />
      <Footer />
    </main>
  );
}
