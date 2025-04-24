import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const companyId = pathSegments[pathSegments.indexOf("companies") + 1];
    const patientId = pathSegments[pathSegments.indexOf("patients") + 1];

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
          url: `/dashboard/${transactions}/create-patient`,
          urlname: "สร้างรายการธุรกรรมใหม่",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      {
        error: "ไม่พบข้อมูลธุรกรรม",
        description: "เริ่มต้นด้วยการสร้างรายการธุรกรรม",
        url: `/dashboard/create-patient`,
        urlname: "สร้างรายการธุรกรรมใหม่",
      },
      { status: 500 }
    );
  }
}
