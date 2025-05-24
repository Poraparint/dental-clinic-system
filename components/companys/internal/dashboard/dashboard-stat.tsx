import { AlertCircle, Calendar, Clock, Users } from "lucide-react";
import { StatCard } from "@/components/shared/dashboard/stat-card";
import { useDashboardStats } from "@/hooks/internal/memorize/use-stat";
import { DashboardStatProps } from "@/interface/stat";

export const DashboardStat = ({
  patients,
  dentalTechs,
  period,
  schedules,
  rechecks,
  recheckLists,
}: DashboardStatProps) => {
  const { todayAppointments, ...stats } = useDashboardStats({
    patients,
    period,
    dentalTechs,
    schedules,
    rechecks,
    recheckLists,
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <StatCard
        title="นัดหมายวันนี้"
        icon={<Calendar />}
        currentValue={todayAppointments.length}
        showTrend={false}
        valueType="number"
        suffix="รายการ"
        className="rounded-md bg-emerald-bg border-emerald-border text-emerald-text"
      />
      <StatCard
        title="คนไข้ใหม่"
        icon={<Users />}
        currentValue={stats.patientCount.currentValue}
        percentChange={stats.patientCount.percentChange}
        isPositive={stats.patientCount.isPositive}
        compareLabel={stats.patientCount.compareLabel}
        showTrend={false}
        valueType="number"
        suffix="คน"
        className="rounded-md bg-azurite-bg border-azurite-border text-azurite-text"
      />

      <StatCard
        title="งานทันตกรรมกำหนดส่ง"
        icon={<AlertCircle />}
        currentValue={stats.overdueDentaltech.currentValue}
        percentChange={stats.overdueDentaltech.percentChange}
        isPositive={!stats.overdueDentaltech.isPositive}
        compareLabel={stats.overdueDentaltech.compareLabel}
        showTrend={false}
        valueType="number"
        suffix="งาน"
        className="rounded-md bg-destructive text-destructive-foreground border-destructive-foreground"
      />

      <StatCard
        title="นัดติดตาม"
        icon={<Clock />}
        currentValue={stats.recheckListCount.currentValue}
        percentChange={stats.recheckListCount.percentChange}
        isPositive={stats.recheckListCount.isPositive}
        compareLabel={stats.recheckListCount.compareLabel}
        valueType="number"
        showTrend={false}
        suffix="รายการ"
        className="rounded-md bg-amethyst-bg border-amethyst-border text-amethyst-text"
      />
    </div>
  );
};
