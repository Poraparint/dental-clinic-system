"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { SoftDeleteTransactionCategory, useTransactionCategories } from "@/hooks/internal/company/category/use-tc";
import { formatDate } from "@/lib/utils";
import { RefreshableProps, TransactionCategoryWithManager } from "@/types";
import { useCompany } from "@/context/context";
import { Calendar } from "lucide-react";
import { DialogUpdateTransactionCategory } from "@/components/dialog/internal/category/dialog-tc";
import { toast } from "sonner";

export const TransactionCategoriesTable = ({
  refreshKey,
  handleRefresh,
}: RefreshableProps) => {
  const { companyId } = useCompany();
  const { categories, error, isLoading } = useTransactionCategories(
    companyId,
    refreshKey
  );

  const columns = [
    {
      key: "name",
      header: "ชื่อรายการ",
      render: (item: TransactionCategoryWithManager) => item.name,
    },
    {
      key: "description",
      header: "รายละเอียด",
      render: (item: TransactionCategoryWithManager) => item.description || "-",
    },
    {
      key: "price",
      header: "ราคาเริ่มต้น",
      render: (item: TransactionCategoryWithManager) => item.price,
    },
    {
      key: "created",
      header: "เพิ่ม / บันทึก",
      render: (item: TransactionCategoryWithManager) => (
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-amber-text" />
          <span>{formatDate(item.createdAt)}</span>
        </div>
      ),
    },
    {
      key: "updated",
      header: "อัพเดท / แก้ไข",
      render: (item: TransactionCategoryWithManager) =>
        item.updatedAt && (
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-azurite-text" />
            <span>{formatDate(item.updatedAt)}</span>
          </div>
        ),
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
        <DialogUpdateTransactionCategory
          key={item.id}
          category={item}
          onSuccess={handleRefresh}
        />
      )}
      onSoftDelete={(item) => SoftDeleteTransactionCategory(companyId, item.id)}
      onDeleteResult={({ success, error, description }) => {
        if (success) {
          toast.success(success);
          handleRefresh?.();
        } else {
          toast.error(error, {
            description,
          });
        }
      }}
      error={error?.error}
      description={error?.description}
    />
  );
};
