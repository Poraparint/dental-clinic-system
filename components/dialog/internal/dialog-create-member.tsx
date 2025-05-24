"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { MemberRegisterForm } from "@/components/companys/internal/members/member-form";

// ตัวอย่างการใช้งาน
export const DialogCreateMember = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DialogButton
        title="สร้างบัญชีพนักงาน"
        icon={<PlusIcon />}
        dialogTitle="สร้างบัญชีพนักงาน"
        dialogDescription="กรอกข้อมูลเพื่อสร้างบัญชีพนักงาน"
        open={open}
        setOpen={setOpen}
      >
        <MemberRegisterForm setOpen={setOpen} onSuccess={onSuccess} />
      </DialogButton>
    </>
  );
};
