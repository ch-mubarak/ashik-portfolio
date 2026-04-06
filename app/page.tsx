import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import CaseStudy from "@/components/sections/CaseStudy";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Skills />
      <Experience />
      <Projects />
      <CaseStudy />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}
