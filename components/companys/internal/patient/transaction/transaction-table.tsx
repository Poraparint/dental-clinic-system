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
import { Aperture, LampDesk, PencilLine, User2 } from "lucide-react";

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
      render: (item: Transaction) => (
        <div>
          {item.transactionCategory.name}
          {item.transactionAddons && item.transactionAddons.length > 0 && (
            <ul className="ml-2 list-disc text-sm text-muted-foreground">
              {item.transactionAddons.map((addon) => (
                <li key={addon.id}>
                  {addon.addonItem.name} × {addon.quantity} ({addon.price} บาท)
                </li>
              ))}
            </ul>
          )}
        </div>
      ),
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
      key: "manager",
      header: "จัดการโดย",
      render: (item: Transaction) => (
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User2 className="w-4 h-4 text-blue-500" />
            <span>สร้างโดย: <span className="font-medium text-foreground">{item.creator.name}</span></span>
          </div>
          {item.updater && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <PencilLine className="w-4 h-4 text-green-500" />
              <span>อัปเดตโดย: <span className="font-medium text-foreground">{item.updater.name}</span></span>
            </div>
          )}
        </div>
      ),
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
