"use client";
import { Loading } from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useTransaction } from "@/hooks/internal/use-transaction";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useParams } from "next/navigation";
import { DialogCreateRecheck } from "@/components/dialog/internal/dialog-create-recheck";
import { useState } from "react";
import { DialogCreateDentalTech } from "@/components/dialog/internal/dialog-create-dentaltech";
import { Transaction } from "@/types/transaction";

export const TransactionTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const patientId = params.patientId as string;
  const { transactions, error, isLoading } = useTransaction(companyId, patientId);

  const [, setRefreshKey] = useState(0);

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
      render: (item: Transaction) => <Textarea value={item.detail} readOnly />,
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
        <Badge variant={item.paid < item.price ? "amber" : "lapis"}>
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
          <DialogCreateRecheck onSuccess={handleRefresh} transaction={item} />
          <DialogCreateDentalTech
            onSuccess={handleRefresh}
            transaction={item}
          />
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
      description={error?.description}
    />
  );
};
