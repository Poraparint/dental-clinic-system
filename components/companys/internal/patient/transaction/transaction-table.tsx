"use client";
import { Loading } from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useTransaction } from "@/hooks/internal/use-transaction";
import { DynamicTable } from "@/components/props/component/dynamic-table";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: string;
  datetime: string;
  transactionCategory: {
    id: string;
    name: string;
  };
  creator: {
    name: string;
  };
  detail: string;
  price: number;
  paid: number;
  creatorUserId: string;
}

export const TransactionTable = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const patientId = params.patientId as string;
  const { transactions, isLoading } = useTransaction(companyId, patientId);

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
        <Badge variant={item.paid < item.price ? "amber" : "emerald"}>
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
      key: "copy",
      header: "รหัส",
      render: (item: Transaction) => (
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            navigator.clipboard.writeText(item.id); 
            toast.success("คัดลอก 'รหัสธุรกรรม' สำเร็จ")
          }}
          title="คัดลอก ID"
        >
          <Copy className="size-4" />
        </Button>
      ),
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <DynamicTable
      data={transactions}
      columns={columns}
      error="ไม่พบข้อมูลธุรกรรม"
      description="เริ่มต้นด้วยการสร้างรายการธุรกรรม"
    />
  );
};
