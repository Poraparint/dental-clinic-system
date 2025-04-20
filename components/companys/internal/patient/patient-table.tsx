"use client";
import { FormNotFound } from "@/components/form-not-found";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { TableInfo } from "@/components/props/table-info";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loading";

interface Patient {
  id: string;
  name: string;
  phone: string;
  cd: string;
  drug: string;
  createdAt?: Date;
    updatedAt?: Date;
    createdByType?: string;
}

interface PatientsError {
  error: string;
  description?: string;
  url?: string;
  urlname?: string;
}

interface PatientTableProps {
  companyId: string;
  onRowClick: (patientId: string) => void;
}

export const PatientTable = ({ companyId, onRowClick }: PatientTableProps) => {
  const [patients, setPatients] = useState<Patient[] | PatientsError | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
          const response = await fetch(`/api/companies/${companyId}/patients`);
          
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setPatients({
          error: "เกิดข้อผิดพลาดในการดึงข้อมูลคนไข้",
          description: "กรุณาลองใหม่อีกครั้งในภายหลัง",
          urlname: "เพิ่มบัตรใหม่",
          url: "/",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [companyId]);

  if (loading) return <Loading/>;

  return (
    <Table className="text-base">
      <TableHeader>
        <TableRow>
          <TableHead>ชื่อ-นามสกุล</TableHead>
          <TableHead>เบอร์ติดต่อ</TableHead>
          <TableHead>โรคประจำตัวปัจจุบัน</TableHead>
          <TableHead>ประวัติการแพ้ยา</TableHead>
          <TableHead>ผู้สร้าง</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(patients) ? (
          patients.map((patient) => (
            <TableRow key={patient.id} onClick={() => onRowClick(patient.id)}>
              <TableInfo
                first={patient.name}
                second={patient.phone}
                third={patient.cd}
                fourth={patient.drug}
                fifth={patient.createdByType}
              />
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>
              <FormNotFound
                message={patients?.error || "Unknown error"}
                description={patients?.description || ""}
                url={patients?.url || ""}
                urlname={patients?.urlname || ""}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
