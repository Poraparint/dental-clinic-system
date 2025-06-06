import { Minus} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CircleBox } from "@/components/shared/common/circle-box";
import { formatCurrency } from "@/lib/utils";

export type Period = "month" | "week" | "year";

type StatCardProps = {
  title: string;
  icon: React.ReactNode;
  currentValue?: number | string;
  percentChange?: number;
  isPositive?: boolean;
  compareLabel?: string;
  className?: string;
  valueType?: "currency" | "number" | "text";
  showTrend?: boolean;
  customValue?: string;
  suffix?: string;
};

export const StatCard = ({
  title,
  icon,
  currentValue = 0,
  compareLabel = "เดือนที่แล้ว",
  isPositive,
  percentChange = 0,
  className,
  valueType = "number",
  showTrend = true,
  customValue,
  suffix = "",
}: StatCardProps) => {
  // Format value based on type
  const formatValue = (value: number | string) => {
    if (customValue) return customValue;

    if (typeof value === "string") return value;

    switch (valueType) {
      case "currency":
        return formatCurrency(value);
      case "number":
        return value;
      default:
        return value.toString();
    }
  };

  // Determine trend icon and color
  const getTrendIcon = () => {
    if (!showTrend || percentChange === 0) {
      return <Minus className="size-4 text-muted-foreground" />;
    }

    if (isPositive) {
      return <span>+ </span>;
    } else {
      return <span>- </span>;
    }
  };

  const getTrendColor = () => {
    if (!showTrend || percentChange === 0) {
      return "text-muted-foreground";
    }

    return isPositive;
  };

  return (
    <Card className="bg-transparent shadow-none p-0 border-none">
      <CardContent className="p-0 space-y-2 flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <CardDescription>{title}</CardDescription>
          <CircleBox icon={icon} className={`${className}`} />
        </div>

        <CardTitle className="text-xl">
          {formatValue(currentValue)}
          {suffix && (
            <span className="text-muted-foreground text-lg font-normal ml-2">
              {suffix}
            </span>
          )}
        </CardTitle>

        {showTrend && (
          <div className="flex items-center text-sm space-x-1">
            {getTrendIcon()}
            <span className={cn("font-medium", getTrendColor())}>
              {Math.abs(percentChange)}%
            </span>
            <span className="text-muted-foreground">จาก{compareLabel}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
