"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { PlusIcon, SquarePen } from "lucide-react";
import { useState } from "react";
import { AddOnCategoryWithManager} from "@/types";
import { toAddOnCategoryFormData } from "@/lib/utils/transform/category";
import { CreateAddOnCategoryForm } from "@/components/companys/internal/settings/category/add-on/addon-category-form";

interface DialogCreateAddOnCategoryProps {
  onSuccess?: () => void;
  category?: AddOnCategoryWithManager;
}
export const DialogCreateAddOnCategory = ({
  onSuccess,
}: DialogCreateAddOnCategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="เพิ่มหมวดหมู่"
        icon={<PlusIcon />}
        dialogTitle="หมวดหมู่รายการสินค้าเสริม"
        dialogDescription="หมวดหมู่สินค้าเสริม / รายการสินค้าเสริม"
        open={open}
        setOpen={setOpen}
      >
        <CreateAddOnCategoryForm
          setOpen={setOpen}
          onSuccess={onSuccess}
        />
      </DialogButton>
    </>
  );
};


export const DialogUpdateAddOnCategory = ({
  onSuccess,
  category,
}: DialogCreateAddOnCategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogButton
      icon={<SquarePen />}
      dialogTitle="หมวดหมู่รายการสินค้าเสริม"
      dialogDescription="หมวดหมู่สินค้าเสริม / รายการสินค้าเสริม"
      variant="secondary"
      open={open}
      setOpen={setOpen}
      className="rounded-full size-10"
    >
      <CreateAddOnCategoryForm
        setOpen={setOpen}
        onSuccess={onSuccess}
        updateData={
          category ? toAddOnCategoryFormData(category) : undefined
        }
      />
    </DialogButton>
  );
};
