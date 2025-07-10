import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">VCFinder</h3>
            <p className="text-secondary-foreground/80 mb-4">
              Connect with industry-specialized venture capitalists and accelerate your startup's growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><Link href="/search"><span className="hover:text-secondary-foreground transition-colors cursor-pointer">Browse VCs</span></Link></li>
              <li><Link href="/search"><span className="hover:text-secondary-foreground transition-colors cursor-pointer">Search by Industry</span></Link></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Contact Database</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">API Access</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Fundraising Guide</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Pitch Deck Templates</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Industry Reports</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-secondary-foreground/80">
          <p>&copy; {currentYear} VCFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
