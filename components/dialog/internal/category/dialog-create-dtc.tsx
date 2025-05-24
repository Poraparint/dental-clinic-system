"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateDentalTechCategoryForm } from "@/components/companys/internal/settings/category/dtc/dentaltech-category-form";

interface DialogCreateDentalTechCategoryProps {
  onSuccess?: () => void;
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
