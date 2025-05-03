"use client";

import { Loading } from "@/components/loading";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { Badge } from "@/components/ui/badge";
import { useExpenses } from "@/hooks/internal/use-expenses";
import { useParams } from "next/navigation";

interface Expense {
  id: string;
  datetime: string;
  name: string;
  expensesCategory: {
    id: string;
    name: string;
    color: string;
  };
  payment: string;
  amount: number;
}

interface ExpensesTableProps {
  month?: string;
}

export const ExpensesTable = ({ month }: ExpensesTableProps) => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { expenses, isLoading } = useExpenses(companyId, month);

  const columns = [
    {
      key: "datetime",
      header: "วันที่",
      render: (item: Expense) =>
        new Date(item.datetime).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      key: "name",
      header: "รายการ",
      render: (item: Expense) => item.name,
    },

    {
      key: "expensesCategory",
      header: "หมวดหมู่",
      render: (item: Expense) => (
        <Badge variant="outline" className="flex gap-3">
          <div
            style={{ backgroundColor: item.expensesCategory.color }}
            className="rounded-full size-3"
          />
          {item.expensesCategory.name}
        </Badge>
      ),
    },
    {
      key: "payment",
      header: "ชำระด้วย",
      render: (item: Expense) => item.payment,
    },
    {
      key: "amount",
      header: "จำนวนเงิน",
      render: (item: Expense) => <span>฿ {item.amount}</span>,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <DynamicTable
      data={expenses}
      columns={columns}
      error="เริ่มต้นด้วยการเพิ่มรายการรายจ่าย"
      description="เหมือนคุณยังไม่มีรายการรายจ่าย"
    />
  );
};
