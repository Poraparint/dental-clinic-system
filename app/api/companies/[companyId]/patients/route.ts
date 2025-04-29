import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const companyId = pathSegments[pathSegments.indexOf("companies") + 1];

    const patients = await db.patient.findMany({
      where: {
        companyId,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        createdAt: true,
        cd: true,
        drug: true,
        creator: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (patients.length === 0) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลคนไข้",
          description: "เริ่มต้นด้วยการสร้างบัตรคนไข้แรก",
          url: `/dashboard/${companyId}/create-patient`,
          urlname: "สร้างบัตรคนไข้",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      {
        error: "ไม่พบข้อมูลคนไข้",
        description: "เริ่มต้นด้วยการสร้างบัตรคนไข้แรก",
        url: `/dashboard/unknown/create-patient`,
        urlname: "สร้างบัตรคนไข้",
      },
      { status: 500 }
    );
  }
}
