import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const companyId = pathSegments[pathSegments.indexOf("companies") + 1];

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
          url: "/",
          urlname: "เพิ่มหมวดหมู่",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(categorys);
  } catch (error) {
    console.error("Error fetching categorys:", error);
    return NextResponse.json(
      {
        error: "ไม่พบข้อมูลหมวดหมู่",
        description: "ไม่พบข้อมูลหมวดหมู่",
        url: "/",
        urlname: "เพิ่มหมวดหมู่",
      },
      { status: 500 }
    );
  }
}
