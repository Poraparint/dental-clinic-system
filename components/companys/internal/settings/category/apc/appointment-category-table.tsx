"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/dynamic-table";
import { useAppointmentCategories } from "@/hooks/internal/use-appointment";
import { useParams } from "next/navigation";

interface AppointmentCategory {
  id: string;
  name: string;
  createdAt: Date;
}
export const AppointmentCategoriesTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { categories, isLoading } = useAppointmentCategories(companyId);

  const columns = [
    {
      key: "name",
      header: "ชื่อรายการ",
      render: (item: AppointmentCategory) => item.name,
    },
    {
      key: "createdAt",
      header: "บันทึกเมื่อ",
      render: (item: AppointmentCategory) =>
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
      error="เริ่มต้นด้วยการสร้างหมวดหมู่เวลานัด"
      description="เหมือนคุณยังไม่มีหมวดหมู่เวลานัด"
      url="/"
      urlname="เพิ่มหมวดหมู่"
    />
  );
};
