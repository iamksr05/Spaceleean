import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DeploymentSequence from "@/components/DeploymentSequence";
import Specifications from "@/components/Specifications";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SPACELEEAN | S.P.E.E.D. - Autonomous Second Stage Debris Mitigation</title>
        <meta name="description" content="S.P.E.E.D. attaches to second stage rockets, autonomously unfolds after satellite release, de-orbits debris, and safely lands. Complete debris mitigation from launch to splashdown." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <DeploymentSequence />
          <Specifications />
          <StatsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
