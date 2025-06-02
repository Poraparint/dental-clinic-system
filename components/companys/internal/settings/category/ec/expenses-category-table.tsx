"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useExpensesCategories } from "@/hooks/internal/company/category/use-ec";
import { formatDate } from "@/lib/utils";
import { ExpensesCategoryWithManager, RefreshableProps } from "@/types";
import { useCompany } from "@/context/context";
import { Calendar } from "lucide-react";
import { DialogUpdateExpensesCategory } from "@/components/dialog/internal/category/dialog-ec";

export const ExpensesCategoriesTable = ({refreshKey, handleRefresh}: RefreshableProps) => {
  const { companyId } = useCompany();
  const { categories, error, isLoading } = useExpensesCategories(companyId, refreshKey);

  const columns = [
    {
      key: "color",
      header: "",
      render: (item: ExpensesCategoryWithManager) => (
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
      render: (item: ExpensesCategoryWithManager) => item.name,
    },
    {
      key: "description",
      header: "รายละเอียด",
      render: (item: ExpensesCategoryWithManager) => item.description || "-",
    },
    {
      key: "created",
      header: "เพิ่ม / บันทึก",
      render: (item: ExpensesCategoryWithManager) => (
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-amber-text" />
          <span>{formatDate(item.createdAt)}</span>
        </div>
      ),
    },
    {
      key: "updated",
      header: "อัพเดท / แก้ไข",
      render: (item: ExpensesCategoryWithManager) =>
        item.updatedAt && (
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-azurite-text" />
            <span>{formatDate(item.updatedAt)}</span>
          </div>
        )
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DynamicTable
      data={categories}
      columns={columns}
      dialogEdit={(item) => (
              <DialogUpdateExpensesCategory
                key={item.id}
                category={item}
                onSuccess={handleRefresh}
              />
            )}
      error={error?.error}
      description={error?.description}
    />
  );
};
