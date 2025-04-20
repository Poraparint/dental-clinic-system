import { DialogCreatePatient } from "@/components/dialog/internal/dialog-create-patient";

export const PatientBoard = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">รายชื่อคนไข้ / บัตรคนไข้</h1>
        <DialogCreatePatient />
          </div>
          <hr />
    </div>
  );
};
