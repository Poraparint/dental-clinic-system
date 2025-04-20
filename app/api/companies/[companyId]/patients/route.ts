import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { companyId: string } }
) {
  try {
    const patients = await db.patient.findMany({
      where: { companyId: params.companyId },
      orderBy: { createdAt: "desc" },
    });

    if (patients.length === 0) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลคนไข้",
          description: "เริ่มต้นด้วยการสร้างบัตรคนไข้แรก",
          url: `/dashboard/${params.companyId}/create-patient`,
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
        url: `/dashboard/${params.companyId}/create-patient`,
        urlname: "สร้างบัตรคนไข้",
      },
      { status: 500 }
    );
  }
}
