import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">VCFinder</h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className={`px-3 py-2 text-sm font-medium transition-colors ${
                location === '/' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}>
                Home
              </a>
            </Link>
            <Link href="/search">
              <a className={`px-3 py-2 text-sm font-medium transition-colors ${
                location === '/search' 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-primary'
              }`}>
                Browse VCs
              </a>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="default" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
