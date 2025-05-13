import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { currentManager } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const existingManager = await currentManager();

  if (!existingManager) {
    return NextResponse.json({
      status: 403,
    });
  }
  const { companyId } = await params;

  if (!companyId) {
    return NextResponse.json(
      {
        error: "ไม่พบ id บริษัท",
        description: "URL ไม่ถูกต้อง",
      },
      { status: 400 }
    );
  }
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month"); 
    const whereCondition: {
      companyId: string;
      datetime?: {
        gte: Date;
        lt: Date;
      };
    } = { companyId };

    if (month) {
      const [year, monthNum] = month.split("-").map(Number);
      whereCondition.datetime = {
        gte: new Date(year, monthNum - 1, 1), // วันที่ 1 ของเดือน
        lt: new Date(year, monthNum, 1), // วันที่ 1 ของเดือนถัดไป
      };
    }

    // 2. ดึงข้อมูลรายจ่ายพร้อมหมวดหมู่
    const expenses = await db.expenses.findMany({
      where: whereCondition,
      select: {
        id: true,
        datetime: true,
        name: true,
        payment: true,
        amount: true,
        expensesCategory: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
      orderBy: {
        datetime: "desc", // เรียงจากวันที่ล่าสุด
      },
    });

    if (expenses.length < 1) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลรายการ",
          description: "เริ่มต้นด้วยการสร้างรายการรายจ่าย",
        }
      );
    }

    // 3. คำนวณยอดรวมทั้งหมด
    const totalAmount = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    return NextResponse.json({
      data: expenses,
      total: totalAmount,
      count: expenses.length,
    });
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลธุรกรรมได้", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลธุรกรรมได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
