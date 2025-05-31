import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/shared/tooltip";

interface RouterButtonProps {
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
}

export const RouterButton = ({
  label,
  icon,
  onClick,
  tooltip,
}: RouterButtonProps) => {
  return (
    <TooltipWrapper content={tooltip}>
      {label ||
        (icon && (
          <Button onClick={onClick} className="group px-0" variant={"ghost"}>
            {icon}
            {label}
          </Button>
        ))}
    </TooltipWrapper>
  );
};
