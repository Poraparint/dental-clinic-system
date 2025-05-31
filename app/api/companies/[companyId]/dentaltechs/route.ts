import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { validateAllExceptAssistant } from "@/lib/utils/validation/member";
import { CreateDentalTechSchema } from "@/schemas";
import { getDentalTechByCompanyId } from "@/data/internal/recheck-dentaltech";
import { formatDateOnly } from "@/lib/utils";
import { getPatientByTransactionId } from "@/data/internal/transaction";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;

  const accessToGet = await validateAllExceptAssistant(companyId);

  if (accessToGet instanceof Response) {
    return accessToGet;
  }
  try {
    const dentalTech = await db.dentaltech.findMany({
      where: {
        companyId,
      },
      select: {
        id: true,
        deadline: true,
        detail: true,
        level: true,
        status: true,
        teeth: true,
        creator: {
          select: {
            name: true,
          },
        },
        patient: {
          select: {
            name: true,
            phone: true,
          },
        },
        dentalTechCategory: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        deadline: "asc",
      },
    });

    if (dentalTech.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลงานทันตกรรม",
        description: "เริ่มต้นด้วยการสร้างรายการทันตกรรม",
      });
    }

    return NextResponse.json(
      dentalTech.map((item) => ({
        ...item,
        deadline: item.deadline,
      }))
    );
  } catch (error) {
    console.error("[DENTALTECH_GET]", error);
    return NextResponse.json(
      {
        error: "ไม่สามารถดึงข้อมูลงานทันตกรรมได้",
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

  const accessToPost = await validateAllExceptAssistant(companyId);

  if (accessToPost instanceof Response) {
    return accessToPost;
  }

  const { member } = accessToPost;

  const validation = CreateDentalTechSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { deadline, transactionId, dctId, detail, teeth, level } =
    validation.data;

  const existingDentalTech = await getDentalTechByCompanyId(
    companyId,
    transactionId
  );

  if (existingDentalTech) {
    return NextResponse.json(
      { error: "รหัสธุรกรรมนี้ถูกใช้ไปแล้ว" },
      { status: 409 }
    );
  }

  const patientId = await getPatientByTransactionId(transactionId);

  if (!patientId) {
    return NextResponse.json(
      {
        error: "รหัสธุรกรรมไม่ถูกต้องหรือไม่มีรหัสธุรกรรมนี้",
      },
      { status: 409 }
    );
  }

  try {
    await db.dentaltech.create({
      data: {
        id: transactionId,
        deadline: formatDateOnly(deadline),
        transactionId,
        dctId,
        detail,
        teeth,
        level,
        patientId: patientId.patientId,
        creatorUserId: member.id,
        companyId,
      },
    });

    return NextResponse.json(
      {
        success: "เพิ่มรายการใหม่สำเร็จ",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[DENTALTECH_POST]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดขณะสร้างรายการ",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
