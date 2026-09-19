import SmoothScroll from "@/components/SmoothScroll";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Positioning } from "@/components/Positioning";
import { CredibilityBar } from "@/components/CredibilityBar";
import { Expertise } from "@/components/Expertise";
import { HowWeWork } from "@/components/HowWeWork";
import { Statement } from "@/components/Statement";
import { People } from "@/components/People";
import { Industries } from "@/components/Industries";
import { Insights } from "@/components/Insights";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { TravellingPen } from "@/components/TravellingPen";
import { MobileContactBar } from "@/components/MobileContactBar";

export default function Home() {
  return (
    <SmoothScroll>
      <TravellingPen targetSelector="#site-main" />
      <Header />
      <main id="site-main">
        <Hero />
        <Positioning />
        <CredibilityBar />
        <Expertise />
        <HowWeWork />
        <Statement />
        <People />
        <Industries />
        <Insights />
        <ContactCTA />
      </main>
      <Footer />
      <MobileContactBar />
    </SmoothScroll>
  );
}
