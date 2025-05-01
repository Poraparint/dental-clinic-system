"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/dynamic-table";
import { useExpensesCategories } from "@/hooks/internal/use-ec";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";

interface ExpensesCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: Date;
}
export const ExpensesCategoriesTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { categories, isLoading, error } = useExpensesCategories(companyId);

  const columns = [
    {
      key: "color",
      header: "",
      render: (item: ExpensesCategory) => (
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
      render: (item: ExpensesCategory) => item.name,
    },
    {
      key: "description",
      header: "รายละเอียด",
      render: (item: ExpensesCategory) => item.description || "-",
    },
    {
      key: "createdAt",
      header: "บันทึกเมื่อ",
      render: (item: ExpensesCategory) => <>{formatDate(item.createdAt)}</>,
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
