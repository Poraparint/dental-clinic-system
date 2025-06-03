"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { formatDate } from "@/lib/utils";
import { RefreshableProps, AddOnCategoryWithManager } from "@/types";
import { useCompany } from "@/context/context";
import { Calendar } from "lucide-react";
import { DialogUpdateAddOnCategory } from "@/components/dialog/internal/category/dialog-add-on";
import { useAddOnCategories } from "@/hooks/internal/company/category/use-add-on";

export const AddOnCategoriesTable = ({refreshKey, handleRefresh}: RefreshableProps) => {
  const { companyId } = useCompany();
  const { categories, error, isLoading } = useAddOnCategories(companyId, refreshKey);

  const columns = [
    {
      key: "name",
      header: "ชื่อรายการ",
      render: (item: AddOnCategoryWithManager) => item.name,
    },
    {
      key: "description",
      header: "รายละเอียด",
      render: (item: AddOnCategoryWithManager) => item.description || "-",
    },
    {
      key: "unitPrice",
      header: "ราคาต่อหน่วย",
      render: (item: AddOnCategoryWithManager) => item.unitPrice,
    },
    {
      key: "stock",
      header: "จำนวนคงคลัง",
      render: (item: AddOnCategoryWithManager) => item.stock,
    },
    {
      key: "created",
      header: "เพิ่ม / บันทึก",
      render: (item: AddOnCategoryWithManager) => (
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-amber-text" />
          <span>{formatDate(item.createdAt)}</span>
        </div>
      ),
    },
    {
      key: "updated",
      header: "อัพเดท / แก้ไข",
      render: (item: AddOnCategoryWithManager) =>
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
        <DialogUpdateAddOnCategory
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
