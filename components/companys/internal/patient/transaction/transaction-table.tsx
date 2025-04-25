"use client";
import { FormNotFound } from "@/components/form-not-found";

//ui
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loading";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

//icons
import { Calendar } from "lucide-react";

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

interface TransactionsError {
  error: string;
  description?: string;
  url?: string;
  urlname?: string;
}

interface TransactionTableProps {
  patientId: string;
  companyId: string;
}

export const TransactionTable = ({
  patientId,
  companyId,
}: TransactionTableProps) => {
  const [transactions, setTransactions] = useState<
    Transaction[] | TransactionsError | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `/api/companies/${companyId}/patients/${patientId}/transaction`
        );

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions(() => ({
          error: "ไม่พบข้อมูลธุรกรรม",
          description: "เริ่มต้นด้วยการสร้างรายการธุรกรรม",
          url: `/dashboard/create-patient`,
          urlname: "สร้างรายการธุรกรรมใหม่",
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [companyId, patientId]);

  if (loading) return <Loading />;

  return (
    <>
      <Card className="w-full">
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table className="text-base">
              <TableHeader>
                <TableRow>
                  <TableHead className="flex gap-2">
                    <Calendar className="text-lapis-accent" />
                    วันที่
                  </TableHead>
                  <TableHead>รายการ</TableHead>
                  <TableHead>รายละเอียด</TableHead>
                  <TableHead>ราคา</TableHead>
                  <TableHead>ชำระแล้ว</TableHead>
                  <TableHead>ผู้บันทึก</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(transactions) ? (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="whitespace-nowrap">
                        {new Date(transaction.datetime).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.transactionCategory.name}
                      </TableCell>
                      <TableCell>
                        <Textarea value={transaction.detail} readOnly />
                      </TableCell>
                      <TableCell>{transaction.price} ฿</TableCell>
                      <TableCell>
                        {transaction.paid !== 0 ? (
                          <Badge className="bg-green-100 text-jade hover:bg-green-200 border-green-400">
                            {transaction.paid} ฿
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-yellow-50 text-yellow-800 border-yellow-200 hover:bg-yellow-50"
                          >
                            ยังไม่ได้ชำระ
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{transaction.creator.name}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <FormNotFound
                        message={transactions?.error || "Unknown error"}
                        description={transactions?.description || ""}
                        url={transactions?.url || ""}
                        urlname={transactions?.urlname || ""}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
};
