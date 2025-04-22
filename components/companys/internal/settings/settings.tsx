import { DialogCreateTransactionCategory } from "@/components/dialog/internal/dialog-create-tc";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";


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
          <DialogCreateTransactionCategory />
        </Tabs>
      </div>
    );
}