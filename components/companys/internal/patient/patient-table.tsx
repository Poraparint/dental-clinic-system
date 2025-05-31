"use client";
import { Loading } from "@/components/loading";
import { useAllPatients } from "@/hooks/internal/company/use-patient";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { User, Phone, Calendar, UserCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Patients } from "@/types/patient";
import { useCompany } from "@/context/context";
import { DialogUpdatePatient } from "@/components/dialog/internal/dialog-patient";

interface PatientTableProps {
  onRowClick: (patientId: string) => void;
  refreshKey: number;
  onRefresh: () => void;
}

export const PatientTable = ({
  onRowClick,
  refreshKey,
  onRefresh,
}: PatientTableProps) => {
  const { companyId } = useCompany();
  const { patients, error, isLoading } = useAllPatients(companyId, refreshKey);

  const handleSuccess = () => {
    onRefresh();
  };

  const columns = [
    {
      key: "name",
      header: "ชื่อ-นามสกุล",
      render: (item: Patients) => (
        <div className="flex items-center gap-2">
          <User className="size-4 text-lapis-accent" />
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      key: "phone",
      header: "เบอร์ติดต่อ",
      render: (item: Patients) => (
        <div className="flex items-center gap-2">
          <Phone className="size-4 text-jade" />
          <span>{item.phone}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "วันที่บันทึก",
      render: (item: Patients) => (
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          <span>{formatDate(item.createdAt)}</span>
        </div>
      ),
    },
    {
      key: "creator",
      header: "ผู้บันทึก",
      render: (item: Patients) => (
        <div className="flex items-center gap-2">
          <UserCheck className="size-4 text-amethyst-accent" />
          <span>{item.creator.name}</span>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DynamicTable
        data={patients}
        columns={columns}
        onRowClick={(patient) => onRowClick(patient.id)}
        dialogEdit={(item) => (
          <DialogUpdatePatient
            key={item.id}
            patient={item}
            onSuccess={handleSuccess}
          />
        )}
        error={error?.error}
        description={error?.description}
      />
    </>
  );
};
