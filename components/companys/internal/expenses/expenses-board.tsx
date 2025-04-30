"use client";

import { RoleGate } from "@/components/props/role-gate";
import { CompanyRole } from "@prisma/client";
import { useState } from "react";
import { ExpensesTable } from "@/components/companys/internal/expenses/expenses-table";
import { DialogCreateExpenses } from "@/components/dialog/internal/dialog-create-expenses";
import { useExpensesCategories } from "@/hooks/internal/use-ec";
import { useParams } from "next/navigation";
import { UserCard } from "@/components/props/user-card";
import { Loading } from "@/components/loading";
import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";
import { FormNotFound } from "@/components/form-not-found";
import { useExpensesOverview } from "@/hooks/internal/use-expenses-overview";
import { Button } from "@/components/ui/button";
import { format, addMonths, subMonths } from "date-fns";
import { th } from "date-fns/locale";

export const Expenses = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const { categories, isLoading, error } = useExpensesCategories(companyId);
  const [refreshKey, setRefreshKey] = useState(0);
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

  if (isLoading || isOverviewLoading) {
    return <Loading />;
  }

  return (
    <RoleGate allowedRole={[CompanyRole.MANAGER, CompanyRole.COMANAGER]}>
      <div className="md:flex gap-4 space-y-4">
        <div className="space-y-4 md:w-9/12 border p-4 rounded-xl">
          <div className="flex justify-between">
            <div>
              <h5 className="text-muted-foreground">
                รายจ่ายทั้งหมดในเดือนนี้
              </h5>
              <h1 className="text-2xl font-bold">
                {expensesOverview.total.toLocaleString()} บาท
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="text-lg font-medium min-w-[120px] text-center">
                  {format(currentMonth, "MMM yyyy", { locale: th })}
                </div>

                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <DialogCreateExpenses onSuccess={handleRefresh} />
            </div>
          </div>
          <hr />
          <ExpensesTable
            key={refreshKey}
            month={format(currentMonth, "yyyy-MM")}
          />
        </div>
        <div className="md:w-3/12 space-y-3">
          {Array.isArray(categories) ? (
            categories.map((category) => {
              const categoryExpenses =
                expensesOverview.byCategory.find(
                  (item) => item.categoryId === category.id
                )?.total || 0;
              const percentage =
                expensesOverview.total > 0
                  ? Math.round(
                      (categoryExpenses / expensesOverview.total) * 100
                    )
                  : 0;

              return (
                <UserCard
                  key={`${category.id}-${refreshKey}`}
                  title={category.name || ""}
                  description={`${categoryExpenses.toLocaleString()} บาท (${percentage}%)`}
                  icon={<CreditCard />}
                  color={category.color}
                  progressValue={percentage}
                />
              );
            })
          ) : (
            <FormNotFound
              message={error?.error}
              description={error?.description}
              url={error?.url}
              urlname={error?.urlname}
            />
          )}
        </div>
      </div>
    </RoleGate>
  );
};
