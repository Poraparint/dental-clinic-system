"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/dynamic-table";
import { useExpensesCategories } from "@/hooks/internal/use-expenses";
import { useParams } from "next/navigation";

interface DentalTechnicianCategory {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
}
export const ExpensesCategoriesTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { categories, isLoading } = useExpensesCategories(companyId);

  const columns = [
    {
      key: "name",
      header: "ชื่อรายการ",
      render: (item: DentalTechnicianCategory) => item.name,
    },
    {
      key: "description",
      header: "รายละเอียด",
      render: (item: DentalTechnicianCategory) => item.description || "-",
    },
    {
      key: "createdAt",
      header: "บันทึกเมื่อ",
      render: (item: DentalTechnicianCategory) =>
        new Date(item.createdAt).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DynamicTable
      data={categories}
      columns={columns}
      error="เริ่มต้นด้วยการสร้างหมวดหมู่ชนิดรายจ่าย"
      description="เหมือนคุณยังไม่มีหมวดหมู่รายการจ่าย"
      url="/"
      urlname="เพิ่มหมวดหมู่"
    />
  );
};
