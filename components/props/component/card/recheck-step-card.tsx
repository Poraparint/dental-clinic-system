import { formatCurrency, formatDate } from "@/lib/utils";
import { Banknote, CheckCircle, Clock, LayoutGrid } from "lucide-react";
import { ProfileCard } from "@/components/props/component/card/profile-card";

interface RecheckStepCardProps {
  category?: string;
  datetime?: Date | null;
  detail?: string;
  price?: number;
}

export const RecheckStepCard = ({
  category,
  datetime = null,
  detail = "",
  price,
}: RecheckStepCardProps) => {
  if (!datetime) {
    return (
      <div className="mt-3 rounded-lg text-sm p-3 border flex items-center justify-between bg-lapis-bg">
        <div className="flex items-center gap-2">
          <CheckCircle size={16} className="text-lapis-text" />
          <span className="text-lapis-text">เสร็จสิ้นแล้ว</span>
        </div>
        <div className="text-muted-foreground text-sm">{detail}</div>
      </div>
    );
  }

  return (
    <div>
      <ProfileCard
        icon={<LayoutGrid />}
        description={category}
        className="border-none"
      />
      <ProfileCard
        icon={<Clock />}
        description={formatDate(datetime)}
        className="border-none"
      />
      <ProfileCard
        icon={<Banknote />}
        description={formatCurrency(price)}
        className="border-none"
      />
    </div>
  );
};
