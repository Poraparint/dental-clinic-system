// components/ui/stat-card.tsx
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
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
      return <Minus className="w-4 h-4 text-gray-500" />;
    }

    if (isPositive) {
      return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    } else {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
  };

  const getTrendColor = () => {
    if (!showTrend || percentChange === 0) {
      return "text-gray-500";
    }

    return isPositive ? "text-emerald-600" : "text-red-600";
  };

  return (
    <Card className="py-3 px-5 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0 space-y-2">
        <div className="flex items-center justify-between">
          <CardDescription>{title}</CardDescription>
          <CircleBox icon={icon} className={className} />
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
