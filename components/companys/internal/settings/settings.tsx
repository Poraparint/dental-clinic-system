"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddOnCategoryBoard } from "@/components/companys/internal/settings/category/add-on/addon-category-board";
import { TransactionCategoryBoard } from "@/components/companys/internal/settings/category/tc/transaction-category-board";
import { DentalTechCategoryBoard } from "@/components/companys/internal/settings/category/dtc/dentaltech-category-board";
import { ExpensesCategoryBoard } from "@/components/companys/internal/settings/category/ec/expenses-category-board";
import { AppointmentCategoryBoard } from "@/components/companys/internal/settings/category/apc/schedule-category-board";
import { Card } from "@/components/ui/card";
import { CompanyRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";

export const Settings = () => {
  const role = useCurrentRole();

  return (
    <Card className="px-5">
      <h1 className="text-3xl font-bold mb-6">ระบบจัดการหมวดหมู่</h1>
      <Tabs defaultValue="dental-procedures">
        <TabsList className="w-fit mb-6">
          <TabsTrigger value="dental-procedures">รายการทำฟัน</TabsTrigger>
          <TabsTrigger value="addon-items">สินค้าเสริม</TabsTrigger>
          <TabsTrigger value="expense-types">ชนิดรายจ่าย</TabsTrigger>
          <TabsTrigger value="scheduling">ตารางเวลานัด</TabsTrigger>
          <TabsTrigger value="dental-items">รายการทันตกรรม</TabsTrigger>
        </TabsList>
        {role !== CompanyRole.DENTALTECHNICIAN && (
          <>
            <TransactionCategoryBoard />
            <AddOnCategoryBoard/>
            <AppointmentCategoryBoard />
            <ExpensesCategoryBoard />
          </>
        )}
        <DentalTechCategoryBoard />
      </Tabs>
    </Card>
  );
};
