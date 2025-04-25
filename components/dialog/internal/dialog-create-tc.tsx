"use client";

import { DialogButton } from "@/components/props/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateTransactionCategoryForm } from "@/components/companys/internal/settings/category/tc/transactioncategory-form";

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
            dialogTitle="หมวดหมู่รายการทำฟัน"
            dialogDescription="รายการทำฟัน/หมวดหมู่ทำฟัน"
            open={open}
            setOpen={setOpen}
          >
            <CreateTransactionCategoryForm setOpen={setOpen} onSuccess={ onSuccess } />
          </DialogButton>
        
        
    </>
  );
};
