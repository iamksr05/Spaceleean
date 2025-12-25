import { Rocket, Maximize2, Orbit, ShieldCheck } from "lucide-react";

const phases = [
  {
    icon: Rocket,
    phase: "Phase 01",
    title: "Attached to Second Stage",
    description: "S.P.E.E.D. is securely mounted to the surface of the second stage rocket engine during launch preparation.",
  },
  {
    icon: Maximize2,
    phase: "Phase 02",
    title: "Deployment & Coverage",
    description: "Upon satellite release, S.P.E.E.D. autonomously unfolds and envelops the satellite adapter ring structure.",
  },
  {
    icon: Orbit,
    phase: "Phase 03",
    title: "De-orbit Maneuver",
    description: "S.P.E.E.D. initiates controlled de-orbit sequence, clearing the satellite's orbital path from debris.",
  },
  {
    icon: ShieldCheck,
    phase: "Phase 04",
    title: "Safe Recovery",
    description: "Specialized landing mechanism ensures controlled descent and safe splashdown for material retrieval.",
  },
];

const DeploymentSequence = () => {
  return (
    <section id="technology" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">Mission Lifecycle</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
            S.P.E.E.D. Deployment Sequence
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Autonomous activation lifecycle from orbital insertion to splashdown. S.P.E.E.D. is attached to the surface of the second stage rocket engine before launch. When the second stage releases the satellite, S.P.E.E.D. unfolds and covers the adapter ring, then de-orbits from the satellite's path and safely lands using a specialized recovery mechanism.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline connector */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {phases.map((phase, index) => (
              <div 
                key={index} 
                className="relative group fade-in" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative z-10 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 h-full card-glow">
                  {/* Phase number badge */}
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="text-xs font-bold text-primary">{phase.phase}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="mt-4 mb-5 w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <phase.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-display font-semibold text-lg mb-3">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
                  
                  {/* Connector arrow for desktop */}
                  {index < phases.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary/30 rotate-45 -translate-y-1/2 z-20" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentSequence;
