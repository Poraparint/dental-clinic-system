"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useDentaltTechCategories } from "@/hooks/internal/category/use-dtc";
import { formatDate } from "@/lib/utils/utils";
import { useParams } from "next/navigation";
import { CategoryWithCreator } from "@/types/category";

export const DentalTechCategoriesTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
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
