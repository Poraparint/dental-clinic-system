"use client";

import { Loading } from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useTransaction } from "@/hooks/internal/company/use-transaction";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { DialogCreateRecheck } from "@/components/dialog/internal/dialog-create-recheck";
import { useState } from "react";
import { DialogCreateDentalTech } from "@/components/dialog/internal/dialog-create-dentaltech";
import { Transaction } from "@/types/transaction";
import { useCompany, usePatient } from "@/context/context";
import { DialogUpdateTransaction } from "@/components/dialog/internal/dialog-transaction";

export const TransactionTable = () => {
  const { companyId } = useCompany();
  const { patientId } = usePatient();
  const [refreshKey, setRefreshKey] = useState(0);
  const { transactions, error, isLoading } = useTransaction(
    companyId,
    patientId,
    refreshKey
  );

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

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
        <div className="flex flex-col gap-2">
          {item.recheck ? (
            <Badge variant="amber">Recheck แล้ว</Badge>
          ) : (
            <DialogCreateRecheck onSuccess={handleRefresh} transaction={item} />
          )}
          {item.dentaltech ? (
            <Badge variant="azurite">ส่ง Lab แล้ว</Badge>
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
