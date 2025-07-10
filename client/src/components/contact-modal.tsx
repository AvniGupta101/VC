import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Mail, Globe, Twitter, AlertCircle, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { VC } from "@shared/schema";

interface ContactModalProps {
  vc: VC;
  isOpen: boolean;
  onClose: () => void;
}

interface ContactInfo {
  name: string;
  email: string;
  firm: string;
  website?: string;
  twitter?: string;
  verified: boolean;
  note: string;
}

export default function ContactModal({ vc, isOpen, onClose }: ContactModalProps) {
  const { toast } = useToast();
  
  const { data: contactInfo, isLoading, error } = useQuery<ContactInfo>({
    queryKey: ['/api/vcs', vc.id, 'contact'],
    queryFn: async () => {
      const response = await fetch(`/api/vcs/${vc.id}/contact`);
      if (!response.ok) throw new Error('Failed to fetch contact info');
      return response.json();
    },
    enabled: isOpen,
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <img
              src={vc.imageUrl || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400`}
              alt={vc.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span>{vc.name}</span>
                {vc.isVerified && <CheckCircle className="h-4 w-4 text-primary" />}
              </div>
              <p className="text-sm text-muted-foreground font-normal">
                {vc.title} @ {vc.firm}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}
          
          {error && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load contact information. Please try again.
              </AlertDescription>
            </Alert>
          )}
          
          {contactInfo && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant={contactInfo.verified ? "default" : "secondary"}>
                  {contactInfo.verified ? "Verified Contact" : "Unverified"}
                </Badge>
              </div>
              
              {/* Email */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contactInfo.email}</p>
                    <p className="text-xs text-muted-foreground">Email Address</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(contactInfo.email, "Email address")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Website */}
              {contactInfo.website && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{contactInfo.website}</p>
                      <p className="text-xs text-muted-foreground">Website</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <a href={contactInfo.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
              
              {/* Twitter */}
              {contactInfo.twitter && (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <Twitter className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{contactInfo.twitter}</p>
                      <p className="text-xs text-muted-foreground">Twitter</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
              
              {/* Note */}
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm text-primary font-medium mb-1">Note</p>
                <p className="text-sm text-muted-foreground">{contactInfo.note}</p>
              </div>
              
              {/* Investment Focus */}
              <div>
                <p className="text-sm font-medium mb-2">Investment Focus</p>
                <div className="flex flex-wrap gap-2">
                  {vc.investmentStages.map((stage) => (
                    <Badge key={stage} variant="outline" className="text-xs">
                      {stage}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Sectors */}
              <div>
                <p className="text-sm font-medium mb-2">Sectors</p>
                <div className="flex flex-wrap gap-2">
                  {vc.sectors.map((sector) => (
                    <Badge key={sector} variant="secondary" className="text-xs">
                      {sector}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
            {contactInfo && (
              <Button
                asChild
                className="flex-1"
              >
                <a href={`mailto:${contactInfo.email}`}>
                  Send Email
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
