"use client";
import { softRecoveryPatient, useDeletedPatients } from "@/hooks";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { User, Phone, Calendar, UserCheck } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Patients, RefreshableProps } from "@/types";
import { useCompany } from "@/context/context";
import { toast } from "sonner";
import { Loading } from "@/components/loading";

export const DeletedPatientTable = ({
  refreshKey,
  handleRefresh,
}: RefreshableProps) => {
  const { companyId } = useCompany();
  const { patients, error, isLoading } = useDeletedPatients(companyId, refreshKey);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <DynamicTable
        data={patients}
        columns={columns}
        onSoftRecovery={(item) => softRecoveryPatient(companyId, item.id)}
        onDeleteResult={({ success, error, description }) => {
          if (success) {
            toast.success(success);
            handleRefresh?.();
          } else {
            toast.error(error, {
              description,
            });
          }
        }}
        error={error?.error}
        description={error?.description}
      />
      
    </>
  );
};
