import { Rocket, Mail } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-spacecraft.jpg";
import ContactFormDialog from "./ContactFormDialog";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card opacity-90" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
          {/* Left content */}
          <div className="space-y-8 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Rocket className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Second Stage Recovery System</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Autonomous<br />
              Debris Mitigation<br />
              <span className="text-gradient">From Launch to Landing</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              S.P.E.E.D. attaches to the second stage rocket engine before launch. Upon satellite release, it autonomously unfolds, covers the adapter ring, de-orbits from the satellite's path, and safely lands using specialized recovery mechanisms.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <ContactFormDialog
                trigger={
                  <Button variant="hero" size="xl">
                    <Mail className="h-4 w-4" />
                    Contact for Partnership
                  </Button>
                }
              />
            </div>
          </div>
          
          {/* Right content - Hero image with info cards */}
          <div className="relative fade-in stagger-2">
            <div className="relative rounded-xl overflow-hidden border border-border card-glow">
              <img 
                src={heroImage} 
                alt="S.P.E.E.D. System attached to second stage rocket" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute bottom-4 left-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-background/80 backdrop-blur-sm border border-border">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-xs font-medium uppercase tracking-wider">Ready for Integration</span>
                </div>
              </div>
            </div>
            
            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-card border border-border card-glow">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Attachment</span>
                <p className="font-display font-semibold mt-1">Second Stage Surface</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border card-glow">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Activation</span>
                <p className="font-display font-semibold mt-1">Post-Satellite Release</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border card-glow">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Coverage</span>
                <p className="font-display font-semibold mt-1">Adapter Ring Envelope</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border card-glow">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Recovery</span>
                <p className="font-display font-semibold mt-1">Controlled Splashdown</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
