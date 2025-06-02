"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { PlusIcon, SquarePen } from "lucide-react";
import { useState } from "react";
import { CreateExpensesCategoryForm } from "@/components/companys/internal/settings/category/ec/expenses-category-form";
import { ExpensesCategoryWithManager } from "@/types";
import { toExpensesCategoryFormData } from "@/lib/utils/transform/category";

interface DialogCreateExpensesCategoryProps {
  onSuccess?: () => void;
  category?: ExpensesCategoryWithManager;
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

export const DialogUpdateExpensesCategory = ({
  onSuccess,
  category,
}: DialogCreateExpensesCategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogButton
      icon={<SquarePen />}
      dialogTitle="หมวดหมู่รายการทำฟัน"
      dialogDescription="รายการทำฟัน/หมวดหมู่ทำฟัน"
      variant="secondary"
      open={open}
      setOpen={setOpen}
      className="rounded-full size-10"
    >
      <CreateExpensesCategoryForm
        setOpen={setOpen}
        onSuccess={onSuccess}
        updateData={
          category
            ? toExpensesCategoryFormData(category)
            : undefined
        }
      />
    </DialogButton>
  );
};
