"use client";

import { DialogButton } from "@/components/shared/dialog/dialog-button";
import { SquarePen, UserPlus } from "lucide-react";
import { useState } from "react";
import { CreatePatientForm } from "@/components/companys/internal/patient/patient-form";
import { Patient } from "@/types/patient";
import { toPatientFormData } from "@/lib/utils/transform/patient";

interface DialogPatientProps {
  onSuccess?: () => void;
  patient?: Patient;
}
// ตัวอย่างการใช้งาน
export const DialogCreatePatient = ({ onSuccess }: DialogPatientProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogButton
      title="เพิ่มบัตรใหม่"
      icon={<UserPlus />}
      dialogTitle="เพิ่มบัตรใหม่"
      dialogDescription="กรอกข้อมูลเพื่อสร้างบัตรใหม่"
      open={open}
      setOpen={setOpen}
    >
      <CreatePatientForm setOpen={setOpen} onSuccess={onSuccess} />
    </DialogButton>
  );
};

export const DialogUpdatePatient = ({
  onSuccess,
  patient,
}: DialogPatientProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogButton
      icon={<SquarePen />}
      dialogTitle="แก้ไขข้อมูลคนไข้"
      dialogDescription="ปรับปรุงข้อมูลของคนไข้"
      variant="default"
      open={open}
      setOpen={setOpen}
      tooltip="แก้ไข"
      className="rounded-full size-10"
    >
      <CreatePatientForm
        setOpen={setOpen}
        onSuccess={onSuccess}
        patientData={patient ? toPatientFormData(patient) : undefined}
      />
    </DialogButton>
  );
};
