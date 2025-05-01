"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/dynamic-table";
import { useDentaltTechCategories } from "@/hooks/internal/use-dtc";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";

interface DentalTechnicianCategory {
  id: string;
  name: string;
  description?: string;
  creator: {
    name: string;
  }
  createdAt: Date;
}
export const DentalTechCategoriesTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { categories, isLoading } = useDentaltTechCategories(companyId);

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
      (<>{formatDate(item.createdAt)}</>),
    },
    {
      key: "creator",
      header: "ผู้บันทึก",
      render: (item: DentalTechnicianCategory) => item.creator.name,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DynamicTable
      data={categories}
      columns={columns}
      error="เริ่มต้นด้วยการสร้างหมวดหมู่รายการทันตกรรม"
      description="เหมือนคุณยังไม่มีหมวดหมู่รายการทันตกรรม"
    />
  );
};
