"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useDentaltTechCategories } from "@/hooks/internal/company/category/use-dtc";
import { formatDate } from "@/lib/utils";
import { DentalTechCategoryWithCreator } from "@/types";
import { useCompany } from "@/context/context";
import { Calendar, UserCheck } from "lucide-react";

export const DentalTechCategoriesTable = () => {
  const { companyId } = useCompany();
  const { categories, error, isLoading } = useDentaltTechCategories(companyId);

  const columns = [
    {
      key: "name",
      header: "ชื่อรายการ",
      render: (item: DentalTechCategoryWithCreator) => item.name,
    },
    {
      key: "description",
      header: "รายละเอียด",
      render: (item: DentalTechCategoryWithCreator) => item.description || "-",
    },
    {
      key: "created",
      header: "เพิ่ม / บันทึก",
      render: (item: DentalTechCategoryWithCreator) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-amber-text" />
            <span>{formatDate(item.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <UserCheck className="size-3 " />
            <span>{item.creator.name}</span>
          </div>
        </div>
      ),
    },
    {
      key: "updated",
      header: "อัพเดท / แก้ไข",
      render: (item: DentalTechCategoryWithCreator) =>
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
      error={error?.error}
      description={error?.description}
    />
  );
};
