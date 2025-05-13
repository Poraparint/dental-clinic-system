"use client";

import { useMemo, useState } from "react";
import { ExpensesTable } from "@/components/companys/internal/expenses/expenses-table";
import { DialogCreateExpenses } from "@/components/dialog/internal/dialog-create-expenses";
import { useExpensesCategories } from "@/hooks/internal/category/use-ec";
import { useParams } from "next/navigation";
import { Loading } from "@/components/loading";
import { BriefcaseBusiness, ChevronLeft, ChevronRight } from "lucide-react";
import { FormNotFound } from "@/components/form-not-found";
import { useExpensesOverview } from "@/hooks/internal/use-expenses-overview";
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths } from "date-fns";
import { th } from "date-fns/locale";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogCreateExpensesCategory } from "@/components/dialog/internal/category/dialog-create-ec";
import { formatCurrency } from "@/lib/utils";

export const Expenses = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const [refreshKey, setRefreshKey] = useState(0);
  const { categories, isLoading, error } = useExpensesCategories(
    companyId,
    refreshKey
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { expensesOverview, isLoading: isOverviewLoading } =
    useExpensesOverview(companyId, currentMonth, refreshKey);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const formattedMonth = useMemo(
    () => format(currentMonth, "MMM yyyy", { locale: th }),
    [currentMonth]
  );

  const formattedTotal = useMemo(
    () => formatCurrency(expensesOverview?.total),
    [expensesOverview?.total]
  );

  const categoryData = useMemo(() => {
    return categories?.map((category) => {
      const categoryExpenses =
        expensesOverview.byCategory.find(
          (item) => item.categoryId === category.id
        )?.total || 0;
      const percentage =
        expensesOverview.total > 0
          ? Math.round((categoryExpenses / expensesOverview.total) * 100)
          : 0;

      return {
        ...category,
        expenses: categoryExpenses,
        percentage,
      };
    });
  }, [categories, expensesOverview]);

  if (isLoading || isOverviewLoading) {
    return <Loading />;
  }

  if (error) {
    return (<FormNotFound message={error?.error} description={error?.description} />)
  }

  return (
    <div className="lg:flex gap-4 space-y-4">
      <div className="space-y-4 lg:w-8/12">
        <Card className="sm:flex-row justify-between px-5">
          <div>
            <h5 className="text-muted-foreground font-medium">
              รายจ่ายทั้งหมดในเดือนนี้
            </h5>
            <h1 className="text-2xl font-bold mt-1">฿ {formattedTotal}</h1>
          </div>

          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center bg-primary-foreground/90  rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                className="hover:primary-foreground"
                onClick={handlePrevMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="text-sm font-medium min-w-[120px] text-center">
                {formattedMonth}
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="hover:primary-foreground"
                onClick={handleNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <DialogCreateExpenses onSuccess={handleRefresh} />
          </div>
        </Card>
        <Card className="px-5">
          <ExpensesTable
            key={refreshKey}
            month={format(currentMonth, "yyyy-MM")}
          />
        </Card>
      </div>
      <div className="lg:w-4/12 space-y-4">
        <Card className="px-5">
          <CardHeader className="flex justify-between">
            <CardTitle className="text-lg font-medium mb-4">
              สัดส่วนค่าใช้จ่าย
            </CardTitle>
            <DialogCreateExpensesCategory onSuccess={handleRefresh} />
          </CardHeader>

          <div>
            {
              categoryData?.map((category) => (
                <div
                  key={`${category.id}-${refreshKey}`}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-background/90 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: category.color || "#6366F1" }}
                  >
                    <BriefcaseBusiness className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{category.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">
                        {category.percentage}%
                      </p>
                      <p>฿ {category.expenses.toLocaleString()}</p>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${category.percentage}%`,
                          backgroundColor: category.color || "#6366F1",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </Card>
      </div>
    </div>
  );
};
