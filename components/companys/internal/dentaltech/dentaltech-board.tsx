import { DentalTechTable } from "@/components/companys/internal/dentaltech/dentaltech-table";
import { Card } from "@/components/ui/card";

export const DentalTechBoard = () => {
  return (
    <Card className="px-5 space-y-4">
      <h1 className="text-2xl font-bold">
        รายการงานทันตกรรม / จัดการงานทันตกรรม
      </h1>

      <hr />

      <DentalTechTable />
    </Card>
  );
};
