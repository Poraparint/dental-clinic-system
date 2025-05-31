import {
  getCreatorIdByPatientId,
  getPatientByCompanyId,
  isDuplicatePatientName,
} from "@/data/internal/patient";
import { db } from "@/lib/db";
import { validateManagerAndDentist } from "@/lib/utils/validation/member";
import { CreatePatientSchema } from "@/schemas";
import { CompanyRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; patientId: string }> }
) {
  const { companyId, patientId } = await params;

  const values = await request.json();

  const accessToPatch = await validateManagerAndDentist(companyId);

  if (accessToPatch instanceof Response) {
    return accessToPatch;
  }

  const { member } = accessToPatch;

  if (member.role === CompanyRole.DENTIST) {
    const creator = await getCreatorIdByPatientId(companyId, patientId);

    if (!creator) {
      return NextResponse.json(
        {
          error: "ไม่พบข้อมูลคนไข้",
          description: "ไม่สามารถตรวจสอบผู้สร้างได้",
        },
        { status: 404 }
      );
    }
    if (creator.creatorUserId !== member.id) {
      return NextResponse.json(
        {
          error: "คุณไม่มีสิทธิ์แก้ไขคนไข้รายนี้",
          description: "เฉพาะผู้สร้างบัตรเท่านั้นที่สามารถแก้ไขได้",
        },
        { status: 403 }
      );
    }
  }

  const validation = CreatePatientSchema.partial().safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
      },
      { status: 400 }
    );
  }

  const dataToUpdate = validation.data;

  const existingPatient = await getPatientByCompanyId(companyId, patientId);

  if (!existingPatient) {
    return NextResponse.json({ error: "ไม่พบคนไข้ที่ระบุ" }, { status: 404 });
  }

  const duplicatePatient = await isDuplicatePatientName(
    companyId,
    patientId,
    dataToUpdate.name
  );

  if (duplicatePatient) {
    return NextResponse.json(
      {
        error: "ชื่อนี้ถูกใช้ไปแล้ว",
      },
      {
        status: 409,
      }
    );
  }

  try {
    await db.patient.update({
      where: {
        id: patientId,
        companyId,
      },
      data: {
        ...dataToUpdate,
        updaterUserId: member.id,
      },
    });
    return NextResponse.json(
      {
        success: `อัปเดตข้อมูลของคุณ ${dataToUpdate.name} สำเร็จ`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[PATIENT_PATCH]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถอัพเดตข้อมูลคนไข้ได้",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
