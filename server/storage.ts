import { vcs, type VC, type InsertVC } from "@shared/schema";

export interface IStorage {
  getVC(id: number): Promise<VC | undefined>;
  searchVCs(query: {
    industry?: string;
    stages?: string[];
    checkSizes?: string[];
    geographicFocus?: string[];
    limit?: number;
    offset?: number;
  }): Promise<{ vcs: VC[]; total: number }>;
  getAllVCs(): Promise<VC[]>;
  createVC(vc: InsertVC): Promise<VC>;
}

export class MemStorage implements IStorage {
  private vcs: Map<number, VC>;
  private currentId: number;

  constructor() {
    this.vcs = new Map();
    this.currentId = 1;
    this.initializeMockData();
  }

  private initializeMockData() {
    // Based on actual VCSheet data structure
    const mockVCs: InsertVC[] = [
      {
        name: "Ann Miura-Ko",
        title: "Co-Founding Partner",
        firm: "Floodgate",
        bio: "A repeat member of the Forbes Midas List and the New York Times Top 20 Venture Capitalists Worldwide. Ann was also named the 'Most Powerful Woman in Startups' by Forbes. Known for pioneering investments in highly technical companies with expertise in fintech, consumer commerce, and enterprise software.",
        email: "ann@floodgate.com",
        website: "https://www.floodgate.com",
        twitter: "https://twitter.com/annimaniac",
        imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed", "Series A", "Series B"],
        sectors: ["Fintech", "Consumer", "Enterprise Software", "AI/ML"],
        checkSizeMin: "$100K",
        checkSizeMax: "$5M",
        geographicFocus: ["North America", "Global"],
        portfolioCompanies: ["Lyft", "Xamarin", "Popshop", "Emotive", "Refinery29"]
      },
      {
        name: "Michael Gilroy",
        title: "Co-COO of Growth, Co-Head of Fintech, General Partner",
        firm: "Coatue",
        bio: "Led rounds for Arbo, Bitso, Bond, Clara, Cloudwalk, Luna, Meld, Melio, Mercury, Pinwheel, Pleo, Quanto, Silverflow, Step. Specialized in fintech investments across multiple stages with deep expertise in financial services technology.",
        email: "michael@coatue.com",
        website: "https://www.coatue.com",
        twitter: "https://twitter.com/MBGilroy",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Seed", "Series A", "Series B", "Series C+"],
        sectors: ["Fintech", "Enterprise Software", "Consumer"],
        checkSizeMin: "$500K",
        checkSizeMax: "$10M+",
        geographicFocus: ["North America", "Global"],
        portfolioCompanies: ["Mercury", "Melio", "Bond", "Clara", "Bitso"]
      },
      {
        name: "Sarah Guo",
        title: "General Partner",
        firm: "Conviction",
        bio: "VC partnering with entrepreneurs from idea to IPO. Former Greylock partner who led investments in fintech and enterprise companies. Prior Goldman Sachs experience advising pre-IPO technology companies including Workday, Netflix, and Nvidia.",
        email: "sarah@conviction.vc",
        website: "https://www.conviction.vc",
        twitter: "https://twitter.com/saranormous",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed", "Series A", "Series B"],
        sectors: ["Fintech", "Enterprise Software", "AI/ML", "Developer Tools"],
        checkSizeMin: "$250K",
        checkSizeMax: "$5M",
        geographicFocus: ["North America", "Global"],
        portfolioCompanies: ["0x", "Baseten", "Cleo", "Common Room", "Demisto"]
      },
      {
        name: "Bill Trenchard",
        title: "Partner",
        firm: "First Round Capital",
        bio: "Led investments in companies including Looker, Flexport, Verkada, Superhuman, Airbase, Nova Credit, Legion, and Labelbox. Focus on enterprise software, fintech solutions, and B2B marketplaces with deep operational expertise.",
        email: "bill@firstround.com",
        website: "https://www.firstround.com",
        twitter: "https://twitter.com/btrenchard",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed", "Series A"],
        sectors: ["Enterprise Software", "Fintech", "B2B", "AI/ML"],
        checkSizeMin: "$100K",
        checkSizeMax: "$3M",
        geographicFocus: ["North America"],
        portfolioCompanies: ["Looker", "Flexport", "Verkada", "Superhuman", "Airbase"]
      },
      {
        name: "Pete Flint",
        title: "General Partner",
        firm: "NFX",
        bio: "Co-founder and former CEO of Trulia, one of the internet's most successful marketplaces. Led the company from inception to $3.5B merger with Zillow. Expert in marketplace dynamics, network effects, and consumer technology.",
        email: "pete@nfx.com",
        website: "https://www.nfx.com",
        twitter: "https://twitter.com/peteflint",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed", "Series A", "Series B"],
        sectors: ["Marketplace", "Consumer", "PropTech", "Network Effects"],
        checkSizeMin: "$250K",
        checkSizeMax: "$5M",
        geographicFocus: ["North America", "Global"],
        portfolioCompanies: ["Trulia", "Lyft", "Patreon", "Doordash", "Zesty"]
      },
      {
        name: "Ryan Freedman",
        title: "General Partner",
        firm: "Alpaca VC",
        bio: "Entrepreneur turned investor focused on bringing efficiency and innovation to real estate. Previously founded Corigin ($600M AUM) and Coral Capital ($1.5B+ financing). Pioneer in PropTech and real estate technology adoption.",
        email: "ryan@alpaca.vc",
        website: "https://www.alpaca.vc",
        twitter: "https://twitter.com/ryanfreedman_",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed", "Series A"],
        sectors: ["PropTech", "Real Estate", "Fintech", "B2B"],
        checkSizeMin: "$100K",
        checkSizeMax: "$2M",
        geographicFocus: ["North America"],
        portfolioCompanies: ["Corigin", "Coral Capital", "Various PropTech Startups"]
      },
      {
        name: "Satya Patel",
        title: "Partner",
        firm: "Homebrew",
        bio: "Former VP Product at Twitter, building Product Management and User Services teams. Previously Partner at Battery Ventures co-leading seed and early stage investing. Joined Google in 2003 for AdSense product management.",
        email: "satya@homebrew.co",
        website: "https://homebrew.co",
        twitter: "https://twitter.com/satyap",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed", "Series A"],
        sectors: ["Consumer", "Enterprise Software", "AI/ML", "Developer Tools"],
        checkSizeMin: "$100K",
        checkSizeMax: "$2M",
        geographicFocus: ["North America"],
        portfolioCompanies: ["Twitter", "Google", "Various Early Stage Startups"]
      },
      {
        name: "Zach Bratun-Glennon",
        title: "Founder and Partner",
        firm: "Gradient Ventures",
        bio: "Prior to Gradient, led acquisitions and strategic investments at Google's Corporate Development team. Investment banking background advising software companies through M&As and IPOs. Serves on boards at Openly, Elsa, and Wise Systems.",
        email: "zach@gradient.com",
        website: "https://www.gradient.com",
        twitter: "https://twitter.com/zachbg",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed", "Series A", "Series B"],
        sectors: ["AI/ML", "Enterprise Software", "Infrastructure", "Developer Tools"],
        checkSizeMin: "$250K",
        checkSizeMax: "$5M",
        geographicFocus: ["North America", "Global"],
        portfolioCompanies: ["Openly", "Elsa", "Wise Systems", "Various AI Startups"]
      },
      {
        name: "Zal Bilimoria",
        title: "Founding Partner",
        firm: "Refactor Capital",
        bio: "Solo partner at Refactor Capital, seed-stage firm focused on climate, bio, and health investments. Previously helped launch the Bio Fund at a16z. Spent 10 years in product at Google, Netflix, and LinkedIn.",
        email: "zal@refactor.capital",
        website: "https://refactor.capital",
        twitter: "https://twitter.com/zalzally",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed"],
        sectors: ["Climate Tech", "Biotech", "Healthcare", "Sustainability"],
        checkSizeMin: "$50K",
        checkSizeMax: "$1M",
        geographicFocus: ["North America"],
        portfolioCompanies: ["Various Climate & Bio Startups"]
      },
      {
        name: "Aaref Hilaly",
        title: "Partner",
        firm: "Bain Capital Ventures",
        bio: "Prior to joining BCV, co-founded two companies and spent seven years as a partner at Sequoia. Deep expertise in enterprise software, developer tools, and B2B marketplaces with extensive operational experience.",
        email: "aaref@baincapitalventures.com",
        website: "https://www.baincapitalventures.com",
        twitter: "https://twitter.com/aaref",
        imageUrl: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed", "Series A", "Series B"],
        sectors: ["Enterprise Software", "Developer Tools", "B2B", "Infrastructure"],
        checkSizeMin: "$250K",
        checkSizeMax: "$10M",
        geographicFocus: ["North America", "Global"],
        portfolioCompanies: ["Sequoia Portfolio", "Various Enterprise Startups"]
      },
      {
        name: "Abe Yokell",
        title: "Co-Founder and Managing Partner",
        firm: "Congruent Ventures",
        bio: "Co-Founder and Managing Partner at Congruent Ventures, focused on mobility and climate technology investments. Deep expertise in transportation, energy, and sustainable technology solutions.",
        email: "abe@congruentvc.com",
        website: "https://www.congruentvc.com",
        twitter: "https://twitter.com/CleanVC",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed", "Series A", "Series B"],
        sectors: ["Climate Tech", "Automotive", "Transportation", "Energy"],
        checkSizeMin: "$100K",
        checkSizeMax: "$5M",
        geographicFocus: ["North America"],
        portfolioCompanies: ["Various Mobility & Climate Startups"]
      },
      {
        name: "Adriel Bercow",
        title: "Founding Partner",
        firm: "K50 Ventures",
        bio: "Invests in both US and LATAM with focus on Work & Learning. Led investments in Worc, Shift One, Pallet, and Nirvana Health. Previously at Flybridge Capital Partners supporting investments in Imperfect Foods, Wethos, and Narrator.",
        email: "adriel@k50.ventures",
        website: "https://k50.ventures",
        twitter: "https://twitter.com/adrielbercow",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        isVerified: true,
        investmentStages: ["Pre-Seed", "Seed", "Series A"],
        sectors: ["EdTech", "Future of Work", "Consumer", "B2B"],
        checkSizeMin: "$100K",
        checkSizeMax: "$3M",
        geographicFocus: ["North America", "Latin America"],
        portfolioCompanies: ["Worc", "Shift One", "Pallet", "Nirvana Health"]
      }
    ];

    mockVCs.forEach(vc => {
      this.createVC(vc);
    });
  }

