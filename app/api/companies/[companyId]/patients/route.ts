import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import {
  validateAllExceptTechnician,
  validateManagerAndDentist,
} from "@/lib/utils/validation/member";
import { CreatePatientSchema } from "@/schemas";
import { getPatientByName } from "@/data/internal/patient";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;

  const accessToGet = await validateAllExceptTechnician(companyId);

  if (accessToGet instanceof Response) {
    return accessToGet;
  }

  try {
    const patients = await db.patient.findMany({
      where: {
        companyId,
        isDeleted: false,
      },
      include: {
        creator: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (patients.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลคนไข้",
        description: "เริ่มต้นด้วยการสร้างบัตรคนไข้แรก",
      });
    }

    return NextResponse.json(patients);
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const values = await request.json();

  const { companyId } = await params;

  const accessToPost = await validateManagerAndDentist(companyId);

  if (accessToPost instanceof Response) {
    return accessToPost;
  }

  const { member } = accessToPost;

  const validation = CreatePatientSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { name, phone, age, address, job, work, worktel, cd, drug } =
    validation.data;

  const existingPatient = await getPatientByName(companyId, name);

  if (existingPatient) {
    return NextResponse.json({ error: "ชื่อนี้ถูกใช้ไปแล้ว" }, { status: 409 });
  }

  try {
    await db.patient.create({
      data: {
        name,
        phone,
        age,
        address,
        job,
        work,
        worktel,
        cd,
        drug,
        companyId,
        creatorUserId: member.id,
      },
    });

    return NextResponse.json(
      {
        success: "เพิ่มบัตรใหม่สำเร็จ",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[PATIENT_POST]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดขณะสร้างบัตรใหม่",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
