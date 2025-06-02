"use client";

import { Loading } from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useTransaction } from "@/hooks";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { DialogCreateRecheck } from "@/components/dialog/internal/dialog-recheck";
import { DialogCreateDentalTech } from "@/components/dialog/internal/dialog-create-dentaltech";
import { Transaction, RefreshableProps } from "@/types";
import { useCompany, usePatient } from "@/context/context";
import { DialogUpdateTransaction } from "@/components/dialog/internal/dialog-transaction";
import { Aperture, LampDesk } from "lucide-react";

export const TransactionTable = ({ refreshKey, handleRefresh }: RefreshableProps) => {
  const { companyId } = useCompany();
  const { patientId } = usePatient();
  const { transactions, error, isLoading } = useTransaction(
    companyId,
    patientId,
    refreshKey
  );

  const columns = [
    {
      key: "datetime",
      header: "วันที่",
      render: (item: Transaction) =>
        new Date(item.datetime).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      key: "transactionCategory",
      header: "รายการ",
      render: (item: Transaction) => item.transactionCategory.name,
    },
    {
      key: "detail",
      header: "รายละเอียด",
      render: (item: Transaction) =>
        item.detail && <Textarea value={item.detail} readOnly />,
    },
    {
      key: "price",
      header: "ราคา",
      render: (item: Transaction) => <span>{item.price} ฿</span>,
    },

    {
      key: "paid",
      header: "จ่ายแล้ว",
      render: (item: Transaction) => (
        <Badge variant={item.paid < item.price ? "amber" : "azurite"}>
          {item.paid} ฿
        </Badge>
      ),
    },
    {
      key: "creator",
      header: "ผู้บันทึก",
      render: (item: Transaction) => item.creator.name,
    },
    {
      key: "list",
      header: "",
      render: (item: Transaction) => (
        <div className="flex gap-2">
          {item.recheck ? (
            <Badge variant="amber" className="rounded-full size-10">
              <LampDesk />
            </Badge>
          ) : (
            <DialogCreateRecheck onSuccess={handleRefresh} transaction={item} />
          )}
          {item.dentaltech ? (
            <Badge variant="azurite" className="rounded-full size-10">
              <Aperture />
            </Badge>
          ) : (
            <DialogCreateDentalTech
              onSuccess={handleRefresh}
              transaction={item}
            />
          )}
        </div>
      ),
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <DynamicTable
      data={transactions}
      columns={columns}
      error={error?.error}
      dialogEdit={(item) => (
        <DialogUpdateTransaction
          key={item.id}
          transaction={item}
          onSuccess={handleRefresh}
        />
      )}
      description={error?.description}
    />
  );
};
