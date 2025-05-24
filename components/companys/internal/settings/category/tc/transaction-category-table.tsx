"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useTransactionCategories } from "@/hooks/internal/company/category/use-tc";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Category } from "@/types/category";

export const TransactionCategoriesTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { categories, error, isLoading } = useTransactionCategories(companyId);

  const columns = [
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
      key: "price",
      header: "ราคาเริ่มต้น",
      render: (item: Category) => item.price,
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
