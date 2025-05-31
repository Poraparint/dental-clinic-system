import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { validateManager } from "@/lib/utils/validation/manager";
import { CreateExpensesSchema } from "@/schemas";
import { getDisplayDate } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;

  const accessToGet = await validateManager(companyId);

  if (accessToGet instanceof Response) {
    return accessToGet;
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
      return NextResponse.json({
        error: "ไม่พบข้อมูลรายการ",
        description: "เริ่มต้นด้วยการสร้างรายการรายจ่าย",
      });
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
    console.error("[EXPENSES_GET]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลธุรกรรมได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const values = await request.json();

  const { companyId } = await params;

  const accessToPost = await validateManager(companyId);

  if (accessToPost instanceof Response) {
    return accessToPost;
  }

  const { manager } = accessToPost;
  const validation = CreateExpensesSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { datetime, ecId, name, payment, amount } = validation.data;

  try {
    const expenses = await db.expenses.create({
      data: {
        datetime: getDisplayDate(datetime),
        ecId,
        name,
        payment,
        amount,
        companyId,
        createdManagerId:manager.id
      },
    });

    return NextResponse.json(
      {
        success: "เพิ่มรายการใหม่สำเร็จ",
        expenses,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[EXPENSES_POST]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดขณะสร้างรายการ",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
