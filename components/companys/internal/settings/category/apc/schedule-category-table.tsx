"use client";

import { Loading } from "@/components/loading";
import {
  onReorderScheduleCategory,
  useScheduleCategories,
} from "@/hooks/internal/company/category/use-sc";
import { toast } from "sonner";
import { FormNotFound } from "@/components/form-not-found";
import { DraggableCategoryList } from "@/components/props/component/drag-drop/drag-drop-ui";
import { useCompany } from "@/context/context";

export const AppointmentCategoriesTable = () => {
  const { companyId } = useCompany();
  const { categories, error, isLoading } = useScheduleCategories(companyId);

  const handleReorder = async (orderedIds: string[]) => {
    const data = await onReorderScheduleCategory(companyId, orderedIds);

    if (data.error) {
      toast.error(data.error, { description: data.description });
    } else {
      toast.success(data.success);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    <FormNotFound message={error.error} description={error.description} />;
  }
  return (
    <DraggableCategoryList
      categories={categories.map((c) => ({
        id: c.id,
        name: c.name,
        createdAt: c.createdAt,
      }))}
      onReorder={handleReorder}
    />
  );
};
