import { Card } from "@/components/ui/card";
import { RecheckCard } from "@/components/companys/internal/recheck/recheck-card";

export const RecheckBoard = () => {
  return (
    <Card className="px-5 sapce-y-4">
      <h1 className="text-2xl font-bold">คนไข้รีเช็ค / แบ่งชำระ</h1>

      <hr />
      <RecheckCard />
    </Card>
  );
};
