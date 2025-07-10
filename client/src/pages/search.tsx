import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchFilters from "@/components/search-filters";
import VCCard from "@/components/vc-card";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { VC } from "@shared/schema";

interface SearchFilters {
  industry?: string;
  stages?: string[];
  checkSizes?: string[];
  geographicFocus?: string[];
}

export default function Search() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] || '');
  const initialIndustry = searchParams.get('industry') || '';
  
  const [filters, setFilters] = useState<SearchFilters>({
    industry: initialIndustry,
    stages: [],
    checkSizes: [],
    geographicFocus: []
  });

  const { data, isLoading, error } = useQuery<{ vcs: VC[]; total: number }>({
    queryKey: ['/api/vcs/search', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.industry) params.append('industry', filters.industry);
      if (filters.stages) filters.stages.forEach(stage => params.append('stages', stage));
      if (filters.checkSizes) filters.checkSizes.forEach(size => params.append('checkSizes', size));
      if (filters.geographicFocus) filters.geographicFocus.forEach(region => params.append('geographicFocus', region));
      
      const response = await fetch(`/api/vcs/search?${params}`);
      if (!response.ok) throw new Error('Failed to fetch VCs');
      return response.json();
    },
  });

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <SearchFilters 
              filters={filters} 
              onFiltersChange={handleFilterChange}
            />
          </div>
          
          {/* Results */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {filters.industry 
                  ? `Venture Capitalists in ${filters.industry}`
                  : 'All Venture Capitalists'
                }
              </h1>
              <p className="text-muted-foreground">
                {isLoading ? (
                  'Loading...'
                ) : error ? (
                  'Error loading results'
                ) : (
                  `Showing ${data?.total || 0} specialized investors`
                )}
              </p>
            </div>
            
            {error && (
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to load VCs. Please try again later.
                </AlertDescription>
              </Alert>
            )}
            
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="p-6">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row gap-6">
                        <Skeleton className="md:w-1/3 h-48 rounded-xl" />
                        <div className="md:w-2/3 space-y-4">
                          <Skeleton className="h-6 w-1/2" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-16 w-full" />
                          <div className="flex gap-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {data?.vcs.map((vc) => (
                  <VCCard key={vc.id} vc={vc} />
                ))}
                
                {data?.vcs.length === 0 && (
                  <Card className="p-12 text-center">
                    <CardContent className="p-0">
                      <div className="text-muted-foreground">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No VCs found</h3>
                        <p>Try adjusting your filters or search criteria.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
