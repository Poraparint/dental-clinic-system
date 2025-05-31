"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { LampDesk } from "lucide-react";
import { useState } from "react";
import { RecheckForm } from "@/components/companys/internal/recheck/recheck-form";
import { Transaction } from "@/types/transaction";

interface DialogCreateRecheckProps {
  onSuccess?: () => void;
  transaction: Transaction;
}
// ตัวอย่างการใช้งาน
export const DialogCreateRecheck = ({
  onSuccess,
  transaction,
}: DialogCreateRecheckProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        icon={<LampDesk />}
        dialogTitle="เพิ่มรายการรีเช็ค / เพิ่มรายการรีเช็ค"
        dialogDescription="กรอกข้อมูลเพื่อสร้างรายการใหม่"
        title="รีเช็ค"
        open={open}
        setOpen={setOpen}
        variant="amber"
      >
        <RecheckForm
          setOpen={setOpen}
          onSuccess={onSuccess}
          transaction={transaction}
        />
      </DialogButton>
    </>
  );
};
