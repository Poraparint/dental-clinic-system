"use client";
import { TitleCard } from "@/components/shared/card/title-card";
import { useCompany } from "@/context/context";
import { SquareArrowOutUpRight } from "lucide-react";

interface FinancialChartProps {
  title: string;
  path?: string;
  tooltip?: string;
  chart: React.ReactNode;
}

export const FinancialChart = ({
  title,
  path,
  tooltip,
  chart
}: FinancialChartProps) => {
  const { companyId } = useCompany();

  return (
    <TitleCard
      title={title}
      companyId={companyId}
      path={path}
      icon={
        <SquareArrowOutUpRight />
      }
      tooltip={tooltip}
    >
      {chart}
    </TitleCard>
  );
};
