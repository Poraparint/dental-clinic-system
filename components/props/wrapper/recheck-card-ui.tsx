"use client";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Banknote, Calendar, LayoutGrid, Stethoscope } from "lucide-react";
import { ProfileCard } from "../component/card/profile-card";

interface RecheckCardUiProps {
  createdAt: Date;
  creator: string;
  transaction: string;
  price: number;
  footer?: React.ReactNode;
}

export const RecheckCardUi = ({
  createdAt,
  creator,
  transaction,
  price,
  footer,
}: RecheckCardUiProps) => {
  return (
    <Card className="px-5">
      <div className="grid grid-cols-2 md:grid-cols-4">
        <ProfileCard
          icon={<LayoutGrid className="text-amber-600" />}
          title={transaction}
          description="หมวดหมู่งาน"
          alternate={false}
          className="border-none"
        />
        <ProfileCard
          icon={<Banknote className="text-emerald-600" />}
          title={formatCurrency(price)}
          description="ราคารวม"
          alternate={false}
          className="border-none"
        />

        <ProfileCard
          icon={<Calendar />}
          title={formatDate(createdAt)}
          description="วันที่บันทึก"
          alternate={false}
          className="border-none"
        />
        <ProfileCard
          icon={<Stethoscope className="text-amethyst-600" />}
          title={creator}
          description="ทันตแพทย์"
          alternate={false}
          className="border-none"
        />
      </div>
      <div>{footer}</div>
    </Card>
  );
};
