import { db } from "@/lib/db";
import { validateManager } from "@/lib/utils/validation/manager";
import { NextRequest, NextResponse } from "next/server";

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
    const recheckLists = await db.recheckList.findMany({
      where: {
        recheck: {
          companyId,
        },
      },
    });
    if (recheckLists.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลรายการ",
        description: "เริ่มต้นด้วยการสร้างรายการรีเช็ค / แบ่งจ่าย",
      });
    }
    return NextResponse.json(recheckLists);
  } catch (error) {
    console.error("[RECHECK_GET]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลรายการรีเช็คได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
