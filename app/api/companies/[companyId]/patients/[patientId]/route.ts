import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { validateAllExceptTechnician } from "@/lib/utils/validation/member";
import { getPatientByCompanyId } from "@/data/internal/patient";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; patientId: string }> }
) {
  const { companyId, patientId } = await params;

  const accessToGet = await validateAllExceptTechnician(companyId);

  if (accessToGet instanceof Response) {
    return accessToGet;
  }

  const existingpatient = await getPatientByCompanyId(companyId, patientId);

  if (!existingpatient) {
    return NextResponse.json(
      {
        error: "ไม่พบบัตรคนไข้หรือคนไข้ไม่ได้อยู่ในสาขานี้",
      },
      { status: 400 }
    );
  }

  try {
    const patient = await db.patient.findUnique({
      where: {
        companyId,
        id: existingpatient.id,
        isDeleted: false,
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.error("[PATIENT_GET]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลคนไข้ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
