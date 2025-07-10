import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation('/search');
  };

  return (
    <section className="py-20 gradient-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
          Ready to Connect with the Right VCs?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8">
          Join thousands of startups who have successfully raised funding through our platform.
        </p>
        <Button 
          onClick={handleGetStarted}
          variant="secondary"
          size="lg"
          className="px-8 py-4 text-lg font-semibold"
        >
          Start Your Search Today
        </Button>
      </div>
    </section>
  );
}
