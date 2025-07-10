import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function RefreshButton() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const refreshMutation = useMutation({
    mutationFn: async () => {
      return apiRequest({
        endpoint: '/api/vcs/refresh',
        method: 'POST'
      });
    },
    onSuccess: (data: { success: boolean; count: number }) => {
      if (data.success) {
        toast({
          title: "VC data refreshed",
          description: `Successfully loaded ${data.count} VCs from vcsheet.com`,
        });
        
        // Invalidate all VC-related queries to refetch data
        queryClient.invalidateQueries({ queryKey: ['/api/vcs'] });
      } else {
        toast({
          title: "Refresh failed",
          description: "Unable to refresh VC data. Please try again later.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Refresh failed",
        description: "Unable to refresh VC data. Please try again later.",
        variant: "destructive",
      });
    }
  });

  return (
    <Button
      onClick={() => refreshMutation.mutate()}
      disabled={refreshMutation.isPending}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <RefreshCw className={`h-4 w-4 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
      {refreshMutation.isPending ? 'Refreshing...' : 'Refresh VCs'}
    </Button>
  );
}