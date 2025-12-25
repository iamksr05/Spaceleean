import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Rocket } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-4">
          <Rocket className="h-16 w-16 text-primary animate-float" />
        </div>
        <h1 className="font-display text-6xl font-bold text-gradient">404</h1>
        <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        <Button asChild variant="hero">
          <Link to="/">
            <Home className="h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
