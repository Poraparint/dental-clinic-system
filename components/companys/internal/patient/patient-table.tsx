"use client";
import { softDeletePatient, useAllPatients, useDebounce } from "@/hooks";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { User, Phone, Calendar, UserCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Patients, RefreshableProps } from "@/types";
import { useCompany } from "@/context/context";
import { DialogUpdatePatient } from "@/components/dialog/internal/dialog-patient";
import { toast } from "sonner";
import { PaginationControls } from "@/components/shared/pagination/pagination";

type PatientTableProps = RefreshableProps & {
  search: string;
  page: number;
  setPage: (page: number) => void;
};
export const PatientTable = ({
  search,
  page,
  setPage,
  onRowClick,
  refreshKey,
  handleRefresh,
}: PatientTableProps) => {
  const { companyId } = useCompany();
  const debouncedSearch = useDebounce(search, 300);
  const { patients, totalPages, error } = useAllPatients(companyId, {
    page,
    pageSize: 20,
    search: debouncedSearch,
    refreshKey,
  });

  const columns = [
    {
      key: "name",
      header: "ชื่อ-นามสกุล",
      render: (item: Patients) => (
        <div className="flex items-center gap-2">
          <User className="size-4 text-charoite" />
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      key: "phone",
      header: "เบอร์ติดต่อ",
      render: (item: Patients) => (
        <div className="flex items-center gap-2">
          <Phone className="size-4 text-emerald-600" />
          <span>{item.phone}</span>
        </div>
      ),
    },
    {
      key: "created",
      header: "เพิ่ม / บันทึก",
      render: (item: Patients) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="size-4 text-amber-text" />
            <span>{formatDate(item.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <UserCheck className="size-3 " />
            <span>{item.creator.name}</span>
          </div>
        </div>
      ),
    },
    {
      key: "updated",
      header: "อัพเดท / แก้ไข",
      render: (item: Patients) =>
        item.updatedAt &&
        item.updater?.name && (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-azurite-text" />
              <span>{formatDate(item.updatedAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <UserCheck className="size-3 " />
              <span>{item.updater?.name}</span>
            </div>
          </div>
        ),
    },
  ];

  return (
    <>
      <DynamicTable
        data={patients}
        columns={columns}
        onRowClick={
          onRowClick ? (patient) => onRowClick(patient.id) : undefined
        }
        dialogEdit={(item) => (
          <DialogUpdatePatient
            key={item.id}
            patient={item}
            onSuccess={handleRefresh}
          />
        )}
        onSoftDelete={(item) => softDeletePatient(companyId, item.id)}
        onDeleteResult={({ success, error, description }) => {
          if (success) {
            toast.success(success);
            handleRefresh?.();
          } else {
            toast.error(error, {
              description: description,
            });
          }
        }}
        error={error?.error}
        description={error?.description}
      />
      {totalPages && totalPages > 1 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </>
  );
};
