"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/dynamic-table";
import { useTransactionCategories } from "@/hooks/internal/use-tc";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";

interface TransactionCategory {
  id: string;
  name: string;
  description?: string;
  price: number;
  createdAt: Date;
}
export const TransactionCategoriesTable = () => {
    const params = useParams();
    const companyId = params.companyId as string;
  const { categories, isLoading } = useTransactionCategories(companyId);

  const columns = [
    {
      key: "name",
      header: "ชื่อรายการ",
      render: (item: TransactionCategory) => item.name,
    },
    {
      key: "description",
      header: "รายละเอียด",
      render: (item: TransactionCategory) => item.description || "-",
    },
    {
      key: "price",
      header: "ราคาเริ่มต้น",
      render: (item: TransactionCategory) => item.price ,
    },
    {
      key: "createdAt",
      header: "บันทึกเมื่อ",
      render: (item: TransactionCategory) =>
        (<>{formatDate(item.createdAt)}</>),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DynamicTable
      data={categories}
      columns={columns}
      error="เริ่มต้นด้วยการสร้างหมวดหมู่รายการทำฟัน"
      description="เหมือนคุณยังไม่มีหมวดหมู่รายการทำฟัน"
    />
  );
};
