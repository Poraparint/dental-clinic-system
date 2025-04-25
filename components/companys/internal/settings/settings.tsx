import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionCategoryBoard } from "@/components/companys/internal/settings/category/tc/tc-board";
import { DentalTechCategoryBoard } from "@/components/companys/internal/settings/category/dtc/tc-board";

export const Settings = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ระบบจัดการหมวดหมู่</h1>
      <Tabs defaultValue="dental-procedures">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="dental-procedures">รายการทำฟัน</TabsTrigger>
          <TabsTrigger value="expense-types">ชนิดรายจ่าย</TabsTrigger>
          <TabsTrigger value="scheduling">ตารางเวลานัด</TabsTrigger>
          <TabsTrigger value="dental-items">รายการทันตกรรม</TabsTrigger>
        </TabsList>
        <TransactionCategoryBoard />
        <DentalTechCategoryBoard />
      </Tabs>
    </div>
  );
};
