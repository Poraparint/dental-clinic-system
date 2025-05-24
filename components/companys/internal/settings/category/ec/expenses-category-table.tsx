"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useExpensesCategories } from "@/hooks/internal/company/category/use-ec";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Category } from "@/types/category";

export const ExpensesCategoriesTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { categories, error, isLoading } = useExpensesCategories(companyId);

  const columns = [
    {
      key: "color",
      header: "",
      render: (item: Category) => (
        <div
          className="h-5 w-5 rounded-full border"
          style={{ backgroundColor: item.color || "#cccccc" }}
        />
      ),
      width: 50,
    },
    {
      key: "name",
      header: "ชื่อรายการ",
      render: (item: Category) => item.name,
    },
    {
      key: "description",
      header: "รายละเอียด",
      render: (item: Category) => item.description || "-",
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
