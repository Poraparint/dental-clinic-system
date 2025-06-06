"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { LampDesk } from "lucide-react";
import { useState } from "react";
import { RecheckForm } from "@/components/companys/internal/recheck/recheck-form";
import { Transaction } from "@/types";

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
        tooltip="เพิ่มเป็นรีเช็ค / แบ่งจ่าย"
        className="rounded-full size-10"
        open={open}
        setOpen={setOpen}
        variant="outline"
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
