export default function StatsSection() {
  const stats = [
    { number: "3,400+", label: "Verified VCs" },
    { number: "50+", label: "Industries" },
    { number: "$2.5B+", label: "Funding Facilitated" },
    { number: "95%", label: "Email Accuracy" }
  ];

  const images = [
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
  ];

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-6">
              Trusted by Startups Worldwide
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our platform has helped thousands of startups connect with the right investors, leading to successful funding rounds and long-term partnerships.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Business meeting ${index + 1}`}
                className={`rounded-xl shadow-lg ${index % 2 === 1 ? 'mt-8' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
