"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { Badge } from "@/components/ui/badge";
import { useExpenses } from "@/hooks";
import { Expenses } from "@/types";
import { useCompany } from "@/context/context";

interface ExpensesTableProps {
  refreshKey?: number;
  month?: string;
}

export const ExpensesTable = ({ refreshKey, month }: ExpensesTableProps) => {
  const { companyId } = useCompany();
  const { expenses, error, isLoading } = useExpenses(
    companyId,
    month,
    refreshKey
  );

  const columns = [
    {
      key: "datetime",
      header: "วันที่",
      render: (item: Expenses) =>
        new Date(item.datetime).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      key: "name",
      header: "รายการ",
      render: (item: Expenses) => item.name,
    },

    {
      key: "expensesCategory",
      header: "หมวดหมู่",
      render: (item: Expenses) => (
        <Badge variant="outline" className="flex gap-3">
          <div
            style={{ backgroundColor: item.expensesCategory.color || "ghostwhite" }}
            className="rounded-full size-3"
          />
          {item.expensesCategory.name}
        </Badge>
      ),
    },
    {
      key: "payment",
      header: "ชำระด้วย",
      render: (item: Expenses) => item.payment,
    },
    {
      key: "amount",
      header: "จำนวนเงิน",
      render: (item: Expenses) => <span>฿ {item.amount}</span>,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DynamicTable
      data={expenses}
      columns={columns}
      error={error?.error}
      description={error?.description}
    />
  );
};
