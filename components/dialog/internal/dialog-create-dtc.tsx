"use client";

import { DialogButton } from "@/components/props/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateDentalTechCategoryForm } from "@/components/companys/internal/settings/category/dtc/dentaltech-category-form";

interface DialogCreateTransactionCategoryProps {
  onSuccess?: () => void;
}
export const DialogCreateTransactionCategory = ({
  onSuccess,
}: DialogCreateTransactionCategoryProps) => {
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
