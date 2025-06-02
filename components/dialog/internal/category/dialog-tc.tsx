"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { PlusIcon, SquarePen } from "lucide-react";
import { useState } from "react";
import { CreateTransactionCategoryForm } from "@/components/companys/internal/settings/category/tc/transaction-category-form";
import { TransactionCategoryWithManager } from "@/types";
import { toTransactionCategoryFormData } from "@/lib/utils/transform/category";

interface DialogCreateTransactionCategoryProps {
  onSuccess?: () => void;
  category?: TransactionCategoryWithManager;
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
        dialogTitle="หมวดหมู่รายการทำฟัน"
        dialogDescription="รายการทำฟัน/หมวดหมู่ทำฟัน"
        open={open}
        setOpen={setOpen}
      >
        <CreateTransactionCategoryForm
          setOpen={setOpen}
          onSuccess={onSuccess}
        />
      </DialogButton>
    </>
  );
};


export const DialogUpdateTransactionCategory = ({
  onSuccess,
  category,
}: DialogCreateTransactionCategoryProps) => {
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
      <CreateTransactionCategoryForm
        setOpen={setOpen}
        onSuccess={onSuccess}
        updateData={
          category
            ? toTransactionCategoryFormData(category)
            : undefined
        }
      />
    </DialogButton>
  );
};
