"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useScheduleCategories } from "@/hooks/internal/category/use-sc";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Category } from "@/types/category";

export const AppointmentCategoriesTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { categories, error, isLoading } = useScheduleCategories(companyId);

  const columns = [
    {
      key: "name",
      header: "ชื่อรายการ",
      render: (item: Category) => item.name,
    },
    {
      key: "createdAt",
      header: "บันทึกเมื่อ",
      render: (item: Category) => <>{formatDate(item.createdAt)}</>,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DynamicTable
      data={categories}
      columns={columns}
      error={error?.error}
      description={error?.description}
    />
  );
};
