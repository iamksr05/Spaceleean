import { Rocket, Maximize2, Navigation, Anchor } from "lucide-react";

const specs = [
  {
    icon: Rocket,
    title: "Pre-Launch Integration",
    description: "S.P.E.E.D. is securely mounted to the outer surface of the second stage rocket engine during ground preparation, requiring no modifications to existing launch vehicle architecture.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Maximize2,
    title: "Autonomous Unfolding",
    description: "Upon satellite separation, S.P.E.E.D. autonomously unfolds and envelops the satellite adapter ring structure, capturing potential debris at the source.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  {
    icon: Navigation,
    title: "Controlled De-orbit",
    description: "The system initiates a precise de-orbit maneuver, clearing the satellite's orbital path and ensuring the debris doesn't interfere with operational spacecraft.",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    icon: Anchor,
    title: "Safe Recovery Landing",
    description: "A specialized landing mechanism ensures controlled atmospheric re-entry and safe splashdown, enabling material retrieval and system reuse analysis.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
];

const Specifications = () => {
  return (
    <section id="mission" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">System Capabilities</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">How S.P.E.E.D. Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete end-to-end solution for second stage debris mitigation — from launch pad to ocean recovery.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-background border border-border card-glow fade-in group hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg ${spec.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <spec.icon className={`h-6 w-6 ${spec.color}`} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{spec.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{spec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specifications;
