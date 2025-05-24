import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { validateManager } from "@/lib/utils/validation/manager";

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
    const transaction = await db.transaction.findMany({
      where: {
        patient: {
          companyId,
        },
      },
      include: {
        patient: {
          select: {
            id: true,
            name: true,
            phone: true,
          },
        },
        transactionCategory: {
          select: {
            name: true,
          }
        }
      },
    });

    if (transaction.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลรายการธุรกรรม",
        description: "เริ่มต้นด้วยการสร้างรายการธุรกรรม",
      });
    }

    return NextResponse.json(transaction);
  } catch (error) {
    console.error("[TRANSACTION_GET]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลรายการธุรกรรมได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
