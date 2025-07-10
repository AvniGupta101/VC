import { Search, Mail, TrendingUp } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: "Industry-Specific Search",
      description: "Find VCs who specialize in your exact industry and understand your market dynamics."
    },
    {
      icon: Mail,
      title: "Verified Contact Information",
      description: "Access validated email addresses and direct contact information for efficient outreach."
    },
    {
      icon: TrendingUp,
      title: "Investment Insights",
      description: "Get detailed information about investment stages, check sizes, and portfolio companies."
    }
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4">
            Why Choose VCFinder?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform connects startups with the most relevant venture capitalists based on industry specialization and investment focus.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-8 bg-muted rounded-2xl">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
