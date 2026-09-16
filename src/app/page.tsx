import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PracticeAreas from "@/components/PracticeAreas";
import Differentiators from "@/components/Differentiators";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Differentiators />
        <ConsultationCTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
