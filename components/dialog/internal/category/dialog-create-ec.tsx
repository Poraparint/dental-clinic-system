"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateExpensesCategoryForm } from "@/components/companys/internal/settings/category/ec/expenses-category-form";

interface DialogCreateExpensesCategoryProps {
  onSuccess?: () => void;
}
export const DialogCreateExpensesCategory = ({
  onSuccess,
}: DialogCreateExpensesCategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="เพิ่มหมวดหมู่"
        icon={<PlusIcon />}
        dialogTitle="หมวดหมู่การใช้จ่าย"
        dialogDescription="รายการค่าใช้จ่าย/หมวดหมู่การใช้จ่าย"
        open={open}
        setOpen={setOpen}
      >
        <CreateExpensesCategoryForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};
