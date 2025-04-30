import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
     const pathSegments = request.nextUrl.pathname.split("/");
     const companyId = pathSegments[pathSegments.indexOf("companies") + 1];

    const [year, monthNum] = month
      ? month.split("-").map(Number)
      : [new Date().getFullYear(), new Date().getMonth() + 1];
    const startDate = new Date(year, monthNum - 1, 1);
    const endDate = new Date(year, monthNum, 1);

    const [totalExpenses, expensesByCategory] = await Promise.all([
      db.expenses.aggregate({
        where: {
          companyId,
          datetime: {
            gte: startDate,
            lt: endDate,
          },
        },
        _sum: { amount: true },
      }),
      db.expenses.groupBy({
        by: ["ecId"],
        where: {
          companyId,
          datetime: {
            gte: startDate,
            lt: endDate,
          },
        },
        _sum: { amount: true },
        orderBy: {
          _sum: { amount: "desc" },
        },
      }),
    ]);

    return NextResponse.json({
      total: totalExpenses._sum.amount || 0,
      byCategory: expensesByCategory.map((item) => ({
        categoryId: item.ecId,
        total: item._sum.amount || 0,
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to calculate expenses" },
      { status: 500 }
    );
  }
}
