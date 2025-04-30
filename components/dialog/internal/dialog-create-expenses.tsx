"use client";

import { DialogButton } from "@/components/props/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateExpensesForm } from "@/components/companys/internal/expenses/expenses-form";

// ตัวอย่างการใช้งาน
export const DialogCreateExpenses = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="สร้างรายการรายจ่าย"
        icon={<PlusIcon />}
        dialogTitle="สร้างรายการรายจ่าย"
        dialogDescription="กรอกข้อมูลเพื่อสร้างรายการรายจ่าย"
        open={open}
        setOpen={setOpen}
      >
        <CreateExpensesForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};
