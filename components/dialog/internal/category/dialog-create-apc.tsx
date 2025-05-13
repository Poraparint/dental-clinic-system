"use client";

import { DialogButton } from "@/components/props/wrapper/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateAppointmentCategoryForm } from "@/components/companys/internal/settings/category/apc/schedule-category-form";

interface DialogCreateAppointmentCategoryProps {
  onSuccess?: () => void;
}
export const DialogCreateAppointmentCategory = ({
  onSuccess,
}: DialogCreateAppointmentCategoryProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="เพิ่มหมวดหมู่"
        icon={<PlusIcon />}
        dialogTitle="หมวดหมู่เวลานัด"
        dialogDescription="จัดการเวลานัด/เวลาตารางนัด"
        open={open}
        setOpen={setOpen}
      >
        <CreateAppointmentCategoryForm
          setOpen={setOpen}
          onSuccess={onSuccess}
        />
      </DialogButton>
    </>
  );
};
