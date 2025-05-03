import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { currentManagerAndDentist } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const existingManager = await currentManagerAndDentist();

  if (!existingManager) {
    return NextResponse.json({
      status: 403,
    });
  }
  const { companyId } = await params;

  if (!companyId) {
    return NextResponse.json(
      {
        error: "ไม่พบ companyId",
        description: "URL ไม่ถูกต้อง",
      },
      { status: 400 }
    );
  }
  try {

    const categorys = await db.transactionCategory.findMany({
      where: {
        companyId,
        isDeleted: false,
      },
    });

    if (categorys.length < 1) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลหมวดหมู่",
          description: "ไม่พบข้อมูลหมวดหมู่",
        }
      );
    }

    return NextResponse.json(categorys);
  } catch (error) {
    console.error("Error fetching categorys:", error);
    return NextResponse.json(
      {
        error: "ไม่พบข้อมูลหมวดหมู่",
        description: "ไม่พบข้อมูลหมวดหมู่",
      },
      { status: 500 }
    );
  }
}
