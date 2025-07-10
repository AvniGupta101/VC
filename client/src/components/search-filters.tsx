import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { INVESTMENT_STAGES, CHECK_SIZES, GEOGRAPHIC_REGIONS } from "@shared/schema";

interface SearchFiltersProps {
  filters: {
    industry?: string;
    stages?: string[];
    checkSizes?: string[];
    geographicFocus?: string[];
  };
  onFiltersChange: (filters: {
    industry?: string;
    stages?: string[];
    checkSizes?: string[];
    geographicFocus?: string[];
  }) => void;
}

export default function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const handleStageChange = (stage: string, checked: boolean) => {
    const newStages = checked
      ? [...(filters.stages || []), stage]
      : (filters.stages || []).filter(s => s !== stage);
    
    onFiltersChange({
      ...filters,
      stages: newStages
    });
  };

  const handleCheckSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked
      ? [...(filters.checkSizes || []), size]
      : (filters.checkSizes || []).filter(s => s !== size);
    
    onFiltersChange({
      ...filters,
      checkSizes: newSizes
    });
  };

  const handleGeographicFocusChange = (region: string) => {
    onFiltersChange({
      ...filters,
      geographicFocus: region === "all" ? [] : [region]
    });
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filter Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Investment Stage Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Investment Stage</Label>
          <div className="space-y-3">
            {INVESTMENT_STAGES.map((stage) => (
              <div key={stage} className="flex items-center space-x-2">
                <Checkbox
                  id={`stage-${stage}`}
                  checked={filters.stages?.includes(stage) || false}
                  onCheckedChange={(checked) => handleStageChange(stage, checked as boolean)}
                />
                <Label htmlFor={`stage-${stage}`} className="text-sm cursor-pointer">
                  {stage}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Check Size Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Check Size</Label>
          <div className="space-y-3">
            {CHECK_SIZES.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={filters.checkSizes?.includes(size) || false}
                  onCheckedChange={(checked) => handleCheckSizeChange(size, checked as boolean)}
                />
                <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                  {size}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Focus Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Geographic Focus</Label>
          <Select
            value={filters.geographicFocus?.[0] || "all"}
            onValueChange={handleGeographicFocusChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {GEOGRAPHIC_REGIONS.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
