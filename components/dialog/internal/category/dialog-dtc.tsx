"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { PlusIcon, SquarePen } from "lucide-react";
import { useState } from "react";
import { CreateDentalTechCategoryForm } from "@/components/companys/internal/settings/category/dtc/dentaltech-category-form";
import { toDentalTechCategoryFormData } from "@/lib/utils/transform/category";
import { DentalTechCategoryWithCreator } from "@/types";

interface DialogCreateDentalTechCategoryProps {
  onSuccess?: () => void;
  category?: DentalTechCategoryWithCreator;
}
export const DialogCreateDentalTechCategory = ({
  onSuccess,
}: DialogCreateDentalTechCategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="เพิ่มหมวดหมู่"
        icon={<PlusIcon />}
        dialogTitle="หมวดหมู่รายการทันตกรรม"
        dialogDescription="รายการทันตกรรม/หมวดหมู่ทันตกรรม"
        open={open}
        setOpen={setOpen}
      >
        <CreateDentalTechCategoryForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};

export const DialogUpdateDentalTechCategory = ({
  onSuccess,
  category,
}: DialogCreateDentalTechCategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogButton
      icon={<SquarePen />}
      dialogTitle="หมวดหมู่รายการทันตกรรม"
      dialogDescription="รายการทันตกรรม/หมวดหมู่ทันตกรรม"
      variant="secondary"
      open={open}
      setOpen={setOpen}
      className="rounded-full size-10"
    >
      <CreateDentalTechCategoryForm
        setOpen={setOpen}
        onSuccess={onSuccess}
        updateData={
          category
            ? toDentalTechCategoryFormData(category)
            : undefined
        }
      />
    </DialogButton>
  );
};
