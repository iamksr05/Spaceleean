const stats = [
  { value: "200ms", label: "Deployment Speed" },
  { value: "100%", label: "Autonomous Operation" },
  { value: "Safe", label: "Controlled Recovery" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="font-display text-xl font-semibold text-muted-foreground">
            Engineered for Reliability & Minimal Impact
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="font-display text-4xl md:text-5xl font-bold">
                <span className="text-gradient">{stat.value}</span>
              </div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
