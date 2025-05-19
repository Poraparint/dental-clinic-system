import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleHelp } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface ProfileCardProps {
  icon?: React.ReactNode;
  avatar?: string;
  title?: string;
  description?: string;
  className?: string;
  badge?: React.ReactNode;
  badgeTooltip?: string;
  tooltip?: string;
}
export const ProfileCard = ({
  icon,
  avatar,
  title,
  description,
  badge,
  badgeTooltip,
  className,
  tooltip,
}: ProfileCardProps) => {
  const card = (
    <CardHeader className={`border-b relative ${className}`}>
      <div className="flex space-x-3 items-center">
        <div className="p-2 rounded-full border border-primary-foreground shadow-sm">
          {avatar ? (
            <span>{avatar}</span>
          ) : (
            <span className="[&>svg]:size-4">{icon || <CircleHelp />}</span>
          )}
        </div>
        <div className="space-y-2">
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </div>
      {badge && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              
                {badge}
          
            </TooltipTrigger>
            <TooltipContent>
              <p>{badgeTooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </CardHeader>
  );
  return (
    <>
      {tooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{card}</TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        card
      )}
    </>
  );
};
