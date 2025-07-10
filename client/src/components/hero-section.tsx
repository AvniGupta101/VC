import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?industry=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative gradient-bg text-primary-foreground">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="hero-bg absolute inset-0"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find the Right VCs for Your Industry
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Connect with venture capitalists who specialize in your sector. Get verified contact information and industry expertise in one place.
          </p>
          
          <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-2xl p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your industry (e.g., fintech, automotive, fashion)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-4 text-card-foreground border-input text-lg pr-12"
                />
                <Search className="absolute right-4 top-4 h-5 w-5 text-muted-foreground" />
              </div>
              <Button 
                type="submit" 
                className="w-full py-4 text-lg font-semibold"
                size="lg"
              >
                Find Specialized VCs
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
