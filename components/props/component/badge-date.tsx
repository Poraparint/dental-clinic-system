import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/utils";

interface BadgeDateProps {
  icon?: React.ReactNode;
  count: number;
  label?: string;
  variant?:
    | "emerald"
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "amber"
    | "azurite"
    | "amethyst";
  className?: string;
}

export const BadgeDate = ({
  icon,
  count,
  label = "รายการ",
  variant = "emerald",
  className,
}: BadgeDateProps) => {
  return (
    <Badge
      variant={variant}
      className={cn(
        "absolute rounded-sm text-[8px] md:text-[10px] flex items-center justify-start bottom-1",
        className
      )}
    >
      {icon}
      <div className="flex gap-1">
        {count}
        <span className="max-xl:sr-only">{label}</span>
      </div>
    </Badge>
  );
};
