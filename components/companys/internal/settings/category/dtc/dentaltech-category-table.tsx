"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useDentaltTechCategories } from "@/hooks/internal/company/category/use-dtc";
import { formatDate } from "@/lib/utils";
import { CategoryWithCreator } from "@/types/category";
import { useCompany } from "@/context/context";

export const DentalTechCategoriesTable = () => {
  const { companyId } = useCompany();
  const { categories, error, isLoading } = useDentaltTechCategories(companyId);

  const columns = [
    {
      key: "name",
      header: "ชื่อรายการ",
      render: (item: CategoryWithCreator) => item.name,
    },
    {
      key: "description",
      header: "รายละเอียด",
      render: (item: CategoryWithCreator) => item.description || "-",
    },
    {
      key: "createdAt",
      header: "บันทึกเมื่อ",
      render: (item: CategoryWithCreator) => <>{formatDate(item.createdAt)}</>,
    },
    {
      key: "creator",
      header: "ผู้บันทึก",
      render: (item: CategoryWithCreator) => item.creator.name,
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
