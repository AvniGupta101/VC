import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, ExternalLink } from "lucide-react";
import ContactModal from "./contact-modal";
import type { VC } from "@shared/schema";

interface VCCardProps {
  vc: VC;
}

export default function VCCard({ vc }: VCCardProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={vc.imageUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400`}
                alt={vc.name}
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            
            <div className="md:w-2/3">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-card-foreground">{vc.name}</h3>
                {vc.isVerified && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
              
              <p className="text-muted-foreground mb-3">
                {vc.title} @ <span className="font-medium">{vc.firm}</span>
              </p>
              
              <p className="text-sm text-card-foreground mb-4 line-clamp-3">
                {vc.bio}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {vc.investmentStages.map((stage) => (
                  <Badge key={stage} variant="default" className="text-xs">
                    {stage}
                  </Badge>
                ))}
                {vc.sectors.slice(0, 2).map((sector) => (
                  <Badge key={sector} variant="secondary" className="text-xs">
                    {sector}
                  </Badge>
                ))}
                {vc.sectors.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{vc.sectors.length - 2} more
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsContactModalOpen(true)}
                  className="flex-1"
                  size="sm"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Get Contact Info
                </Button>
                
                {vc.website && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={vc.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ContactModal
        vc={vc}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
