import { Button } from "./ui/button";
import ContactFormDialog from "./ContactFormDialog";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-lg tracking-tight">SPACELEEAN</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#technology" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Technology</a>
          <a href="#mission" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Mission</a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </div>

        <ContactFormDialog
          trigger={<Button variant="hero" size="sm">Request Demo</Button>}
        />
      </div>
    </nav>
  );
};

export default Navbar;
