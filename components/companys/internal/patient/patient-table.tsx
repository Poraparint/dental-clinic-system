"use client";
import { Loading } from "@/components/loading";
import { usePatients } from "@/hooks/internal/use-patient";
import { DynamicTable } from "@/components/props/dynamic-table";
import { useParams } from "next/navigation";

interface Patient {
  id: string;
  name: string;
  phone: string;
  createdAt: Date;
  creator: {
    name: string;
  };
}

interface PatientTableProps {
  onRowClick: (patientId: string) => void;
}

export const PatientTable = ({  onRowClick }: PatientTableProps) => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { patients, isLoading } = usePatients(companyId);

  const columns = [
    {
      key: "name",
      header: "ชื่อ-นามสกุล",
      render: (item: Patient) => item.name,
    },
    {
      key: "phone",
      header: "เบอร์ติดต่อ",
      render: (item: Patient) => item.phone,
    },

    {
      key: "createdAt",
      header: "วันที่บันทึก",
      render: (item: Patient) =>
        new Date(item.createdAt).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      key: "creator",
      header: "ผู้บันทึก",
      render: (item: Patient) => item.creator.name,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DynamicTable
      data={patients}
      columns={columns}
      onRowClick={(patient) => onRowClick(patient.id)}
      error="เริ่มต้นด้วยการสร้างบัตรใหม่"
      description="เหมือนคุณยังไม่มีบัตรใหม่"
      url="/"
      urlname="เพิ่มบัตรใหม่"
    />
  );
};