  async getVC(id: number): Promise<VC | undefined> {
    return this.vcs.get(id);
  }

  async searchVCs(query: {
    industry?: string;
    stages?: string[];
    checkSizes?: string[];
    geographicFocus?: string[];
    limit?: number;
    offset?: number;
  }): Promise<{ vcs: VC[]; total: number }> {
    let filteredVCs = Array.from(this.vcs.values());

    if (query.industry) {
      filteredVCs = filteredVCs.filter(vc => 
        vc.sectors.some(sector => 
          sector.toLowerCase().includes(query.industry!.toLowerCase())
        )
      );
    }

    if (query.stages && query.stages.length > 0) {
      filteredVCs = filteredVCs.filter(vc =>
        query.stages!.some(stage => vc.investmentStages.includes(stage))
      );
    }

    if (query.geographicFocus && query.geographicFocus.length > 0) {
      filteredVCs = filteredVCs.filter(vc =>
        query.geographicFocus!.some(region => vc.geographicFocus.includes(region))
      );
    }

    const total = filteredVCs.length;
    const offset = query.offset || 0;
    const limit = query.limit || 20;
    
    const paginatedVCs = filteredVCs.slice(offset, offset + limit);

    return { vcs: paginatedVCs, total };
  }

  async getAllVCs(): Promise<VC[]> {
    return Array.from(this.vcs.values());
  }

  async createVC(insertVC: InsertVC): Promise<VC> {
    const id = this.currentId++;
    const vc: VC = { ...insertVC, id };
    this.vcs.set(id, vc);
    return vc;
  }
}

export const storage = new MemStorage();
