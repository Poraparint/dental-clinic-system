"use client"

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const RefreshButton = ({
  onClick,
  isLoading,
  isRefreshing,
}: {
  onClick?: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
    }) => {
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className="group"
            disabled={isLoading || isRefreshing}
          >
            <RefreshCw
              className={`size-4 transition-transform duration-300 text-muted-foreground
      ${isRefreshing ? "animate-spin" : "group-hover:rotate-90 group-hover:text-primary"}`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>รีเฟรช</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
