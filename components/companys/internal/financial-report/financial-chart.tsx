"use client";
import { TitleCard } from "@/components/shared/card/title-card";
import { CategoryBarChart } from "@/components/shared/chart/bar-chart";
import { useCompany } from "@/context/context";
import { CategoryChartItem } from "@/lib/utils/stat/stat";

interface Props {
  data: CategoryChartItem[];
}

export const FinancialChart = ({
data
}: Props) => {

  const { companyId } = useCompany();

  return <TitleCard title="รายจ่ายทั้งหมด" companyId={companyId} path="expenses">
    <CategoryBarChart data={ data } />
  </TitleCard>;
};
