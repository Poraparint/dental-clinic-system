import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipWrapper } from "@/components/shared/tooltip";
import { CircleBox } from "@/components/shared/common/circle-box";

interface ProfileCardProps {
  icon?: React.ReactNode;
  avatar?: string;
  title?: string;
  description?: string;
  className?: string;
  badge?: React.ReactNode;
  badgeTooltip?: string;
  tooltip?: string;
  alternate?: boolean;
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
  alternate = true,
}: ProfileCardProps) => {
  const card = (
    <CardHeader className={`border-b relative ${className}`}>
      <div className="flex space-x-3 items-center">
        <CircleBox avatar={avatar} icon={ icon } />
        <div className="space-y-2">
          {alternate ? (
            <>
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </>
          ) : (
            <>
              {description && <CardDescription>{description}</CardDescription>}
              {title && <CardTitle>{title}</CardTitle>}
            </>
          )}
        </div>
      </div>
      {badge && (
        <TooltipWrapper content={badgeTooltip}>
          {badge}
        </TooltipWrapper>
      )}
    </CardHeader>
  );
  return (
    <>
      {tooltip ? (
        <TooltipWrapper content={tooltip}>
          {card}
        </TooltipWrapper>
      ) : (
        card
      )}
    </>
  );
};
