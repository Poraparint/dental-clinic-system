import { db } from "@/lib/db";
import { formatDateOnly } from "@/lib/utils";
import { validateAllExceptTechnician } from "@/lib/utils/validation/member";
import { CreateScheduleSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

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
    const schedules = await db.schedule.findMany({
      where: { companyId, isDeleted: false },
      select: {
        id: true,
        datetime: true,
        patientName: true,
        phone: true,
        detail: true,
        transactionCategory: {
          select: {
            name: true,
          },
        },
        scheduleCategory: {
          select: {
            name: true,
            order: true,
          },
        },
        creator: {
          select: {
            name: true,
          },
        },
        dentist: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (schedules.length < 1) {
      return NextResponse.json({
        error: "ไม่พบข้อมูลรายการ",
        description: "เริ่มต้นด้วยการสร้างรายการนัดหมายในวันนี้",
      });
    }
    return NextResponse.json(
      schedules.map((item) => ({
        ...item,
        datetime: item.datetime,
      }))
    );
  } catch (error) {
    console.error("[SCHEDULE_GET]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดขณะดึงข้อมูลรายการ",
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

  const accessToPost = await validateAllExceptTechnician(companyId);

  if (accessToPost instanceof Response) {
    return accessToPost;
  }

  const { member } = accessToPost;

  const validation = CreateScheduleSchema.safeParse(values);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "ข้อมูลไม่ถูกต้อง",
        description: "โปรดตรวจสอบข้อมูลที่กรอก",
      },
      { status: 400 }
    );
  }

  const { datetime, scheduleId, tcId, phone, patientName, detail, memberId } =
    validation.data;

  try {
    const schedule = await db.schedule.create({
      data: {
        datetime: formatDateOnly(datetime),
        patientName,
        phone,
        detail,
        scheduleId,
        tcId,
        memberId,
        creatorUserId: member.id,
        companyId,
      },
    });

    return NextResponse.json(
      {
        success: "เพิ่มรายการใหม่สำเร็จ",
        schedule,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[SCHEDULE_POST]", error);
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดขณะสร้างรายการ",
        description: "โปรดติดต่อผู้ดูแลระบบ",
      },
      { status: 500 }
    );
  }
}
