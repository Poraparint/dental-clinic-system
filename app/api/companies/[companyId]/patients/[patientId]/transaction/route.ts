import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { currentManagerAndDentist } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string, patientId: string }> }
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

  const { patientId } = await params;

  if (!patientId) {
    return NextResponse.json(
      {
        error: "ไม่พบ pateintId",
        description: "URL ไม่ถูกต้อง",
      },
      { status: 400 }
    );
  }
  try {
    if (!companyId || !patientId) {
      return NextResponse.json(
        { error: "Missing companyId or patientId" },
        { status: 400 }
      );
    }

    const transactions = await db.transaction.findMany({
      where: {
        patientId,
      },
      select: {
        id: true,
        datetime: true,
        transactionCategory: true,
        detail: true,
        price: true,
        paid: true,
        creator: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (transactions.length < 1) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลธุรกรรม",
          description: "เริ่มต้นด้วยการสร้างรายการธุรกรรม",
        }
      );
    }

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      {
        error: "ไม่พบข้อมูลธุรกรรม",
        description: "เริ่มต้นด้วยการสร้างรายการธุรกรรม",
      },
      { status: 500 }
    );
  }
}
