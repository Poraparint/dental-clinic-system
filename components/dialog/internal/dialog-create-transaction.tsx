"use client";

import { DialogButton } from "@/components/props/wrapper/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateTransactionForm } from "@/components/companys/internal/patient/transaction/transaction-form";

interface DialogCreateTransactionProps {
  onSuccess?: () => void;
}
// ตัวอย่างการใช้งาน
export const DialogCreateTransaction = ({
  onSuccess,
}: DialogCreateTransactionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="เพิ่มรายการ"
        icon={<PlusIcon />}
        dialogTitle="เพิ่มรายการธุรกรรม"
        dialogDescription="กรอกข้อมูลเพื่อสร้างรายการธุรกรรม"
        open={open}
        setOpen={setOpen}
      >
        <CreateTransactionForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};
