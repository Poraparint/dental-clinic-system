"use client";
import { Loading } from "@/components/loading";
import { usePatients } from "@/hooks/internal/use-patient";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useParams } from "next/navigation";

import { User, Phone, Calendar, UserCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";

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

export const PatientTable = ({ onRowClick }: PatientTableProps) => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { patients, isLoading } = usePatients(companyId);

  const columns = [
    {
      key: "name",
      header: "ชื่อ-นามสกุล",
      render: (item: Patient) => (
        <div className="flex items-center gap-2">
          <User className="size-4 text-lapis-accent" />
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      key: "phone",
      header: "เบอร์ติดต่อ",
      render: (item: Patient) => (
        <div className="flex items-center gap-2">
          <Phone className="size-4 text-jade" />
          <span>{item.phone}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "วันที่บันทึก",
      render: (item: Patient) => (
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          <span>{formatDate(item.createdAt)}</span>
        </div>
      ),
    },
    {
      key: "creator",
      header: "ผู้บันทึก",
      render: (item: Patient) => (
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
    <DynamicTable
      data={patients}
      columns={columns}
      onRowClick={(patient) => onRowClick(patient.id)}
      error="เริ่มต้นด้วยการสร้างบัตรใหม่"
      description="เหมือนคุณยังไม่มีบัตรใหม่"
    />
  );
};
